"use strict";(globalThis.webpackChunkmaps_desktop=globalThis.webpackChunkmaps_desktop||[]).push([[2305],{2561:(e,t,i)=>{i.r(t),i.d(t,{default:()=>c});var l=i(5908);const s={components:{Picklist:i(2766).Gp},props:{fieldName:{type:String,required:!0},selectOptions:{type:Array,required:!0},record:{type:Object,required:!0}},computed:{...(0,l.mapState)({store__MAClick2CreateObj:"MAClick2CreateObj",store__fieldSetRecords:"fieldSetRecords"}),selectedPOIPicklist:{get(){return this.record.POIFieldSetAPIName},set(e){this.store__updateFieldSetRecordValue({id:this.record.RecordTypeId,updatedField:"POIFieldSetAPIName",updatedValue:e})}},selectedMyPositionPicklist:{get(){return this.record.MyPositionFieldSetAPIName},set(e){this.store__updateFieldSetRecordValue({id:this.record.RecordTypeId,updatedField:"MyPositionFieldSetAPIName",updatedValue:e})}},selectedMapClickPicklist:{get(){return this.record.MapClickFieldSetAPIName},set(e){this.store__updateFieldSetRecordValue({id:this.record.RecordTypeId,updatedField:"MapClickFieldSetAPIName",updatedValue:e})}},poiPicklistInvalid(){return!(!this.store__MAClick2CreateObj.POIEnabled__c||null!=this.selectedPOIPicklist)},myPositionPicklistInvalid(){return!(!this.store__MAClick2CreateObj.MyPositionEnabled__c||null!=this.selectedMyPositionPicklist)},mapClickPicklistInvalid(){return!(!this.store__MAClick2CreateObj.MapClickEnabled__c||null!=this.selectedMapClickPicklist)}},created(){this.$bus.$on("check-save-status",this.checkSaveStatus)},destroyed(){this.$bus.$off("check-save-status")},methods:{...(0,l.mapMutations)({store__updateFieldSetRecords:"updateFieldSetRecords",store__updateFieldSetRecordValue:"updateFieldSetRecordValue"}),checkSaveStatus(){this.poiPicklistInvalid||this.myPositionPicklistInvalid||this.mapClickPicklistInvalid?this.$bus.$emit("set-allow-save",!1):this.$bus.$emit("set-allow-save",!0)}}},c=(0,i(1900).Z)(s,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("tr",{staticClass:"myTable"},[i("td",[i("b",[e._v(e._s(e.fieldName))])]),e._v(" "),i("td",[i("Picklist",{attrs:{detach:!0,options:e.selectOptions,required:!0,isInvalid:e.poiPicklistInvalid,idKey:"value",titleKey:"label",filterable:""},on:{"selected-option":function(t){return e.checkSaveStatus()}},model:{value:e.selectedPOIPicklist,callback:function(t){e.selectedPOIPicklist=t},expression:"selectedPOIPicklist"}})],1),e._v(" "),i("td",[i("Picklist",{attrs:{required:!0,isInvalid:e.myPositionPicklistInvalid,detach:!1,options:e.selectOptions,idKey:"value",titleKey:"label",filterable:""},on:{"selected-option":function(t){return e.checkSaveStatus()}},model:{value:e.selectedMyPositionPicklist,callback:function(t){e.selectedMyPositionPicklist=t},expression:"selectedMyPositionPicklist"}})],1),e._v(" "),i("td",[i("Picklist",{attrs:{required:!0,isInvalid:e.mapClickPicklistInvalid,detach:!0,options:e.selectOptions,idKey:"value",titleKey:"label",filterable:""},on:{"selected-option":function(t){return e.checkSaveStatus()}},model:{value:e.selectedMapClickPicklist,callback:function(t){e.selectedMapClickPicklist=t},expression:"selectedMapClickPicklist"}})],1)])}),[],!1,null,null,null).exports}}]);