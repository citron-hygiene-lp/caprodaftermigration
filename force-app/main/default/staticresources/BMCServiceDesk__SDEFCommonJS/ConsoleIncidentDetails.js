var isAccountByClient=true;var isfromSavefunction=false;var clientIdForCI="";var serviceRequestDetailWindow;var resultSetCategory;var isCustomLookup=false;var catNameVal="";var catIdVal="";var userNameVal="";var userIdVal="";var ownerElVal="";var staffElVal="";var ownerIdVal="";var staffIdVal="";var urgencyFieldVal="";var impactFieldVal="";var statusFieldVal="";var queueIdVal="";var queueNameVal="";function checkIsAccountByTemplate(){if(isByTemplate){isAccountByClient=false}isByTemplate=false}function setClientValueOnBlur(b,a,c){if(clientData.length==1&&""!=c.value.trim()){clientfields(clientData[0].Id,clientData[0].Name,clientData[0].BMCServiceDesk__Account_ID__c,clientData[0].BMCServiceDesk__Account_Name__c)}else{disableDiv(b,a,c)}clientData=[]}function openSRDetailpopUp(){if(selectedReqDefTitle!=null&&typeof(selectedReqDefTitle)!="undefined"&&selectedReqDefTitle!=""&&incidentId!=""){var b=parseInt((screen.availWidth/2)-(670/2));var a=parseInt((screen.availHeight/2)-(550/2));var c=window.location.hash=!!window.MSInputMethodContext;if(Ext.isIE||c){serviceRequestDetailWindow=window.open("/apex/ServiceRequestDetail?incidentId="+incidentId+"&isLookup=true&reqDefId="+selectedReqDefID+"&reqDtlsId="+requestDetailID+"&clientId="+clientId+"&standardLayout=true&isConsole=true&RequestDetailCloneId="+requestDetailCloneId+"&inctype="+inctype,"ServiceRequestDetails","height=550,width=1070,toolbar=no,directories=no,status=no,left= "+b+",top="+a+",menubar=no,scrollbars=yes,resizable=yes ,modal=yes")}else{if(window.showModalDialog&&navigator.platform.toLowerCase().indexOf("mac")<=-1&&isfromSavefunction){serviceRequestDetailWindow=window.showModalDialog("/apex/ServiceRequestDetail?incidentId="+incidentId+"&isLookup=true&reqDefId="+selectedReqDefID+"&reqDtlsId="+requestDetailID+"&clientId="+clientId+"&standardLayout=true&isConsole=true&RequestDetailCloneId="+requestDetailCloneId+"&inctype="+inctype,this,"resizable:yes;dialogWidth:1070px;dialogHeight:550px,left= "+b+",top="+a)}else{serviceRequestDetailWindow=window.open("/apex/ServiceRequestDetail?incidentId="+incidentId+"&isLookup=true&reqDefId="+selectedReqDefID+"&reqDtlsId="+requestDetailID+"&clientId="+clientId+"&standardLayout=true&isConsole=true&RequestDetailCloneId="+requestDetailCloneId+"&isRfconsole="+isRfconsole+"&inctype="+inctype,"ServiceRequestDetails","height=550,width=1070,toolbar=no,directories=no,status=no,left= "+b+",top="+a+",menubar=no,scrollbars=yes,resizable=yes ,modal=yes")}}}if(serviceRequestDetailWindow!=null&&typeof(serviceRequestDetailWindow)!="undefined"&&(!serviceRequestDetailWindow||serviceRequestDetailWindow.closed)){if((requestDetail==null||typeof(requestDetail)=="undefined"||requestDetail=="")&&(requestDetailID==null||typeof(requestDetailID)=="undefined"||requestDetailID=="")&&(selectedReqDefTitle!=null&&typeof(selectedReqDefTitle)!="undefined"&&selectedReqDefTitle!="")){}}}function getFilterClause(a,d){var b="";if(a.indexOf("FKServiceOffering__c")!=-1){var c="{!incident.FKBusinessService__c}";if(buisnessServiceId!=null&&buisnessServiceId!=""&&buisnessServiceId!="undefined"&&buisnessServiceId!="000000000000000"){if(isFlattenedCmdb){b="active_be¬flat_offering_bsid¬"+buisnessServiceId}else{b="active_be_parent¬offering_bsid¬"+buisnessServiceId}}else{if(isFlattenedCmdb){b="active_be¬flat_offering"}else{b="active_be_parent¬offering"}}}else{if(a.indexOf("FKBusinessService__c")!=-1){if(!d&&isFlattenedCmdb){b="active_be¬flat_service"}else{b="active_be_parent¬service"}}}return b}function getBSFilterId(a,d){var b="";if(a.indexOf("FKServiceOffering__c")!=-1){var c="{!incident.FKBusinessService__c}";if(buisnessServiceId!=null&&buisnessServiceId!=""&&buisnessServiceId!="undefined"&&buisnessServiceId!="000000000000000"){if(isFlattenedCmdb){b="active_be&addlFilterId=flat_offering_bsid&param1="+buisnessServiceId}else{b="active_be_parent&addlFilterId=offering_bsid&param1="+buisnessServiceId}}else{if(isFlattenedCmdb){b="active_be&addlFilterId=flat_offering"}else{b="active_be_parent&addlFilterId=offering"}}}else{if(a.indexOf("FKBusinessService__c")!=-1){if(!d&&isFlattenedCmdb){b="active_be&addlFilterId=flat_service"}else{b="active_be_parent&addlFilterId=service"}}}return b}function clearText(){var a=document.getElementById("{!$Component.thpage.theForm.thePAgeBlock.sec3}");a.scrollIntoView(true)}function doSave(){save()}var isSRDSelected=false;function doOnLoadActivity(){window.parent.Ext.getCmp("LockRecord").getEl().on("click",function(){window.parent.getRecordLockedValue("recordLock")});window.parent.Ext.getCmp("UnlockRecord").getEl().on("click",function(){window.parent.getRecordLockedValue("clearLock");window.parent.closebar()});var b=window.location.href;if(status=="true"&&(selectedReqDefTitle!=null&&typeof(selectedReqDefTitle)!="undefined"&&selectedReqDefTitle!="")&&(requestDetailID==null||typeof(requestDetailID)=="undefined"||requestDetailID=="")){isSRDSelected=true}if(b.indexOf("isNew")!=-1){window.parent.afterSaveSucceed();if(window.parent.isServiceCloudConsole!="true"&&window.parent.isRFConsoleDetailForm&&window.parent.parent!=undefined&&window.parent.parent.MultiPageLayout&&window.parent.parent.MultiPageLayout.isEnabledForIN){refreshLayoutSelectPicklist()}isfromSavefunction=true;if(!isSRDSelected&&!window.parent.fromQuickclose&&!window.parent.isResponded){ShowInlineSaveMessage()}window.parent.isResponded=false;window.parent.fromQuickclose=false;handleElemEvent()}showDueDatePopup();if(isSRDSelected&&(!IncidentSegregationEnabled||(IncidentSegregationEnabled&&inctype!="ServiceRequest"))){isfromSavefunction=true;openSRDetailpopUp();isfromSavefunction=false}isRTFEnabled=window.parent.RTFEnabledPage();checkAccountField();window.parent.templateId="";if(enableQueueAndUserAssignment&&ownerName&&connectionUserName&&ownerName==connectionUserName){var c=document.getElementById(staffId);var e=document.getElementById("owner_Name");var d=document.getElementById(ownerOpenById);var a=document.getElementById(ownerId);if(e&&(e.value==""||e.value==null)){e.value=connectionUserName;if(d&&a&&d.value==a.value&&c&&(c.value==""||c.value==null)){c.value=connectionUserName}}}}function checkAccountField(){var a=document.getElementById(getHTMLInputID(orgNamespace+"FKAccount__c"));if(a!=undefined&&a!="undefined"&&a!=""){if(a.value!=""&&a.value!=null&&a.value!="undefined"){isAccountByClient=false}}}function loadIncidentDetails(a){window.parent.loadIncidentDetail(a);if(!isfromSavefunction){window.parent.isNeedToRefreshIncList=true;window.parent.refreshIncidentListTimeOut()}isfromSavefunction=false}function openLookupPopUP(){var b="active_standard";var e=document.getElementById(getHTMLInputID(orgNamespace+"FKClient__c")).value;if(e!=null){e=e.trim();e=encodeURIComponent(e);if(e!=""&&e.length<2){alert(searchErrorMsg);return}}var f=orgNamespace.length;if(fieldApiName.indexOf(orgNamespace)!=-1){fieldApiName=fieldApiName.substring(f,fieldApiName.length)}fieldApiName=fieldApiName.toLowerCase();var d=getFilterQueryString(fieldApiName);if(!isAccountByClient&&typeof(accountFieldId)!="undefined"&&accountFieldId!=null&&accountFieldId!=""&&accountFieldId!="000000000000000"){b="active_standard&addlFilterId=acc_id&param1="+accountFieldId}var c=parseInt((screen.availWidth/2)-(1000/2));var a=parseInt((screen.availHeight/2)-(600/2));window.open("/apex/"+orgNamespace+"SearchAndLink?txt=customLookup&parentName=Incident__c&childName=User&isCreateNewClientAllowed="+createClient+"&isNewIncident="+isNewIncident+"&filterId="+b+"&searchLookUpStr="+e+"&idValstr="+d,"lookup","status = 1,height =600, width = 1000,left= "+c+",top="+a+", resizable = yes,scrollbars=yes")}var selectedClientName="";var isFromLookup=false;function startWaitMsgBar(){window.parent.startWaitMsgBar()}function stopWaitMsgBar(){window.parent.stopWaitMsgBar()}function ChangeStateOfParentButtons(b){if(incidentId==null||incidentId==""){var a=false;if(categoryLookupId!=""){window.parent.selectedCategoryId=categoryLookupId;a=true}else{window.parent.selectedCategoryId=""}if(userId!=""&&document.getElementById(userId)!=null&&document.getElementById(userId)!="undefined"&&document.getElementById(userId).value!=""){window.parent.selectedUserId=document.getElementById(userId).value;a=true}else{window.parent.selectedUserId=""}if(a){if(window.parent.Ext.getCmp("knowledgeSearchButtonId")!=undefined&&window.parent.Ext.getCmp("knowledgeSearchButtonId")!=null){window.parent.Ext.getCmp("knowledgeSearchButtonId").setDisabled(!b)}if(window.parent.Ext.getCmp("createKnowledgeArticleButtonId")!=undefined&&window.parent.Ext.getCmp("createKnowledgeArticleButtonId")!=null){window.parent.Ext.getCmp("createKnowledgeArticleButtonId").setDisabled(!b)}if(window.parent.Ext.getCmp("CiExplorerButtonId")!=undefined&&window.parent.Ext.getCmp("CiExplorerButtonId")!=null){window.parent.Ext.getCmp("CiExplorerButtonId").setDisabled(!b)}if(window.parent.Ext.getCmp("CiActionsButtonId")!=undefined&&window.parent.Ext.getCmp("CiActionsButtonId")!=null){window.parent.Ext.getCmp("CiActionsButtonId").setDisabled(!b)}var c=window.parent.document.getElementById("CiActionsButtonId_slider");if(c!=undefined&&c!=null){c.disabled=!b}if(window.parent.Ext.getCmp("suggestedTemplatesButtonId")!=undefined&&window.parent.Ext.getCmp("suggestedTemplatesButtonId")!=null){window.parent.Ext.getCmp("suggestedTemplatesButtonId").setDisabled(!b)}if(window.parent.Ext.getCmp("SuggestwedOwnersButtonId")!=undefined&&window.parent.Ext.getCmp("SuggestwedOwnersButtonId")!=null){window.parent.Ext.getCmp("SuggestwedOwnersButtonId").setDisabled(!b)}if(window.parent.Ext.getCmp("ServiceTargetsButtonId")!=undefined&&window.parent.Ext.getCmp("ServiceTargetsButtonId")!=null){window.parent.Ext.getCmp("ServiceTargetsButtonId").setDisabled(!b)}if(window.parent.Ext.getCmp("IncidentManifestButtonId")!=undefined&&window.parent.Ext.getCmp("IncidentManifestButtonId")!=null){window.parent.Ext.getCmp("IncidentManifestButtonId").setDisabled(!b)}}if(window.parent.Ext.getCmp("IncidentMatchingButtonId")!=undefined&&window.parent.Ext.getCmp("IncidentMatchingButtonId")!=null){window.parent.Ext.getCmp("IncidentMatchingButtonId").setDisabled(!a)}}}function hasScrollbar(a){var b=a.scrollHeight>a.clientHeight;return b}var templateApplied=false;function setMenuForIncidentMatching(){var b=false;var c=document.getElementById(userName);var a=document.getElementById(userId);if(userName!=""&&c!=null&&c!="undefined"&&c.value==""){if(a!=null&&a!="undefined"){a.value=""}window.parent.selectedUserId="";b=true}else{if(userId!=""&&a!=null&&a!="undefined"&&a.value==""){window.parent.selectedUserId="";b=true}}if(categoryLookupId==""){window.parent.selectedCategoryId=""}else{if(document.getElementById(categoryName).value==""){document.getElementById(categoryLookupId).value="";window.parent.selectedCategoryId=""}else{if(document.getElementById(categoryLookupId).value==""){window.parent.selectedCategoryId=""}else{b=false}}}if(window.parent.selectedCategoryId==""&&window.parent.selectedUserId==""){if(window.parent.Ext.getCmp("IncidentMatchingButtonId")!=undefined&&window.parent.Ext.getCmp("IncidentMatchingButtonId")!=null){window.parent.Ext.getCmp("IncidentMatchingButtonId").setDisabled(true)}}else{if(window.parent.Ext.getCmp("IncidentMatchingButtonId")!=undefined&&window.parent.Ext.getCmp("IncidentMatchingButtonId")!=null){window.parent.Ext.getCmp("IncidentMatchingButtonId").setDisabled(false)}}}function createNewClient(){var d=parseInt((screen.availWidth/2)-(670/2));var c=parseInt((screen.availHeight/2)-(550/2));var e=ClientPage+getFormAssignment("ClientPage");var b=window.open(e+"?standardLayout=true&title=Client&wid=2&isPopUp=true&isFromConsole=true","popUpWindow","width=1100,height=700,scrollbars=yes,resizable=yes,status=1,left= "+d+",top="+c)}function getFormAssignment(a){var b=formAssignment.toLowerCase().indexOf(a.toLowerCase());if(b!=-1){return"Custom"}else{return""}}function applyTemplateToRecord(e,b,c){startWaitMsgBar();var a;try{if(window.parent.parent.MultiPageLayout&&window.parent.parent.MultiPageLayout.isEnabledForIN){a=false}}catch(d){a=true}if(!a&&isServiceRequest=="false"&&inctype!="ServiceRequest"){Visualforce.remoting.Manager.invokeAction(_RemotingActions.fetchTemplateDetails,e,null,function(g,k){if(k.status){var j="";var f="";var i=true;if(g){j=g.formLayoutId;f=g.formLayoutName}if(j){if(window.parent.parent.MultiPageLayout&&window.parent.parent.MultiPageLayout.isEnabled&&window.parent.parent.MultiPageLayout.ConsoleLayoutAccessValidation){i=window.parent.parent.hasLayoutAccess("Incident__c",j,"",false)}if(!i){var h;if(f==""){h=LayoutInsufficientAccessGeneric}else{h=LayoutInsufficientAccess+" "+f}showMsg(h);if(typeof(c)!="undefined"&&c=="TYPEAHEAD"){clearTemplateValue()}stopWaitMsgBar()}else{if(j==window.parent.formLayoutId){j=""}populateTemplateLookup(e,b);applyTemplateNow(e,j)}}else{populateTemplateLookup(e,b);applyTemplateNow(e,j)}}},{escape:false})}else{populateTemplateLookup(e,b);applyTemplateNow(e,"")}}function applyTemplateNow(c,a){isTemplateSelectedFromTypeAhead=false;isRTFEnabled=window.parent.RTFEnabledPage();if(a){var b=document.getElementById("layoutSelectID");layoutOnChangeHandler(a,"IN",b,c)}else{if(isRTFEnabled!=true){retainStaticFieldValueBeforeTemplateApply();applyTemplate(c,clientName,userIdVal,ownerElVal,staffElVal,staffIdVal,ownerIdVal,urgencyFieldVal,impactFieldVal,statusFieldVal,queueIdVal,queueNameVal)}else{stopWaitMsgBar()}}}function populateTemplateLookup(c,a){if(c&&a){var b=lookupFilterIDMap[orgNamespace+"FKTemplate__c"];if(b){lookupPick2("{!$Component.theForm}",b+"_lkid",b,c,a,false)}}}function clearTemplateValue(){var b=lookupFilterIDMap[orgNamespace+"FKTemplate__c"];if(b){var a=document.getElementById(b);if(a){document.getElementById(b).value="";if(isEnableDynamicFields&&typeof(reEvaluateDynamicFieldsConditions)!="undefined"){reEvaluateDynamicFieldsConditions(fieldVisiblityMap)}}}}function retainStaticFieldValueBeforeTemplateApply(){var a=document.getElementById(getHTMLInputID(orgNamespace+"FKClient__c"));if(a!=null&&a!=undefined){clientName=a.value}if(document.getElementById(userId)!=null&&document.getElementById(userId)!=undefined){userIdVal=document.getElementById(userId).value}if(document.getElementById("owner_Name")!=null&&document.getElementById("owner_Name")!=undefined){ownerElVal=document.getElementById("owner_Name").value}if(document.getElementById(staffId)!=null&&document.getElementById(staffId)!=undefined){staffElVal=document.getElementById(staffId).value}if(document.getElementById(ownerOpenById)!=null&&document.getElementById(ownerOpenById)!=undefined){staffIdVal=document.getElementById(ownerOpenById).value}if(document.getElementById(ownerId)!=null&&document.getElementById(ownerId)!=undefined){ownerIdVal=document.getElementById(ownerId).value}if(document.getElementById(urgencyLookupId)!=null&&document.getElementById(urgencyLookupId)!=undefined){urgencyFieldVal=document.getElementById(urgencyLookupId).value}if(document.getElementById(impactLookupId)!=null&&document.getElementById(impactLookupId)!=undefined){impactFieldVal=document.getElementById(impactLookupId).value}if(document.getElementById(statusLookupId)!=null&&document.getElementById(statusLookupId)!=undefined){statusFieldVal=document.getElementById(statusLookupId).value}if(document.getElementById(queue_Id)&&!queueId){queueId=document.getElementById(queue_Id).value}if(document.getElementById("owner_Name")&&!queueName){queueName=document.getElementById("owner_Name").value}queueIdVal=queueId;queueNameVal=queueName}function setUrgencyValue(c){var b=document.getElementById(getHTMLInputID(orgNamespace+"FKUrgency__c"));if(document.getElementById(c).options[document.getElementById(c).selectedIndex].text==window.parent._ServerLabels.None1){document.getElementById(urgencyLookupId).value="";b.value="";document.getElementById(b.id+"_lkid").value="";document.getElementById(b.id+"_lkold").value=""}else{document.getElementById(urgencyLookupId).value=document.getElementById(c).value;var a=document.getElementById(c).options[document.getElementById(c).selectedIndex].text;b.value=a;document.getElementById(b.id+"_lkid").value=document.getElementById(c).value;document.getElementById(b.id+"_lkold").value=a}}function setImpactValue(c){var a=document.getElementById(getHTMLInputID(orgNamespace+"FKImpact__c"));if(document.getElementById(c).options[document.getElementById(c).selectedIndex].text==window.parent._ServerLabels.None1){document.getElementById(impactLookupId).value="";a.value="";document.getElementById(a.id+"_lkid").value="";document.getElementById(a.id+"_lkold").value=""}else{document.getElementById(impactLookupId).value=document.getElementById(c).value;var b=document.getElementById(c).options[document.getElementById(c).selectedIndex].text;a.value=b;document.getElementById(a.id+"_lkid").value=document.getElementById(c).value;document.getElementById(a.id+"_lkold").value=b}}function setStatusValue(c){document.getElementById(statusLookupId).value=document.getElementById(c).value;var b=document.getElementById(getHTMLInputID(orgNamespace+"FKStatus__c"));var a=document.getElementById(c).options[document.getElementById(c).selectedIndex].text;b.value=a;document.getElementById(b.id+"_lkid").value=document.getElementById(c).value;document.getElementById(b.id+"_lkold").value=a}var isTemplateSelectedFromTypeAhead=false;var addEvent=(function(){if(document.addEventListener){return function(a,c,b){a.addEventListener(c,b,false)}}else{return function(a,c,b){a.attachEvent("on"+c,b)}}}());function resetCalPosition(){setTimeout(function(){var a=document.getElementById("datePicker");if(a!=null&&a!="undefined"){if(a.offsetTop!=null&&a.offsetTop!="undefined"){if(a.offsetTop<0){a.style.top=0+"px"}}}},100);return false}function setCatgoryId(){var a=document.getElementById(categoryName).value;if(a==null||a==""){document.getElementById(categoryLookupId).value=null}}function createFilterFieldMap(){for(var a=0;a<filterStr.length;a++){var b=new Object();b.key=filterStr[a].key;b.value=filterStr[a].value;b.filterId=filterStr[a].filterId;filterFieldsMap[filterStr[a].key]=b}}function getHTMLInputID(b){var a=lookupFilterIDMap[b];if((typeof(a)!="undefined"&&a!=null&&a.length!=0)){return a}b=b.replace(orgNamespace,"");a=lookupFilterIDMap[b];return a}function getHTMLInputValue(h,e){var g=getHTMLInputID(orgNamespace+h);var f="";var i;if(e!=null&&e!=""&&e.indexOf("reference")!=-1){if(h=="FKStatus__c"){i=statusLookupId}else{if(h=="FKImpact__c"){i=impactLookupId}else{if(h=="FKUrgency__c"){i=urgencyLookupId}else{i=g+"_lkid"}}}}else{if(h=="FKCategory__c"||h=="fkcategory__c"){i=categoryName}else{i=g}}var c=document.getElementById(i);if(c!=null&&c!=undefined){if(c.value==undefined||c.value=="undefined"){var d=readOnlyFieldMap[i];if(d){f=d}}else{f=c.value}}else{c=document.getElementById(g);if(c!=null&&c!=undefined){if(c.value==undefined||c.value=="undefined"){var d=readOnlyFieldMap[g];if(d){f=d}}else{f=c.value}}}if(e!=null&&e.indexOf("boolean")!=-1&&f.trim()==""){f="null"}else{if(e.indexOf("datetime")!=-1){var a=new Date();try{a=DateUtil.getDateTimeFromUserLocale(f)}catch(b){a=new Date(f)}f=getSOQLDateTimeString(a)}else{if(e.indexOf("date")!=-1){var a=new Date();try{a=DateUtil.getDateFromUserLocale(f)}catch(b){a=new Date(f)}f=getSOQLDateString(a)}else{if(e.indexOf("number")!=-1||e.indexOf("currency")!=-1||e.indexOf("percent")!=-1){var a;if(f==null||f=="null"||f.trim()==""){f=0}}}}}return f}function getSOQLDateTimeString(a){return a.getUTCFullYear()+"-"+pad(a.getUTCMonth()+1)+"-"+pad(a.getUTCDate())+"T"+pad(a.getUTCHours())+":"+pad(a.getUTCMinutes())+":"+pad(a.getUTCSeconds())+"Z"}function getSOQLDateString(a){return a.getFullYear()+"-"+pad(a.getMonth()+1)+"-"+pad(a.getDate())}function pad(a){return a<10?"0"+a:a}function getFilterQueryString(b){var h="";var d=filterFieldsMap[b];if(d!=null&&d!=undefined){h=d.filterId+"«";var g=d.value;if(g!=null&&g!=""){var e=g.split(PE);for(var c=0;c<e.length;c++){if(e[c]!=null&&e[c]!=""){var f=e[c].split(NONPRINT);h=h+f[0]+NONPRINT+getHTMLInputValue(f[1],f[2])+"«"}}}}var a=h.length;if(a>0){h=h.substring(0,a-1)}h=encodeURIComponent(h);return h}if(window.parent.assignRFLookupFilter!=undefined){window.parent.assignRFLookupFilter(getFilterQueryString)}function setFieldAPIName(a){fieldApiName=a}function createRDinputIcon(){try{var c=getHTMLInputID(orgNamespace+"FKRequestDefinition__c");if(c!=null&&c!="undefined"&&c!=""){var a=document.getElementById(c);if(a!=null&&a!="undefined"&&a!=""){var f=null;if(a.parentNode!=null&&a.parentNode!="undefined"&&a.parentNode!=""){f=a.parentNode}}if(f!=null&&f!="undefined"&&f!=""){if(IncidentSegregationEnabled&&inctype=="ServiceRequest"){var e=document.createElement("a");e.id="srDtlsIconId";if(incidentId!=""&&selectedReqDefID!=""){e.className="rf-sr-collapse rfdplIconFontSize d-icon-angle_up_square";e.disabled=false}else{e.className="rf-sr-disable  rfdplIconFontSize  d-icon-angle_down_square";e.disabled=true}e.onclick=function(){var h=document.getElementById("srdFrameId");if(!e.disabled&&e.className=="rf-sr-expand rfdplIconFontSize d-icon-angle_down_square"){h.style.display="block";h.scrollIntoView(true);e.className="rf-sr-collapse rfdplIconFontSize d-icon-angle_up_square"}else{if(e.className!="rf-sr-disable  rfdplIconFontSize  d-icon-angle_down_square"){var h=document.getElementById("srdFrameId");h.style.display="none";e.className="rf-sr-expand rfdplIconFontSize d-icon-angle_down_square"}}};e.title=requestDetailTitle;f.appendChild(e)}else{var b=document.createElement("SPAN");b.type="button";b.className="d-icon-ellipsis_circle_o rfDPLNextIcon rfdplIconFontSize";var g;b.onclick=function(){openSRDetailpopUp()};b.title=requestDetailTitle;f.appendChild(b)}}}}catch(d){}}function disableRDLookUP(d){if(d.toLowerCase()=="true"){var c=getHTMLInputID(orgNamespace+"FKRequestDefinition__c");if(c!=null&&c!="undefined"&&c!=""){var b=document.getElementById(c);b.disabled=true;var a=b.nextSibling.nextSibling;a.onclick=function(){return false};a.style.display="none"}}}if(parent.isServiceCloudConsole=="true"){var clientHeight=document.body.clientHeight;if(parent.Ext.isIE){clientHeight+=120}else{clientHeight+=100}parent.resizeServiceCloudConsole(clientHeight)}function setIsNeedToRefreshRelatedList(a){window.parent.isNeedToRefreshRelatedList=a}function saveSR(){if(IncidentSegregationEnabled&&incidentId!=""&&inctype=="ServiceRequest"&&window.parent.saveSR!=undefined){window.parent.saveSR()}}function loadSRDetailForm(a){selectedReqDefID=a;var f=clientId==""?clientIdForDefaultValue?clientIdForDefaultValue:"":clientId;if(IncidentSegregationEnabled&&inctype=="ServiceRequest"){startWaitMsgBar();var c=document.getElementById("srdFrameDiv");c.style.display="block";var i=document.getElementById("srdFrameId");i.style.display="block";i.src="/apex/ServiceRequestDetail?incidentId="+incidentId+"&isLookup=true&reqDefId="+selectedReqDefID+"&reqDtlsId="+requestDetailID+"&clientId="+f+"&standardLayout=true&isConsole=true&inctype="+inctype+"&fromConsoleSR=true&isEdit="+isEditSR+"&Idd="+incidentId;var b=document.getElementById("srdFrameLink");if(!b){var d=document.getElementById("topmenu");var g=document.createElement("span");g.style.display="inline-block";var e=document.createElement("span");e.appendChild(document.createTextNode("|"));d.appendChild(e);var h=document.createElement("a");h.setAttribute("href","#srdFrameDiv");h.setAttribute("id","srdFrameLink");h.setAttribute("class","toplink");h.appendChild(document.createTextNode(srdDetailsLink));g.appendChild(h);d.appendChild(g)}}}function setReqDefId(a){selectedReqDefID=a;var b=document.getElementById("srDtlsIconId");if(IncidentSegregationEnabled&&b){loadSRDetailForm(a);b.disabled=false;b.className="rf-sr-collapse rfdplIconFontSize d-icon-angle_up_square"}}function checkSmartSuggestionHandler(a){if(currentConsole=="Incident"){if(checkForListeners(orgNamespace+a)&&showSmartSuggestions){smartSuggestionsHandler()}}}function smartSuggestionsHandler(){var b=false;var a=document.getElementById("drawer");if(doGetCounts()){getcounts(fieldListeners)}else{if(drawerIsExpanded){hidePrePanel();SelectedPanel="";suggestionspanel.isNewData={};collapseSuggestion()}disableAllIcons();if(a){a.setAttribute("style","cursor:default")}}}function doGetCounts(){var g=false;for(var j in fieldListeners){if(j==orgNamespace+"RF_FKLayout__c"||j=="formLayoutId"){g=true;continue}if(j!=orgNamespace+"FKCategory__c_Name"){fieldListeners[j]=""}else{if(!fieldListeners[orgNamespace+"FKCategory__c"]){fieldListeners[j]=""}}var e=lookupFilterIDMap[j];var b=document.getElementById(e);if(e!=undefined&&b!=undefined&&b!=null){if(lookupFilterTypeMap[j]=="reference"){h=b.value+"";if(document.getElementById(e+"_lkid")&&h!=""){valueId=document.getElementById(e+"_lkid").value;if(valueId!=""&&Number(valueId)!=0){fieldListeners[j]=valueId;if(j==orgNamespace+"FKCategory__c"&&(h.length>1||window.parent.isCJKChar(h))){fieldListeners[j+"_Name"]=h}g=true}}}else{if(lookupFilterTypeMap[j]=="boolean"){if(b.value==undefined||b.value=="undefined"){var c=(b.childNodes[0].title);h=c=="Checked"}else{h=b.checked}fieldListeners[j]=h;g=true}else{if(lookupFilterTypeMap[j]=="date"||lookupFilterTypeMap[j]=="datetime"){if(b.value==undefined||b.value=="undefined"){h=b.innerText+""}else{h=b.value+""}if(h!=null&&h!="null"&&h.trim()!=""){fieldListeners[j]=h;g=true}}else{if(lookupFilterTypeMap[j]=="phone"){if(b.value==undefined||b.value=="undefined"){h=b.innerText+""}else{h=b.value+""}if(h!=""){fieldListeners[j]=h;g=true}}else{if(lookupFilterTypeMap[j]=="multipicklist"){var h="";var f=document.getElementById(e);if(typeof(f.options)!="undefined"){for(var d=0;d<f.options.length;d++){var a=f[d];if(a.selected){if(d==0){h=a.value}else{h=h+";"+a.value}}}}if(h!=""){fieldListeners[j]=h;g=true}}else{if(b.value==undefined||b.value=="undefined"){h=b.innerText+"";if(lookupFilterTypeMap[j]=="currency"||lookupFilterTypeMap[j]=="percent"){h=h.replace(/[^0-9-.]/g,"")}}else{h=b.value+""}if(h!=""){fieldListeners[j]=h;g=true}}}}}}}}fieldListeners.IncidentId=incidentId;e=lookupFilterIDMap[orgNamespace+"incidentDescription__c"];if(document.getElementById(e)){description=document.getElementById(e).value+"";if(description.length>500){description=description.substr(0,500)}if(description.length>1||window.parent.isCJKChar(description)){g=true;fieldListeners[orgNamespace+"incidentDescription__c"]=description}}return g}function templatesHandler(){if(showSmartSuggestions){getcounts(fieldListeners);isByTemplate=false}}function checkForListeners(a){return a in fieldListeners&&(status!="false"||isNewIncident=="true")&&isServiceRequest!="true"}function refreshDrawer(){if(!showSmartSuggestions){if(document.getElementById("formoutputpanel")){document.getElementById("formoutputpanel").style.height="100%"}}else{suggestionWaitMsg=new Ext.LoadMask(document.getElementById("suggestionscontent"),{msgCls:"loadingtextcls",useMsg:false});if(messageStr!=null&&messageStr==saveSuccess){window.parent.linkArticleIds="";window.parent.textArticleIds=""}if(window.parent.parent.SuggestionsMetaData==undefined){getMetaData()}else{showSuggestionWaitMsg();createSSdrawer();afterDrawerRender()}}}function showMsg(c){isErrorMessage=true;isPageMessage=false;var a=document.getElementById("messageSpace");var b=document.getElementById("formoutputpanel");if(typeof a!="undefined"&&a){a.className="message_space_off"}if(typeof b!="undefined"&&b){b.scrollTop=0}showPageMsg(c)}function clearMsgs(){var b=document.getElementById("jsscripterrorId");var a=document.getElementById("messageSpace");if(typeof b!="undefined"&&b){b.style.display="none"}if(typeof a!="undefined"&&a){a.className="message_space_on"}}function refreshLayoutSelectPicklist(){try{if(window.parent.parent.MultiPageLayout&&window.parent.parent.MultiPageLayout.isEdit&&!window.parent.parent.MultiPageLayout.isEdit.IN&&window.parent.previousFormLayoutId!=""){var b=document.getElementById("layoutSelectID");if(b){b.setAttribute("disabled","disabled")}}}catch(a){}}function disableEnableCognitiveIcon(){var b=document.getElementById(lookupFilterIDMap[orgNamespace+"incidentDescription__c"]);if(typeof(b)!="undefined"&&b!=null){var a=document.getElementById("rfCongnitiveIconId");if(typeof(a)!="undefined"&&a!=null){var c=b.value;if(typeof(c)!="undefined"&&c!=null&&c==""){a.setAttribute("Style","pointer-events:none; opacity:0.6")}else{if(typeof(c)!="undefined"&&c!=null&&c!=""){a.setAttribute("Style","")}}}}};