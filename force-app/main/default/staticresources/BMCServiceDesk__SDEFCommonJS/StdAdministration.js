var windowTitle,idArray,doRefresh=false,groupID,impactData,urgencyData,categoryData,jsonValue="",btn1="",mod,qvTabId="",index=0,selectedNode="",selectedNodeRef="",jasonData,isQVNodeSelected,sysQueryId,oewnerOfQuery,isQueryCut=false,isQueryCopy=false,selecteQueryText,linkArray=new Array(),indexArray=new Array(),errorMessge,flagToDesableButton,tabsList=new Array(),functionsList=new Array(),folderName,listViewTarget,isQueryNode=false,isFolderNode=false,nameOfFolderNode,sep="___",incidentTabID,nodePageReferences=new Array();function getSDActiveTabId(){return Ext.getCmp("tabs").getActiveTab().getId()}function getDoRefresh(){return doRefresh}function setDoRefresh(a){doRefresh=a}function setIdArray(a){idArray=a}function getIdArray(){return idArray}var myArray=new Array();function refreshPortletBar(){var a=Ext.getCmp("navview");a.findById("portalContent").removeAll();a.doLayout();resetJsonString();closePopup()}function PortletBtnComplete(){var a=Ext.getCmp("navview");a.findById("portalContent").removeAll();a.doLayout();addPortletComponent()}function setTabFunctionList(b,a){tabsList.push(b);functionsList.push(a)}function getTabsList(){return tabsList}function getFunctionsList(){return functionsList}function setpageTarget(a){listViewTarget=a}function getPageTarget(){return listViewTarget}function refreshPortlet(b,a){var c=Ext.getCmp(b);if(c!=null){Ext.get(c.body.id).update('<iframe name = "skyiframe'+b+'" src ="/apex/'+a+'" style="width:100%;height:100%;border:none"/>')}}function refreshPortletByTitle(a){if(document.getElementById(a+"iFrame")!=null&&typeof(document.getElementById(a+"iFrame"))!="undefined"){document.getElementById(a+"iFrame").src=document.getElementById(a+"iFrame").src}if(a!=null&&typeof(a)=="undefined"&&a=="WorldTime"){closePopup()}}function replaceAll(e,c,d){var a=e;var b=a.indexOf(c);while(b!=-1){a=a.replace(c,d);b=a.indexOf(c)}return a}function escapeHtmlCodes(a){a=replaceAll(a,"%25","%");a=replaceAll(a,"%23","#");a=replaceAll(a,"%26","&");a=replaceAll(a,"%22",'"');a=replaceAll(a,"%2B","+");return a}function addChatterFeedTab(){var b=newsFeedVal;if(b){if(Ext.getCmp("navview").findById("tabs").findById("chatterfeed")!=null){Ext.getCmp("navview").findById("tabs").findById("chatterfeed").show();return}var a={id:"chatterfeed",domId:"chatterfeed",title:"&nbsp;&nbsp;&nbsp;"+chatterFeedLabel,closable:true,html:'<div class="iframe-enclave1" id="child5"></div><div class="iframe-enclave"><iframe frameborder="0" id="dashboardIFrame" src ="/apex/NewsFeedPage" class="tab-iframe chatterTabHeightCls"/></div>'};Ext.getCmp("tabs").add(a);Ext.getCmp("navview").findById("tabs").findById("chatterfeed").show();document.getElementById("child5").style.visibility="hidden"}else{alert("Chatter settings are not enabled....")}}function getFormAssignment(d){var a=formAssignment.split(";");var c;for(var b=1;b<a.length;b++){if(a[b]==""){continue}c=new RegExp(a[b],"ig");if(d.match(c)){d=d.replace(c,a[b]+"custom");break}}return(d)}function addNewTab(u,h,o,b){mod=h;o=getFormAssignment(o);o=o.substring(0,o.indexOf("?")+1)+"tabName="+h+spChar+u+"&"+o.substring(o.indexOf("?")+1);var f=o;var g=f.substring(f.indexOf("?")+1);var t=g.split("&");var n=0;var p=0;if(windowTitle==h){p=1}while(tabsList.length>n){var x=tabsList[n];x=x.split(spChar);var c=x[0];var s=x[1];var a=functionsList[n];if(c==h){var m=0;var q;var w;var r="";while(t.length>m){if(t[m].match("=")!=-1){var v=t[m].substring(0,t[m].indexOf("="));if(v=="tabTitle"){r=t[m].substring(t[m].indexOf("=")+1);m++;continue}if(v=="title"){w=t[m].substring(t[m].indexOf("=")+1);m++;continue}if(v=="target"||v=="amp;target"){q=t[m].substring(t[m].indexOf("=")+1);m++;continue}m++}}r=decodeURIComponent(r);Ext.getCmp("navview").findById("tabs").findById(s).show();if(r!=""){a(q,r,w)}else{a(q,w,w)}p=1;break}n++}if(p==0){var e=nodePageReferences[h];if(e!=null){var g=e.substring(e.indexOf("?")+1);var t=g.split("&");var m=0;var q;var w;while(t.length>m){if(t[m].match("=")!=-1){var v=t[m].substring(0,t[m].indexOf("="));if(v=="target"){q=t[m].substring(t[m].indexOf("=")+1);m++;continue}if(v=="title"){w=t[m].substring(t[m].indexOf("=")+1);m++;continue}m++}}if(q.indexOf("AppAdmin")!=-1){q=q+"&standardLayout=true"}setpageTarget(q+spChar+w);if(typeof(b)=="undefined"||b==null||b==""){o=o.substring(0,o.indexOf("?")+1)+"useListViewTarget=true&"+o.substring(o.indexOf("?")+1)}if(q=="KnowledgeSearch"){o=o.substring(0,o.indexOf("?")+1)+"useListViewTarget=false&"+o.substring(o.indexOf("?")+1)}}if(u.match("NewsFeedPage")!=-1&&u.match("NewsFeedPage")!=null&&typeof(Ext.getCmp(u))!="undefined"&&Ext.getCmp(u)!=null){var k=Ext.getCmp(u);o="/apex/"+o;if(typeof(document.getElementById(u+"iframe"))!="undefined"&&document.getElementById(u+"iframe")!=null){document.getElementById(u+"iframe").src=o;k.show()}}else{if((linkArray[o])==null){if(qvTabId==""){qvTabId=u}var l="";if(!o.match(/\isCustomActionLink/)){l="/apex/"}var d="";if(h=="QuickView Editor"){d="QVEditor"}else{if(q!=null&&q!=""){d=q.substring(q.indexOf("=")+1,q.indexOf("%"))}}Ext.getCmp("navview").findById("tabs").add({title:" &nbsp;&nbsp; "+h,width:"auto",id:u,domId:d,html:'<div class="iframe-enclave1" id="divId'+u+'"></div><div class="sky-iframe"><iframe name = "skyiframe'+mod+'" id = "'+u+'iframe" src ="'+l+o+'" class="tab-iframe" style="width:100%;height:100%;border:none;background:white"/></div>',closable:true,listeners:{close:function(){linkArray[indexArray[this.id]]=null;removeTabFunction(this.id);qvTabId=""}}}).show();linkArray[o]=u;indexArray[linkArray[o]]=o;document.getElementById("divId"+u).style.visibility="hidden"}else{var k=Ext.getCmp(linkArray[o]+"");if(k){k.show()}}}}}Ext.ux.TabScrollerMenu=Ext.extend(Object,{pageSize:10,maxText:15,menuPrefixText:"Items",constructor:function(a){a=a||{};Ext.apply(this,a)},init:function(b){Ext.apply(b,this.tabPanelMethods);b.tabScrollerMenu=this;var a=this;b.on({render:{scope:b,single:true,fn:function(){var c=b.createScrollers.createSequence(a.createPanelsMenu,this);b.createScrollers=c}}})},createPanelsMenu:function(){var c=this.stripWrap.dom.offsetHeight;var b=this.header.dom.firstChild;Ext.fly(b).applyStyles({right:"18px"});var a=Ext.get(this.strip.dom.parentNode);a.applyStyles({"margin-right":"36px"});var d=this.header.insertFirst({cls:"x-tab-tabmenu-right"});d.setHeight(c);d.addClassOnOver("x-tab-tabmenu-over");d.on("click",this.showTabsMenu,this);this.scrollLeft.dom.qtip=labelTabScrollerLeft;this.scrollRight.dom.qtip=labelTabScrollerRight;this.scrollLeft.show=this.scrollLeft.show.createSequence(function(){d.show()});this.scrollLeft.hide=this.scrollLeft.hide.createSequence(function(){d.hide()})},getPageSize:function(){return this.pageSize},setPageSize:function(a){this.pageSize=a},getMaxText:function(){return this.maxText},setMaxText:function(a){this.maxText=a},getMenuPrefixText:function(){return this.menuPrefixText},setMenuPrefixText:function(a){this.menuPrefixText=a},tabPanelMethods:{showTabsMenu:function(c){if(!this.tabsMenu){this.tabsMenu=new Ext.menu.Menu();this.on("beforedestroy",this.tabsMenu.destroy,this.tabsMenu)}this.tabsMenu.removeAll();this.generateTabMenuItems();var b=Ext.get(c.getTarget());var a=b.getXY();a[0]-=115;a[1]+=24;this.tabsMenu.showAt(a)},generateTabMenuItems:function(){var d=this.getActiveTab();var e=this.items.getCount();var a=this.tabScrollerMenu.getPageSize();var b=0;while(e>b){var c=this.items.get(b);this.tabsMenu.add(this.autoGenMenuItem(c));b++}},autoGenMenuItem:function(c){var a=this.tabScrollerMenu.getMaxText();var b=c.title.substring(13,c.title.length);var d=Ext.util.Format.ellipsis(b,a);return{text:d,handler:this.showTabFromMenu,scope:this,disabled:c.disabled,tabToShow:c,iconCls:c.iconCls}},showTabFromMenu:function(a){this.setActiveTab(a.tabToShow)}}});initFunction=function(c){if(c.collapsible){var b=c.region;var a="x-collapsed-header-text";if((b=="east")||(b=="west")){a+="-rotated"}c.on("render",function(){var d=c.ownerCt;d.on("afterlayout",function(){c.collapsedTitleEl=d.layout[b].getCollapsedEl().createChild({tag:"div",cls:a,html:"<img src="+resSDEFStylesPath+'"/SDEFicons/icon_workspaces_bar_closed.gif" style="padding-left:8px;height:25px;width:25px;"/><div class="sky-title" style="color:white">'+c.title+"</div>"});c.setTitle=Ext.Panel.prototype.setTitle.createSequence(function(e){c.collapsedTitleEl.dom.appendChild(document.createTextNode(e))})},false,{single:true})})}};clickFunction=function(d){if(d.leaf){if(d.text==chatterFeedLabel){addChatterFeedTab();return}windowTitle=d.text;mod=d.text;pageRef=d.attributes.pageRef;if(d.text==incidentLabel){incidentTabID=d.id}if(windowTitle.search(AlignabilityProcessModel)!=-1){windowTitle=AlignabilityProcessModel;d.text=windowTitle}pageRef=pageRef.substring(0,pageRef.indexOf("?")+1)+"tabName="+d.text+spChar+d.id+"&"+pageRef.substring(pageRef.indexOf("?")+1);var e=pageRef.substring(pageRef.indexOf("?")+1);var b=e.split("&");var k=0;var l=0;while(tabsList.length>k){var m=tabsList[k];m=m.split(spChar);var f=m[0];var c=m[1];var g=functionsList[k];if(f==d.text){var h=0;var a;var p;while(b.length>h){if(b[h].match("=")!=-1){var q=b[h].substring(0,b[h].indexOf("="));if(q=="title"){p=b[h].substring(b[h].indexOf("=")+1);h++;continue}if(q=="target"){a=b[h].substring(b[h].indexOf("=")+1);h++;continue}h++}}if(a.indexOf("AppAdmin")!=-1){a=a+"&standardLayout=true"}g(a,p,p);Ext.getCmp("navview").findById("tabs").findById(c).show();l=1;break}k++}if(l==0){if((linkArray[d.attributes.pageRef])==null){if(pageRef!=null&&pageRef.indexOf("AppAdmin")!=-1){pageRef=pageRef.substring(0,pageRef.indexOf("AppAdmin"))+"AppAdmin?id=1001&standardLayout=true"}Ext.getCmp("navview").findById("tabs").add({title:" &nbsp;&nbsp; "+d.text,id:d.id,domId:d.attributes.domId,iframeName:"skyiframe"+mod,html:'<div class="iframe-enclave1" id="divId'+d.id+'"></div><div class="iframe-enclave"><iframe id="skyiframe'+mod+'" name="skyiframe'+mod+'" src ="/apex/'+pageRef+'" class="tab-iframe"/></div>',closable:true,listeners:{beforeclose:beforeCloseTabEvent,close:function(){linkArray[indexArray[this.id]]=null;removeTabFunction(this.id)}}}).show();linkArray[d.attributes.pageRef]=d.id;indexArray[d.id]=d.attributes.pageRef;document.getElementById("divId"+d.id).style.visibility="hidden"}else{var o=Ext.getCmp(linkArray[d.attributes.pageRef]+"");if(o){o.show()}}}}else{if(d.expanded){d.collapse()}else{d.expand()}}};function beforeCloseTabEvent(b){var d=false;if(typeof(window.frames[this.iframeName])=="undefined"){return}var c;if(typeof(window.frames[this.iframeName].changeArray)!="undefined"){c=window.frames[this.iframeName].changeArray}else{if(typeof(document.getElementById(this.iframeName).contentWindow)!="undefined"){c=document.getElementById(this.iframeName).contentWindow.changeArray}else{return false}}if(c.length>0){for(var a=0;a<c.length;a++){if(c[a]==1){d=true;break}}}if(d){Ext.Msg.show({title:labelCloseTab,msg:labelCloseTabLabel,buttons:Ext.Msg.YESNO,icon:Ext.MessageBox.WARNING,fn:function(e){if(e=="yes"){var f=Ext.getCmp("navview").findById("tabs");f.un("beforeclose",beforeCloseTabEvent);linkArray[indexArray[b.id]]=null;removeTabFunction(b.id);f.remove(b);f.addListener("beforeclose",beforeCloseTabEvent,f)}}});return false}}function removeTabFunction(e){var b=0;var d=e;d=escapeHtmlCodes(d);while(tabsList.length>b){var c=tabsList[b];var a=c.split(spChar);if(a[0]==windowTitle){windowTitle=null}if(a[1]==d){tabsList.splice(b,1);functionsList.splice(b,1);break}b++}}clickFunction1=function(c){document.getElementById("qryPageRef").value="";isQVNodeSelected="true";if(c.leaf){if(c.attributes.pageRef!=""&&c.attributes.pageRef!=null){if(c.attributes.pageRef=="DashboardPage"){OnLoadDesableButtons()}else{desableButtons();selectedNode=null;selectedNodeRef=c.attributes.pageRef;sysQueryId=c.id;setQuickviewId(c.id);isQueryNode=true;isFolderNode=false;selecteQueryText=c.text;oewnerOfQuery=c.attributes.owner;var a=document.getElementById("ownerId").value;if(c.attributes.systemValue==true){Ext.getCmp("deleteBtn").setDisabled(true);Ext.getCmp("cutBtn").setDisabled(true)}}}else{selectedNode=c.id;selectedNodeRef=null;isQueryNode=false;isFolderNode=true;nameOfFolderNode=c.text;if(c.attributes.parent=="null"||c.attributes.parent==""||c.attributes.systemValue==true){OnLoadDesableButtons()}}var b=Ext.getCmp("tabs").findById(c.id);if(b){}else{document.getElementById("qryPageRef").value=c.text+sep+c.id+sep+c.attributes.pageRef;if(c.id=="default dashboards"){editDashboardHandler()}}}else{selectedNodeRef=null;selectedNode=c.id;folderName=c.text;setQuickviewId(null);isQueryNode=false;isFolderNode=true;nameOfFolderNode=c.text;if(c.attributes.parent=="null"||c.attributes.parent==""||c.attributes.systemValue==true){OnLoadDesableButtons();if((c.attributes.parent=="null"||c.attributes.parent=="")&&c.attributes.systemValue==true){Ext.getCmp("addFldrBtn").setDisabled(false)}}else{enableButtons()}if(c.expanded){c.collapse()}else{c.expand()}}};function showErrorMessage(){Ext.Msg.alert(labelWarning,labelQueryNameExisting);isQueryCopy=false;isQueryCut=false;refreshTree()}function desableButtons(){}function enableButtons(){}function OnLoadDesableButtons(){}function confirm(b){var a;if(!b){var b=window.event}if(b.button){a=(b.button==2)}if(a==true){document.getElementById("homelink").href="/ui/setup/Setup"}else{document.getElementById("homelink").href="#nogo";Ext.MessageBox.confirm(labelConfirmHomePage,labelHomeLink,function(c){if(c==="yes"){window.location="/ui/setup/Setup"}})}}Ext.onReady(function(){var a=new Ext.ux.TabScrollerMenu({maxText:15,pageSize:5});if(typeof(UpdatePropSysStage)=="undefined"){return}var c=screen.height;UpdatePropSysStage(c);if(typeof(repeatNodePageReference)=="undefined"){return}repeatNodePageReference();new Ext.Panel({layout:"border",renderTo:"StdConfigurationModule",height:850,id:"navview",items:[{region:"west",collapsible:true,collapseMode:"mini",width:275,autoScroll:true,id:"navbar",useArrows:true,split:true,layout:"accordion",titleCollapse:false,activeItem:0,bodyStyle:{"background-color":"#334f67",border:"none"},footerCfg:{html:"<img src="+resSDEFStylesPath+'/SDEFimages/Salesforce_Logo.png width="280" height="67">'},footerStyle:"border-top:1px solid #cbdeeb;",items:[{title:labelAdministration,collapsible:false,id:"ConfigurationTree",titleCollapse:true,hideCollapseTool:true,margins:"0 10 0 0",autoScroll:true,cls:"bmcConfigurationTreeCls",iconCls:"bmcConfiguration",scale:"medium",useArrows:true,margins:"0 5 0 0",cmargins:"0 5 0 0",xtype:"treepanel",loader:new Ext.tree.TreeLoader(),root:new Ext.tree.AsyncTreeNode({expanded:true,children:configurationJsonFeedRoot()}),rootVisible:false,plugins:{init:clickFunction},listeners:{click:clickFunction}}]},{region:"center",xtype:"tabpanel",id:"tabs",width:500,autoScroll:true,tabPosition:"top",cls:"centralTabPanelCls",enableTabScroll:true,plugins:[a],split:true,items:[],listeners:{tabchange:function(d,g){var f=trim(g.title.split(";")[g.title.split(";").length-1]);var i=myArray[f];if(i!=undefined){if(typeof(i.refreshDocs)!="function"){if(f!="Configuration Items"){i.frames.SIIframeID.refreshDocs()}else{var e=i.frames;e[0].frames.SIIframeID.refreshDocs()}delete myArray[f]}else{i.refreshDocs()}}var j=d.getTabEl(g);if(j.childNodes[0]!=null&&j.childNodes[0]!=undefined){var h=g.domId.replace(" ","_");j.childNodes[0].id=h.toUpperCase()+"_TAB_CLOSE_BTN";j.childNodes[1].childNodes[0].childNodes[0].childNodes[0].id=h.toUpperCase()+"_TAB"}}}}],listeners:{afterlayout:function(d){d.layout.west.miniSplitEl.dom.qtip=labelTooltipCollapseNavigator;d.layout.west.getCollapsedEl();d.layout.west.miniCollapsedEl.dom.qtip=labelTooltipExpandNavigator;b()}}});function b(){var d=Ext.getCmp("ConfigurationTree");d.getRootNode().cascade(function(g){if(g!=null&&g!=undefined&&g.attributes.domId!=undefined&&g.attributes.domId!=null){var f=g.attributes.domId.replace(" ","_");g.getUI().getTextEl().id=f.toUpperCase()+"_TREE_ID"}});d.getEl().dom.childNodes[0].childNodes[1].id="CONFIG_ACCORD";var e=0;Ext.select(".x-tool").each(function(f){f.dom.id="PANEL-TOOL-"+e++})}OnLoadDesableButtons();Ext.QuickTips.init();addNewTab(labelApplicationSettingsTitle,labelApplicationSettingsTitle,"NavigatorPage?title="+labelApplicationSettingsTitle+"&amp;target=AppAdmin?id=1001&standardLayout=true")});openPopUp=function(){var a=Ext.isIE?405:401;openPopupWithTitle("UserConfigPortlet",refreshPortletBar,labelAddSidebarContentHeader,a,460,true)};function trim(b,a){return ltrim(rtrim(b,a),a)}function ltrim(b,a){a=a||"\\s";return b.replace(new RegExp("^["+a+"]+","g"),"")}function rtrim(b,a){a=a||"\\s";return b.replace(new RegExp("["+a+"]+$","g"),"")}function CloseActiveTab(){var a=Ext.getCmp("tabs").getActiveTab();var b=Ext.getCmp("navview").findById("tabs");b.un("beforeclose",beforeCloseTabEvent);linkArray[indexArray[a.id]]=null;removeTabFunction(a.id);b.remove(a);b.addListener("beforeclose",beforeCloseTabEvent,b)};