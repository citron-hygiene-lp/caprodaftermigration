var flagForOpenAttachment=false;var cols=new Array(2);var sm=new Ext.grid.CheckboxSelectionModel({locked:false,listeners:{rowselect:function(e,d,c){var a=grid.getSelectionModel().getSelections();if(a.length>0){var b=document.getElementsByName("AttachFile");if(b.length>1){if(b[1].checked){enableAddButton()}}}},rowdeselect:function(d,c,b){var a=grid.getSelectionModel().getSelections();if(a.length==0){disableAddButton()}}}});function setOpenAttachmentFlag(){flagForOpenAttachment=true}Ext.ns("Extensive.grid");Extensive.grid.ItemDeleter=Ext.extend(Ext.grid.RowSelectionModel,{width:40,header:" ",sortable:false,dataIndex:0,menuDisabled:true,fixed:true,id:"deleter",initEvents:function(){Extensive.grid.ItemDeleter.superclass.initEvents.call(this);this.grid.on("cellclick",function(c,h,d,g){if(d==c.getColumnModel().getIndexById("deleter")){var a=c.getStore().getAt(h);var b=a.get("ID");document.getElementById(MultiDocumentAttachmentPageComp.ComponentVars.str_attachMentIdForDelete).value=b;deleteAttachmentJS()}if(d==c.getColumnModel().getIndexById("consolidatedAttachmentID")){var a=c.getStore().getAt(h);var f=a.get("ID");if(flagForOpenAttachment){flagForOpenAttachment=false;if(f.substring(0,3)=="069"){window.open("/"+f)}else{if(f.substring(0,3)=="00P"){window.open("FileDownloadPage?attachmentId="+f)}}}}});this.grid.on("mouseover",function(d){var b=grid.getView().findRowIndex(d.getTarget());if(b!==false){var a=document.getElementsByName("deleteBtnID");if(a!=null&&a.length>0){for(var c=0;c<a.length;c++){if(c==b){a[c].style.display="block"}else{a[c].style.display="none"}}}}});this.grid.on("mouseout",function(c){var a=document.getElementsByName("deleteBtnID");if(a!=null&&a.length>0){for(var b=0;b<a.length;b++){a[b].style.display="none"}}})},renderer:function(b,c,a,d){return'<img src="'+imgPath+'" name="deleteBtnID" style="display:none"></img>'}});var arrCols=new Array(cols.length+1);var cols_attachments=new Array(3);var arrCols_attachments=new Array(cols_attachments.length);var itemDeleter=new Extensive.grid.ItemDeleter();function intializeGrid(){cols[0]="ID";cols[1]="SidebarItem";arrCols[0]=sm;arrCols[1]={id:cols[0],header:cols[0],width:10,dataIndex:cols[0],hideable:false,hidden:true};arrCols[2]={id:cols[1],header:MultiDocumentAttachmentPage.Labels.fileColumnHeader,sortable:true,dataIndex:cols[1]}}function intializeGridForAttachments(){cols_attachments[0]="ID";cols_attachments[1]="consolidatedAttachmentID";cols_attachments[2]="Delete";arrCols_attachments[0]={id:cols_attachments[0],header:cols_attachments[0],width:10,dataIndex:cols_attachments[0],hideable:false,hidden:true};arrCols_attachments[1]={id:cols_attachments[1],header:MultiDocumentAttachmentPage.Labels.Attachment_Grid_Header,sortable:true,dataIndex:cols_attachments[1]};arrCols_attachments[2]=itemDeleter}var grid;var grid_attachments;function renderGrid(){intializeGrid();if(grid!=null){grid.store.loadData(resultSet);return}Ext.QuickTips.init();var c=Ext.grid;var a=new Ext.data.ArrayReader({},cols);var b=new Ext.data.Store({reader:a,data:resultSet});grid=new c.GridPanel({store:b,enableHdMenu:false,cm:new c.ColumnModel({defaults:{sortable:true},columns:arrCols}),sm:sm,viewConfig:{scrollOffset:0,forceFit:true},width:336,stripeRows:true,height:97,listeners:{sortchange:function(){var d=grid.getColumnModel().getIndexById("checker");var f=grid.getView().getHeaderCell(d);var e=Ext.getDom(f).childNodes[0];var g=Ext.fly(e).hasClass("x-grid3-hd-checker-on");if(g==true){sm.unlock();sm.selectAll();sm.lock()}},afterrender:function(){},delay:1000}});grid.render("grid")}function extInit(){renderGrid();renderGridForConsolidatedAttachments();showErrorJS();changeTextForStandardLayout();setSelectedRadioOption()}function changeTextForStandardLayout(){if(stdLayout=="true"||isConsolePage=="true"){document.getElementById(MultiDocumentAttachmentPageComp.ComponentVars.save_attachmentID).title=stdLayoutSaveAttachmentToolTip;RemedyForceHTMLProcessor.setText(document.getElementById("saveAttachmentSpanID"),stdLayoutSaveAttachment)}}function showErrorJS(){if(errorMessage!=null&&errorMessage!=""&&typeof(errorMessage)!="undefined"){Ext.MessageBox.show({title:" ",msg:errorMessage,width:300,height:"auto",buttons:Ext.MessageBox.OK})}}function enableDisableOkButton(){if(resultSet_consolidated!=null&&resultSet_consolidated!="undefined"&&resultSet_consolidated.length>0){document.getElementById("okBtnID").className="bgBtnGrey";document.getElementById("okBtnID").disabled=false;document.getElementById(MultiDocumentAttachmentPageComp.ComponentVars.save_attachmentID).disabled=false}else{document.getElementById("okBtnID").className="buttonDisabled";document.getElementById("okBtnID").disabled=true;document.getElementById(MultiDocumentAttachmentPageComp.ComponentVars.save_attachmentID).disabled=true}}function enableAddButton(){document.getElementById("addBtn").className="bgBtnGrey";document.getElementById("addBtn").disabled=false}function disableAddButton(){document.getElementById("addBtn").className="buttonDisabled";document.getElementById("addBtn").disabled=true}function enableBrowseButton(){document.getElementsByName(MultiDocumentAttachmentPageComp.ComponentVars.inputfile+":inputFile:file")[0].disabled=false}function disableBrowseButton(){document.getElementsByName(MultiDocumentAttachmentPageComp.ComponentVars.inputfile+":inputFile:file")[0].value="";document.getElementsByName(MultiDocumentAttachmentPageComp.ComponentVars.inputfile+":inputFile:file")[0].disabled=true;var a=grid.getSelectionModel().getSelections();if(a.length==0){disableAddButton()}else{enableAddButton()}}var grid_for_consolidated_attachments;function renderGridForConsolidatedAttachments(){intializeGridForAttachments();if(grid_attachments!=null){grid_attachments.store.loadData(resultSet_consolidated);return}Ext.QuickTips.init();var c=Ext.grid;var a=new Ext.data.ArrayReader({},cols_attachments);var b=new Ext.data.Store({reader:a,data:resultSet_consolidated});grid_attachments=new c.GridPanel({store:b,enableHdMenu:false,cm:new c.ColumnModel({defaults:{sortable:true},columns:arrCols_attachments}),selModel:itemDeleter,cls:"attachMentGrid",width:336,viewConfig:{scrollOffset:0,forceFit:true},stripeRows:true,height:97,enableColumnResize:false});grid_attachments.render("grid_attachments")}Ext.apply(Ext.grid.CheckboxSelectionModel.prototype,{onHdMouseDown:function(d,b){if(b.className=="x-grid3-hd-checker"){d.stopEvent();var c=Ext.fly(b.parentNode);var f=c.hasClass("x-grid3-hd-checker-on");var a=document.getElementsByName("AttachFile");if(a.length>1){if(a[1].checked){if(f){sm.unlock();c.removeClass("x-grid3-hd-checker-on");this.clearSelections()}else{c.addClass("x-grid3-hd-checker-on");this.selectAll()}}}}}});function enableDisableControls(){var a=document.getElementsByName("AttachFile");if(a.length>1){if(a[1].checked){disableBrowseButton();sm.unlock()}else{if(a[0].checked){grid.getSelectionModel().clearSelections();sm.lock();enableBrowseButton()}}}}function getAttachmentsFromIncidentGridOrSystem(){var a=document.getElementsByName("AttachFile");if(a.length>1){if(a[1].checked){getAttachmentsFromIncidentGrid()}else{if(a[0].checked){getAttachmentsFromSystem()}}}}function getAttachmentsFromSystem(){attachFileJS()}function getAttachmentsFromIncidentGrid(){var b="";var a=grid.getSelectionModel().getSelections();if(document.getElementById(MultiDocumentAttachmentPageComp.ComponentVars.str_Incident_attachments).value!=""){b=document.getElementById(MultiDocumentAttachmentPageComp.ComponentVars.str_Incident_attachments).value}document.getElementById(MultiDocumentAttachmentPageComp.ComponentVars.str_Incident_attachmentsOld).value=b;for(j=0;j<a.length;j++){b=b+a[j].get(cols[0])+","}document.getElementById(MultiDocumentAttachmentPageComp.ComponentVars.str_Incident_attachments).value=b;pageReloadJS()}sm.on("selectionchange",function(){var a=Ext.fly(this.grid.getView().innerHd).child("div.x-grid3-hd-checker");if((this.grid.getStore().getCount()==0)||(this.getCount()<this.grid.getStore().getCount())){a.removeClass("x-grid3-hd-checker-on")}else{a.addClass("x-grid3-hd-checker-on")}});Ext.onReady(function(){extInit()});function validateFile(){var c=document.getElementsByName(MultiDocumentAttachmentPageComp.ComponentVars.inputfile+":inputFile:file")[0].value;if(c!=null&&c!=""&&c!="null"){enableAddButton();var b=document.getElementsByName(MultiDocumentAttachmentPageComp.ComponentVars.inputfile+":inputFile:file")[0].value;var a=b.replace(/^.*\\/,"");var d=a.length;if(d>50){Ext.MessageBox.show({title:" ",msg:MultiDocumentAttachmentPage.Labels.Attachment_File_Name_Length_Validation,width:300,height:"auto",buttons:Ext.MessageBox.OK});disableAddButton();document.getElementsByName(MultiDocumentAttachmentPageComp.ComponentVars.inputfile+":inputFile:file")[0].value=null}else{RemedyForceHTMLProcessor.clearHTML(document.getElementById("errorDiv"));enableAddButton()}}}function setSelectedRadioOption(){var b=document.getElementById("attachmentRadioID1");var a=document.getElementById("attachmentRadioID2");if(b!=undefined&&a!=undefined){if(isFileUploadOptionSelected){b.checked=true;a.checked=false}else{b.checked=false;a.checked=true}enableDisableControls()}};