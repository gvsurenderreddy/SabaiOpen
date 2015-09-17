#!/bin/ash
# Sabai Technology - Apache v2 licence
# copyright 2014 Sabai Technology

#input parameters
action="$1"
device="$2"

wifi down

# checking action
if [ "$action" = "save" ]; then
	config_file=sabai
elif [ "$action" = "start" ]; then
	config_file=sabai
	uci add wireless wifi-iface
	uci commit wireless
else
	config_file=sabai-new
fi

# parsing common configs of devices
mode=$(uci get $config_file.wlradio$device.mode)
ssid=$(uci get $config_file.wlradio$device.ssid)
wpa_psk=$(uci get $config_file.wlradio$device.wpa_psk)
encryption=$(uci get $config_file.wlradio$device.encryption)
channel_freq=$(uci get $config_file.wlradio$device.channel_freq)

# parsing specific configs of main wl
if [ "$device" = "0" ]; then
	wpa_rekey=$(uci get $config_file.wlradio$device.wpa_rekey)
	auto=$(uci get $config_file.wlradio$device.auto)
	if [ "$auto" = "off" ]; then
		uci set wireless.radio0.channel="$channel_freq"
		uci commit wireless
	else
		uci set wireless.radio0.channel="auto"
	fi
fi

# On/Off wifi ap
if [ "$mode" = "off" ]; then
	uci delete wireless.@wifi-iface["$device"].mode
	uci set wireless.@wifi-iface["$device"].disabled=1
else
	uci set wireless.@wifi-iface["$device"].disabled=0
	uci set wireless.@wifi-iface["$device"].mode="$(uci get $config_file.wlradio$device.mode)";
fi

# Copy wlan configuration
uci set wireless.@wifi-iface[$device].device="radio0"
uci set wireless.@wifi-iface[$device].ssid="$(uci get $config_file.wlradio$device.ssid)"
uci set wireless.@wifi-iface[$device].key="$(uci get $config_file.wlradio$device.wpa_psk)"

# Setting specific configs for guest wlan
if [ "$device" = "1" ]; then
	uci set wireless.@wifi-iface[$device].ifname="wlan1"
	uci set wireless.@wifi-iface[$device].network="guest"
	uci set wireless.@wifi-iface[$device].isolate=1
fi

uci commit wireless

_wep(){
	wepkeys="$(uci get $config_file.wlradio0.wepkeys)";
	uci set wireless.@wifi-iface[0].key1=$(echo $wepkeys |awk -F: '{print $0}' | awk '{print $1}')
	uci set wireless.@wifi-iface[0].key2=$(echo $wepkeys |awk -F: '{print $0}' | awk '{print $2}')
	uci set wireless.@wifi-iface[0].key3=$(echo $wepkeys |awk -F: '{print $0}' | awk '{print $3}')
	uci set wireless.@wifi-iface[0].key4=$(echo $wepkeys |awk -F: '{print $0}' | awk '{print $4}')
	uci set wireless.@wifi-iface[0].key=4
	uci commit wireless;
}

_psk(){
	wpa_encryption=$(uci get $config_file.wlradio0.wpa_encryption)
	full_encryption=$(echo "$encryption+$wpa_encryption") 
	uci set wireless.@wifi-iface[$device].encryption=$full_encryption
	uci set wireless.@wifi-iface[$device].key=$(uci get $config_file.wlradio$device.wpa_psk)
	uci set wireless.@wifi-iface[$device].key1=''
	uci set wireless.@wifi-iface[$device].key2=''
	uci set wireless.@wifi-iface[$device].key3=''
	uci set wireless.@wifi-iface[$device].key4=''
	uci commit wireless
}

ls >/dev/null 2>/dev/null 

case $encryption in
	none)	break;	;;
	wep)	_wep	;;
	psk)	_psk	;;
	psk2)	_psk	;;
	mixed-psk)	_psk	;;
esac

if [ $action = "update" ]; then
	echo "network" >> /tmp/.restart_services
else
	wifi up
fi

logger "wireless script run and wifi restarted"
