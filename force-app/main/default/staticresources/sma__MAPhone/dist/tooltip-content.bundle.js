webpackJsonp([27],{217:function(t,e,a){var o=a(13)(a(229),a(230),function(t){a(227)},"data-v-2c92a8a8",null);t.exports=o.exports},227:function(t,e,a){var o=a(228);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(198)("5bf9c067",o,!0)},228:function(t,e,a){(t.exports=a(197)(void 0)).push([t.i,".slds-modal__content[data-v-2c92a8a8]{min-height:0}.slds-modal__content[data-v-2c92a8a8]:last-child{border-bottom-right-radius:.25rem;border-bottom-left-radius:.25rem;box-shadow:0 2px 3px 0 rgba(0,0,0,.16)}[data-v-2c92a8a8].slds-notify{min-width:auto;width:100%}.slds-modal_small .slds-modal__container[data-v-2c92a8a8]{width:20rem}.ma-footer-bodyless[data-v-2c92a8a8]{border-top:none}.slds-modal__container .slds-modal__header .ma-icon-close[data-v-2c92a8a8]{font-size:22px}",""])},229:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(59),s=a.n(o);e.default={name:"MAModal",components:{MASpinner:s.a},props:{title:{type:String,required:!0},doDetach:{type:Boolean,default:!1},isLoading:{type:Boolean,default:!1},isLarge:{type:Boolean,default:!1},closeLabel:{type:String,default:"Close"},isSmall:{type:Boolean,default:!1},hideCloseButton:{type:Boolean,default:!1},isBodyless:{type:Boolean,default:!1}},data:function(){return{supressScrollEmitter:!1,container:null}},mounted:function(){var t=this;this.doDetach&&this.detach(),this.$emit("mounted"),setTimeout(function(){t.$refs.backdrop.classList.add("slds-backdrop_open")},1),setTimeout(function(){t.$refs.section.classList.add("slds-fade-in-open")},250)},beforeDestroy:function(){this.container&&(this.container.remove(),this.container=null)},methods:{detach:function(){this.container=document.createElement("div"),this.container.className="slds-scope "+this.$el.className,this.container.appendChild(this.$el),document.body.appendChild(this.container)},modalClass:function(){return{"slds-modal_small":this.isSmall,"slds-modal_large":this.isLarge}}}}},230:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("section",{ref:"section",staticClass:"slds-modal",class:t.modalClass(),attrs:{role:"dialog",tabindex:"-1"}},[a("div",{staticClass:"slds-modal__container"},[a("header",{staticClass:"slds-modal__header"},[t.hideCloseButton?t._e():a("button",{staticClass:"slds-button slds-button_icon slds-modal__close slds-button_icon-inverse",attrs:{title:t.closeLabel},on:{click:function(e){return t.$emit("close")}}},[a("span",{staticClass:"slds-button__icon slds-button__icon_large ma-icon ma-icon-close"}),t._v(" "),a("span",{staticClass:"slds-assistive-text"},[t._v(t._s(t.closeLabel))])]),t._v(" "),a("h2",{staticClass:"slds-text-heading_medium slds-hyphenate",attrs:{id:"modal-heading-01"}},[t._v(t._s(t.title))])]),t._v(" "),t.isBodyless?t._e():a("div",{ref:"content",staticClass:"slds-modal__content slds-p-around_medium slds-is-relative"},[t.isLoading?a("MASpinner"):t._e(),t._v(" "),t._t("content",[t._v("default content")])],2),t._v(" "),t.isLoading?t._e():a("footer",{staticClass:"slds-modal__footer",class:{"ma-footer-bodyless":t.isBodyless}},[t._t("footer",[t._v("default footer")])],2)])]),t._v(" "),a("div",{ref:"backdrop",staticClass:"slds-backdrop"})])},staticRenderFns:[]}},586:function(t,e,a){var o=a(13)(a(589),a(656),function(t){a(587)},"data-v-438e0c8b",null);t.exports=o.exports},587:function(t,e,a){var o=a(588);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(198)("4d9b83a3",o,!0)},588:function(t,e,a){(t.exports=a(197)(void 0)).push([t.i,".tooltip-content[data-v-438e0c8b]{height:100%}.infowindow-body_scroll-area[data-v-438e0c8b]{height:100%;overflow-y:auto}",""])},589:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(14),s=a.n(o),i=a(590),n=a.n(i),r=a(35),d=(a.n(r),a(62)),l=a.n(d),c=a(63),u=a.n(c);e.default={components:{TooltipTabs:n.a,SFDCContentRoot:function(){return s()({},l()(),{component:a.e(68).then(a.bind(null,600)),error:u.a})},FavoriteMarkersRoot:function(){return s()({},l()(),{component:a.e(51).then(a.bind(null,638)),error:u.a})},DataLayerRoot:function(){return s()({},l()(),{component:a.e(72).then(a.bind(null,641)),error:u.a})},MyPositionRoot:function(){return s()({},l()(),{component:a.e(71).then(a.bind(null,644)),error:u.a})},ArcGISRoot:function(){return s()({},l()(),{component:a.e(74).then(a.bind(null,647)),error:u.a})},POIRoot:function(){return s()({},l()(),{component:a.e(18).then(a.bind(null,650)),error:u.a})},Click2CreateRoot:function(){return s()({},l()(),{component:a.e(18).then(a.bind(null,653)),error:u.a})}},data:function(){return{tabId:"details"}},computed:s()({},Object(r.mapGetters)("tooltip",{tooltip__markerType:"markerType"})),methods:{updateTooltipBody:function(t){this.tabId=t}}}},590:function(t,e,a){var o=a(13)(a(593),a(599),function(t){a(591)},null,null);t.exports=o.exports},591:function(t,e,a){var o=a(592);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(198)("2c482d04",o,!0)},592:function(t,e,a){(t.exports=a(197)(void 0)).push([t.i,".ma-button-group .action-sheet-wrapper button{margin:1px 0;border-radius:0 4px 4px 0!important;border-left-width:0!important}.tooltip-scope .action-sheet-wrapper .slds-grid{border:1px solid silver;height:34px;padding-left:10px;border-left:0;border-color:#dddbda;background-color:#fff;color:#54698d;text-align:center;border-radius:0 4px 4px 0}",""])},593:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(67),s=a.n(o),i=a(14),n=a.n(i),r=a(594),d=a.n(r),l=a(218),c=a.n(l),u=a(35),p=(a.n(u),window.getProperty);e.default={components:{TooltipExtraTabs:d.a,ActionSheet:c.a},data:function(){return{tabs:[],extraTabs:[],showExtraTabs:!1,activeTab:"details",sharedTabTemplates:{details:{label:this.$Labels.MA_DETAILS,id:"details",icon:"ma-icon-list"}}}},computed:n()({},Object(u.mapGetters)("tooltip",{tooltip__queryMetaData:"queryMetaData",tooltip__markerType:"markerType",tooltip__record:"record"}),{selectedTab:function(){return[this.activeTab]},hideChatterOverride:function(){return p(window.MASystem||{},"Organization.hideChatterTab",!1)||!1},supportsChatter:function(){return p(this.tooltip__queryMetaData,"options.supportsChatter",!1)||!1},showRelatedList:function(){var t=!1;return p(this.tooltip__queryMetaData,"options.relatedListCount",!1)>0&&(t=!0),t},showWeather:function(){return p(window,"userSettings.ShowWeather",!1)||!1}}),created:function(){this.buildTabs()},methods:{buildTabs:function(){var t=[];"waypoint-marker"===this.tooltip__markerType?t=this.buildWaypointTabs():"favorite-marker"===this.tooltip__markerType?t=this.buildFavoriteTabs():"sfdc-marker"===this.tooltip__markerType?t=this.buildSFDCTabs():"data-layer"===this.tooltip__markerType?t=this.buildDataLayerTabs():"my-position"===this.tooltip__markerType?t=this.buildMyPositionTabs():"arcGIS-marker"===this.tooltip__markerType?t=this.buildArcTabs():t.push(this.sharedTabTemplates.details),t.length>2?(this.tabs=t.splice(0,2),this.showExtraTabs=!0,this.extraTabs=t):this.tabs=t},updateTab:function(t){this.activeTab=t,this.$emit("show-tab-info",t)},showExtendTabInfo:function(t){this.updateTab(t.id)},buildSFDCTabs:function(){var t=[];t.push(this.sharedTabTemplates.details),!this.hideChatterOverride&&this.supportsChatter&&t.push({label:this.$Labels.MA_Chatter,id:"chatter",icon:"ma-icon-chat"}),this.showRelatedList&&t.push({label:this.$Labels.MA_RELATED_LIST,id:"relatedList",icon:"ma-icon-related-list"}),this.showWeather&&t.push({label:this.$Labels.MA_Weather,id:"weather",icon:"ma-icon-new-custom60"}),this.tooltip__record.isRouteMarker&&t.push({label:this.$Labels.MA_Notes,id:"notes",icon:"ma-icon-note"});var e=this.getLiveTabs();return[].concat(t,s()(e))},getLiveTabs:function(){var t=this.tooltip__queryMetaData.layerType,e=[];return"Live"===(void 0===t?"":t)&&e.push({label:this.$Labels.MA_LIVE,id:"live",icon:"ma-icon-live"}),e},buildWaypointTabs:function(){var t=[];return t.push(this.sharedTabTemplates.details),t.push({label:this.$Labels.MA_Notes,id:"notes",icon:"ma-icon-note"}),t},buildFavoriteTabs:function(){var t=[];return t.push(this.sharedTabTemplates.details),t},buildMyPositionTabs:function(){var t=[];return t.push(this.sharedTabTemplates.details),t},buildArcTabs:function(){var t=[];return t.push(this.sharedTabTemplates.details),t},buildDataLayerTabs:function(){var t=[],e=this.tooltip__record.data,a=(void 0===e?{}:e).popup,o=void 0===a?{}:a;t.push({label:"Header",icon:"ma-icon-side_list",id:"header"});var s=o.tabs,i=void 0===s?[]:s;return this.updateTab("header"),i.forEach(function(e){t.push({label:e.tab_label,icon:"ma-icon-side_list",id:e.tab_id})}),t}}}},594:function(t,e,a){var o=a(13)(a(597),a(598),function(t){a(595)},null,null);t.exports=o.exports},595:function(t,e,a){var o=a(596);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(198)("14d3a354",o,!0)},596:function(t,e,a){(t.exports=a(197)(void 0)).push([t.i,".slds-card{position:relative;padding:0;background:#fff;border:1px solid #dddbda;border-radius:.25rem;background-clip:padding-box;box-shadow:0 2px 2px 0 rgba(0,0,0,.1)}article .icon-wrapper{height:30px;width:30px;background-color:#3083d3}article .icon-wrapper .ma-icon{line-height:36px;font-size:20px;color:#fff;vertical-align:middle;text-align:center}",""])},597:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(217),s=a.n(o);e.default={components:{MAModal:s.a},props:{tabs:{type:Array,required:!0}},data:function(){return{styleObject:{position:"relative",padding:0,background:"#fff",border:"1px solid #dddbda","border-radius":".25rem","background-clip":"padding-box","box-shadow":"0 2px 2px 0 rgba(0,0,0,.1)"}}},created:function(){},methods:{close:function(){this.$emit("close-extra-tabs")},performAction:function(t){this.$emit("handle-tab-action",t.id),this.close()}}}},598:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("MAModal",{attrs:{doDetach:!0,title:"MapAnything"},on:{close:t.close}},[a("div",{attrs:{slot:"content"},slot:"content"},t._l(t.tabs,function(e,o){return a("article",{key:o,staticClass:"slds-card",style:t.styleObject,on:{click:function(a){return t.performAction(e)}}},[a("div",{staticClass:"slds-card__header slds-grid"},[a("header",{staticClass:"slds-media slds-media_center slds-has-flexi-truncate"},[a("div",{staticClass:"slds-media__figure"},[a("span",{staticClass:"slds-icon_container icon-wrapper"},[a("div",{staticClass:"ma-icon",class:e.icon})])]),t._v(" "),a("div",{staticClass:"slds-media__body"},[a("h2",{staticClass:"slds-card__header-title"},[a("div",{staticClass:"slds-card__header-link slds-truncate"},[a("span",[t._v(t._s(t._f("decode")(e.label)))])])])])])])])}),0),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("button",{staticClass:"slds-button slds-button_neutral",on:{click:t.close}},[t._v(t._s(t.$Labels.MA_Cancel))])])])},staticRenderFns:[]}},599:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ma-tab-link-group ma-button-group tooltip-scope"},[t._l(t.tabs,function(e,o){return a("button",{key:o,staticClass:"ma-button ma-tab-link",class:{active:t.activeTab===e.id},attrs:{"data-tab":"markerInfoTab"+o},on:{click:function(a){return t.updateTab(e.id)}}},[t._v("\n        "+t._s(t._f("decode")(e.label))+"\n        "),"more"===e.id?a("i",{staticClass:"ma-icon align-right ma-icon-more",staticStyle:{display:"block",float:"right",margin:"3px 0 0 8px"}}):t._e()])}),t._v(" "),t.showExtraTabs?a("ActionSheet",{attrs:{doDetach:!0,options:t.extraTabs,buttonText:t.$Labels.MA_More,selectedItems:t.selectedTab,buttonIcon:"ma-icon-threedots-vertical"},on:{select:t.showExtendTabInfo,hide:function(e){t.showExtraTabs=!1}}}):t._e()],2)},staticRenderFns:[]}},656:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tooltip-content slds-grid slds-grid_vertical momentum-scrolling-y slds-scrollable"},[a("TooltipTabs",{on:{"show-tab-info":t.updateTooltipBody}}),t._v(" "),a("div",{staticClass:"slds-col infowindow-body_scroll-area slds-scrollable"},["sfdc-marker"===t.tooltip__markerType||"waypoint-marker"===t.tooltip__markerType?a("SFDCContentRoot",{attrs:{tabId:t.tabId},on:{"update:tabId":function(e){t.tabId=e},"update:tab-id":function(e){t.tabId=e}}}):"favorite-marker"===t.tooltip__markerType?a("FavoriteMarkersRoot",{attrs:{tabId:t.tabId},on:{"update:tabId":function(e){t.tabId=e},"update:tab-id":function(e){t.tabId=e}}}):"data-layer"===t.tooltip__markerType?a("DataLayerRoot",{attrs:{tabId:t.tabId},on:{"update:tabId":function(e){t.tabId=e},"update:tab-id":function(e){t.tabId=e}}}):"my-position"===t.tooltip__markerType?a("MyPositionRoot",{attrs:{tabId:t.tabId},on:{"update:tabId":function(e){t.tabId=e},"update:tab-id":function(e){t.tabId=e}}}):"arcGIS-marker"===t.tooltip__markerType?a("ArcGISRoot",{attrs:{tabId:t.tabId},on:{"update:tabId":function(e){t.tabId=e},"update:tab-id":function(e){t.tabId=e}}}):"poi"===t.tooltip__markerType?a("POIRoot",{attrs:{tabId:t.tabId},on:{"update:tabId":function(e){t.tabId=e},"update:tab-id":function(e){t.tabId=e}}}):"c2c-marker"===t.tooltip__markerType?a("Click2CreateRoot",{attrs:{tabId:t.tabId},on:{"update:tabId":function(e){t.tabId=e},"update:tab-id":function(e){t.tabId=e}}}):a("div",{staticClass:"ma-tab-content-group"},[a("div",{staticClass:"ma-tab-content active"})])],1)],1)},staticRenderFns:[]}}});