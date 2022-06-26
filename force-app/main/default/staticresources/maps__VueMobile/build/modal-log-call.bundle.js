"use strict";(globalThis.webpackChunkmaps_desktop=globalThis.webpackChunkmaps_desktop||[]).push([[2759],{1602:(e,s,t)=>{t.r(s),t.d(s,{default:()=>d});var a=t(675),l=t(4141),o=t(3294),i=t(8050);const r={props:{modalOptions:{type:Object,required:!0}},data:()=>({isLoading:!1,subject:"Call",comments:"",needsValidation:!1,actionHandler:"showpopup",fieldSet:null,fieldSetLoaded:!1,fieldSetHTML:"",hasError:!1,errors:0,errorMessages:[],success:0}),computed:{records(){const{records:e=[]}=this.modalOptions;return e},recordLength(){return this.records.length},cancelText(){let e=this.$Labels.MA_Close;return this.needsValidation&&(e=this.$Labels.MA_No),e}},created(){const{actionHandler:e="showPopup",fieldSet:s}=this.modalOptions;this.actionHandler=String(e).toLowerCase(),this.fieldSet=s,this.checkRecords()},methods:{checkRecords(){this.recordLength>1?this.needsValidation=!0:this.processOptions()},processOptions(){this.needsValidation=!1,"showpopup"===this.actionHandler?this.fieldSet&&this.getFieldSetHTML():(this.close(),this.openClassLogACall())},getFieldSetHTML(){this.isLoading=!0;const e=`${window.MA.resources.Click2Create}?sobject=Task&fieldset=${this.fieldSet}&platform=desktop`;this.$http.get(e).then((e=>{const{ok:s=!1,body:t=""}=e;if(s){this.fieldSetHTML=t;const e=document.querySelector("#LogACallModal .fieldSetHTML");this.setHTML(e,t)}else console.warn("Unable to get fieldSet info",e)})).catch((e=>{this.hasError=!0,console.warn(e)})).finally((()=>{this.fieldSetLoaded=!0,this.isLoading=!1}))},setHTML(e,s){e.innerHTML=s,Array.from(e.querySelectorAll("script")).forEach((e=>{const s=document.createElement("script");Array.from(e.attributes).forEach((e=>s.setAttribute(e.name,e.value))),s.appendChild(document.createTextNode(e.innerHTML)),e.parentNode.replaceChild(s,e)}))},openClassLogACall(){this.records.forEach((e=>{const s=e.Id,t=`${window.MA.resources.MapActions}?action=log_call&id=${s}`;window.open(t)})),this.close()},close(){window.MALayers.hideModal(),this.$emit("close")},convertFieldSetDataToSaveData(){let e="";if(this.fieldSet){const s=window.buildFieldSetValues(window.jQuery("#LogACallModal .fieldSetTable")).fields;s.TaskSubtype="Call",s.Status=s.Status?s.Status:"Completed",e=JSON.stringify(s)}else e=JSON.stringify({TaskSubtype:"Call",Status:"Completed",Subject:this.subject,Description:this.comments});return e},createBatchData(e){const s=[];let t=[];for(let a=0;a<this.records.length;a++){const l=this.records[a];t.push(l.Id),200===t.length&&(s.push({ajaxResource:"TooltipAJAXResources",action:"LogACallBatch",serializedRecordIds:JSON.stringify(t),callInfo:e}),t=[])}return t.length>0&&s.push({ajaxResource:"TooltipAJAXResources",action:"LogACallBatch",serializedRecordIds:JSON.stringify(t),callInfo:e}),s},saveForm(){this.isLoading=!0;const e=this.convertFieldSetDataToSaveData(),s=this.createBatchData(e),t=window.async.queue((async(e,s)=>{try{const t=await(0,i.wX)("maps.RemoteFunctions.processAJAXRequest",[e],{escape:!1,buffer:!1}),{success:a=!1,results:l=[]}=t;if(a)l.forEach((e=>{if(e.success)this.success++;else{const s=((e.errors||[])[0]||{}).message||"Unknown Error";this.errorMessages.push(s),this.errors++}}));else{let s=0;try{s=JSON.parse(e.serializedRecordIds).length}catch(e){s=0}this.errors+=s}s()}catch(t){let a=0;try{a=JSON.parse(e.serializedRecordIds).length}catch(e){a=0}this.errors+=a,s()}}));t.concurrency=3;for(let e=0;e<s.length;e++){const a=s[e];t.push(a)}t.drain=()=>{this.isLoading=!1;const e=`${this.success} successful, ${this.errors} failures`;this.errors>0&&this.success>0?window.MAToastMessages.showWarning({message:this.$Labels.ActionFramework_Log_a_Call,subMessage:e,timeOut:0,extendedTimeOut:0,closeButton:!0}):0===this.errors&&this.success>0?window.MAToastMessages.showSuccess({message:this.$Labels.ActionFramework_Log_a_Call,subMessage:e}):window.MAToastMessages.showError({message:this.$Labels.ActionFramework_Log_a_Call,subMessage:e,timeOut:0,extendedTimeOut:0,closeButton:!0}),this.close()}}}},n={components:{MASpinner:a.Z,MAModal:l.Z,MAInput:o.Z},mixins:[r]},d=(0,t(1900).Z)(n,(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("MAModal",{staticClass:"slds-modal-fullscreen-phone js-search-modal-wrapper",attrs:{id:"LogACallModal",title:e.$Labels.ActionFramework_Log_a_Call,closeLabel:e.$Labels.MA_Close},on:{close:e.close}},[t("div",{attrs:{slot:"content"},slot:"content"},[t("MASpinner",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}]}),e._v(" "),e.needsValidation?t("div",[t("div",{staticStyle:{"text-align":"center","line-height":"22px"}},[t("div",{staticStyle:{"font-weight":"bold",color:"#d4504c"}},[e._v("Multiple records selected.")]),e._v(" "),t("div",[e._v("Any information entered in the next step will be used for "+e._s(e.recordLength)+" records.")]),e._v(" "),t("div",[e._v("Do you wish to continue?")])])]):t("div",[e.fieldSet?t("div",{staticClass:"logacallform"},[t("div",[t("div",{staticClass:"slds-text-body_regular slds-m-bottom_medium"},[e._v("Fill in the fields below")]),e._v(" "),t("div",{staticClass:"fieldSetHTML"}),e._v(" "),t("ul",{staticClass:"logacallform-fieldset-errors"})])]):t("div",[t("MAInput",{staticClass:"slds-form-element",attrs:{isRequired:!0,label:e.$Labels.MA_Subject,type:"text"},model:{value:e.subject,callback:function(s){e.subject=s},expression:"subject"}}),e._v(" "),t("MAInput",{staticClass:"slds-form-element",attrs:{isRequired:!0,useTextArea:!0,label:e.$Labels.MA_Comments,type:"text"},model:{value:e.comments,callback:function(s){e.comments=s},expression:"comments"}})],1)])],1),e._v(" "),t("div",{attrs:{slot:"footer"},slot:"footer"},[t("div",{staticClass:"float-left"},[t("button",{directives:[{name:"show",rawName:"v-show",value:!e.needsValidation,expression:"!needsValidation"}],staticClass:"slds-button slds-button_neutral",attrs:{disabled:e.isLoading},on:{click:e.openClassLogACall}},[e._v("\n                Salesforce\n                "),t("span",{staticClass:"slds-button__icon slds-button__icon_right ma-icon ma-icon-new-window"})])]),e._v(" "),t("div",{staticClass:"float-right"},[t("button",{staticClass:"slds-button slds-button_neutral",attrs:{disabled:e.isLoading},on:{click:e.close}},[e._v("\n                "+e._s(e.cancelText)+"\n            ")]),e._v(" "),t("button",{directives:[{name:"show",rawName:"v-show",value:e.needsValidation,expression:"needsValidation"}],staticClass:"slds-button slds-button_brand",attrs:{disabled:e.isLoading},on:{click:e.processOptions}},[e._v("\n                "+e._s(e.$Labels.MA_Yes)+"\n            ")]),e._v(" "),t("button",{directives:[{name:"show",rawName:"v-show",value:!e.needsValidation,expression:"!needsValidation"}],staticClass:"slds-button slds-button_brand",attrs:{disabled:e.isLoading},on:{click:e.saveForm}},[e._v("\n                "+e._s(e.$Labels.MA_Finish)+"\n            ")])])])])}),[],!1,null,null,null).exports},3294:(e,s,t)=>{t.d(s,{Z:()=>l});const a={name:"MAInput",mixins:[t(3826).Z],props:{value:{type:[String,Number],required:!0},isRequired:{type:Boolean,default:!1},useTextArea:{type:Boolean,default:!1},disableResize:{type:Boolean,default:!1},label:{type:String,default:""},errors:{type:Array,default:()=>[]},placeholder:{type:String,default:""},type:{type:String,default:"text"},isInvalid:{type:Boolean,default:!1},isDisabled:{type:Boolean,default:!1},hasFocus:{type:Boolean,default:!1},requiredLabel:{type:String,default:"Required"}},computed:{showLabel(){return this.label},hasErrors(){return this.errors&&this.errors.length},listeners(){return{...this.$listeners,input:e=>this.$emit("input",e.target.value)}}},watch:{hasFocus(e){e&&this.focus()}},mounted(){this.hasFocus&&this.focus()},methods:{focus(){this.$refs.input.focus(),this.$refs.input.select()}}},l=(0,t(1900).Z)(a,(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"slds-form-element",class:{"slds-has-error":e.isInvalid}},[e.showLabel?t("label",{staticClass:"slds-form-element__label"},[e.isRequired?t("abbr",{staticClass:"slds-required",attrs:{title:e.requiredLabel}},[e._v("*")]):e._e(),e._v("\n        "+e._s(e.decodeHtml(e.label))+"\n        "),e._t("label")],2):e._e(),e._v(" "),t("div",{staticClass:"slds-form-element__control",staticStyle:{position:"relative"}},[e.useTextArea?t("textarea",e._g({staticClass:"slds-textarea",attrs:{disabled:e.isDisabled,placeholder:e.placeholder},domProps:{value:e.decodeHtml(e.value)}},e.listeners)):t("input",e._g({ref:"input",staticClass:"slds-input",attrs:{type:e.type,disabled:e.isDisabled,placeholder:e.placeholder},domProps:{value:e.decodeHtml(e.value)},on:{blur:function(s){return e.$emit("update:hasFocus",!1)}}},e.listeners)),e._v(" "),e._t("extendInput")],2),e._v(" "),e.isInvalid?t("div",{staticClass:"slds-form-element__help"},[e._t("errors")],2):e._e()])}),[],!1,null,"71386de2",null).exports}}]);