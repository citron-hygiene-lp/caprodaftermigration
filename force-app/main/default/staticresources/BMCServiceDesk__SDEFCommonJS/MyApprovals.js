var ds;var approveflag=0;var rejectflag=0;var myData="";var order="DESC";var idSet;var viewport=null;var queue_grid;var toolbarOptions=new Array(20);var approvedRadioClicked=0;var rejectedRadioClicked=0;var pendingRadioClicked=1;var assignedToMe="checked";var clickedheader=0;var hasPrev=0;var nextBtnClicked=0;var prevBtnClicked=0;var currentPageCount=0;var applyfilterflag=0;function pgRefresh(){if(approvedRadioClicked){getApproveRecords("Approved",assignedToMe,"true","setPageCount")}if(rejectedRadioClicked){getRejectedRecords("Rejected",assignedToMe,"true","setPageCount")}if(pendingRadioClicked){getpendingRecords(assignedToMe,"true","setPageCount")}}function viewRequest(){var b=Ext.ComponentMgr.get("queuegrid_id");var g=b.getSelectionModel().getSelected();var d=b.getStore().indexOf(g);var e=b.getStore().getAt(d).get("RecordId");var a=0;var f=b.getStore().getAt(d).get("RecordName");var c;if(b.getStore().getAt(d).get("Type")==QueueListViewPage.Labels.changeLabel){c="NavigatorPage?&title="+encodeURIComponent(f)+"&target=ChangeRequestPage?id="+e;window.parent.parent.addNewTab("ChangeRequestPage",QueueListViewPage.Labels.Change_Requests,c)}if(b.getStore().getAt(d).get("Type")==QueueListViewPage.Labels.incidentLabel){c="NavigatorPage?&title="+encodeURIComponent(f)+"&target=IncidentPage?id="+e;window.parent.parent.addNewTab("IncidentPage",QueueListViewPage.Labels.IncidenPluralLabel,c)}}function renderToRecord(){var b=Ext.ComponentMgr.get("queuegrid_id");var g=b.getSelectionModel().getSelected();var c=b.getStore().indexOf(g);var e=b.getStore().getAt(c).get("RecordId");var a=0;var d=b.getStore().getAt(c).get("RecordName");if(d==null||d=="null"){Ext.MessageBox.show({msg:QueueListViewPage.Labels.InsufficentOperationPrivilege,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});return}if(b.getStore().getAt(c).get("Status")=="Pending"){var h=b.getStore().getAt(c).get("WorkItemOrStepId");if(b.getStore().getAt(c).get("Type")==QueueListViewPage.Labels.changeLabel){window.parent.addTab("Changeapproval?CAid="+h+"&id="+h+"&navFlag=TRUE&CAFlag=true&ChangeId="+e+"&title="+encodeURIComponent(d),d,d)}if(b.getStore().getAt(c).get("Type")==QueueListViewPage.Labels.incidentLabel){window.parent.addTab("Changeapproval?CAid="+h+"&id="+h+"&navFlag=TRUE&CAFlag=true&IncidentId="+e+"&title="+encodeURIComponent(d),d,d)}}else{var f=b.getStore().getAt(c).get("WorkItemOrStepId");if(b.getStore().getAt(c).get("Type")==QueueListViewPage.Labels.changeLabel){window.parent.addTab("Changeapproval?CAid="+f+"&id="+f+"&navFlag=TRUE&CAFlag=false&ChangeId="+e+"&title="+encodeURIComponent(d),d,d)}if(b.getStore().getAt(c).get("Type")==QueueListViewPage.Labels.incidentLabel){window.parent.addTab("Changeapproval?CAid="+f+"&id="+f+"&navFlag=TRUE&CAFlag=false&IncidentId="+e+"&title="+encodeURIComponent(d),d,d)}}}Ext.onReady(function(){Ext.QuickTips.init();if(rejectflag==0&&approveflag==0){getpendingRecords(assignedToMe,"","setPageCount")}myData="";var j=new Ext.Button({id:"refreshButtonId",scale:"medium",iconCls:"bmcRefreshDasboard",tooltipType:"title",tooltip:QueueListViewPage.Labels.refresh,handler:e,listeners:{mouseover:function(){this.setIconClass("bmcRefreshDasboardOn")},mouseout:function(){this.setIconClass("bmcRefreshDasboard")}}});function e(){applyfilterflag=1;Ext.getCmp("prevId").setDisabled(true);if(approvedRadioClicked){getApproveRecords("Approved",assignedToMe,"true","setPageCount")}if(rejectedRadioClicked){getRejectedRecords("Rejected",assignedToMe,"true","setPageCount")}if(pendingRadioClicked){getpendingRecords(assignedToMe,"true","setPageCount")}}var c=new Array(7);c[0]={xtype:"radio",id:"PendingRadioId",checked:true,name:"shmy",group:"shmy",iconCls:"emptyIcon",boxLabel:QueueListViewPage.Labels.Pending,inputValue:1};c[1]={xtype:"radio",id:"ApprovedRadioId",name:"shmy",group:"shmy",iconCls:"emptyIcon",boxLabel:QueueListViewPage.Labels.Approved,inputValue:2};c[2]={xtype:"radio",id:"RejectedRadioId",name:"shmy",group:"shmy",iconCls:"emptyIcon",boxLabel:QueueListViewPage.Labels.Rejected,inputValue:3};c[3]="-";c[4]={xtype:"checkbox",id:"AssignedToMeChkId",checked:true,name:"AssignedToMeChkName",group:"AssignedToMeChkGrp",iconCls:"emptyIcon",boxLabel:QueueListViewPage.Labels.AssignedToMe};c[5]="-";c[6]={text:QueueListViewPage.Labels.Apply,iconCls:"mnuList",handler:d};var a=new Array(5);a[0]={iconCls:"bmcView1",tooltip:QueueListViewPage.Labels.views,tooltipType:"title",scale:"medium",menu:c};a[1]=j;a[2]=new Ext.Toolbar.Fill();a[3]={xtype:"box",autoEl:{tag:"img",src:getSDFStylesResPath()+"/SDEFbuttons/b_previous.gif",title:QueueListViewPage.Labels.previouspage},disabled:true,cls:"cursorCls",id:"prevId",listeners:{render:function(l){l.el.on("click",b)}}};a[4]={xtype:"box",autoEl:{tag:"img",src:getSDFStylesResPath()+"/SDEFbuttons/b_next.gif",title:QueueListViewPage.Labels.nextpage},id:"nextId",cls:"cursorSpaceCls",listeners:{render:function(l){l.el.on("click",i)}}};var f=Ext.extend(Ext.Panel,{renderTo:"grid",border:false,defaults:{bodyStyle:"padding:0px;margin:0px;zoom:0px;"}});var k=new f({border:true,tbar:a,id:"mnuBarId"});Ext.getCmp("prevId").setDisabled(true);function i(){if(nextFlag!=1){var l="";if(approvedRadioClicked){l="Approved";if(clickedheader==4){nextApprovedRecords("Next",l,"","",order,"true",assignedToMe,"assignedtoflag")}if(clickedheader==5){nextApprovedRecords("Next",l,"CreatedDate",order,"","true",assignedToMe,"assignedtoflag")}if(clickedheader==0){nextApprovedRecords("Next",l,"","","","",assignedToMe,"assignedtoflag")}}if(rejectedRadioClicked){l="Rejected";if(clickedheader==4){nextRejectedRecords("Next",l,"","",order,"true",assignedToMe,"assignedtoflag")}if(clickedheader==5){nextRejectedRecords("Next",l,"CreatedDate",order,"","true",assignedToMe,"assignedtoflag")}if(clickedheader==0){nextRejectedRecords("Next",l,"","","","",assignedToMe,"assignedtoflag")}}if(hasNext=="true"){if(pendingRadioClicked){l="Pending";if(clickedheader==4){nextRecords("Next",l,order,"","",assignedToMe,"assignedtoflag")}if(clickedheader==5){nextRecords("Next",l,"","CreatedDate",order,assignedToMe,"assignedtoflag")}if(clickedheader==0){nextRecords("Next",l,"","","",assignedToMe,"assignedtoflag")}}}}}function b(){if(hasPrev!=0){var l="";if(approvedRadioClicked){l="Approved";if(clickedheader==4){nextApprovedRecords("Prev",l,"","",order,"true",assignedToMe,"assignedtoflag")}if(clickedheader==5){nextApprovedRecords("Prev",l,"CreatedDate",order,"","",assignedToMe,"assignedtoflag")}if(clickedheader==0){nextApprovedRecords("Prev",l,"","","","",assignedToMe,"assignedtoflag")}}if(rejectedRadioClicked){l="Rejected";if(clickedheader==4){nextRejectedRecords("Prev",l,"","",order,"true",assignedToMe,"assignedtoflag")}if(clickedheader==5){nextRejectedRecords("Prev",l,"CreatedDate",order,"","true",assignedToMe,"assignedtoflag")}if(clickedheader==0){nextRejectedRecords("Prev",l,"","","","",assignedToMe,"assignedtoflag")}}if(pendingRadioClicked){l="Pending";if(clickedheader==4){nextRecords("Prev",l,order,"","",assignedToMe,"assignedtoflag")}if(clickedheader==5){nextRecords("Prev",l,"","CreatedDate",order,assignedToMe,"assignedtoflag")}if(clickedheader==0){nextRecords("Prev",l,"","","",assignedToMe,"assignedtoflag")}}}}function d(){applyfilterflag=1;Ext.getCmp("prevId").setDisabled(true);order="DESC";if(document.getElementById("AssignedToMeChkId").checked){assignedToMe="checked"}else{assignedToMe="unchecked"}if(document.getElementById("PendingRadioId").checked){pendingRadioClicked=1;approvedRadioClicked=0;rejectedRadioClicked=0;getpendingRecords(assignedToMe,"true","setPageCount")}if(document.getElementById("ApprovedRadioId").checked){rejectflag=1;approveflag=1;pendingRadioClicked=0;approvedRadioClicked=1;rejectedRadioClicked=0;getApproveRecords("Approved",assignedToMe,"true","setPageCount")}if(document.getElementById("RejectedRadioId").checked){rejectflag=1;approveflag=1;pendingRadioClicked=0;approvedRadioClicked=0;rejectedRadioClicked=1;getRejectedRecords("Rejected",assignedToMe,"true","setPageCount")}currentPageCount=0}function g(){myData=returnData();idSet=returnIDset();window.parent.listOfId(idSet);function n(u,s,q,v,t,r){var p;if(u==null||u==""||u=="null"){p=""}else{p='<a href = "#" onclick=" viewRequest();" oncontextmenu="return false;">'+u+"</a>"}return p}function m(u,s,q,v,t,r){var p='<a href = "#" onclick=" renderToRecord();" oncontextmenu="return false;">'+u+" </a>";return p}var o=new Ext.grid.CheckboxSelectionModel({});var l=new Ext.grid.ColumnModel([{id:"Action_Id",header:QueueListViewPage.Labels.Change_Approval_Action,dataIndex:"Action",renderer:m},{id:"Type",header:QueueListViewPage.Labels.Type,dataIndex:"Type"},{id:"Record_Id",header:QueueListViewPage.Labels.Approval_record,dataIndex:"RecordName",renderer:n},{id:"Status_Id",header:QueueListViewPage.Labels.Change_Approval_Status,dataIndex:"Status"},{id:"Approver_Id",header:QueueListViewPage.Labels.Change_Approval_Approver,dataIndex:"Approver"},{id:"Submitted_Date_Id",header:QueueListViewPage.Labels.Change_Approval_Submitted_Date,dataIndex:"Submitted_Date"}]);ds=new Ext.data.Store({reader:new Ext.data.ArrayReader({},[{name:"Action"},{name:"Status"},{name:"RecordId"},{name:"RecordName"},{name:"Approver"},{name:"Submitted_Date"},{name:"WorkItemOrStepId"},{name:"Type"}])});ds.loadData(myData);queue_grid=new Ext.grid.EditorGridPanel({id:"queuegrid_id",store:ds,layout:"fit",cm:l,sm:o,anchorSize:"100%",height:500,frame:true,clicksToEdit:1,enableHdMenu:false,cls:"no-dirty-mark",stripeRows:true,viewConfig:{forceFit:true,scrollOffset:0,emptyText:QueueListViewPage.Labels.NoRecordsFound}});queue_grid.on("resize",function(r,p,q){setGridHeight(r.getInnerHeight())});queue_grid.on("headerclick",function(t,q,r){applyfilterflag=1;var s="";clickedheader=q;if(order=="DESC"){s=getSDFStylesResPath()+"/SDEFimages/arrow_sort_ascending.gif"}else{s=getSDFStylesResPath()+"/SDEFimages/arrow_sort_descending.gif"}var p=t.getColumnModel().getColumnHeader(q);if(q==4){if(order=="ASC"){order="DESC"}else{order="ASC"}if(approvedRadioClicked==1){sortApprovedByApprover(order,"Approved",assignedToMe,"true","setPageCount")}if(rejectedRadioClicked==1){sortRejectedByApprover(order,"Rejected",assignedToMe,"true","setPageCount")}if(pendingRadioClicked==1){sortPendingByApprover(order,assignedToMe,"true","setPageCount")}}if(q==5){if(order=="ASC"){order="DESC"}else{order="ASC"}if(approvedRadioClicked==1){sortApprovedByColumnName("CreatedDate",order,"Approved",assignedToMe,"true","setPageCount")}if(rejectedRadioClicked==1){sortRejectedByColumnName("CreatedDate",order,"Rejected",assignedToMe,"true","setPageCount")}if(pendingRadioClicked==1){sortPendingByColumnName("CreatedDate",order,assignedToMe,"true","setPageCount")}}})}function h(){if(viewport!=null){return}viewport=new Ext.Viewport({layout:"border",border:false,items:[{region:"center",id:"queuegridPanel",layout:"fit",margins:"35 0 0 0",items:[queue_grid]}]})}g();h()});function showFrameHelp(b){var a="ChangeApproval";OpenHelppage(a,"module",b)};