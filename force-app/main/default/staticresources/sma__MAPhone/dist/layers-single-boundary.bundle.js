webpackJsonp([49],{276:function(t,e,a){t.exports={default:a(277),__esModule:!0}},277:function(t,e,a){a(278),t.exports=a(0).Number.isNaN},278:function(t,e,a){var i=a(2);i(i.S,"Number",{isNaN:function(t){return t!=t}})},393:function(t,e,a){var i=a(13)(a(394),a(395),null,null,null);t.exports=i.exports},394:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(17),s=a.n(i),o=a(276),r=a.n(o),n=a(14),l=a.n(n),d=a(7),u=a.n(d),c=a(59),p=a.n(c),m=a(35),v=(a.n(m),window),h=v.$,y=v.google,f=v.MA,g=v.moment;e.default={components:{MASpinner:p.a},props:{layerData:{type:Object,required:!0}},data:function(){return{proximityType:"Circle",address:"",radius:"50",unit:"MILES",colorOptions:{},hours:"",minutes:"",opacity:"0.6",latitude:"",longitude:"",kmlOptions:[],kmlLayer:"",loading:!1}},computed:l()({},Object(m.mapGetters)("layers",{layers__getPlottedLayerByQID:"getPlottedLayerByQID"}),{qid:function(){return this.layerData.qid},layerInfo:function(){return this.layers__getPlottedLayerByQID(this.qid)},plottedLayer:function(){return h('.layer.proximity[qid="'+this.qid+'"]')}}),created:function(){var t=this.layerInfo.proximityType,e=void 0===t?"Circle":t;this.proximityType=e,this.getKMLOptions(),this.setShapeSettings()},methods:l()({},Object(m.mapMutations)("layers",{layers__updateLayerInfo:"updateLayerInfo"}),{setShapeSettings:function(){var t=window.userSettings.defaultProximitySettings,e=void 0===t?{}:t,a=this.layerInfo.colorOptions;this.colorOptions=a||{fillOpacity:"0.6",fillColor:"#3083d3",borderColor:"#16325C"},this.radius=this.layerInfo.radius||e.radius||"50",this.latitude=this.layerInfo.latitude||"",this.longitude=this.layerInfo.longitude||"",this.minutes=this.layerInfo.minutes||e.travelTimeRadiusMinutes||"",this.hours=this.layerInfo.hours||e.travelTimeRadiusHours||"1",this.unit=this.layerInfo.unit||e.unit||"MILES",this.address=this.layerInfo.address||"Lat: "+this.layerInfo.latitude+"\nLong: "+this.layerInfo.longitude},submitChanges:function(){var t=this;this.removeProxLayer(),this.loading=!0,this.getAddressString().then(function(){switch(t.updateLayerSettings(),t.proximityType){case"Circle":t.renderCircle();break;case"Polygon":t.renderPolygon();break;case"KML":t.renderKML();break;case"travelTime":case"travelDistance":t.renderTravelData();break;default:console.warn("unknown type")}}).catch(function(e){t.showBoundaryErrorMsg(e),t.loading=!1})},updateLayerSettings:function(){var t=l()({},this.layerInfo,{colorOptions:this.colorOptions,latitude:this.latitude,longitude:this.longitude,proximityType:this.proximityType,radius:this.radius,minutes:this.minutes,hours:this.hours,address:this.address,unit:this.unit});this.layers__updateLayerInfo(t)},renderCircle:function(){var t=this,e=void 0,a=this.radius*window.unitFactors[this.unit].METERS;if(this.plottedLayer.find(".js-radiusDistance").removeClass("error"),0===a)return this.plottedLayer.find(".js-radiusDistance").addClass("error"),void(this.loading=!1);this.plottedLayer.data("proxObject",e=new y.maps.Circle({map:f.map,center:new y.maps.LatLng(this.latitude,this.longitude),radius:a,layerType:"prox",strokeColor:this.layerInfo.borderColor,strokeWeight:3,strokeOpacity:1,fillColor:this.layerInfo.fillColor,fillOpacity:this.colorOptions.fillOpacity,qid:this.qid}));var i=new y.maps.Marker({map:f.map,position:new y.maps.LatLng(this.latitude,this.longitude),title:this.address,icon:{path:y.maps.SymbolPath.CIRCLE,fillColor:"#ffffff",fillOpacity:1,strokeColor:"#000000",strokeWeight:1,scale:4}});e.centerPoint=i,y.maps.event.addListener(this.plottedLayer.data("proxObject"),"click",function(e){window.proximityLayer_Click({position:e.latLng,type:"circle",shape:t.plottedLayer.data("proxObject")})}),y.maps.event.addListener(this.plottedLayer.data("proxObject"),"rightclick",function(e){window.Shape_Context.call(t,e)}),this.loading=!1,window.ChangeVisibilityWhenCircleIsAdded()},getKMLOptions:function(){var t=this;(new u.a).setAction(this.$Remoting.processAJAXRequest).setErrorHandler(function(e,a){console.warn(e),t.kmlOptions=[],f.isUserLoggedIn(e,a,!0)}).invoke([{action:"getKMLOptions",ajaxResource:"QueryBuilderAPI"}],function(e){if(e.success){var a=e.data;t.kmlOptions=a}},{escape:!1,buffer:!1})},handleTravelData:function(t,e){var a=this,i=[],s=new y.maps.LatLngBounds,o=60*this.hours+this.minutes,r=new y.maps.Marker({position:new y.maps.LatLng({lat:this.latitude,lng:this.longitude}),title:this.address||"",icon:{path:y.maps.SymbolPath.CIRCLE,fillColor:"#ffffff",fillOpacity:1,strokeColor:"#000000",strokeWeight:1,scale:4}});s.extend(r.getPosition()),e.shapes.forEach(function(e){var n=e.coordinates,l=new y.maps.Polygon({path:n,geodesic:!0,isTravelGeom:!0,shapeType:"travelTime",fillColor:a.layerInfo.fillColor,fillOpacity:a.colorOptions.fillOpacity,layer:a.plottedLayer,strokeColor:a.layerInfo.borderColor,saveData:{isCustom:!0,proximityType:"travelTime",travelTime:o,travelLatitude:a.latitude,travelLongitude:a.longitude,travelDistance:"",travelMode:"car",travelPreference:"fastest",trafficEnabled:"disabled",departure:t}});y.maps.event.addListener(l,"click",function(t){window.proximityLayer_Click({position:t.latLng,type:"Polygon",shape:l})}),y.maps.event.addListener(l,"rightclick",function(t){window.Shape_Context.call(a,t)}),l.centerPoint=r,i.push(l),s.union(e.bounds),l.setMap(f.map)}),r.setMap(f.map),f.map.fitBounds(s),this.plottedLayer.data("proxObjects",i)},validateTravelDistance:function(){var t=!0,e="",a=Number(this.radius*window.unitFactors[this.unit].METERS*window.unitFactors.METERS.MILES),i=Math.round(1609.34*a);if(r()(i)||""===this.address)t=!1,e="All fields must be completed with valid input to continue.";else if(i<=0)t=!1,e="Please enter a distance greater than 0.";else if(i>5e5){var s=Math.round(5e5*window.unitFactors.METERS[this.unit]);e="Please reduce travel distance. Max travel distance is "+(s=s>1?s-1:s)+" "+this.unit}return t||this.showBoundaryErrorMsg(e),t},validateTravelTime:function(){var t=!0,e="",a=Number(this.hours),i=Number(this.minutes),s=3600*a+60*i;return r()(a)&&r()(i)||""===this.address?(t=!1,e="All fields must be completed with valid input to continue."):s<=0?(t=!1,e="Please enter a time greater than 0."):s>19800&&(t=!1,e="Please reduce travel time. Max travel time equals 5 hours and 30 minutes."),t||this.showBoundaryErrorMsg(e),t},renderTravelData:function(){var t=this;this.hasError=!1;if("travelTime"===this.proximityType?this.validateTravelTime():this.validateTravelDistance()){var e=g().get("day"),a=g().day(e).add(-1,"weeks"),i=a,s={mode:"fastest;car;traffic:disabled",start:"geo!"+(this.latitude+","+this.longitude)};if("travelTime"===this.proximityType){var o=60*(60*this.hours+this.minutes);a.hour(this.hours).minutes(this.minutes),s.range=o,s.rangetype="time",i=a.format("YYYY-MM-DDTHH:mm:ss"),s.departure=i}else{var r=Number(this.radius*window.unitFactors[this.unit].METERS*window.unitFactors.METERS.MILES),n=Math.round(1609.34*r);s.range=n,s.rangetype="distance",i=a.format("YYYY-MM-DDTHH:mm:ss")}window.MAPlotting.getServiceArea({subType:"core",action:"isoline",version:"1",method:"get"},s).then(function(e){t.handleTravelData(i,e),t.loading=!1}).fail(function(e){var a=e.message||"Unknown Error";a.indexOf("endpoint")>-1&&(a="Unautorized endpoint: "+window.MASystem.Organization.MAIO_URL),a="Unable to get the service area. "+a,t.showBoundaryErrorMsg(a),t.loading=!1})}},showBoundaryErrorMsg:function(t){window.MAToastMessages.showError({message:"Boundary Error",subMessage:t,timeOut:0,closeButton:!0})},renderKML:function(){var t=this,e=f.resources.XMLDoc+"?docId="+this.kmlLayer;new window.ZipFile(e,function(a){var i=a.status.length>0?"KML":"KMZ",s=new window.geoXML3.parser({map:f.map,forceType:i,processStyles:!0,singleInfoWindow:!0,afterParse:function(){window.ChangeVisibilityWhenCircleIsAdded(),t.loading=!1,t.plottedLayer.data("kmlLayer",s)},failedParse:function(){console.warn("Unable to parse: "+f.resources.XMLDoc+"?docId="+t.kmlLayer);window.MAToastMessages.showError({message:"Unable to retreive or parse the KML document.",timeOut:6e3}),t.loading=!1}});s.parse(e)})},renderPolygon:function(){this.plottedLayer.data("proxObject")?this.proxLayer.data("proxObject").setOptions({fillOpacity:this.colorOptions.fillOpacity}):this.plottedLayer.find(".options-polygon").text("There is no polygon associated with this layer. In order to create a polygon layer, please use the drawing toolbar on the map."),this.loading=!1},getAddressString:function(){var t=this;return new s.a(function(e,a){var i=t.address;if("string"==typeof i){var s=(i=(i=i.trim()).replace(/\n\s*\n/g,"\n")).toLowerCase(),o=/^lat: ([^\n]*)\nlong: ([^\n]*)$/;if(o.test(s)){var n=o.exec(s);if(Array.isArray(n)){var l=f.Util.parseNumberString(n[1]),d=f.Util.parseNumberString(n[2]);t.latitude=Number(l),t.longitude=Number(d),e({latitude:t.latitude,longitude:t.longitude})}else a(new Error("Unknown error while parsing the Lat/Lng input."))}else""===i?a(new Error("Address input cannot be blank.")):f.Geocoding.geocode({address:i},function(i){var s=i.success,o=void 0!==s&&s,n=i.result,l=void 0===n?{}:n;if(o){var d=l.Latitude,u=l.Longitude;t.latitude=Number(d),t.longitude=Number(u),r()(t.latitude)||r()(t.longitude)?a(new Error("No valid geocode received.")):e({latitude:t.latitude,longitude:t.longitude})}else a(new Error("Geocode error."))})}else a(new Error("Invalid address input."))})},removeProxLayer:function(){try{this.plottedLayer.data("proxObject").centerPoint.setMap(null)}catch(t){}try{h.each(this.plottedLayer.data("proxObjects"),function(t,e){try{e.centerPoint.setMap(null)}catch(t){}e.setMap(null)})}catch(t){}if(this.plottedLayer.data("proxObject")&&"Polygon"!==this.plottedLayer.find(".proximitytype").val()){if(this.plottedLayer.data("proxObject").popupHandle)try{this.plottedLayer.data("proxObject").popupHandle.setMap(null)}catch(t){}try{this.plottedLayer.data("proxObject").setMap(null)}catch(t){f.log(t)}this.plottedLayer.removeData("proxObject")}this.plottedLayer.data("dataLayer")&&this.plottedLayer.data("dataLayer").setMap(null),this.plottedLayer.data("kmlLayer")&&this.plottedLayer.data("kmlLayer").hideDocument()}})}},395:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"proximity layer"},[a("div",{staticClass:"slds-scope"},[a("MASpinner",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}]})],1),t._v(" "),a("div",{staticClass:"singleViewInfo pad-16"},[a("div",{staticClass:"options-wrapper"},[a("div",{staticClass:"select-info"},[a("label",{staticClass:"ma-input-label"},[t._v("Type")]),t._v(" "),a("div",{staticClass:"ma-form-control has-inset-icon--right"},[a("i",{staticClass:"ma-icon ma-icon-down inset-icon--right"}),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.proximityType,expression:"proximityType"}],staticClass:"ma-input proximitytype",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.proximityType=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"Circle"}},[t._v("Circle")]),t._v(" "),a("option",{staticStyle:{display:"none"},attrs:{value:"Polygon"}},[t._v("Polygon")]),t._v(" "),a("option",{attrs:{value:"KML"}},[t._v("KML")]),t._v(" "),a("option",{attrs:{value:"travelTime"}},[t._v("Travel Time")]),t._v(" "),a("option",{attrs:{value:"travelDistance"}},[t._v("Travel Distance")])])])]),t._v(" "),a("div",{staticClass:"prox-option-select"},[a("div",{staticClass:"prox-option"},[a("div",{directives:[{name:"show",rawName:"v-show",value:"KML"!==t.proximityType,expression:"proximityType !== 'KML'"}],staticClass:"ma-form-control-wrap js-toggleKML",attrs:{id:"boundary-address"}},[a("label",{staticClass:"ma-input-label"},[t._v(t._s(t._f("decode")(t.$Labels.MA_Address)))]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.address,expression:"address"}],staticClass:"ma-input",attrs:{placeholder:t.$Labels.MA_Address+"...",type:"text"},domProps:{value:t.address},on:{input:function(e){e.target.composing||(t.address=e.target.value)}}})]),t._v(" "),"Circle"===t.proximityType||"travelDistance"===t.proximityType?a("div",[a("div",{staticClass:"ma-form-control-wrap js-rowToggle",attrs:{"data-id":"travelDistance::Circle"}},[a("label",{staticClass:"ma-input-label"},[t._v(t._s(t._f("decode")(t.$Labels.MA_Radius)))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.radius,expression:"radius"}],staticClass:"numberVal ma-input js-radiusDistance prox-style",attrs:{placeholder:"0",type:"text"},domProps:{value:t.radius},on:{input:function(e){e.target.composing||(t.radius=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"ma-form-control-wrap js-rowToggle",attrs:{"data-id":"travelDistance::Circle"}},[a("label",{staticClass:"ma-input-label"},[t._v(t._s(t._f("decode")(t.$Labels.MA_UNITS)))]),t._v(" "),a("div",{staticClass:"ma-form-control has-inset-icon--right"},[a("i",{staticClass:"ma-icon ma-icon-down inset-icon--right"}),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.unit,expression:"unit"}],staticClass:"ma-input js-radiusUnit",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.unit=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"MILES"}},[t._v(t._s(t._f("decode")(t.$Labels.MARoutes_Miles)))]),t._v(" "),a("option",{attrs:{value:"KM"}},[t._v(t._s(t._f("decode")(t.$Labels.MARoutes_Kilometers)))]),t._v(" "),a("option",{attrs:{value:"METERS"}},[t._v(t._s(t._f("decode")(t.$Labels.MA_Meters)))]),t._v(" "),a("option",{attrs:{value:"YARDS"}},[t._v(t._s(t._f("decode")(t.$Labels.MA_Yards)))]),t._v(" "),a("option",{attrs:{value:"FEET"}},[t._v(t._s(t._f("decode")(t.$Labels.MA_Feet)))])])])])]):t._e(),t._v(" "),"travelTime"===t.proximityType?a("div",[a("div",{staticClass:"ma-form-control-wrap js-rowToggle",attrs:{"data-id":"travelTime"}},[a("label",{staticClass:"ma-input-label"},[t._v(t._s(t._f("decode")(t.$Labels.MA_hours)))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.hours,expression:"hours"}],staticClass:"numberVal ma-input radius-hours prox-style",attrs:{placeholder:"0",type:"text"},domProps:{value:t.hours},on:{input:function(e){e.target.composing||(t.hours=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"ma-form-control-wrap js-rowToggle",attrs:{"data-id":"travelTime"}},[a("label",{staticClass:"ma-input-label"},[t._v(t._s(t._f("decode")(t.$Labels.MA_minutes)))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.minutes,expression:"minutes"}],staticClass:"numberVal ma-input radius-minutes prox-style",attrs:{placeholder:"0",type:"text"},domProps:{value:t.minutes},on:{input:function(e){e.target.composing||(t.minutes=e.target.value)}}})])]):t._e(),t._v(" "),"KML"===t.proximityType?a("div",[a("div",{staticClass:"ma-form-control-wrap js-rowToggle",attrs:{"data-id":"KML"}},[a("div",{staticClass:"ma-form-control has-inset-icon--right"},[a("i",{staticClass:"ma-icon ma-icon-down inset-icon--right"}),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.kmlLayer,expression:"kmlLayer"}],staticClass:"ma-input options-kml-document",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.kmlLayer=e.target.multiple?a:a[0]}}},t._l(t.kmlOptions,function(e,i){return a("option",{key:i,domProps:{value:e.Id}},[t._v("\n                                        "+t._s(t._f("decode")(e.Name))+"\n                                    ")])}),0)])])]):t._e()])])]),t._v(" "),a("div",{staticClass:"color-wrapper js-colorOptions"},[a("div",{staticClass:"ma-form-control-wrap color-select hidden"},[a("label",{staticClass:"ma-input-label"},[t._v(t._s(t.$Labels.MA_FILL))]),t._v(" "),a("input",{staticClass:"color fillcolor prox-style ma-input",staticStyle:{"background-image":"none","background-color":"rgb(48, 131, 211)",color:"rgb(255, 255, 255)"},attrs:{type:"text",autocomplete:"off",value:"#3083d3"}})]),t._v(" "),a("div",{staticClass:"ma-form-control-wrap color-select hidden"},[a("label",{staticClass:"ma-input-label"},[t._v(t._s(t.$Labels.MA_BORDER))]),t._v(" "),a("input",{staticClass:"color bordercolor prox-style ma-input",staticStyle:{"background-image":"none","background-color":"rgb(22, 50, 92)",color:"rgb(255, 255, 255)"},attrs:{type:"text",autocomplete:"off",value:"#16325C"}})]),t._v(" "),"KML"!==t.proximityType?a("div",{staticClass:"ma-form-control-wrap opac-wrapper"},[a("label",{staticClass:"ma-input-label"},[t._v(t._s(t.$Labels.MA_OPACITY))]),t._v(" "),a("div",{staticClass:"ma-form-control has-inset-icon--right"},[a("i",{staticClass:"ma-icon ma-icon-down inset-icon--right"}),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.colorOptions.fillOpacity,expression:"colorOptions.fillOpacity"}],staticClass:"ma-input js-proxOpacity",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.colorOptions,"fillOpacity",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"0.1"}},[t._v("10%")]),t._v(" "),a("option",{attrs:{value:"0.2"}},[t._v("20%")]),t._v(" "),a("option",{attrs:{value:"0.3"}},[t._v("30%")]),t._v(" "),a("option",{attrs:{value:"0.4"}},[t._v("40%")]),t._v(" "),a("option",{attrs:{value:"0.5"}},[t._v("50%")]),t._v(" "),a("option",{attrs:{value:"0.6"}},[t._v("60%")]),t._v(" "),a("option",{attrs:{value:"0.7"}},[t._v("70%")]),t._v(" "),a("option",{attrs:{value:"0.8"}},[t._v("80%")]),t._v(" "),a("option",{attrs:{value:"0.9"}},[t._v("90%")]),t._v(" "),a("option",{attrs:{value:"1"}},[t._v("100%")])])])]):t._e()]),t._v(" "),a("div",{staticClass:"ma-form-control-wrap",staticStyle:{"margin-top":"28px"}},[a("div",[a("button",{staticClass:"full-width button-update ma-button ma-button--blue",staticStyle:{"line-height":"30px"},on:{click:t.submitChanges}},[t._v("\n                    "+t._s(t.$Labels.MA_Submit)+"\n                ")])])])])])},staticRenderFns:[]}}});