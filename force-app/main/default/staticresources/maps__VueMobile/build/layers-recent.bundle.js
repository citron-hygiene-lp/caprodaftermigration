(globalThis.webpackChunkmaps_desktop=globalThis.webpackChunkmaps_desktop||[]).push([[5684],{4173:(e,t,a)=>{e.exports=a.p+"images/db7d9ca69c5dbfe3c77d602857a98939.svg"},4922:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});var s=a(5908),l=a(5511);const r={components:{MobileToggle:a(4549).Z},props:{layerData:{type:Object,required:!0}},data:()=>({}),computed:{...(0,s.mapGetters)("layers",{layers__getPlottedLayerById:"getPlottedLayerById"}),isPlotted:{get(){return this.layers__getPlottedLayerById(this.layerData.id).length>0},set(){this.toggleLayer()}},defaultAction(){return this.layerData.defaultAction},qid(){return this.layerData.qid},id(){return this.layerData.id},subType(){let e=this.layerData.baseObjectLabel;const t=this.layerData.type;return"datalayer"===t?e=this.$Labels.MA_Data_Layer:"favorite"===t&&(e=this.$Labels.MA_Favorite),"N/A"===e?"":e}},created(){this.processExtraPlotOptions()},methods:{...(0,s.mapMutations)("layers",{layer__updatesavedLoadingToggle:"updatesavedLoadingToggle"}),...(0,s.mapActions)("layers",{layers__getFolderData:"getFolderData"}),layerActionsClickHandler(){if(this.$bus.$emit("hide-search"),"open-folder"===this.defaultAction)this.layer__updatesavedLoadingToggle(!0),this.layers__getFolderData(this.layerData.id).catch((e=>{console.warn(e)})).finally((()=>{this.layer__updatesavedLoadingToggle(!1)}));else if(this.isPlotted){const e=`#ACTIVE_${this.id} .layer-nest-click-area`;document.querySelector(e).click()}else{const e=l.Z.getLayerActionFunction(this.layerData.type,this.defaultAction);if("javascript"===e.type)e.fn(this.layerData);else{const t=e.fn;this.$bus.$emit(t,this.layerData,(()=>{}))}}},processExtraPlotOptions(){if("marker"===this.layerData.type){this.defaultAction.indexOf("visible")>-1&&(this.layerData.visibleAreaOnly=!0);const e={clusters:"Cluster",markers:"Markers",scatter:"Scatter",heatmap:"Heatmap"},t=["clusters","markers","scatter","heatmap"].filter((e=>-1!==this.defaultAction.indexOf(e)));let a="Default";t.length>0&&(a=e[t[0]],this.layerData.renderAs=[a])}},toggleLayer(){if(this.isPlotted){const e=this.layers__getPlottedLayerById(this.layerData.id)||[];if(e.length>0){const t=e[0],{qid:a=""}=t;this.$bus.$emit("remove-layer",a)}else window.MAToastMessages.showWarning({message:"Unable to remove layer",subMessage:`Please remove the layer from the ${this.$Labels.MA_PLOT_ON_MAP} tab`,timeOut:1e4,closeButton:!0})}else this.layerActionsClickHandler();window.userSettings.recallMobileSaveState&&window.setMobileState()}}},i=(0,a(1900).Z)(r,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{ref:"layerRow",staticClass:"MAFolderTemplate"},[s("div",e._b({staticClass:"layer-item slds-grid ma-folder-item qidLocation",attrs:{nodetype:e.layerData.nodetype,type:e.layerData.type}},"div",{"data-id":e.layerData.id,"perm-create":e.layerData.create,"perm-delete":e.layerData.delete,qid:e.layerData.qid,"perm-export":e.layerData.export,"perm-modify":e.layerData.modify,"perm-read":e.layerData.read,"perm-setpermissions":e.layerData.setpermissions},!1),["folder"!==e.layerData.type?s("div",{staticClass:"slds-p-around_medium slds-grid slds-grid_vertical-align-center"},[s("MobileToggle",{model:{value:e.isPlotted,callback:function(t){e.isPlotted=t},expression:"isPlotted"}})],1):e._e(),e._v(" "),s("div",{staticClass:"layer-nest-click-area layer-item_clickable-area slds-col slds-grid slds-p-left_medium",attrs:{action:e.defaultAction},on:{click:e.layerActionsClickHandler}},["arcgisonline"===e.layerData.type?s("div",{staticClass:"layer-item_icon slds-grid slds-grid_vertical-align-center slds-align-middle slds-p-right_medium"},[s("img",{staticClass:"arcGISQueryImage",attrs:{width:"24",height:"24",src:a(4173)}})]):s("div",{staticClass:"layer-item_icon slds-grid slds-grid_vertical-align-center slds-p-right_medium ma-icon ma-icon-",attrs:{type:e.layerData.type}}),e._v(" "),s("div",{staticClass:"layer-item_text slds-col slds-align-middle slds-p-vertical_small"},[s("div",{staticClass:"ma-item-name-title basicinfo-name slds-truncate"},[e._v(e._s(e._f("decode")(e.layerData.name)))]),e._v(" "),"folder"!==e.layerData.type?s("div",{staticClass:"layer-item_subtext ma-item-name-subtitle basicinfo-type slds-truncate"},[e._v("\n                    "+e._s(e._f("decode")(e.subType))+"\n                ")]):e._e()]),e._v(" "),e._m(0)])])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"slds-p-around_medium slds-grid slds-grid_align-end slds-grid_vertical-align-center"},[t("span",{staticClass:"layer-item_chevron ma-icon ma-icon-chevronright"})])}],!1,null,"5e3c8f0e",null).exports},3016:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>d});var s=a(675),l=a(5908),r=a(4922);const i={components:{MASpinner:s.Z,LayerRow:r.Z},data:()=>({plotOnLoad:[],isLoading:!1}),computed:{...(0,l.mapGetters)("layers",{layers__recentLayers:"recentLayers",layers__plotOnLoadLayer:"plotOnLoadLayer"})},created(){this.$bus.$on("load-recents-layers",this.layers__getRecentLayers)},mounted(){this.layers__getRecentLayers()},methods:{...(0,l.mapMutations)("layers",{layers__udpateRecentLayers:"udpateRecentLayers",layers__udpatePlotOnLoadLayers:"udpatePlotOnLoadLayers"}),...(0,l.mapActions)("layers",{layers__getRecentLayers:"getRecentLayers"})}},d=(0,a(1900).Z)(i,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"tabLayersRecent"}},[a("div",{staticClass:"ma-folder-content-wrap momentum-scrolling-y slds-scrollable"},[a("MASpinner",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}]}),e._v(" "),a("div",{staticClass:"ma-list",attrs:{id:"recentLayersList"}},e._l(e.layers__recentLayers,(function(e){return a("LayerRow",{key:e.qid,ref:"layer-"+e.qid,refInFor:!0,attrs:{layerData:e}})})),1),e._v(" "),a("div",{staticClass:"pol-wrapper"},[a("div",{staticClass:"ma-section-title"},[e._v(e._s(e._f("decode")(e.$Labels.MA_PLOT_ON_APP_STARTUP)))]),e._v(" "),a("div",{staticClass:"ma-list",attrs:{id:"plotOnStartupList"}},[0===e.layers__plotOnLoadLayer.length?a("div",{staticClass:"emptyList"},[e._v("\n                    "+e._s(e.$Labels.mobileLayers_No_Plot_On_Load_Items)+"\n                ")]):e._e(),e._v(" "),e._l(e.layers__plotOnLoadLayer,(function(e){return a("LayerRow",{key:e.qid,ref:"layer-"+e.qid,refInFor:!0,attrs:{layerData:e}})}))],2)])],1)])}),[],!1,null,null,null).exports}}]);