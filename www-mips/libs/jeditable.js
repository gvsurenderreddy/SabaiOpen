/* jEditable 1.7.3 minified */
(function($){$.fn.editable=function(e,t){if("disable"==e){$(this).data("disabled.editable",true);return}if("enable"==e){$(this).data("disabled.editable",false);return}if("destroy"==e){$(this).unbind($(this).data("event.editable")).removeData("disabled.editable").removeData("event.editable");return}var n=$.extend({},$.fn.editable.defaults,{target:e},t);var r=$.editable.types[n.type].plugin||function(){};var i=$.editable.types[n.type].submit||function(){};var s=$.editable.types[n.type].buttons||$.editable.types["defaults"].buttons;var o=$.editable.types[n.type].content||$.editable.types["defaults"].content;var u=$.editable.types[n.type].element||$.editable.types["defaults"].element;var a=$.editable.types[n.type].reset||$.editable.types["defaults"].reset;var f=n.callback||function(){};var l=n.onedit||function(){};var c=n.onsubmit||function(){};var h=n.onreset||function(){};var p=n.onerror||a;if(n.tooltip){$(this).attr("title",n.tooltip)}n.autowidth="auto"==n.width;n.autoheight="auto"==n.height;return this.each(function(){var e=this;var t=$(e).width();var d=$(e).height();$(this).data("event.editable",n.event);if(!$.trim($(this).html())){$(this).html(n.placeholder)}$(this).bind(n.event,function(h){if(true===$(this).data("disabled.editable")){return}if(e.editing){return}if(false===l.apply(this,[n,e])){return}h.preventDefault();h.stopPropagation();if(n.tooltip){$(e).removeAttr("title")}if(0==$(e).width()){n.width=t;n.height=d}else{if(n.width!="none"){n.width=n.autowidth?$(e).width():n.width}if(n.height!="none"){n.height=n.autoheight?$(e).height():n.height}}if($(this).html().toLowerCase().replace(/(;|"|\/)/g,"")==n.placeholder.toLowerCase().replace(/(;|"|\/)/g,"")){$(this).html("")}e.editing=true;e.revert=$(e).html();$(e).html("");var v=$("<form />");if(n.cssclass){if("inherit"==n.cssclass){v.attr("class",$(e).attr("class"))}else{v.attr("class",n.cssclass)}}if(n.style){if("inherit"==n.style){v.attr("style",$(e).attr("style"));v.css("display",$(e).css("display"))}else{v.attr("style",n.style)}}var m=u.apply(v,[n,e]);var g;if(n.loadurl){var y=setTimeout(function(){m.disabled=true;o.apply(v,[n.loadtext,n,e])},100);var b={};b[n.id]=e.id;if($.isFunction(n.loaddata)){$.extend(b,n.loaddata.apply(e,[e.revert,n]))}else{$.extend(b,n.loaddata)}$.ajax({type:n.loadtype,url:n.loadurl,data:b,async:false,success:function(e){window.clearTimeout(y);g=e;m.disabled=false}})}else if(n.data){g=n.data;if($.isFunction(n.data)){g=n.data.apply(e,[e.revert,n])}}else{g=e.revert}o.apply(v,[g,n,e]);m.attr("name",n.name);s.apply(v,[n,e]);$(e).append(v);r.apply(v,[n,e]);$(":input:visible:enabled:first",v).focus();if(n.select){m.select()}m.keydown(function(t){if(t.keyCode==27){t.preventDefault();a.apply(v,[n,e])}});var y;if("cancel"==n.onblur){m.blur(function(t){y=setTimeout(function(){a.apply(v,[n,e])},500)})}else if("submit"==n.onblur){m.blur(function(e){y=setTimeout(function(){v.submit()},200)})}else if($.isFunction(n.onblur)){m.blur(function(t){n.onblur.apply(e,[m.val(),n])})}else{m.blur(function(e){})}v.submit(function(t){if(y){clearTimeout(y)}t.preventDefault();if(false!==c.apply(v,[n,e])){if(false!==i.apply(v,[n,e])){if($.isFunction(n.target)){var r=n.target.apply(e,[m.val(),n]);$(e).html(r);e.editing=false;f.apply(e,[e.innerHTML,n]);if(!$.trim($(e).html())){$(e).html(n.placeholder)}}else{var s={};s[n.name]=m.val();s[n.id]=e.id;if($.isFunction(n.submitdata)){$.extend(s,n.submitdata.apply(e,[e.revert,n]))}else{$.extend(s,n.submitdata)}if("PUT"==n.method){s["_method"]="put"}$(e).html(n.indicator);var o={type:"POST",data:s,dataType:"html",url:n.target,success:function(t,r){if(o.dataType=="html"){$(e).html(t)}e.editing=false;f.apply(e,[t,n]);if(!$.trim($(e).html())){$(e).html(n.placeholder)}},error:function(t,r,i){p.apply(v,[n,e,t])}};$.extend(o,n.ajaxoptions);$.ajax(o)}}}$(e).attr("title",n.tooltip);return false})});this.reset=function(t){if(this.editing){if(false!==h.apply(t,[n,e])){$(e).html(e.revert);e.editing=false;if(!$.trim($(e).html())){$(e).html(n.placeholder)}if(n.tooltip){$(e).attr("title",n.tooltip)}}}}})};$.editable={types:{defaults:{element:function(e,t){var n=$('<input type="hidden"></input>');$(this).append(n);return n},content:function(e,t,n){$(":input:first",this).val(e)},reset:function(e,t){t.reset(this)},buttons:function(e,t){var n=this;if(e.submit){if(e.submit.match(/>$/)){var r=$(e.submit).click(function(){if(r.attr("type")!="submit"){n.submit()}})}else{var r=$('<button type="submit" />');r.html(e.submit)}$(this).append(r)}if(e.cancel){if(e.cancel.match(/>$/)){var i=$(e.cancel)}else{var i=$('<button type="cancel" />');i.html(e.cancel)}$(this).append(i);$(i).click(function(r){if($.isFunction($.editable.types[e.type].reset)){var i=$.editable.types[e.type].reset}else{var i=$.editable.types["defaults"].reset}i.apply(n,[e,t]);return false})}}},text:{element:function(e,t){var n=$("<input />");if(e.width!="none"){n.attr("width",e.width)}if(e.height!="none"){n.attr("height",e.height)}n.attr("autocomplete","off");$(this).append(n);return n}},textarea:{element:function(e,t){var n=$("<textarea />");if(e.rows){n.attr("rows",e.rows)}else if(e.height!="none"){n.height(e.height)}if(e.cols){n.attr("cols",e.cols)}else if(e.width!="none"){n.width(e.width)}$(this).append(n);return n}},select:{element:function(e,t){var n=$("<select />");$(this).append(n);return n},content:function(data,settings,original){if(String==data.constructor){eval("var json = "+data)}else{var json=data}for(var key in json){if(!json.hasOwnProperty(key)){continue}if("selected"==key){continue}var option=$("<option />").val(key).append(json[key]);$("select",this).append(option)}$("select",this).children().each(function(){if($(this).val()==json["selected"]||$(this).text()==$.trim(original.revert)){$(this).attr("selected","selected")}});if(!settings.submit){var form=this;$("select",this).change(function(){form.submit()})}}}},addInputType:function(e,t){$.editable.types[e]=t}};$.fn.editable.defaults={name:"value",id:"id",type:"text",width:"auto",height:"auto",event:"click.editable",onblur:"cancel",loadtype:"GET",loadtext:"Loading...",placeholder:"Click to edit",loaddata:{},submitdata:{},ajaxoptions:{}}})(jQuery)

/* jEditable Checkbox minified */
$.editable.addInputType("checkbox",{element:function(e,t){$(this).append('<input type="checkbox"/>');var n=$('<input type="hidden"/>');$(this).append(n);return n},submit:function(e,t){e=$.extend({checkbox:{trueValue:"1",falseValue:"0"}},e);if($(":checkbox",this).is(":checked")){$(":hidden",this).val(e.checkbox.trueValue)}else{$(":hidden",this).val(e.checkbox.falseValue)}},content:function(e,t,n){t=$.extend({checkbox:{trueValue:"1",falseValue:"0"}},t);if(e==t.checkbox.trueValue){$(":checkbox",this).attr("checked","checked")}else{$(":checkbox",this).removeAttr("checked")}}})
