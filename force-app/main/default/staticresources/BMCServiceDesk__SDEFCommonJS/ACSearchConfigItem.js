var recordString;var bDeferEmptyTxt=true;var searchstring;var advtooltip;var waitingMask;function sendRecordasString(a,c,b){sendRecord()}function sendRecord(){showWaitMsgBar();var a=grid.getSelectionModel().getSelected().data;var b=Ext.util.JSON.encode(a);document.getElementById(recorDataInputHiddenId).value=b;importLinkCI()}Ext.onReady(function(){showWaitMsgBar();var e=new Ext.BoxComponent({el:"txtInput"});RenderSearchComponent();advtooltip=new Ext.QuickTip({target:"infoIcon",anchor:"top",width:Ext.isIE?Ext.isIE7?365:355:368,trackMouse:false,style:"border-color: #d9d9d9; background-color: #fff !important",bodyStyle:'font-size: 12px;font-family: "Salesforce Sans"; color:#333333;',hideDelay:3000,dismissDelay:0,html:lblSearchTip,autoHide:true});var b=new Ext.Toolbar({title:"",cls:"toolSpCls",renderTo:"toolBar",bodyStyle:"border:0px;padding:0px;margin:0px;zoom:0px;",items:[e,"-",createGoBtn(DoSearch),]});var a=new Ext.data.ArrayReader({},[{name:grdFields[0]},{name:grdFields[2]},{name:grdFields[3]},{name:grdFields[8]},{name:grdFields[6]},{name:grdFields[9]},{name:grdFields[5]},{name:grdFields[1]},{name:grdFields[7]},{name:grdFields[4]}]);store=new Ext.data.Store({data:objSearch,reader:a});function d(j,h,f,k,i,g){return'<a onclick="sendRecord()">'+j+"</a>"}document.getElementById("txtSrch").value=searchKeyword;if(document.getElementById("txtSrch").value!=""){bDeferEmptyTxt=false}var c=getBbarOptions();grid=new Ext.grid.GridPanel({id:"maindatagrid",store:store,columns:[{header:grdHeaders[0],width:12,dataIndex:grdFields[4],id:grdFields[4],renderer:d},{header:grdHeaders[7],width:25,dataIndex:grdFields[3],id:grdFields[3]},{header:grdHeaders[6],width:17,dataIndex:grdFields[1],id:grdFields[1]},{header:grdHeaders[1],width:22,dataIndex:grdFields[6],id:grdFields[6]},{header:grdHeaders[2],width:20,dataIndex:grdFields[5],id:grdFields[5]},{header:grdHeaders[3],width:9,dataIndex:grdFields[8],id:grdFields[8]},{header:grdHeaders[4],width:12,dataIndex:grdFields[7],id:grdFields[7]},{header:grdHeaders[5],width:15,dataIndex:grdFields[9],id:grdFields[9]},{header:grdHeaders[0],width:7,dataIndex:grdFields[0],id:grdFields[0],hidden:true},{header:grdHeaders[0],width:7,dataIndex:grdFields[1],id:grdFields[1],hidden:true}],autoExpandColumn:grdFields[3],enableHdMenu:false,height:600,autoWidth:true,border:false,style:"margin-left:5px;margin-right:5px; ",layout:"fit",listeners:{rowdblclick:sendRecordasString},viewConfig:{forceFit:true,scrollOffset:0,emptyText:noRecordmsg,deferEmptyText:bDeferEmptyTxt},bbar:{displayInfo:true,buttonAlign:"center",height:35,id:"paginationBar",items:getBbarOptions()}});store.on("load",function(){grid.render("gridPanel")});BindGrid();directConnectHandler();Ext.EventManager.onWindowResize(function(){Resize()});CDoSearch("xfirstword",0)});function getNextPrevState(a){if(a){if(hasPrevious=="true"||hasPrevious){return false}else{return true}}else{if(hasNext=="true"||hasNext){return false}else{return true}}}function createGoBtn(a){var b={scale:"medium",id:"goBtns",cls:"bmc-btn-primary",disabledCls:"bmc-btn-disabled",focusCls:"bmc-btn-primary",overCls:"bmc-btn-primary",text:lblGoBtn,handler:a};return b}function getBbarOptions(){var a=new Array(13);a[0]={xtype:"box",cls:"d-icon-angle_left",id:"prevId",disabled:true,listeners:{render:function(b){b.el.on("click",PreviousBtnHandler)}}};a[1]={xtype:"tbspacer",width:10};a[2]={text:lblPreviousPagination,xtype:"label",id:"prevIdText",listeners:{render:function(b){b.el.on("click",PreviousBtnHandler)}}};a[3]={xtype:"tbspacer",width:10};a[4]="-";a[5]={xtype:"tbspacer",width:10};a[6]={text:lblNextPagination,xtype:"label",id:"nextIdText",listeners:{render:function(b){b.el.on("click",NextBtnHandler)}}};a[7]={xtype:"tbspacer",width:10};a[8]={xtype:"box",id:"nextId",cls:"d-icon-angle_right",listeners:{render:function(b){b.el.on("click",NextBtnHandler)}}};a[9]={xtype:"tbspacer",width:10};a[10]="-";a[11]={xtype:"tbspacer",width:10};a[12]={xtype:"box",id:"refreshbtnBCM",cls:"d-icon-restart",listeners:{render:function(b){b.el.on("click",pageRefresh)}}};return a}function BindGrid(){if(msgString!=""){Ext.MessageBox.show({title:lblErrorSearch,msg:msgString,width:300,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});return}if((objSearch!=null)&&(iSearchLoad=="1")){store.loadData(objSearch);grid.getColumnModel().setColumnHeader(0,grdHeaders[0]);grid.getColumnModel().setColumnHeader(1,grdHeaders[7]);grid.getColumnModel().setColumnHeader(2,grdHeaders[6]);grid.getColumnModel().setColumnHeader(3,grdHeaders[1]);grid.getColumnModel().setColumnHeader(4,grdHeaders[2]);grid.getColumnModel().setColumnHeader(5,grdHeaders[3]);grid.getColumnModel().setColumnHeader(6,grdHeaders[4]);grid.getColumnModel().setColumnHeader(7,grdHeaders[5])}if(Ext.get("prevId")!=null||Ext.get("nextId")!=null){Ext.getCmp("prevId").setDisabled(getNextPrevState(true));Ext.getCmp("prevIdText").setDisabled(getNextPrevState(true));Ext.getCmp("nextId").setDisabled(getNextPrevState(false));Ext.getCmp("nextIdText").setDisabled(getNextPrevState(false))}}function DoSearch(a){if(isFPUserValidated){showWaitMsgBar();searchstring=document.getElementById("txtSrch").value;searchstring=searchstring.replace('"',"");document.getElementById("txtSrch").value=searchstring;if((2>searchstring.trim().length)||(searchstring==lblSearch)){Ext.MessageBox.show({title:lblwarningSearch,msg:lblValidationMsg,width:300,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});hideWaitMsgBar();return}CDoSearch(searchstring,a)}else{directConnectHandler()}}function showWaitMsgBar(){waitMsg=new Ext.LoadMask(Ext.getBody(),{msgCls:"d-loader-container",msg:'<ul class="d-loading"><li class="d-loading__stick d-loading__stick_1"></li><li class="d-loading__stick d-loading__stick_2"></li><li class="d-loading__stick d-loading__stick_3"></li><li class="d-loading__stick d-loading__stick_4"></li><li class="d-loading__stick d-loading__stick_5"></li><li class="d-loading__stick d-loading__stick_6"></li><li class="d-loading__stick d-loading__stick_7"></li><li class="d-loading__stick d-loading__stick_8"></li><li class="d-loading__stick d-loading__stick_9"></li><li class="d-loading__stick d-loading__stick_10"></li><li class="d-loading__stick d-loading__stick_11"></li><li class="d-loading__stick d-loading__stick_12"></li></ul><div>'+pleaseWaitMsg+"</div>"});waitMsg.show()}function hideWaitMsgBar(){if(typeof(waitMsg)!="undefined"&&waitMsg!=null&&waitMsg!=""){waitMsg.hide()}}function pageRefresh(){if(isFPUserValidated){showWaitMsgBar();document.getElementById("txtSrch").value="";document.getElementById("crossIcon").style.visibility="hidden";document.getElementById("txtSrch").focus();CDoSearch("xfirstword",0)}else{directConnectHandler()}}function btnSearch(){DoSearch(0)}function NextBtnHandler(){if(isFPUserValidated){if(hasNext=="true"||hasNext){showWaitMsgBar();NextClick(cPgNo)}}else{directConnectHandler()}}function PreviousBtnHandler(){if(isFPUserValidated){if(hasPrevious=="true"||hasPrevious){showWaitMsgBar();PrevClick(cPgNo)}else{directConnectHandler()}}}function directConnectHandler(){if(isFPUserValidated==false){var a=ACFPLaunchWindowHeader;if(isDiscoveryEnabled){a=RFDisclaunchWindowHeader}openPopupWithTitle("ACFPUserCredentialPage",executeConnectAction,a,Ext.isIE?240:225,515);popUpWindow.center()}}function executeConnectAction(a){if(a!=null&&a){isFPUserValidated=true;pageRefresh()}}function RenderSearchComponent(){var c=document.getElementById("txtSrch");var b=document.getElementById("infoIcon");var a=c.nextSibling;b.onmouseover=function(d){if(advtooltip){advtooltip.show()}};b.onmouseout=function(d){if(advtooltip){advtooltip.hide()}};c.onkeyup=function(d){a.style.visibility=(this.value.length)?"visible":"hidden";if(d.keyCode===13){DoSearch()}if(this.value==""&&searchstring!=""){pageRefresh()}};a.onclick=function(){c.value="";this.style.visibility="hidden";pageRefresh()}};