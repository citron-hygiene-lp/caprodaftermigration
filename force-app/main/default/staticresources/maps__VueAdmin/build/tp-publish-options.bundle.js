"use strict";(globalThis.webpackChunkmaps_desktop=globalThis.webpackChunkmaps_desktop||[]).push([[9403],{8533:(e,s,t)=>{t.r(s),t.d(s,{default:()=>i});var l=t(2766);const{MAToastMessages:a}=window,n={components:{Checkbox:l.XZ,Tooltip:l.u},data:()=>({approvalSettings:{enabled:!1,publishPDF:!1,pdfAOnly:!1,exportCSV:!1,csvAOnly:!1,publishCSV:!1,pubcsvAOnly:!1,publishETM:!1,etmAOnly:!1,publishMaps:!1,mapAOnly:!1,publishObj:!1,oAOnly:!1,publishFSL:!1,fslAOnly:!1},publishOptions:{pdfOn:!1,etmOn:!1,fslOn:!1,csvOn:!1,pubcsvOn:!1,mapsOn:!1,objOn:!1},fslDisabled:!1}),async created(){await this.getApprovalSettings(),await this.getPublishSettings(),await this.checkFSL()},methods:{async checkFSL(){const{success:e}=await this.$remote("maps.TPRemoteActions.CheckForFSL");e?this.fslDisabled=!1:(this.fslDisabled=!0,this.approvalSettings.publishFSL=!1,this.approvalSettings.fslAOnly=!1,this.approvalSettings.fslOn=!1)},async getPublishSettings(){try{const{data:e,message:s,success:t}=await this.$remote("maps.TPRemoteActions.GetPublishOptionsSettings");t?this.publishOptions=JSON.parse(e.maps__Value__c):console.error(s)}catch(e){console.error(e)}},async getApprovalSettings(){try{const{data:e,message:s,success:t}=await this.$remote("maps.TPRemoteActions.GetAlignmentApprovalSettings");if(t){const s={enabled:!1,publishFSL:!1,publishMaps:!1,publishETM:!1,publishObj:!1,publishPDF:!1,publishCSV:!1,exportCSV:!1,...e.maps__Value__c?JSON.parse(e.maps__Value__c):{}},t={fslAOnly:!1,mapAOnly:!1,pdfAOnly:!1,csvAOnly:!1,pubcsvAOnly:!1,oAOnly:!1,etmAOnly:!1,...e.maps__Value2__c?JSON.parse(e.maps__Value2__c):{}};this.approvalSettings={...s,...t};const l=Object.keys(e.maps__Value__c?JSON.parse(e.maps__Value__c):{});l.includes("publishCSV")&&!l.includes("exportCSV")&&(this.approvalSettings.exportCSV=this.approvalSettings.publishCSV,this.approvalSettings.publishCSV=!1)}else console.error(s)}catch(e){console.error(e)}},async saveApprovalSettings(){try{const e={enabled:this.approvalSettings.enabled,publishPDF:this.approvalSettings.publishPDF,publishMaps:this.approvalSettings.publishMaps,publishETM:this.approvalSettings.publishETM,publishFSL:this.approvalSettings.publishFSL,publishObj:this.approvalSettings.publishObj,publishCSV:this.approvalSettings.publishCSV,exportCSV:this.approvalSettings.exportCSV},s={pdfAOnly:!!this.approvalSettings.enabled&&this.approvalSettings.pdfAOnly,csvAOnly:!!this.approvalSettings.enabled&&this.approvalSettings.csvAOnly,pubcsvAOnly:!!this.approvalSettings.enabled&&this.approvalSettings.pubcsvAOnly,etmAOnly:!!this.approvalSettings.enabled&&this.approvalSettings.etmAOnly,oAOnly:!!this.approvalSettings.enabled&&this.approvalSettings.oAOnly,mapAOnly:!!this.approvalSettings.enabled&&this.approvalSettings.mapAOnly,fslAOnly:!!this.approvalSettings.enabled&&this.approvalSettings.fslAOnly},{data:t,message:l,success:n}=await this.$remote("maps.TPRemoteActions.SaveAlignmentApprovalSettings",[JSON.stringify(e),JSON.stringify(s)]);if(n){const e=JSON.parse(t.maps__Value__c),s=JSON.parse(t.maps__Value2__c);this.approvalSettings={...e,...s},a.showSuccess({position:"toast-top-right",message:"Publish Settings Saved",timeOut:8e3})}else console.error(l)}catch(e){console.error(e)}},async savePublishSettings(){try{const{data:e,message:s,success:t}=await this.$remote("maps.TPRemoteActions.SavePublishOptionsSettings",[JSON.stringify(this.publishOptions)]);t?(this.publishOptions=JSON.parse(e.maps__Value__c),a.showSuccess({position:"toast-top-right",message:"Publish Settings Saved",timeOut:8e3})):console.error(s)}catch(e){console.error(e)}}}},i=(0,t(1900).Z)(n,(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("div",{staticClass:"slds-grid slds-wrap slds-grid_vertical-align-end"},[t("div",{staticClass:"slds-p-top_large slds-grid slds-grid--vertical slds-m-right_small slds-col slds-size_1-of-1 slds-large-size_1-of-4"},[t("Checkbox",{attrs:{toggleBuffer:500,showStateLabels:"",slide:"",labels:{name:e.$Labels.Salesforce_Maps,stateOn:e.$Labels.MA_Enabled,stateOff:e.$Labels.MA_Disabled}},on:{changed:function(s){return e.savePublishSettings()}},model:{value:e.publishOptions.mapsOn,callback:function(s){e.$set(e.publishOptions,"mapsOn",s)},expression:"publishOptions.mapsOn"}}),e._v(" "),t("label",{staticClass:"slds-form-element__label slds-m-top_small"},[e._v(e._s(e.$Labels.TPSettings_User_Access))]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.approvalSettings.mapAOnly,expression:"approvalSettings.mapAOnly"}],staticClass:"slds-select",on:{change:[function(s){var t=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.approvalSettings,"mapAOnly",s.target.multiple?t:t[0])},function(s){return e.saveApprovalSettings()}]}},[t("option",{domProps:{value:!1}},[e._v(e._s(e.$Labels.TPSettings_All_Users))]),e._v(" "),e.approvalSettings.enabled?t("option",{domProps:{value:!0}},[e._v("\n                    "+e._s(e.$Labels.TPSettings_Approvers)+"\n                ")]):e._e()]),e._v(" "),e.approvalSettings.enabled?t("label",{staticClass:"slds-form-element__label slds-m-top_small"},[e._v("\n                "+e._s(e.$Labels.TPSettings_Require_Alignment_Approval)+"\n            ")]):e._e(),e._v(" "),e.approvalSettings.enabled?t("select",{directives:[{name:"model",rawName:"v-model",value:e.approvalSettings.publishMaps,expression:"approvalSettings.publishMaps"}],staticClass:"slds-select",on:{change:[function(s){var t=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.approvalSettings,"publishMaps",s.target.multiple?t:t[0])},function(s){return e.saveApprovalSettings()}]}},[t("option",{domProps:{value:!0}},[e._v(e._s(e.$Labels.MA_Yes))]),e._v(" "),t("option",{domProps:{value:!1}},[e._v(e._s(e.$Labels.MA_No))])]):e._e()],1),e._v(" "),t("div",{staticClass:"slds-p-top_large slds-grid slds-grid--vertical slds-m-right_small slds-col slds-size_1-of-1 slds-large-size_1-of-4"},[t("Checkbox",{attrs:{toggleBuffer:500,showStateLabels:"",slide:"",labels:{name:e.$Labels.TPSettings_Enterprise_Territory_Management,stateOn:e.$Labels.MA_Enabled,stateOff:e.$Labels.MA_Disabled}},on:{changed:function(s){return e.savePublishSettings()}},model:{value:e.publishOptions.etmOn,callback:function(s){e.$set(e.publishOptions,"etmOn",s)},expression:"publishOptions.etmOn"}}),e._v(" "),t("label",{staticClass:"slds-form-element__label slds-m-top_small"},[e._v(e._s(e.$Labels.TPSettings_User_Access))]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.approvalSettings.etmAOnly,expression:"approvalSettings.etmAOnly"}],staticClass:"slds-select",on:{change:[function(s){var t=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.approvalSettings,"etmAOnly",s.target.multiple?t:t[0])},function(s){return e.saveApprovalSettings()}]}},[t("option",{domProps:{value:!1}},[e._v(e._s(e.$Labels.TPSettings_All_Users))]),e._v(" "),e.approvalSettings.enabled?t("option",{domProps:{value:!0}},[e._v("\n                    "+e._s(e.$Labels.TPSettings_Approvers)+"\n                ")]):e._e()]),e._v(" "),e.approvalSettings.enabled?t("label",{staticClass:"slds-form-element__label slds-m-top_small"},[e._v("\n                "+e._s(e.$Labels.TPSettings_Require_Alignment_Approval)+"\n            ")]):e._e(),e._v(" "),e.approvalSettings.enabled?t("select",{directives:[{name:"model",rawName:"v-model",value:e.approvalSettings.publishETM,expression:"approvalSettings.publishETM"}],staticClass:"slds-select",on:{change:[function(s){var t=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.approvalSettings,"publishETM",s.target.multiple?t:t[0])},function(s){return e.saveApprovalSettings()}]}},[t("option",{domProps:{value:!0}},[e._v(e._s(e.$Labels.MA_Yes))]),e._v(" "),t("option",{domProps:{value:!1}},[e._v(e._s(e.$Labels.MA_No))])]):e._e()],1),e._v(" "),t("div",{staticClass:"slds-p-top_large slds-grid slds-grid--vertical slds-m-right_small slds-col slds-size_1-of-1 slds-large-size_1-of-4"},[t("div",{staticClass:"slds-grid"},[e.fslDisabled?t("div",{staticClass:"slds-form-element__icon"},[t("Tooltip",{attrs:{text:e.$Labels.TPSettings_Enable_Field_Service,assistiveText:e.$Labels.TPSettings_Enable_Field_Service}})],1):e._e(),e._v(" "),t("Checkbox",{attrs:{isDisabled:e.fslDisabled,toggleBuffer:500,showStateLabels:"",slide:"",helpText:e.$Labels.TPSettings_Enable_Field_Service,labels:{name:e.$Labels.TPSettings_Salesforce_Field_Service,stateOn:e.$Labels.MA_Enabled,stateOff:e.$Labels.MA_Disabled}},on:{changed:function(s){return e.savePublishSettings()}},model:{value:e.publishOptions.fslOn,callback:function(s){e.$set(e.publishOptions,"fslOn",s)},expression:"publishOptions.fslOn"}})],1),e._v(" "),t("label",{staticClass:"slds-form-element__label slds-m-top_small"},[e._v(e._s(e.$Labels.TPSettings_User_Access))]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.approvalSettings.fslAOnly,expression:"approvalSettings.fslAOnly"}],staticClass:"slds-select",attrs:{disabled:e.fslDisabled},on:{change:[function(s){var t=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.approvalSettings,"fslAOnly",s.target.multiple?t:t[0])},function(s){return e.saveApprovalSettings()}]}},[t("option",{domProps:{value:!1}},[e._v(e._s(e.$Labels.TPSettings_All_Users))]),e._v(" "),e.approvalSettings.enabled?t("option",{domProps:{value:!0}},[e._v("\n                    "+e._s(e.$Labels.TPSettings_Approvers)+"\n                ")]):e._e()]),e._v(" "),e.approvalSettings.enabled?t("label",{staticClass:"slds-form-element__label slds-m-top_small"},[e._v("\n                "+e._s(e.$Labels.TPSettings_Require_Alignment_Approval)+"\n            ")]):e._e(),e._v(" "),e.approvalSettings.enabled?t("select",{directives:[{name:"model",rawName:"v-model",value:e.approvalSettings.publishFSL,expression:"approvalSettings.publishFSL"}],staticClass:"slds-select",attrs:{disabled:e.fslDisabled},on:{change:[function(s){var t=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.approvalSettings,"publishFSL",s.target.multiple?t:t[0])},function(s){return e.saveApprovalSettings()}]}},[t("option",{domProps:{value:!0}},[e._v(e._s(e.$Labels.MA_Yes))]),e._v(" "),t("option",{domProps:{value:!1}},[e._v(e._s(e.$Labels.MA_No))])]):e._e()]),e._v(" "),t("div",{staticClass:"slds-p-top_large slds-grid slds-grid--vertical slds-m-right_small slds-col slds-size_1-of-1 slds-large-size_1-of-4"},[t("Checkbox",{attrs:{toggleBuffer:500,showStateLabels:"",slide:"",labels:{name:e.$Labels.TPSettings_Salesforce_Fields,stateOn:e.$Labels.MA_Enabled,stateOff:e.$Labels.MA_Disabled}},on:{changed:function(s){return e.savePublishSettings()}},model:{value:e.publishOptions.objOn,callback:function(s){e.$set(e.publishOptions,"objOn",s)},expression:"publishOptions.objOn"}}),e._v(" "),t("label",{staticClass:"slds-form-element__label slds-m-top_small"},[e._v(e._s(e.$Labels.TPSettings_User_Access))]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.approvalSettings.oAOnly,expression:"approvalSettings.oAOnly"}],staticClass:"slds-select",on:{change:[function(s){var t=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.approvalSettings,"oAOnly",s.target.multiple?t:t[0])},function(s){return e.saveApprovalSettings()}]}},[t("option",{domProps:{value:!1}},[e._v(e._s(e.$Labels.TPSettings_All_Users))]),e._v(" "),e.approvalSettings.enabled?t("option",{domProps:{value:!0}},[e._v("\n                    "+e._s(e.$Labels.TPSettings_Approvers)+"\n                ")]):e._e()]),e._v(" "),e.approvalSettings.enabled?t("label",{staticClass:"slds-form-element__label slds-m-top_small"},[e._v("\n                "+e._s(e.$Labels.TPSettings_Require_Alignment_Approval)+"\n            ")]):e._e(),e._v(" "),e.approvalSettings.enabled?t("select",{directives:[{name:"model",rawName:"v-model",value:e.approvalSettings.publishObj,expression:"approvalSettings.publishObj"}],staticClass:"slds-select",on:{change:[function(s){var t=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.approvalSettings,"publishObj",s.target.multiple?t:t[0])},function(s){return e.saveApprovalSettings()}]}},[t("option",{domProps:{value:!0}},[e._v(e._s(e.$Labels.MA_Yes))]),e._v(" "),t("option",{domProps:{value:!1}},[e._v(e._s(e.$Labels.MA_No))])]):e._e()],1),e._v(" "),t("div",{staticClass:"slds-p-top_large slds-grid slds-grid--vertical slds-m-right_small slds-col slds-size_1-of-1 slds-large-size_1-of-4"},[t("Checkbox",{attrs:{toggleBuffer:500,showStateLabels:"",slide:"",labels:{name:e.$Labels.MA_PDF,stateOn:e.$Labels.MA_Enabled,stateOff:e.$Labels.MA_Disabled}},on:{changed:function(s){return e.savePublishSettings()}},model:{value:e.publishOptions.pdfOn,callback:function(s){e.$set(e.publishOptions,"pdfOn",s)},expression:"publishOptions.pdfOn"}}),e._v(" "),t("label",{staticClass:"slds-form-element__label slds-m-top_small"},[e._v(e._s(e.$Labels.TPSettings_User_Access))]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.approvalSettings.pdfAOnly,expression:"approvalSettings.pdfAOnly"}],staticClass:"slds-select",on:{change:[function(s){var t=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.approvalSettings,"pdfAOnly",s.target.multiple?t:t[0])},function(s){return e.saveApprovalSettings()}]}},[t("option",{domProps:{value:!1}},[e._v(e._s(e.$Labels.TPSettings_All_Users))]),e._v(" "),e.approvalSettings.enabled?t("option",{domProps:{value:!0}},[e._v("\n                    "+e._s(e.$Labels.TPSettings_Approvers)+"\n                ")]):e._e()]),e._v(" "),e.approvalSettings.enabled?t("label",{staticClass:"slds-form-element__label slds-m-top_small"},[e._v("\n                "+e._s(e.$Labels.TPSettings_Require_Alignment_Approval)+"\n            ")]):e._e(),e._v(" "),e.approvalSettings.enabled?t("select",{directives:[{name:"model",rawName:"v-model",value:e.approvalSettings.publishPDF,expression:"approvalSettings.publishPDF"}],staticClass:"slds-select",on:{change:[function(s){var t=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.approvalSettings,"publishPDF",s.target.multiple?t:t[0])},function(s){return e.saveApprovalSettings()}]}},[t("option",{domProps:{value:!0}},[e._v(e._s(e.$Labels.MA_Yes))]),e._v(" "),t("option",{domProps:{value:!1}},[e._v(e._s(e.$Labels.MA_No))])]):e._e()],1),e._v(" "),t("div",{staticClass:"slds-p-top_large slds-grid slds-grid--vertical slds-m-right_small slds-col slds-size_1-of-1 slds-large-size_1-of-4"},[t("Checkbox",{attrs:{toggleBuffer:500,showStateLabels:"",slide:"",labels:{name:e.$Labels.MA_CSV_Export,stateOn:e.$Labels.MA_Enabled,stateOff:e.$Labels.MA_Disabled}},on:{changed:function(s){return e.savePublishSettings()}},model:{value:e.publishOptions.csvOn,callback:function(s){e.$set(e.publishOptions,"csvOn",s)},expression:"publishOptions.csvOn"}}),e._v(" "),t("label",{staticClass:"slds-form-element__label slds-m-top_small"},[e._v(e._s(e.$Labels.TPSettings_User_Access))]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.approvalSettings.csvAOnly,expression:"approvalSettings.csvAOnly"}],staticClass:"slds-select",on:{change:[function(s){var t=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.approvalSettings,"csvAOnly",s.target.multiple?t:t[0])},function(s){return e.saveApprovalSettings()}]}},[t("option",{domProps:{value:!1}},[e._v(e._s(e.$Labels.TPSettings_All_Users))]),e._v(" "),e.approvalSettings.enabled?t("option",{domProps:{value:!0}},[e._v("\n                    "+e._s(e.$Labels.TPSettings_Approvers)+"\n                ")]):e._e()]),e._v(" "),e.approvalSettings.enabled?t("label",{staticClass:"slds-form-element__label slds-m-top_small"},[e._v("\n                "+e._s(e.$Labels.TPSettings_Require_Alignment_Approval)+"\n            ")]):e._e(),e._v(" "),e.approvalSettings.enabled?t("select",{directives:[{name:"model",rawName:"v-model",value:e.approvalSettings.exportCSV,expression:"approvalSettings.exportCSV"}],staticClass:"slds-select",on:{change:[function(s){var t=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.approvalSettings,"exportCSV",s.target.multiple?t:t[0])},function(s){return e.saveApprovalSettings()}]}},[t("option",{domProps:{value:!0}},[e._v(e._s(e.$Labels.MA_Yes))]),e._v(" "),t("option",{domProps:{value:!1}},[e._v(e._s(e.$Labels.MA_No))])]):e._e()],1),e._v(" "),t("div",{staticClass:"slds-p-top_large slds-grid slds-grid--vertical slds-m-right_small slds-col slds-size_1-of-1 slds-large-size_1-of-4"},[t("Checkbox",{attrs:{toggleBuffer:500,showStateLabels:"",slide:"",labels:{name:e.$Labels.MA_Publish_To_CSV,stateOn:e.$Labels.MA_Enabled,stateOff:e.$Labels.MA_Disabled}},on:{changed:function(s){return e.savePublishSettings()}},model:{value:e.publishOptions.pubcsvOn,callback:function(s){e.$set(e.publishOptions,"pubcsvOn",s)},expression:"publishOptions.pubcsvOn"}}),e._v(" "),t("label",{staticClass:"slds-form-element__label slds-m-top_small"},[e._v(e._s(e.$Labels.TPSettings_User_Access))]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.approvalSettings.pubcsvAOnly,expression:"approvalSettings.pubcsvAOnly"}],staticClass:"slds-select",on:{change:[function(s){var t=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.approvalSettings,"pubcsvAOnly",s.target.multiple?t:t[0])},function(s){return e.saveApprovalSettings()}]}},[t("option",{domProps:{value:!1}},[e._v(e._s(e.$Labels.TPSettings_All_Users))]),e._v(" "),e.approvalSettings.enabled?t("option",{domProps:{value:!0}},[e._v("\n                    "+e._s(e.$Labels.TPSettings_Approvers)+"\n                ")]):e._e()]),e._v(" "),e.approvalSettings.enabled?t("label",{staticClass:"slds-form-element__label slds-m-top_small"},[e._v("\n                "+e._s(e.$Labels.TPSettings_Require_Alignment_Approval)+"\n            ")]):e._e(),e._v(" "),e.approvalSettings.enabled?t("select",{directives:[{name:"model",rawName:"v-model",value:e.approvalSettings.publishCSV,expression:"approvalSettings.publishCSV"}],staticClass:"slds-select",on:{change:[function(s){var t=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.approvalSettings,"publishCSV",s.target.multiple?t:t[0])},function(s){return e.saveApprovalSettings()}]}},[t("option",{domProps:{value:!0}},[e._v(e._s(e.$Labels.MA_Yes))]),e._v(" "),t("option",{domProps:{value:!1}},[e._v(e._s(e.$Labels.MA_No))])]):e._e()],1)])])}),[],!1,null,null,null).exports}}]);