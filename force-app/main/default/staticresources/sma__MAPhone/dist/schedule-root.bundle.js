webpackJsonp([53],{519:function(e,d,t){var a=t(13)(t(522),t(571),function(e){t(520)},"data-v-3d188487",null);e.exports=a.exports},520:function(e,d,t){var a=t(521);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t(198)("6854db0a",a,!0)},521:function(e,d,t){(e.exports=t(197)(void 0)).push([e.i,".ma-icon[data-v-3d188487]{display:flex;justify-content:center;align-items:center}.slds-card__header[data-v-3d188487]{padding-right:.75rem}.event-has-error .slds-card[data-v-3d188487]{border-color:#ffb75d}.slds-button .ma-icon[data-v-3d188487]{font-size:20px}.slds-notify_container--inline[data-v-3d188487]{position:relative;border-radius:.25rem;overflow:hidden}.slds-notify_container--inline h2[data-v-3d188487]{line-height:1.25;text-align:left}.slds-notify_container--inline h2 .ma-icon[data-v-3d188487]{font-size:20px}@media screen and (max-width:769px){#scheduleWrap[data-v-3d188487]{height:calc(100% - 55px)}}#scheduleWrap .schedule-wrapper[data-v-3d188487]{height:100%}#scheduleWrap .schedule-wrapper .schedule-content[data-v-3d188487]{flex:1;overflow:auto;height:100%;background:#f3f2f2}#scheduleWrap .schedule-wrapper .slds-card[data-v-3d188487]{box-shadow:none}#scheduleWrap .schedule-wrapper .slds-card .account-name[data-v-3d188487]{overflow:hidden;text-overflow:ellipsis}#scheduleWrap .schedule-wrapper .slds-card .account-name span[data-v-3d188487]{font-size:1.25rem}#scheduleWrap .schedule-wrapper .slds-card.start-location .location-icon .ma-icon[data-v-3d188487]{font-size:20px;color:#fff;background-color:#4bca84;padding:.25rem;border-radius:.25rem}#scheduleWrap .schedule-wrapper .drive-time-container .slds-box[data-v-3d188487]{border-radius:0 0 .25rem .25rem;border:none;padding:.5rem;background-color:#d8d6d5}#scheduleWrap .schedule-wrapper .drive-time-container .slds-box .ma-icon[data-v-3d188487]{font-size:16px;color:#706e6b}",""])},522:function(e,d,t){"use strict";Object.defineProperty(d,"__esModule",{value:!0});var a=t(14),s=t.n(a),r=t(35),i=(t.n(r),t(59)),o=t.n(i),n=t(62),c=t.n(n),l=t(39),u=t.n(l),h=t(41),p=t.n(h),v=t(63),f=t.n(v);d.default={components:{ScheduleHeader:function(){return s()({},c()(),{component:t.e(39).then(t.bind(null,523)),error:f.a})},ScheduleBody:function(){return s()({},c()(),{component:t.e(22).then(t.bind(null,533)),error:f.a})},ScheduleFooter:function(){return s()({},c()(),{component:t.e(54).then(t.bind(null,561)),error:f.a})},MASpinner:o.a},data:function(){return{}},computed:s()({},Object(r.mapState)("schedule",{schedule__isInitialized:"isInitialized"}),Object(r.mapGetters)("schedule",{schedule__isLoading:"isLoading",schedule__queue:"queue"})),created:function(){this.$bus.$on("remove-schedule-route",this.schedule__removeRoute),this.$bus.$on("add-to-schedule",this.addItemsToQueue),this.schedule__updateScheduleReady()},destroyed:function(){this.$bus.$off("remove-schedule-route"),this.$bus.$off("add-to-schedule")},methods:s()({},Object(r.mapMutations)("schedule",{schedule__updateQueue:"updateQueue",schedule__updateScheduleReady:"updateScheduleReady"}),Object(r.mapActions)("schedule",{schedule__removeRoute:"removeRoute"}),{getScheduleData:function(e){var d=e.saveEventsState,t=void 0!==d&&d,a=e.shiftId;this.$emit("getScheduleData",{saveEventsState:t,shiftId:a})},addItemsToQueue:function(e){var d=this;this.schedule__removeRoute();var t=[],a=!1,s={total:0,success:!1};e.forEach(function(e){if(150!==d.schedule__queue.length)if(void 0===e.isSupported||e.isSupported){e.LinkId__c&&(e.relationshipId=e.LinkId__c);var r=null!=e.lat&&null!=e.lng;e.spatial=r,e.showControls=!1,e.excludeFromRoute=!r,r||(e.className="non-spatial-cell"),e.id=u()(),e.Name=e.title,e.baseObjectId=e.baseObjectId;var i="";e.marker&&(i=e.marker.address||e.marker.FormattedAddress_MA),e.Address__c=i;var o=e.marker.prioritySettings,n=(o=void 0===o?{}:o).type,c=void 0===n?"":n,l=o.label,h=void 0===l?"":l,p=o.sfdcFieldType,v=void 0===p?"number":p,f=o.sfdcFieldValue,m=void 0===f?0:f;e.priorityValue=m,e.priority=0,e.priorityType=c,e.priorityLabel=h,e.priorityFieldType=v,e.guideWaypoint={hasWaypoint:!1,isLocked:!0},delete e.marker,delete e.supportsActivities,delete e.baseObjectLabel,d.schedule__queue.find(function(e,d){return e.isMALocation?e.placeId===d.placeId:e.relationshipId===d.relationshipId}.bind(d,e))||(d.schedule__updateQueue(e),s.success=!0,s.total+=1)}else t.push({title:e.marker.title,baseObjectLabel:e.baseObjectLabel});else a=!0}),t.length,s.success&&window.MAToastMessages.showSuccess({message:s.total+" record(s) added to Schedule"}),a&&p.a.showErrorMessage(82700,h.Type.SCHEDULE)}})}},571:function(e,d){e.exports={render:function(){var e=this.$createElement,d=this._self._c||e;return this.schedule__isInitialized?d("div",{staticClass:"schedule-wrapper slds-grid slds-grid_vertical"},[d("MASpinner",{directives:[{name:"show",rawName:"v-show",value:this.schedule__isLoading,expression:"schedule__isLoading"}]}),this._v(" "),d("ScheduleHeader",{on:{getScheduleData:this.getScheduleData}}),this._v(" "),d("ScheduleBody"),this._v(" "),d("ScheduleFooter")],1):this._e()},staticRenderFns:[]}}});