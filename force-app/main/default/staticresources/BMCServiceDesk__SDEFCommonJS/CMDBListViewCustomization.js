var previewGridColumnsForBE=[];var previewGridColumnsForBS=[];var previewGridColumnsForBR=[];var leftDataArr=[];var rightDataArr=[];var leftDataStore,rightDataStore,dataStore,previewGrid,sampleData,BSData;var topBtn,upBtn,btmBtn,downBtn,addBtn,remBtn;var selectedRec,waitMsgBar;var tempLeftDataArrforBE=[];var tempRightDataArrforBE=[];var tempLeftDataArrforBS=[];var tempRightDataArrforBS=[];var rightDataArrforBS=[];var columnSelector;var isFirstSelection=true;var classComboValue;var property;var EF="ф";var selectedView="CI";var selClsAPIName,clsType,isViewSelected=false;var classListCombo,classFilterCombo;var bEditListView=false;var cAPIName;function lockGridColumns(b){for(var a=0;a<b.length;a++){if(b[a].dataIndex=="Name__c"){b[a].locked=true;break}}return b}Ext.onReady(function(){Ext.QuickTips.init();previewGridColumnsForBE=encodeColumnHeader(eval(preGridforBE));previewGridColumnsForBS=encodeColumnHeader(eval(preGridforBS));previewGridColumnsForBR=encodeColumnHeader(eval(preGridforBE));CMDBSectionStore=Ext.create("Ext.data.Store",{id:"CMDBSectionStore",data:[{fieldValue:"CI",fieldName:CITab},{fieldValue:"Asset",fieldName:assetTab}],fields:["fieldValue","fieldName"]});var fieldstore=new Ext.data.ArrayStore({fields:[orgnamespace+"Class_Label__c",orgnamespace+"ClassName__c",orgnamespace+"CMDBClassType__c"]});var SamplePanel=Ext.create("Ext.toolbar.Toolbar",{renderTo:"btnToolbar",title:"",height:35,id:"toolbarId",bodyStyle:"border:0px;padding-top:40px;margin:0px;zoom:0px;",items:[{xtype:"button",id:"NewBtn",text:CMDBNew,disabled:!isFlattened,tooltipType:"title",tooltip:CMDBNew,cls:"custombutton",handler:NewbtnHandler},{xtype:"tbspacer",width:3},{xtype:"button",id:"DeleteBtn",text:CMDBDelete,disabled:!isFlattened,tooltipType:"title",tooltip:CMDBDelete,cls:"custombutton",handler:DeletebtnHanlder},{xtype:"tbspacer",width:3},"-",{xtype:"tbspacer",width:3},{id:"viewMenu",scale:"medium",iconCls:"bmcView1",tooltipType:"title",tooltip:views,disabled:!isFlattened,menu:new Ext.menu.Menu({autoWidth:true,disabled:!isFlattened,showSeparator:false,plain:true,items:[{text:Allclasses,id:"All",checked:true,group:"sBtnItemGroup"},{text:CIclasses,id:"CI",checked:false,group:"sBtnItemGroup"},{text:Assetclasses,id:"Asset",checked:false,group:"sBtnItemGroup"}],listeners:{click:function(menu,item,e,eOpts){waitMsgBar=null;showWaitMsgBar("ViewGrid");item.checked=true;selectedView=item.id;applyView(selectedView)}}})},"->",{xtype:"textfield",id:"SearchField",disabled:!isFlattened,listeners:{change:function(field,newval,oldval){if(typeof(newval)!="undefined"&&newval!=null&&newval==""){clearSearchbtnHandler()}},specialkey:function(field,e){if(e.getKey()==e.RETURN||e.getKey()==e.ENTER){viewSearchbtnHandler()}}}},{xtype:"tbspacer",width:3},{xtype:"button",iconCls:"bmcSearch",scale:"medium",tooltipType:"title",tooltip:search,disabled:!isFlattened,scope:this,handler:viewSearchbtnHandler},{xtype:"tbspacer",width:3},{xtype:"button",iconCls:"bmcRefresh",scale:"medium",tooltipType:"title",tooltip:clear,disabled:!isFlattened,scope:this,handler:clearSearchbtnHandler}]});var bottomToolbar=Ext.create("Ext.toolbar.Toolbar",{renderTo:"bottomBtnToolbar",title:"",height:35,id:"bottomtoolbarId",bodyStyle:"border:0px;padding-top:40px;margin:0px;zoom:0px;",items:[{xtype:"button",id:"saveBtn",text:CMDBSave,tooltipType:"title",tooltip:CMDBSave,cls:"custombutton",handler:SaveBtnHandler}]});var ClassFilter=new Ext.form.ComboBox({scale:"medium",width:190,height:30,store:CMDBSectionStore,disabled:!isFlattened,valueField:"fieldValue",displayField:"fieldName",typeAhead:true,value:"CI",hidden:false,triggerAction:"all",forceSelection:true,id:"ClassFilterCombo",renderTo:"classFilterDiv",listeners:{select:function(combo,comboRecord,index){classListCombo.setValue("");classComboValue=combo.getValue();getListofClasses(classComboValue)}}});var classlist=new Ext.form.ComboBox({scale:"medium",width:190,height:30,store:fieldstore,disabled:!isFlattened,queryMode:"local",valueField:orgnamespace+"ClassName__c",displayField:orgnamespace+"Class_Label__c",typeAhead:true,triggerAction:"all",id:"ClassListCombo",renderTo:"classListDiv",tpl:'<tpl for="." ><li role="option" class="x-boundlist-item">{'+orgnamespace+"Class_Label__c:htmlEncode}</li></tpl>",listeners:{select:function(combo,comboRecord,index){waitMsgBar=null;showWaitMsgBar("columnSelectorId");var classValue=combo.getValue();selClsAPIName=classValue;Ext.getCmp("saveBtn").enable();var classFilterComboVal;if(comboRecord[0].get(orgnamespace+"CMDBClassType__c")=="CI and Asset"){classFilterComboVal="CIandAsset"}else{classFilterComboVal=classFilterCombo.getValue()}getClsLabel(classValue,classFilterComboVal)}}});leftDataStore=new Ext.data.ArrayStore({data:leftDataArr,fields:["value","text","width","fieldType","objectName"]});rightDataStore=new Ext.data.ArrayStore({data:rightDataArr,fields:["value","text","width","fieldType","objectName"]});columnSelector=Ext.create("Ext.panel.Panel",{id:"columnSelectorId",renderTo:"columnSelectorDiv",border:false,height:300,width:585,layout:"fit",cls:"fontCls",bodyStyle:"padding-top:10px;",items:[{xtype:"itemselector",name:"itemselectorName",id:"itemselectorId",cls:"fontCls",displayField:"text",valueField:"value",store:leftDataStore,width:215,height:300,imagePath:path,listeners:{click:function(c){var recList=Ext.getCmp("itemselectorId").toField.boundList;var index=recList.getSelectionModel().getSelection()}}}],listeners:{afterrender:function(cmp){var rightBtn=Ext.getCmp("add-id");var leftBtn=Ext.getCmp("remove-id");rightBtn.setIconCls("bmcDisableButtonArrowMoveRight");leftBtn.setIconCls("bmcDisableButtonArrowMoveLeft");document.getElementById(colWidth).disabled="disabled"}}});sampleData=dataforBE;BSData=dataforBS;dataStore=new Ext.data.JsonStore({data:sampleData,remoteSort:false,isSortable:false,model:"Ext.data.Model",fields:getGridFields()});serviceDataStore=new Ext.data.JsonStore({data:BSData,remoteSort:false,isSortable:false,model:"Ext.data.Model",fields:getServiceFields()});relationDataStore=new Ext.data.JsonStore({data:dataforBR,remoteSort:false,isSortable:false,model:"Ext.data.Model",fields:getGridFields()});var viewstore=new Ext.data.ArrayStore({sorters:[{property:"cname",direction:"ASC"}],fields:[{name:"cname",type:"string"},{name:"cAPIName",type:"string"},{name:"clsType",type:"string"},{name:"createdBy",type:"string"},{name:"lastModifiedDate",type:"string"},{name:"viewType",type:"string"}],data:jsonData.arrData,autoDestroy:true});previewGrid=Ext.create("Ext.grid.Panel",{id:"previewGridId",store:dataStore,renderTo:"previewGridDiv",cls:"fontCls",bodyStyle:"border-color: #ADB9C0;",header:false,columns:previewGridColumnsForBE,stripeRows:false,height:150,maxWidth:1500,border:true,enableLocking:true,forceFit:false,viewConfig:{scrollOffset:50,stripeRows:false,},onNormalViewScroll:function(){var me=this,normalView=me.normalGrid.getView(),normalDom=normalView.el.dom,lockedView=me.lockedGrid.getView(),lockedDom=lockedView.el.dom;lockedDom.scrollTop=normalDom.scrollTop;delete lockedView.scrolledByNormal},onLockedViewScroll:function(){var me=this,lockedView=me.lockedGrid.getView();if(!lockedView.scrolledByNormal){lockedView.scrolledByNormal=true;return false}}});ViewGridComp=Ext.create("Ext.grid.Panel",{id:"ViewGrid",store:viewstore,layout:"fit",renderTo:"ViewGridDiv",cls:"fontCls",bodyStyle:"border-color: #ADB9C0;",emptyText:CMDBListViewCustNoRecordsFound,header:false,columns:[{header:classname,dataIndex:"cname",flex:1},{header:CMDBType,dataIndex:"viewType",flex:1,renderer:function(value,p,record){if(value=="System"){return SystemLabel}else{if(value=="Custom"){return CustomLabel}}}},{header:CreatedBy,dataIndex:"createdBy",flex:1},{header:LastModifiedDate,dataIndex:"lastModifiedDate",flex:1},{dataIndex:"cAPIName",hidden:true},{dataIndex:"clsType",hidden:true}],listeners:{itemclick:function(data,record,item,index,e,eOpts){classFilterCombo.disable();classListCombo.disable();isViewSelected=true;waitMsgBar=null;showWaitMsgBar();document.getElementById(colWidth).disabled=true;clearWidthField();enableSaveBtn();var viewType=record.data.viewType;cAPIName=record.data.cAPIName;var cName=Ext.util.Format.htmlDecode(record.data.cname);clsType=record.data.clsType;selectedClassView=cAPIName;bEditListView=true;if(selectedClassView.indexOf("BMC_BusinessService")>-1){selectedvalue="BusinessService"}else{if(selectedClassView.indexOf("BMC_BaseRelationship")>-1){selectedvalue="BaseRelationship"}else{selectedvalue="BaseElement"}}classListCombo.setValue(cName);if(cAPIName=="BMC_BaseElement"){if(isFlattened){classFilterCombo.setValue("")}else{classFilterCombo.setValue("CI")}}else{if(clsType=="CIandAsset"){if(classFilterCombo.getStore().data.length==2){classFilterCombo.getStore().add({fieldValue:"CIandAsset",fieldName:CIandAssetTab});classFilterCombo.getStore().sync()}if(isFlattened){classFilterCombo.setValue("CIandAsset")}else{if(cAPIName=="BMC_BusinessService"){classFilterCombo.setValue("CI")}}}else{classFilterCombo.setValue(clsType)}}if(cAPIName=="BMC_BaseElement"||cAPIName=="BMC_BusinessService"||cAPIName=="BMC_PhysicalLocation"||cAPIName=="BMC_BaseRelationship"){Ext.getCmp("DeleteBtn").disable()}else{Ext.getCmp("DeleteBtn").enable()}selClsAPIName=cAPIName;property=cAPIName+EF+clsType+EF+viewType;getSelectedClassFields(property)}},stripeRows:true,height:180,border:true,enableColumnResize:false,enableColumnMove:false,sortableColumns:true,autoScroll:false,viewConfig:{forceFit:true,scrollOffset:0}});leftDataStore=Ext.getCmp("itemselectorId").fromField.store;rightDataStore=Ext.getCmp("itemselectorId").toField.store;loadData();tempLeftDataArrforBE=leftDataArrforBE;tempRightDataArrforBE=rightDataArrforBE;tempLeftDataArrforBS=leftDataArrforBS;tempRightDataArrforBS=rightDataArrforBS;leftDataStore.loadData(leftDataArrforBE);rightDataStore.loadData(rightDataArrforBE);refreshGrid();Ext.getCmp("DeleteBtn").disable();Ext.getCmp("saveBtn").enable();classListCombo=Ext.getCmp("ClassListCombo");classFilterCombo=Ext.getCmp("ClassFilterCombo");reloadStore();classListCombo.disable();classFilterCombo.disable();classListCombo.setValue(classlblforBE);var grid=Ext.getCmp("ViewGrid");var gridInstanceStore=Ext.getCmp("ViewGrid").getStore();gridInstanceStore.clearFilter();var rowIndex=gridInstanceStore.find("cname",classlblforBE);grid.getView().select(rowIndex);if(gridInstanceStore!=null&&typeof(gridInstanceStore.getAt(rowIndex))!="undefined"){showWaitMsgBar();var record=grid.getStore().getAt(rowIndex).data;var seletedView=record.cAPIName+EF+record.clsType+EF+record.viewType;try{getSelectedClassFields(seletedView)}catch(Exp){}finally{hideWaitMsgBar()}}});function reloadStore(){var classListStore=classListCombo.getStore();classListStore.removeAll();jsonClasses=eval(jsonClasses);classListStore.loadData(jsonClasses)}function NewbtnHandler(){var a=Ext.getCmp("ViewGrid");a.getSelectionModel().deselectAll();if(classFilterCombo.getStore().data.length>2){classFilterCombo.getStore().removeAt(2);classFilterCombo.getStore().sync()}classFilterCombo.setValue("CI");getListofClasses("CI");classListCombo.setValue("");classFilterCombo.enable();classListCombo.enable();clearWidthField();isViewSelected=false;selectedClassView="";selectedvalue="BaseElement";availDataforBE=selDataforBE="";loadDataIntoList();clearPreviewGrid()}function DeletebtnHanlder(){waitMsgBar=null;classFilterCombo.setValue("");classListCombo.setValue("");showWaitMsgBar("ViewGrid");isViewSelected=false;availDataforBE=selDataforBE="";loadDataIntoList();clearWidthField();clearPreviewGrid();deleteView(property)}function viewSearchbtnHandler(){var a=Ext.getCmp("SearchField").getValue();var c=Ext.getCmp("ViewGrid");var b=Ext.getCmp("ViewGrid").getStore();b.clearFilter();b.filter("cname",a)}function clearSearchbtnHandler(){Ext.getCmp("SearchField").setValue("");var b=Ext.getCmp("ViewGrid");var a=Ext.getCmp("ViewGrid").getStore();a.clearFilter()}function clearPreviewGrid(){var b=Ext.getCmp("previewGridId").getStore();var a=Ext.getCmp("previewGridId").getView();b.removeAll();previewGrid.reconfigure(b,[]);a.refresh()}function clearWidthField(){document.getElementById(colWidth).value="";document.getElementById(fieldName).textContent=""}function getComponet(a){return document.getElementById(a)}function reload(){var a=Ext.getCmp("ViewGrid").getStore();var b=Ext.getCmp("ViewGrid").getView();a.removeAll();b.refresh();a.loadData(jsonData.arrData);b.refresh()}function getServiceFields(){var a=[];for(var b=0;b<this.previewGridColumnsForBS.length;b++){a[b]=this.previewGridColumnsForBS[b].dataIndex}return a}function getGridFields(){var a=[];for(var b=0;b<this.previewGridColumnsForBE.length;b++){a[b]=this.previewGridColumnsForBE[b].dataIndex}return a}function loadDataIntoList(){if(isFlattened||(typeof(cAPIName)!="undefined"&&cAPIName!=null&&cAPIName!=""&&cAPIName=="BMC_BaseElement")){leftDataArrforBE=[];for(var a=0;a<availDataforBE.length;a++){leftDataArrforBE[a]=new Array(5);leftDataArrforBE[a][0]=availDataforBE[a].dataIndex;leftDataArrforBE[a][1]=availDataforBE[a].header;leftDataArrforBE[a][2]=availDataforBE[a].width;leftDataArrforBE[a][3]=availDataforBE[a].fieldType;leftDataArrforBE[a][4]=availDataforBE[a].objectName}leftDataStore.loadData(leftDataArrforBE);rightDataArrforBE=[];for(var a=0;a<selDataforBE.length;a++){rightDataArrforBE[a]=new Array(4);rightDataArrforBE[a][0]=selDataforBE[a].dataIndex;rightDataArrforBE[a][1]=selDataforBE[a].header;rightDataArrforBE[a][2]=selDataforBE[a].width;rightDataArrforBE[a][3]=selDataforBE[a].fieldType;rightDataArrforBE[a][4]=selDataforBE[a].objectName}rightDataStore.loadData(rightDataArrforBE)}else{if(cAPIName=="BMC_BusinessService"){leftDataArrforBS=[];for(var a=0;a<availDataforBS.length;a++){leftDataArrforBS[a]=new Array(4);leftDataArrforBS[a][0]=availDataforBS[a].dataIndex;leftDataArrforBS[a][1]=availDataforBS[a].header;leftDataArrforBS[a][2]=availDataforBS[a].width;leftDataArrforBS[a][3]=availDataforBS[a].fieldType}leftDataStore.loadData(leftDataArrforBS);rightDataArrforBS=[];for(var a=0;a<selDataforBS.length;a++){rightDataArrforBS[a]=new Array(4);rightDataArrforBS[a][0]=selDataforBS[a].dataIndex;rightDataArrforBS[a][1]=selDataforBS[a].header;rightDataArrforBS[a][2]=selDataforBS[a].width;rightDataArrforBS[a][3]=selDataforBS[a].fieldType}rightDataStore.loadData(rightDataArrforBS)}}}function getSelectedEleJsonForBE(c){var b=prepareJSON(getArray(c));if(selectedClassView=="BMC_BaseRelationship"){return"["+b+"]"}else{var a=getDefaultHiddenColsforBE(b);return"["+a+","+b+"]"}}function getSelectedEleJsonForBS(b){var a=prepareJSON(getArray(b));var c=getDefaultHiddenColsforBS(a);return"["+c+","+a+"]"}var isSave=false;function SaveBtnHandler(){isSave=true;var h;classListCombo.disable();classFilterCombo.disable();var a=classListCombo.getValue();if(isViewSelected){h=clsType}else{h=classFilterCombo.getValue();var f=classListCombo.getStore().find(orgnamespace+"ClassName__c",a);if(f!=-1){var e=classListCombo.getStore().getAt(f);if(e.get(orgnamespace+"CMDBClassType__c")=="CI and Asset"){h="CIandAsset"}}}var d=Ext.getCmp("saveBtn");tempLeftDataArrforBE=getArray(leftDataStore);tempRightDataArrforBE=getArray(rightDataStore);tempLeftDataArrforBS=getArray(leftDataStore);tempRightDataArrforBS=getArray(rightDataStore);if(tempRightDataArrforBE.length<1){Ext.MessageBox.show({msg:BEValidationMsg,buttons:Ext.MessageBox.OK,cls:"rf-msg-cls"});return""}else{waitMsgBar=null;showWaitMsgBar("ViewGrid");var g=prepareJSON(tempRightDataArrforBE);if(!g){hideWaitMsgBar();return""}if(selClsAPIName=="BMC_BaseRelationship"){g="["+g+"]"}else{g="["+getDefaultHiddenColsforBE(g)+","+g+"]"}var c=g;var b="",j;if(c!=null&&c!="undefined"){if(d!=null&&d!="undefined"){d.enable()}if(typeof(selClsAPIName)=="undefined"){selClsAPIName="BMC_BaseElement"}if(selClsAPIName!="BMC_BaseElement"&&selClsAPIName!="BMC_BaseRelationship"&&selClsAPIName!="BMC_BusinessService"&&selClsAPIName!="BMC_PhysicalLocation"&&((selClsAPIName!=null&&selClsAPIName!=""))){b=selClsAPIName+EF+h+EF+"Custom"}else{if(selClsAPIName!=null&&selClsAPIName!=""){b=selClsAPIName+EF+h+EF+"System"}}j=c;save(b,j);isSave=false}}}function enableSaveBtn(){var a=Ext.getCmp("saveBtn");if(a!=null&&a!="undefined"){a.enable()}}function getDefaultHiddenColsforBE(b){var a='{ "header": "ID", "width":'+100+', "dataIndex": "Id", "sortable": true, "hidden":true, "fieldType": "NA"}';if(b.indexOf("InstanceID__c")==-1){a=a+',{ "header": "Instance ID", "width":'+100+', "dataIndex": "InstanceID__c", "sortable": true, "hidden":true, "fieldType": "NA"}'}if(b.indexOf("ClassName__c")==-1){a=a+',{ "header": "Class Name", "width":'+100+', "dataIndex": "ClassName__c", "sortable": true, "hidden":true, "fieldType": "NA"}'}if(b.indexOf("AssemblyId__c")==-1){a=a+',{ "header": "Assembly Id", "width":'+100+', "dataIndex": "AssemblyId__c", "sortable": true, "hidden":true, "fieldType": "NA"}'}if(b.indexOf("TokenId__c")==-1){a=a+',{ "header": "Token Id", "width":'+100+', "dataIndex": "TokenId__c", "sortable": true, "hidden":true, "fieldType": "NA"}'}if(b.indexOf("InstanceType__c")==-1){a=a+',{ "header": "Instance Type", "width":'+100+', "dataIndex": "InstanceType__c", "sortable": true, "hidden":true, "fieldType": "NA"}'}return a}function getDefaultHiddenColsforBS(a){var b='{ "header": "ID", "width":'+100+', "dataIndex": "Id", "sortable": true, "hidden":true, "fieldType": "NA"}';if(a.indexOf("InstanceID__c")==-1){b=b+',{ "header": "Instance ID", "width":'+100+', "dataIndex": "InstanceID__c", "sortable": true, "hidden":true, "fieldType": "NA"}'}if(!isFlattened&&a.toLowerCase().indexOf("class_name__c")==-1){b=b+',{ "header": "Class Name", "width":'+100+', "dataIndex": "Class_Name__c", "sortable": true, "hidden":true, "fieldType": "NA"}'}else{if(isFlattened&&a.toLowerCase().indexOf("classname__c")==-1){b=b+',{ "header": "Class Name", "width":'+100+', "dataIndex": "classname__c", "sortable": true, "hidden":true, "fieldType": "NA"}'}}if(isFlattened&&a.toLowerCase().indexOf("instancetype__c")==-1){b=b+',{ "header": "Instance Type", "width":'+100+', "dataIndex": "InstanceType__c", "sortable": true, "hidden":true, "fieldType": "NA"}'}return b}function refreshDataStore(a){if(a=="BaseElement"){tempLeftDataArrforBS=getArray(leftDataStore);if(isFirstSelection){tempRightDataArrforBS=rightDataArrforBS;isFirstSelection=false}else{tempRightDataArrforBS=getArray(rightDataStore)}leftDataStore.loadData(tempLeftDataArrforBE);rightDataStore.loadData(tempRightDataArrforBE)}else{if(a=="BusinessService"){tempLeftDataArrforBE=getArray(leftDataStore);tempRightDataArrforBE=getArray(rightDataStore);leftDataStore.loadData(tempLeftDataArrforBS);rightDataStore.loadData(tempRightDataArrforBS)}}document.getElementById(colWidth).value="";refresh()}function getArray(a){dataArry=[];for(i=0;i<a.data.length;i++){dataArry[i]=new Array(4);dataArry[i][0]=a.getAt(i).get("value");dataArry[i][1]=a.getAt(i).get("text");dataArry[i][2]=a.getAt(i).get("width");dataArry[i][3]=a.getAt(i).get("fieldType");dataArry[i][4]=a.getAt(i).get("objectName")}return dataArry}function prepareJSON(e){var d="";var c="";var b="";for(i=0;i<e.length;i++){b=e[i][1].replace(/\\/g,"\\\\");c=e[i][2];var a=/^[0-9]+$/;if(a.test(c)){if(c==null||c==""){Ext.MessageBox.show({msg:colValidation+" "+e[i][1],buttons:Ext.MessageBox.OK,cls:"rf-msg-cls"});hideWaitMsgBar();return}else{if(c<50||c>500){Ext.MessageBox.show({msg:colWidthValidation,buttons:Ext.MessageBox.OK,cls:"rf-msg-cls"});hideWaitMsgBar();return}}if(selectedvalue.indexOf("BaseRelationship")!=-1){if(isSave){d=d+'{ "header": "'+Ext.util.Format.htmlEncode(b)+'", "width":'+e[i][2]+', "dataIndex": "'+e[i][0].split(skywalkerConstant)[0]+'", "sortable": true, "fieldType": "'+e[i][3]+'","objectName":"'+e[i][4]+'"},'}else{d=d+'{ "header": "'+Ext.util.Format.htmlEncode(b)+'", "width":'+e[i][2]+', "dataIndex": "'+e[i][0]+'", "sortable": true, "fieldType": "'+e[i][3]+'","objectName":"'+e[i][4]+'"},'}}else{d=d+'{ "header": "'+Ext.util.Format.htmlEncode(b)+'", "width":'+e[i][2]+', "dataIndex": "'+e[i][0]+'", "sortable": true, "fieldType": "'+e[i][3]+'"},'}}else{Ext.MessageBox.show({msg:validNoMsg+" "+e[i][1],buttons:Ext.MessageBox.OK,cls:"rf-msg-cls"});hideWaitMsgBar();return}}d=d.substring(0,d.length-1);return d}function refreshGrid(){var strJson;var columns;if(selectedvalue=="BaseElement"){strJson=getSelectedEleJsonForBE(rightDataStore);columns=eval("("+strJson+")");columns=lockGridColumns(columns);previewGridColumnsForBE=columns;previewGrid.columns=columns;dataStore=new Ext.data.JsonStore({data:dataforBE,remoteSort:false,isSortable:false,model:"Ext.data.Model",fields:getGridFields()});previewGrid.reconfigure(dataStore,previewGrid.columns)}else{if(selectedvalue=="BaseRelationship"){strJson=getSelectedEleJsonForBE(rightDataStore);columns=eval("("+strJson+")");columns=lockGridColumns(columns);previewGridColumnsForBE=columns;previewGrid.columns=columns;relationDataStore=new Ext.data.JsonStore({data:dataforBR,remoteSort:false,isSortable:false,model:"Ext.data.Model",fields:getGridFields()});previewGrid.reconfigure(relationDataStore,previewGrid.columns)}else{strJson=getSelectedEleJsonForBS(rightDataStore);columns=eval("("+strJson+")");columns=lockGridColumns(columns);previewGridColumnsForBS=columns;previewGrid.columns=columns;var serviceGridfields=getServiceFields();serviceDataStore=new Ext.data.JsonStore({data:dataforBS,remoteSort:false,isSortable:false,model:"Ext.data.Model",fields:serviceGridfields});previewGrid.reconfigure(serviceDataStore,previewGrid.columns)}}if(previewGrid&&Ext.get("previewGridDiv")){var totalColWidth=0;var lastCol;Ext.each(previewGrid.query("gridcolumn"),function(col){if(col.hidden!=true&&col.width){totalColWidth+=col.width;lastCol=col}});var windowWidth=Ext.get("previewGridDiv").getWidth();if(totalColWidth&&windowWidth&&windowWidth-totalColWidth>0){var newWidth=lastCol.getWidth()+windowWidth-totalColWidth-12;lastCol.setWidth(newWidth)}}previewGrid.getView().refresh();document.getElementById("button1").disabled=false}function refresh(){document.getElementById("button1").disabled=true;var c="";var a="";if(classListCombo!==null&&typeof(Ext.getCmp("ClassListCombo").getValue())!="undefined"&&Ext.getCmp("ClassListCombo").getValue()!=null){if(Ext.getCmp("ClassListCombo").getValue().length==0){c=noClassNameSelectedMsg}else{if(typeof(rightDataStore)!="undefined"&&rightDataStore!=null&&typeof(leftDataStore)!="undefined"&&leftDataStore!=null){if(typeof(rightDataStore.data)!="undefined"&&rightDataStore.data!=null&&typeof(leftDataStore.data)!="undefined"&&leftDataStore.data!=null){if(rightDataStore.data.length==0){c=BEValidationMsg}}}}}if(c!=""){ShowErrorMsgBox(c);return false}waitMsgBar=null;showWaitMsgBar("previewGridId");var b;if(bEditListView){a=selectedClassView}else{a=selectedClassName}if(a==""){a="BMC_BaseElement__c"}if(selectedvalue=="BaseElement"){b=getSelectedEleJsonForBE(rightDataStore);refreshPreviewGrid(b,a)}else{if(selectedvalue=="BusinessService"){b=getSelectedEleJsonForBS(rightDataStore);refreshPreviewGrid(b,"BMC_BusinessService__c")}else{if(selectedvalue=="BaseRelationship"){b=getSelectedEleJsonForBE(rightDataStore);refreshPreviewGrid(b,"BMC_BaseRelationship__c")}}}}function saveWidth(){if(selectedRec!=null&&typeof(selectedRec)!="undefined"){var a=document.getElementById(colWidth).value;selectedRec.set("width",a);selectedRec.commit()}}function loadData(){leftDataArrforBE=[];for(var a=0;a<availDataforBE.length;a++){leftDataArrforBE[a]=new Array(4);leftDataArrforBE[a][0]=availDataforBE[a].dataIndex;leftDataArrforBE[a][1]=availDataforBE[a].header;leftDataArrforBE[a][2]=availDataforBE[a].width;leftDataArrforBE[a][3]=availDataforBE[a].fieldType;leftDataArrforBE[a][4]=availDataforBE[a].objectName}rightDataArrforBE=[];for(var a=0;a<selDataforBE.length;a++){rightDataArrforBE[a]=new Array(3);rightDataArrforBE[a][0]=selDataforBE[a].dataIndex;rightDataArrforBE[a][1]=selDataforBE[a].header;rightDataArrforBE[a][2]=selDataforBE[a].width;rightDataArrforBE[a][3]=selDataforBE[a].fieldType;rightDataArrforBE[a][4]=selDataforBE[a].objectName}leftDataArrforBS=[];for(var a=0;a<availDataforBS.length;a++){leftDataArrforBS[a]=new Array(3);leftDataArrforBS[a][0]=availDataforBS[a].dataIndex;leftDataArrforBS[a][1]=availDataforBS[a].header;leftDataArrforBS[a][2]=availDataforBS[a].width;leftDataArrforBS[a][3]=availDataforBS[a].fieldType}rightDataArrforBS=[];for(var a=0;a<selDataforBS.length;a++){rightDataArrforBS[a]=new Array(3);rightDataArrforBS[a][0]=selDataforBS[a].dataIndex;rightDataArrforBS[a][1]=selDataforBS[a].header;rightDataArrforBS[a][2]=selDataforBS[a].width;rightDataArrforBS[a][3]=selDataforBS[a].fieldType}}function showError(){if(errormsg!=null&&errormsg!=""){Ext.MessageBox.show({title:" ",msg:errormsg,width:300,buttons:Ext.MessageBox.OK,cls:"rf-msg-cls"})}refreshviewgrid()}function hideWaitMsgBar(){waitMsgBar.setVisible(false)}function showWaitMsgBar(a){if(waitMsgBar==null){if(a=="ViewGrid"){waitMsgBar=new Ext.LoadMask(ViewGrid,{msg:PleaseWait})}else{if(a=="columnSelectorId"){waitMsgBar=new Ext.LoadMask(columnSelector,{msg:PleaseWait})}else{if(a=="previewGridId"){waitMsgBar=new Ext.LoadMask(previewGrid,{msg:PleaseWait})}else{waitMsgBar=new Ext.LoadMask(Ext.getBody(),{msg:PleaseWait})}}}waitMsgBar.setVisible(true)}}function ShowErrorMsgBox(a){if(typeof(a)!="undefined"&&a!=null&&a!=""){Ext.MessageBox.show({title:" ",msg:a,width:250,buttons:Ext.MessageBox.OK,cls:"rf-msg-cls"})}}function compareTo(a,b){a=a.get("text").toUpperCase();b=b.get("text").toUpperCase();if(a<b){return -1}if(a>b){return 1}return 0};