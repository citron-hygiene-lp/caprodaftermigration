var RFPkgVersionNo;changePageContent();function extJsOnReadyFun(){disableDiv.style.display="block";popup.style.display="";popup.style.opacity="1";popup.style.filter="alpha(opacity=100)";popup.style.zoom=1;pbar4=new Ext.ProgressBar({text:"0%",id:"pbar4",textEl:"p4text",cls:"custom",renderTo:"p4"});pBarText.style.width="20px";pbar4.updateProgress(0,Math.round(100*0)+"%");startProcess()}function completeInsertData(a){pBarText.style.width="20px";var b=a/count;pbar4.updateProgress(b,Math.round(100*b)+"%")}function showErrorMsg(a){Ext.MessageBox.show({msg:messageString,width:a,buttons:Ext.MessageBox.OK});if(isCMDB2){if(messageString==configAppAlreadyRunning){HideprogressBar(false)}else{HideprogressBar(true)}}}function hideProgressDiv(){popup.style.display="none"}function openAssignLicencesHelp(){if(wikiHelpUrlList[0]!=null&&wikiHelpUrlList[0]!=""&&typeof(wikiHelpUrlList[0])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[0])}else{window.open(getStdFormHelpPath()+"/assign_RF_license.htm")}}function openSetUpRFHelp(){if(wikiHelpUrlList[5]!=null&&wikiHelpUrlList[5]!=""&&typeof(wikiHelpUrlList[5])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[5])}else{window.open(getStdFormHelpPath()+"/set_up_RF.htm")}}function openSetUpUserHelp(){if(wikiHelpUrlList[6]!=null&&wikiHelpUrlList[6]!=""&&typeof(wikiHelpUrlList[6])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[6])}else{window.open(getStdFormHelpPath()+"/set_up_users.htm")}}function openPostInstallHelp(){if(wikiHelpUrlList[4]!=null&&wikiHelpUrlList[4]!=""&&typeof(wikiHelpUrlList[4])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[4])}else{window.open(getStdFormHelpPath()+"/post_installation.htm")}}function openVideos(){window.open("https://communities.bmc.com/communities/docs/DOC-11298")}function openReadDocument(){if(wikiHelpUrlList[1]!=null&&wikiHelpUrlList[1]!=""&&typeof(wikiHelpUrlList[1])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[1])}}function openIncidentHelp(){if(wikiHelpUrlList[2]!=null&&wikiHelpUrlList[2]!=""&&typeof(wikiHelpUrlList[2])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[2])}}function openSRMHelp(){if(wikiHelpUrlList[3]!=null&&wikiHelpUrlList[3]!=""&&typeof(wikiHelpUrlList[3])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[3])}}function openTaskHelp(){if(wikiHelpUrlList[4]!=null&&wikiHelpUrlList[4]!=""&&typeof(wikiHelpUrlList[4])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[4])}}function openProblemHelp(){if(wikiHelpUrlList[5]!=null&&wikiHelpUrlList[5]!=""&&typeof(wikiHelpUrlList[5])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[5])}}function openChangeHelp(){if(wikiHelpUrlList[6]!=null&&wikiHelpUrlList[6]!=""&&typeof(wikiHelpUrlList[6])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[6])}}function openReleaseHelp(){if(wikiHelpUrlList[7]!=null&&wikiHelpUrlList[7]!=""&&typeof(wikiHelpUrlList[7])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[7])}}function openBroadcastHelp(){if(wikiHelpUrlList[8]!=null&&wikiHelpUrlList[8]!=""&&typeof(wikiHelpUrlList[8])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[8])}}function openAssetHelp(){if(wikiHelpUrlList[9]!=null&&wikiHelpUrlList[9]!=""&&typeof(wikiHelpUrlList[9])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[9])}}function openKnowledgeHelp(){if(wikiHelpUrlList[10]!=null&&wikiHelpUrlList[10]!=""&&typeof(wikiHelpUrlList[10])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[10])}}function openTrialHelp(){if(wikiHelpUrlList[11]!=null&&wikiHelpUrlList[11]!=""&&typeof(wikiHelpUrlList[11])!="undefined"&&isNewContextpage()){window.open(wikiHelpUrlList[11])}}function callCompleteInsertData(c,b,a,d,e){if(messageString!=null&&messageString!=""){showErrorMsg(300)}else{if(c){completeInsertData(b);if(d){HideprogressBar(true)}}else{completeInsertData(a);if(d){userData()}}switch(e){case"startProcess":if(isPracticeDataAvailable){isSmartPracPopulated=true;userData()}else{setupCommonData()}break;case"setupCommonData":CMDB();break;case"CMDB":templateSLASRD();break;case"userData":userRoleAndUser();break;case"userRoleAndUser":StandardSettings(isSmartPracPopulated);break;case"StandardSettings":updateCI();break;case"updateCI":populateMD();break;case"populateMD":populateProblem();break;case"populateProblem":populateChangeData();break;case"populateChangeData":populateRelease();break;case"populateRelease":updateMisc();break;case"updateMisc":HideprogressBar(true);break}}}function populateData(){if(isCMDB2){var a=document.getElementById("demoDataId");if(a!="undefined"&&a!=null){if(a.checked){isFromBestPractices=true}}extJsOnReadyFun()}else{messageString=DemoDataSupportCMDB2Lbl;showErrorMsg(300)}}function changeDescContent(b){document.getElementById("demoDataBestPracRadioTdId").style.display="";document.getElementById("bestPracRadioTdId").style.display="";document.getElementById("demoData_BestPracSec").style.display="none";var a=document.getElementById("headerTdId");headerTdId.style.display="";headerTdId.colSpan="2";headerTdId.className="chkBoxLabel";var g=document.getElementById("demoDataBestPracRadioTdId");var d=document.getElementById("bestPracRadioTdId");var e=document.getElementById("headerBest");RemedyForceHTMLProcessor.clearHTML(e);if(b=="demoDataBestPracticesId"){document.getElementById("demoDataBestPracticesId").checked=true;g.style.backgroundColor="#eaf7ff";g.style.border="1px solid #b8d7ec";d.style.backgroundColor="";d.style.border="";var f=document.getElementById("bestPracSec");RemedyForceHTMLProcessor.clearHTML(f);f.appendChild(document.createTextNode(PopulateDemoDataLabel));var h=document.createElement("span");h.setAttribute("style","font-weight:bold;font-size:13px");h.appendChild(document.createTextNode(bestPractice+" + "+demoData));var j=document.createElement("span");j.setAttribute("style","padding-left:7px;color:#666666");j.appendChild(document.createTextNode("("+Recommended+")"));e.appendChild(h);e.appendChild(j)}else{if(b=="demoDataId"){document.getElementById("demoDataId").checked=true;d.style.backgroundColor="#eaf7ff";d.style.border="1px solid #b8d7ec";g.style.backgroundColor="";g.style.border="";var c=document.getElementById("bestPracSec");RemedyForceHTMLProcessor.clearHTML(c);c.appendChild(document.createTextNode(PopulateBestPracticeDataDescLabel));var i=document.createElement("span");i.setAttribute("style","font-weight:bold;font-size:13px");i.appendChild(document.createTextNode(bestPractice));e.appendChild(i)}}}function changePageContent(){var k=getSettingsReadyValue();var d=getIsPracticeDataAvailableValue();if((k!="undefined"&&k.toLowerCase()=="false")&&(d!="undefined"&&d.toLowerCase()=="false")){document.getElementById("demoDataBestPracRadioTdId").style.display="";document.getElementById("bestPracRadioTdId").style.display="";changeDescContent("demoDataBestPracticesId");document.getElementById("commandBtnId").style.display=""}else{if((d!="undefined"&&d.toLowerCase()=="true")&&(k!="undefined"&&k.toLowerCase()=="false")){var l=document.getElementById("demoDataBestPracChkBox");l.style.display="";l.style.width="20";document.getElementById("demoDataBestPracTdId").style.display="";var f=document.getElementById("demoDBPLabelId");RemedyForceHTMLProcessor.clearHTML(f);f.appendChild(document.createTextNode(YourPracticesDataPopulatedLabel));document.getElementById("demoDataBestPracRadioTdId").style.display="none";document.getElementById("bestPracRadioTdId").style.display="none";var g=document.getElementById("bestPracTdId");g.style.display="";g.colSpan="2";g.style.paddingTop="10px";var h=document.getElementById("bestPracLabelId");RemedyForceHTMLProcessor.clearHTML(h);h.appendChild(document.createTextNode(demoDataLabel));document.getElementById("bestPracLabelId").style.fontWeight="bold";var i=document.getElementById("demoData_BestPracSec");RemedyForceHTMLProcessor.clearHTML(i);i.appendChild(document.createTextNode(bestPracticesDesMsgLabel));var c=document.getElementById("bestPracSec");RemedyForceHTMLProcessor.clearHTML(c);c.style.display="";c.appendChild(document.createTextNode(PopulateDemoDataLabel));document.getElementById("commandBtnId").style.display=""}else{if(k!="undefined"&&k.toLowerCase()=="true"){document.getElementById("demoDataBestPracRadioTdId").style.display="none";document.getElementById("bestPracRadioTdId").style.display="none";document.getElementById("demoDataBestPracTdId").style.display="";var b=document.getElementById("demoDataBestPracChkBox");b.style.display="";b.style.width="";var f=document.getElementById("demoDBPLabelId");RemedyForceHTMLProcessor.clearHTML(f);f.appendChild(document.createTextNode(YourDemoDataPopulatedLabel));var a=document.getElementById("demoData_BestPracSec");RemedyForceHTMLProcessor.clearHTML(a);a.style.display="";a.style.paddingBottom="20px";a.appendChild(document.createTextNode(demoDataDesMsglabel));document.getElementById("bestPracTdId").style.display="";var e=document.getElementById("bestPracChkBox");e.style.display="";e.style.width="20";var h=document.getElementById("bestPracLabelId");RemedyForceHTMLProcessor.clearHTML(h);h.appendChild(document.createTextNode(YourPracticesDataPopulatedLabel));document.getElementById("bestPracLabelId").style.fontWeight="bold";var c=document.getElementById("bestPracSec");RemedyForceHTMLProcessor.clearHTML(c);c.style.display="";c.appendChild(document.createTextNode(bestPracticesDesMsgLabel));populateDemoDataBtnID.style.display="none"}}}if(isBuyRFEnabled){var j=document.getElementById("buyRemedyforceBtnID");if(typeof(j)!="undefined"){j.className=isRFTrial?"bmc-btn-primary":"btnCls"}}}function openCompileClass(a){var b=window.open(a,"_blank");b.focus()}function openBuyRemedyforce(){var a=parseInt((screen.availWidth-1010)/2);var c=parseInt((screen.availHeight-670)/2);var b="https://www.bmc.com/forms/ESM_ContactCenter_ContactRequest_BMCcom_EN_Jan2014.html";if(isRFTrial&&typeof(rfMarketplaceBuyURL)!="undefined"&&rfMarketplaceBuyURL!=""){b=rfMarketplaceBuyURL+"?orgId="+currentOrgID}window.open(b,"BuyRemedyforce"+currentOrgID,"status=no,modal=yes,scrollbars=yes,resizable=yes,height=670,width=1010,top="+c+",left="+a)};