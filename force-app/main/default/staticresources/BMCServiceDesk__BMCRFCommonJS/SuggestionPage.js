var suggestedStaffId;var suggestedQueueId;var suggestedStaffName;var suggestedQueueName;var STAFF="STAFF";var OWNER="OWNER";var QUEUE="QUEUE";var ownerTypeValue="";var searchFld="";var lastSelectedQueueRow;var selectedOwnerValue;var seletedRowOfQTable=(function(){var a;return{getSelectedIndex:function(){return a},setSelectedIndex:function(b){a=b}}})();function getSelectedRowIndex(){var b=document.getElementById(queuePanelId).getElementsByTagName("TR");for(var a=0;a<b.length;a++){b[a].rowIndex=a;b[a].onclick=function(c){seletedRowOfQTable.setSelectedIndex(c.currentTarget.rowIndex)}}}window.onload=function(){onLoad();setResultListHeightJS();getSelectedRowIndex()};function onLoad(){hideDisplayElement("seperateDiv","block");if(ownerType=="QUEUE"){searchFld=document.getElementById(searchQueueTxtId);hideDisplayElement(infoIcon,"inline");if(typeof(searchFld)!="undefined"&&searchFld!=null){searchString=searchFld.value;if(searchString!=null&&searchString!=""){document.getElementById("clearQueueLink").style.visibility="visible"}}}else{if(ownerType=="STAFF"){searchFld=document.getElementById(searchFldId);if(typeof(searchFld)!="undefined"&&searchFld!=null){searchString=searchFld.value;if(searchString!=null&&searchString!=""){document.getElementById("clearLink").style.visibility="visible"}}}else{hideDisplayElement("radioButtonDiv","block");hideDisplayElement("separatorDiv","block");hideDisplayElement("innertoolbar","block");hideDisplayElement(suggestedLblId,"block")}}toggleRadioBtns();hideDisplayElement("topdiv","");if(suggestObjectName=="SYSTemplate__c"){displayPanels(STAFF,"none");hideDisplayElement(param,"");hideDisplayElement("topdiv","none");hideDisplayElement("seperateDiv","none");if(!isNaN(resultSetSize)&&parseInt(resultSetSize)==0){hideDisplayElement(messagePanelId,"block")}else{hideDisplayElement(messagePanelId,"none")}}ownerTypeValue="";if(suggestObjectName=="Suggested_Owner_Mapping__c"||(typeof(ownerType)!="undefined"&&ownerType!=null&&ownerType.trim().length>0)){ownerTypeValue=ownerType;hideDisplayElement(param,"none");if(ownerTypeValue==OWNER||ownerTypeValue==""){if(suggestObjectName!="SYSTemplate__c"&&suggestObjectName!="Suggested_Owner_Mapping__c"){var a=document.getElementById(suggestedLblId);hideDisplayElement(staffDiv,"none");if(a!=null&&typeof(a)!="undefined"){a.style.display="none"}}if(staffResultSize>0||(staffResultSize<=0&&srchOpOn)){displayPanels(STAFF,"");if(suggestObjectName=="Suggested_Owner_Mapping__c"){hideDisplayElement("innertoolbar","none")}}else{if(staffResultSize<=0&&queueResultSize>0){displayPanels(QUEUE,"")}else{displayPanels(STAFF,"");if(staffResultSize==0){hideDisplayElement(messagePanelId,"block")}}}}else{displayPanels(ownerTypeValue,"")}}}function checkRdBtn(b,a){var c=document.getElementById(b);if(typeof(c)!="undefined"&&c!=null){c.checked=a}}function toggleRadioBtns(){if(staffResultSize>0||(staffResultSize<=0&&srchOpOn)){checkRdBtn("staffRdBtn",true)}else{if(staffResultSize<=0&&queueResultSize>0){checkRdBtn("queueRdBtn",true)}else{checkRdBtn("staffRdBtn",true)}}}function disableRadioBtns(a){var b=document.getElementById("staffRdBtn");if(typeof(b)!="undefined"&&b!=null){b.disabled=a?"disabled":""}b=document.getElementById("queueRdBtn");if(typeof(b)!="undefined"&&b!=null){b.disabled=a?"disabled":""}}function hideDisplayElement(c,b){var a=document.getElementById(c);if(typeof(a)!="undefined"&&a!=null){a.style.display=b}}function displayPanels(b,f){suggestedStaffId="";suggestedQueueId="";suggestedStaffName="";suggestedQueueName="";hideDisplayElement(queuMemMsgPanelId,"none");hideDisplayElement(queueMemHeaderPanelId,"none");var c=document.getElementById("radioButtonDiv");if(ownerTypeValue.length>0||suggestObjectName=="Suggested_Owner_Mapping__c"){hideDisplayElement(messagePanelId,"none")}if(suggestObjectName!="Suggested_Owner_Mapping__c"){if(c){c.style.marginLeft="-11px"}}if(suggestObjectName=="Suggested_Owner_Mapping__c"){document.getElementById("suggestedLabel").width="10%";document.getElementById("separatorTd").width="5"}hideDisplayElement(titleId,"");if(b==STAFF){if(queueMemPagination=="true"){resetStaffPage()}if(document.getElementById(searchFldId).value.length>0){document.getElementById("clearLink").style.visibility="visible"}if(ownerTypeValue==OWNER||ownerTypeValue==STAFF){if(exceptionOccured=="true"){hideDisplayElement(messagePanelId,"")}hideDisplayElement("innertoolbar1","none");hideDisplayElement("innertoolbar","block");if(staffResultSize=="0"){if(srchOpOn){if(fromInciOwnerLkup=="true"){hideDisplayElement("searchBlock","block");hideDisplayElement("toolbarDiv","block");hideDisplayElement("paginationbarDivForQM","none")}}hideDisplayElement(btnPanelId,"none");hideDisplayElement(titleId,"none");hideDisplayElement(messagePanelId,"")}else{if(fromInciOwnerLkup=="true"){hideDisplayElement("searchBlock","block");hideDisplayElement("toolbarDiv","block");hideDisplayElement("paginationbarDivForQM","none")}hideDisplayElement(btnPanelId,"")}}var e=document.getElementById(titleId);if(ownerType=="STAFF"){e=document.getElementById(titleIdQueue)}if(suggestObjectName!="SYSTemplate__c"){if(typeof(e)!="undefined"&&e!=null){var a=staffLabel+" ["+staffResultSize+"]";var d=document.createTextNode(a);RemedyForceHTMLProcessor.clearHTML(e);e.appendChild(d)}}hideDisplayElement(genPanelId,staffResultSize=="0"?"none":f);hideDisplayElement(lookupFilterId,"block");if(suggestObjectName=="Suggested_Owner_Mapping__c"){hideDisplayElement(staffDivID,"none");if(staffResultSize==0){hideDisplayElement(messagePanelId,"block")}}else{hideDisplayElement(staffDivID,"block")}hideDisplayElement(queuePanelId,"none");hideDisplayElement(queueDivID,"none");hideDisplayElement(paginationbarDivForQMId,"none")}else{if(b==QUEUE){hideDisplayElement("searchBlock","none");hideDisplayElement("toolbarDiv","none");hideDisplayElement("paginationbarDivForQM","none");hideDisplayElement("innertoolbar","none");if(document.getElementById("searchQueueTxtField").value.length>0){document.getElementById("clearQueueLink").style.visibility="visible"}if((ownerTypeValue==OWNER||ownerTypeValue==QUEUE||suggestObjectName=="Suggested_Owner_Mapping__c")){if(queueResultSize=="0"){hideDisplayElement(btnPanelId,"none");hideDisplayElement(messagePanelId,"block")}else{hideDisplayElement(btnPanelId,"")}var e=document.getElementById(titleId);if(ownerType=="QUEUE"){e=document.getElementById(titleIdQueue)}if(typeof(e)!="undefined"&&e!=null){var a=queueLabel+" ["+queueResultSize+"]";var d=document.createTextNode(a);RemedyForceHTMLProcessor.clearHTML(e);e.appendChild(d)}}hideDisplayElement(genPanelId,"none");hideDisplayElement(lookupFilterId,"none");hideDisplayElement(staffDivID,"none");hideDisplayElement(queuePanelId,queueResultSize=="0"?"none":f);if(suggestObjectName=="Suggested_Owner_Mapping__c"){document.getElementById("separatorDiv").style.marginLeft="0px";hideDisplayElement(queueDivID,"inline")}else{hideDisplayElement(queueDivID,"block")}}}displayQueueMemPanel("none","","")}function displayQueueMemPanel(g,b,d){suggestedStaffId="";suggestedStaffName="";var f=document.getElementById("searchQMTxtField");var e=document.getElementById("clearQMLink");hideDisplayElement(queueMemPanelId,queueMemResultSize=="0"?"none":g);captureStaffQueueId(QUEUE,b,d);if(typeof(b)!="undefined"&&b!=null&&b.trim().length>0){hideDisplayElement(queueMemHeaderPanelId,"block");if(f&&f.value.length>0){e.style.visibility="visible"}else{e.style.visibility="hidden"}hideDisplayElement("paginationbarDivForQM","block");var i=document.getElementById(queueMemHeaderId);if(typeof(i)!="undefined"&&i!=null){var h=queueMemberLabel+": "+d;var c=document.createTextNode(h);RemedyForceHTMLProcessor.clearHTML(i);i.appendChild(c)}if(queueMemResultSize=="0"){hideDisplayElement(queuMemMsgPanelId,"block");var a=document.getElementById(queuMemMsgId);if(typeof(a)!="undefined"&&a!=null){var c=document.createTextNode(noRecsFoundMsg);RemedyForceHTMLProcessor.clearHTML(a);a.appendChild(c)}}else{hideDisplayElement(queuMemMsgPanelId,"none")}}}function captureStaffQueueId(c,b,a){if(c==STAFF){suggestedStaffId=b;suggestedStaffName=a}else{if(c==QUEUE){suggestedQueueId=b;suggestedQueueName=a}}}function closeWindow(a,b){if(isCalledfromConsole=="true"){window.opener.loadIncidentDetail(parentObjectId)}else{window.opener.location.href="/"+parentObjectId}window.close()}var ua=navigator.userAgent.toLowerCase();var isChrome=function(){var a=/chrome/;return a.test(ua)};function setResultListHeightJS(){showPageMsg();var f;if(window.innerHeight=="undefined"||window.innerHeight==undefined){f=document.documentElement.offsetHeight}else{f=window.innerHeight}f=f-15;var n="";var a="none";var m=isChrome();var h=document.getElementById("searchBlock");if(typeof(h)!="undefined"&&h!=null){n=h.style.display}var b=document.getElementById(messagePanelId);if(typeof(b)!="undefined"&&b!=null){a=b.style.display}var l=0;if(ownerTypeValue==STAFF){l=110}else{if(ownerTypeValue==QUEUE){l=90}else{l=n=="none"?(m?115:120):150}}if(f>l){f=f-l;if(a==""){f-=15}var j=document.getElementById(genPanelId);var c=document.getElementById(queuePanelId);var e=document.getElementById(queueMemPanelId);var i=document.getElementById(queueMemHeaderPanelId);if(typeof(j)!="undefined"&&j!=undefined&&j!=null&&j!=""&&j.style.display!="none"){if(m){j.style.height=(f)+"px"}else{j.style.height=f+"px"}}else{if(typeof(c)!="undefined"&&c!=undefined&&c!=null&&c!=""&&c.style.display!="none"){if((typeof(e)!="undefined"&&e!=undefined&&e!=null&&e!=""&&e.style.display!="none")||(typeof(i)!="undefined"&&i!=undefined&&i!=null&&i!=""&&i.style.display!="none")){var g=f/3;if(m){if(ownerType=="OWNER"){c.style.height=(g)+"px";e.style.height=(f-g-74)+"px"}else{if(suggestObjectName=="Suggested_Owner_Mapping__c"){c.style.height=(g)+"px";e.style.height=(f-g-74)+"px"}else{c.style.height=(g-25)+"px";e.style.height=(f-g-70)+"px"}}}else{c.style.height=g+"px";e.style.height=(f-g-95)+"px"}var d=c.getElementsByTagName("tr");var k;k=d[seletedRowOfQTable.getSelectedIndex()];c.scrollTop=k.offsetTop}else{if(m){c.style.height=(f-75+50)+"px"}else{c.style.height=(f-66)+"px"}}}}}}function first(){firstPage()}function next(){nextPage()}function previous(){previousPage()}function last(){lastPage()}function fetchPageJS(b,a){fetchPage(b,a)}function goToPage(a){goToPageJS(a)}function goOnKeyPress(c,b){var d;var a=/^[0-9]+$/;if(window.event){d=c.keyCode}else{if(c.which){d=c.which}}if(!(b.match(a))){b="1"}if(d==13){goToPage(b)}else{return true}return false}function searchOnKeyPress(g,a,b){var l;var h=document.getElementById("clearQueueLink");var c=document.getElementById("clearLink");var d=document.getElementById("clearQMLink");var f=document.getElementById("minTwoChar");var k=document.getElementById("minTwoCharQM");var j=document.getElementById(messagePanelId);var i=document.getElementById(queuMemMsgPanelId);if(window.event){l=g.keyCode}else{if(g.which){l=g.which}}if(b.value.length>0){if(a=="QUEUE"){h.style.visibility="visible"}else{if(a=="STAFF"){c.style.visibility="visible"}else{d.style.visibility="visible"}}}else{if(a=="QUEUE"){h.style.visibility="hidden";searchQueueAndQueueMembersJS(a)}else{if(a=="STAFF"){c.style.visibility="hidden";searchStaff()}else{d.style.visibility="hidden";searchQueueAndQueueMembersJS(a)}}}if(l==13){if(a=="STAFF"){if(b.value!=""&&b.value.length<2){if(j.style.display==""){j.style.display="none"}f.style.display="block";hideDisplayElement("jsscripterrorId","none");return false}else{f.style.display="none"}h.style.visibility="hidden";searchStaff();c.style.visibility="visible"}else{if(a=="QUEUE"){if(b.value.length!=""&&b.value.length<2){if(j.style.display==""){j.style.display="none"}f.style.display="block";hideDisplayElement("jsscripterrorId","none");return false}else{f.style.display="none"}c.style.visibility="hidden";searchQueueAndQueueMembersJS(a)}else{if(b.value.length!=""&&b.value.length<2){if(i.style.display=="block"){i.style.display="none"}k.style.display="block";hideDisplayElement("jsscripterrorId","none");return false}else{k.style.display="none"}d.style.visibility="visible";searchQueueAndQueueMembersJS(a)}}}else{return true}return false}function clearText(a){hideAllErrorMessage();if(a=="STAFF"){srchOpOn=false;resetElementValue(searchFldId);document.getElementById("clearLink").style.visibility="hidden";searchStaff()}else{if(a=="QUEUE"){document.getElementById("clearQueueLink").style.visibility="hidden";hideDisplayElement("minTwoChar","none");resetElementValue(searchQueueTxtId);if(suggestObjectName=="Suggested_Owner_Mapping__c"){searchQueue("","SuggestedOwnerMapping")}else{searchQueue("","QUEUE")}}else{if(a=="QUEUE_MEMBER"){document.getElementById("clearQMLink").style.visibility="hidden";resetElementValue(searchQMTxtId);searchQueueMembers("","QUEUE_MEMBER");hideDisplayElement("minTwoCharQM","none")}else{if(a=="VIEW_QM"){document.getElementById("clearQMLink").style.visibility="hidden";resetElementValue(searchQMTxtId)}}}}}var srchOpOn=false;function searchStaff(){hideAllErrorMessage();srchOpOn=true;var c="";var a=0;var d=document.getElementById("minTwoChar");var e=document.getElementById(searchFldId);if(e.value.length!=""&&e.value.length<2){d.style.display="block";hideDisplayElement("jsscripterrorId","none");return false}else{d.style.display="none"}if(typeof(e)!="undefined"&&e!=null){c=e.value}var b=document.getElementById(pageSizeId);if(typeof(b)!="undefined"&&b!=null){a=b.value}searchStaffsJS(c,a)}function toggleFilter(a){if(a){showAllRecords()}else{reApplyLKFilter()}}function searchQueueAndQueueMembersJS(b){hideAllErrorMessage();var a=document.getElementById(messagePanelId);var c=document.getElementById(queuMemMsgPanelId);var e=document.getElementById("minTwoChar");var d=document.getElementById("minTwoCharQM");var g=document.getElementById("searchQueueTxtField");var f=document.getElementById("searchQMTxtField");if(b=="QUEUE"){if(g.value.length!=""&&g.value.length<2){if(a.style.display==""){a.style.display="none"}e.style.display="block";hideDisplayElement("jsscripterrorId","none");return false}else{e.style.display="none"}hideDisplayElement("innertoolbar1","none");if(suggestObjectName=="Suggested_Owner_Mapping__c"){searchQueue(getElementValue(searchQueueTxtId),"SuggestedOwnerMapping")}else{searchQueue(getElementValue(searchQueueTxtId),b)}}else{if(b=="QUEUE_MEMBER"){if(f.value.length!=""&&f.value.length<2){if(c.style.display=="block"){c.style.display="none"}d.style.display="block";return false}else{d.style.display="none"}searchQueueMembers(getElementValue(searchQMTxtId),b)}}}function getElementValue(b){var a="";var c=document.getElementById(b);if(typeof(c)!="undefined"&&c!=null){a=c.value}return a}function resetElementValue(a){var b=document.getElementById(a);if(typeof(b)!="undefined"&&b!=null){b.value=""}}function onRenderPanel(d,b,a,c){showPageMsg();if(d=="QUEUE"&&isNoRecordFound=="true"){hideDisplayElement(queuePanelId,"none");hideDisplayElement(paginationbarDivForQMId,"none");hideDisplayElement(queueMemPanelId,"none");hideDisplayElement(queueMemHeaderPanelId,"none");hideDisplayElement(messagePanelId,"");hideDisplayElement(titleId,"none");return}displayPanels("QUEUE","");if(exceptionOccured=="true"){hideDisplayElement(messagePanelId,"")}if(d=="QUEUE_MEMBER"){queueMemResultSize=b;if(queueMemResultSize==0){hideDisplayElement(queuMemMsgPanelId,"block")}else{hideDisplayElement(queuMemMsgPanelId,"none")}hideDisplayElement("seperateDiv","block");displayQueueMemPanel("",a,c);hideDisplayElement("")}setResultListHeightJS();getSelectedRowIndex();disableRadioBtns(false)}function highlightSelectedQueue(a,b){if(lastSelectedQueueRow!=undefined){lastSelectedQueueRow.style.backgroundColor="white"}if(b){a.style.backgroundColor="rgba(0, 167, 157, 0.1)";lastSelectedQueueRow=a}else{var c=a.parentNode.parentNode;c.style.backgroundColor="rgba(0, 167, 157, 0.1)";lastSelectedQueueRow=c}}function showPageMsg(){try{var a=document.getElementById(pageMessageId);var b=document.getElementById("jsscripterrorId");var e;if(a!=null&&a!="undefined"&&a.hasChildNodes()){a.style.display="none";e=a.textContent;if(e&&(e.indexOf(lblNoRecordMsg)!=-1)){if(b){b.setAttribute("style","display:none");return}}}if(e){var d=document.getElementById("errorDescId");if(b){hideDisplayElement("minTwoChar","none");hideDisplayElement(messagePanelId,"none");b.setAttribute("style","display:block");RemedyForceHTMLProcessor.parseHTML(d,"<label>"+e+"</label>")}}else{b.setAttribute("style","display:none")}}catch(c){}}function hideAllErrorMessage(){hideDisplayElement("minTwoChar","none");hideDisplayElement(messagePanelId,"none");var a=document.getElementById("jsscripterrorId");if(a){a.style.display="none"}}function sortDataJSFunc(h){var d;var c;var b=document.getElementById("searchField");var a=document.getElementById("searchQueueTxtField");var f=document.getElementById("searchQMTxtField");var g=document.getElementById(pageSizeId);var e=document.getElementById(pageSizeQMId);selectedOwnerValue=h;if(h=="STAFF"){d=b.value;if(g){c=g.value}}else{if(h=="QUEUE"){d=a.value;c=1;if(suggestObjectName=="Suggested_Owner_Mapping__c"){h="SuggestedOwnerMapping"}}else{if(h=="QUEUEMEMBER"){d=a.value;c=e.value}}}sortData(d,c,h)}function callOnCompleteSort(){if(selectedOwnerValue=="STAFF"||selectedOwnerValue=="TEMPLATE"){onLoad();setResultListHeightJS()}else{if(selectedOwnerValue=="QUEUE"){queueResultSize=queueResultSize;hideDisplayElement("seperateDiv","block");onRenderPanel("QUEUE",queueResultSize,"","");hideDisplayElement("innertoolbar1","none")}else{if(selectedOwnerValue=="QUEUEMEMBER"){hideDisplayElement("seperateDiv","block");renderMemPanel()}}}};