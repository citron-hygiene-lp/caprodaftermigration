$(document).on("click",function(b){var a=$(".filter-div");if(a!==b.target&&!a.has(b.target).length){$(".filter-options").addClass("ng-hide")}});var fieldPrioritizationModule=angular.module("fieldPrioritizationModule",["ui.sortable","ui.sortable.multiselection","ui.grid","rfmodal","ui.grid.selection","ui.grid.resizeColumns","ngSanitize","sidebarModule","ui.bootstrap","rf.ng.tooltip"]);fieldPrioritizationModule.config(["rfModalProvider",function(a){a.setDefaults({})}]);fieldPrioritizationModule.controller("fieldPrioritizationController",["$scope","$q","rfModal","uiSortableMultiSelectionMethods","fieldPrioritizationService","uiGridConstants","$timeout","$modal","$rootScope","confirmationDialogService",function(k,c,g,d,j,e,a,i,f,h){k.showMask=function(){$("#sideBarloader").css("display","block");$("#sideBarActionMask").css("display","block")};k.hideMask=function(){$("#sideBarloader").css("display","none");$("#sideBarActionMask").css("display","none")};k.focusedIndex=0;k.allClassesFeature={isEnabled:false};k.activeInactiveFilter={isActive:true,isInactive:false,isAll:false};k._Labels={};k._Labels.ActiveItems=_Labels.ActiveItems;k._Labels.InactiveItems=_Labels.InactiveItems;k._Labels.Search=_Labels.Search;k._Labels.Clear=_Labels.Clear;k._Labels.New=_Labels.New;k._Labels.DefineAttributefor=_Labels.DefineAttributefor;k._Labels.ClassType=_Labels.ClassType;k._Labels.CMDBClassName=_Labels.CMDBClassName;k._Labels.AvailableFields=_Labels.AvailableFields;k._Labels.SelectedFields=_Labels.SelectedFields;k._Labels.Source=_Labels.Source;k._Labels.FieldSourceOrder=_Labels.FieldSourceOrder;k._Labels.Inactive=_Labels.Inactive;k._Labels.ApplyAllClasses=_Labels.ApplyAllClasses;k._Labels.Save=_Labels.Save;k._Labels.RecordDeleted=_Labels.RecordDeleted;k._Labels.RecordSaved=_Labels.RecordSaved;k._Labels.SelectFieldValidation=_Labels.SelectFieldValidation;k._Labels.Yes=_Labels.Yes;k._Labels.No=_Labels.No;k._Labels.All=_Labels.All;k._Labels.DeleteConfirmMessage=_Labels.DeleteConfirmMessage;k._Labels.RulesAlreadyExistWarning=_Labels.RulesAlreadyExistWarning;k._Labels.Delete=_Labels.Delete;k._Labels.Warning=_Labels.Warning;k.arrSources=[];angular.fromJson(strSourcePicklistValues).forEach(function(m){k.arrSources[m.fieldLabel]=m.APIName});k.controllerData={filterValue:"",isInactiveRule:false,showRecords:"active",classTypes:cmdbClassTypes,selectedClassType:cmdbClassTypes[0],isFilterClicked:false,classNames:angular.fromJson(strClassNameValues),fieldNames:{},isFirstLoad:true,isNew:true,isDisableDiv:true,isRTL:(userLanguage=="iw")?true:false};k.multiSelectionModel1={selectedItemsInAvailableFields:[],selectedItemsInSelectedFields:[],selectedColumns:[],availableColumns:[],identifierField:{}};k.multiSelectionModel2={selectedItemsInAvailableFields:[],selectedItemsInSelectedFields:[],selectedColumns:angular.fromJson(strSourcePicklistValues),availableColumns:[],identifierField:{}};k.newButtonHandler=function(){k.controllerData.selectedClassType=cmdbClassTypes[0];k.controllerData.classNames=angular.fromJson(strClassNameValues);for(indexCounter=0;indexCounter<k.controllerData.classNames.length;indexCounter++){if(k.controllerData.classNames[indexCounter].APIName=="BMC_BaseElement"){k.controllerData.selectedClassName=k.controllerData.classNames[indexCounter]}}k.multiSelectionModel1.selectedColumns=[];k.multiSelectionModel1.availableColumns=angular.fromJson(strClassFieldValues);k.multiSelectionModel2.selectedColumns=angular.fromJson(strSourcePicklistValues);k.allClassesFeature.isEnabled=false;k.controllerData.isNew=true;k.controllerData.isInactiveRule=false;k.controllerData.enableSource=false;if(k.controllerData.isFirstLoad){k.controllerData.isFirstLoad=false}else{k.controllerData.isDisableDiv=false}if(k.gridApi.selection.getSelectedRows()[0]){k.gridApi.selection.unSelectRow(k.gridApi.selection.getSelectedRows()[0])}};k.identifierField={};k.myData=[];var b=[{field:"fieldName",name:"fieldName",displayName:_Labels.FieldName,width:150,sortDirectionCycle:[e.ASC,e.DESC],sort:{direction:e.ASC}},{field:"fieldClassName",name:"fieldClassName",displayName:_Labels.AllandClassNames,width:150,sortDirectionCycle:[e.ASC,e.DESC]},{field:"fieldLevelPrioriy",name:"fieldLevelPrioriy",displayName:_Labels.FieldSourceOrder,width:700,sortDirectionCycle:[e.ASC,e.DESC]},{field:"isInactive",name:"isInactive",displayName:_Labels.Inactive,width:"*",cellTemplate:'<div class="ui-grid-cell-contents" >{{row.entity.isInactive}} <span class="float_delete_span" style="margin-top: 4px;"><img ng-click="grid.appScope.removeFieldSourcePriority(row.entity.RuleNumber)" class="svg" height="17" width= "17" src="'+staticResource+'/images/delete-icon.svg"></img></span></div>',sortDirectionCycle:[e.ASC,e.DESC]},{field:"fieldAPIName",name:"fieldAPIName",visible:false},{field:"fieldClassAPI",name:"fieldClassAPI",visible:false},{field:"RuleNumber",name:"RuleNumber",visible:false},{field:"CMDBClassType",name:"CMDBClassType",visible:false},{field:"isApplyToAllClasses",name:"isApplyToAllClasses",visible:false}];k.gridOptions={rowTemplate:'<div ng-mouseover="" ng-click="grid.appScope.fnOne(row)" ng-repeat="col in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ui-grid-cell></div>',data:"myData",columnDefs:b,enableColumnResizing:true,enableSorting:true,enableCellEditOnFocus:false,enableColumnMenus:false,enableSelectAll:false,multiSelect:false,enableRowSelection:true,enableRowHeaderSelection:false,noUnselect:false,rowHeight:25,enableFiltering:false,onRegisterApi:function(m){k.gridApi=m;k.gridApi.grid.registerRowsProcessor(k.singleFilter,200);m.selection.on.rowSelectionChanged(k,function(n){k.gridApi.grid.appScope.lastSelectedRow=n});m.grid.element.on("click",function(o){if(k.gridApi.grid.appScope.lastSelectedRow){if(o.target.className.indexOf("ui-grid-cell-contents")>-1){var n=k.gridApi.grid.appScope.lastSelectedRow.entity;k.loadRecord(n);k.controllerData.isNew=false}}})},};k.filter=function(){k.gridApi.grid.refresh()};k.singleFilter=function(m){var n=new RegExp(k.controllerData.filterValue,"i");if(k.controllerData.filterValue!=""){document.getElementById("rf-icon-cross").style.visibility="visible"}else{document.getElementById("rf-icon-cross").style.visibility="hidden"}m.forEach(function(p){var o=false;["fieldName","fieldClassName","fieldLevelPrioriy"].forEach(function(q){if(p.entity[q].match(n)){o=true}});if(!o){p.visible=false}});return m};k.clearSearch=function(m){k.controllerData.filterValue="";k.filter()};k.loadRecord=function(n){k.showMask();if(n.CMDBClassType=="Asset"){k.controllerData.selectedClassType=cmdbClassTypes[1]}else{k.controllerData.selectedClassType=cmdbClassTypes[0]}if(n.isApplyToAllClasses==true){k.allClassesFeature.isEnabled=true}else{k.allClassesFeature.isEnabled=false}k.controllerData.enableSource=true;k.controllerData.isDisableDiv=false;var q=n.fieldLevelPrioriy.split(",");var m=[];var p=[];q.forEach(function(s){var r=[];r.APIName=k.arrSources[s.trim()];r.fieldLabel=s.trim();m.push(r);p.push(r.APIName)});angular.fromJson(strSourcePicklistValues).forEach(function(s){if(p.indexOf(s.APIName)==-1){var r=[];r.APIName=s.APIName;r.fieldLabel=s.fieldLabel.trim();m.push(r)}});k.multiSelectionModel2.selectedColumns=m;var o=[{fieldLabel:n.fieldClassName,APIName:n.fieldClassAPI}];k.controllerData.classNames=o;k.controllerData.selectedClassName=o[0];k.controllerData.isInactiveRule=n.isInactive;j.getCMDBClassFields(k.controllerData.selectedClassName.APIName,n.isApplyToAllClasses).then(function(r){var s=[];angular.fromJson(r).forEach(function(u){if(n.fieldAPIName!=u.APIName){s.push(u)}});k.multiSelectionModel1.availableColumns=s;var t=[{fieldLabel:n.fieldName,APIName:n.fieldAPIName}];k.multiSelectionModel1.selectedColumns=t})};k.checkSelectedFields=function(){k.controllerData.enableSource=(k.multiSelectionModel1.selectedColumns.length>0)?true:false};k.linkClickHandler=function(n){var m=document.getElementById(n);if(m.checked){return false}m.checked=true;k.controllerData.isFilterClicked=false;$(".filter-options").addClass("ng-hide");k.activeInactiveFilter.isActive=false;k.activeInactiveFilter.isInactive=false;k.activeInactiveFilter.isAll=false;if(n=="activeCheckbox"){k.activeInactiveFilter.isActive=m.checked}else{if(n=="inactiveCheckbox"){k.activeInactiveFilter.isInactive=m.checked}else{if(n=="allCheckbox"){k.activeInactiveFilter.isAll=m.checked}}}k.controllerData.showRecords="";if(k.activeInactiveFilter.isAll==true){k.controllerData.showRecords=""}else{if(k.activeInactiveFilter.isActive==true){k.controllerData.showRecords="active"}else{if(k.activeInactiveFilter.isInactive==true){k.controllerData.showRecords="inactive"}}}k.getFieldSourcePriorities()};k.getFieldSourcePriorities=function(){j.getFieldSourcePriorities(k.controllerData.showRecords).then(function(m){k.myData=angular.fromJson(m);a(function(){if(k.gridApi.selection.selectRow){if(k.controllerData.isFirstLoad==true&&k.myData.length>0){k.gridApi.selection.selectRow(k.myData[0]);k.loadRecord(k.myData[0]);k.controllerData.isNew=false;k.controllerData.isFirstLoad=false;k.controllerData.firstTimeDisableDiv=false}else{k.gridApi.selection.clearSelectedRows();k.newButtonHandler()}}})})};k.classTypeChanged=function(){j.getCMDBClassNames(k.controllerData.selectedClassType.fieldValue).then(function(m){k.controllerData.classNames=angular.fromJson(m);k.multiSelectionModel1.availableColumns=[];k.multiSelectionModel1.selectedColumns=[];k.multiSelectionModel2.selectedColumns=angular.fromJson(strSourcePicklistValues);k.allClassesFeature.isEnabled=false})};k.classNameChanged=function(){if(k.controllerData.selectedClassName){j.getCMDBClassFields(k.controllerData.selectedClassName.APIName,false).then(function(m){k.multiSelectionModel1.availableColumns=angular.fromJson(m);k.multiSelectionModel1.selectedColumns=[];k.multiSelectionModel2.selectedColumns=angular.fromJson(strSourcePicklistValues);k.allClassesFeature.isEnabled=false})}};k.removeFieldSourcePriority=function(m){f.RuleNumber=m;h.showDialog({title:k._Labels.Delete,titleI18nKey:"support.sr.reopen.errorHeader",text:k._Labels.DeleteConfirmMessage,callBackFn:k.deleteFieldSourcePriority})};k.deleteFieldSourcePriority=function(){j.deleteFieldSourcePriority(f.RuleNumber).then(function(m){k.getFieldSourcePriorities()})};k.showFieldAlreadyExistWarning=function(o,p,q,n,r,m){f.isApplyToAllClasses=o;f.isInactiveRule=p;f.selectedClassAPIName=q;f.selectedFields=n;f.selectedSources=r;h.showDialog({title:k._Labels.Warning,titleI18nKey:"support.sr.reopen.errorHeader",text:k._Labels.RulesAlreadyExistWarning+" "+m,callBackFn:k.saveAfterValidation})};k.saveAfterValidation=function(){j.save(f.isApplyToAllClasses,f.isInactiveRule,f.selectedClassAPIName,f.selectedFields,f.selectedSources).then(function(m){k.getFieldSourcePriorities()})};k.save=function(){var m=[];for(var o=0;o<k.multiSelectionModel1.selectedColumns.length;o++){m[o]=k.multiSelectionModel1.selectedColumns[o].APIName}var p=[];for(var o=0;o<k.multiSelectionModel2.selectedColumns.length;o++){p[o]=k.multiSelectionModel2.selectedColumns[o].APIName}var n=k.allClassesFeature.isEnabled;if(m.length==0){g.openInfoMessage(null,"error",k._Labels.SelectFieldValidation,undefined,"[id=messageDiv]");return false}if(m.length>0&&p.length>0){if(k.controllerData.isNew){j.validateRulesExist(m,k.controllerData.selectedClassName.APIName,n).then(function(q){if(q.fieldAlreadyExist){k.showFieldAlreadyExistWarning(n,k.controllerData.isInactiveRule,k.controllerData.selectedClassName.APIName,m,p,q.fieldAlreadyExist)}else{j.save(n,k.controllerData.isInactiveRule,k.controllerData.selectedClassName.APIName,m,p).then(function(r){k.getFieldSourcePriorities()})}})}else{j.save(n,k.controllerData.isInactiveRule,k.controllerData.selectedClassName.APIName,m,p).then(function(q){k.getFieldSourcePriorities()})}}};var l=function(){k.getFieldSourcePriorities()};l();k.moveRight=function(o){var p=angular.element("#availableColumns"+o).find(".ui-sortable-selected");k[o].selectedItemsInAvailableFields=[];angular.forEach(p,function(r){var q;for(q=0;q<k[o].availableColumns.length;q++){if(r.id==k[o].availableColumns[q].APIName){k[o].selectedItemsInAvailableFields.push(q)}}});if(k[o].selectedItemsInAvailableFields.length>0){var m=[];k[o].selectedItemsInAvailableFields.sort(function(r,q){return r==q?0:q>r?1:-1});angular.forEach(k[o].selectedItemsInAvailableFields,function(q){m.push(k[o].availableColumns[q]);k[o].availableColumns.splice(q,1)});var n;for(n=m.length-1;n>=0;n--){k[o].selectedColumns.push(m[n])}k[o].selectedItemsInAvailableFields=[]}k.checkSelectedFields()};k.getSelectedIndices=function(n){var o=angular.element("#selectedColumns"+n).find(".ui-sortable-selected");var m=[];angular.forEach(o,function(q){var p;for(p=0;p<k[n].selectedColumns.length;p++){if(q.id==k[n].selectedColumns[p].APIName){m.push(p)}}});return m};k.moveLeft=function(o){k[o].selectedItemsInSelectedFields=[];k[o].selectedItemsInSelectedFields=k.getSelectedIndices(o);if(k[o].selectedItemsInSelectedFields.length>0){var m=[];k[o].selectedItemsInSelectedFields.sort(function(q,p){return q==p?0:p>q?1:-1});angular.forEach(k[o].selectedItemsInSelectedFields,function(p){m.push(k[o].selectedColumns[p]);k[o].selectedColumns.splice(p,1)});var n;for(n=m.length-1;n>=0;n--){k[o].availableColumns.push(m[n])}k[o].selectedItemsInSelectedFields=[];k.sortSelectedColumns(o)}k.checkSelectedFields()};k.moveUp=function(n){k[n].selectedItemsInSelectedFields=[];k[n].selectedItemsInSelectedFields=k.getSelectedIndices(n);if(k[n].selectedItemsInSelectedFields.length>0){k[n].selectedItemsInSelectedFields.sort(function(p,o){return p==o?0:o>p?-1:1});var m=0;angular.forEach(k[n].selectedItemsInSelectedFields,function(o){if(o>0){var p=o-1;for(p;p>=0;p--){if(k[n].selectedItemsInSelectedFields.indexOf(p)==-1){break}}if(p>=0){var q=k[n].selectedColumns[o];k[n].selectedColumns[o]=k[n].selectedColumns[o-1];k[n].selectedColumns[o-1]=q;k[n].selectedItemsInSelectedFields[m]=o-1}}m=m+1})}};k.onKeyDownSelectElem=function(o){o=o||window.event;var p=document.getElementById("availableColumnsmultiSelectionModel1");var n=document.querySelector(".ui-sortable-selected");o.preventDefault();if(o.keyCode=="38"&&k.focusedIndex!=0){k.focusedIndex--;if(n.previousSibling&&n.previousSibling.previousSibling){n.previousSibling.previousSibling.classList.add("ui-sortable-selected");n.classList.remove("ui-sortable-selected");n=n.previousSibling.previousSibling}}else{if(o.keyCode=="40"&&k.focusedIndex<(k.multiSelectionModel1.availableColumns.length-1)){k.focusedIndex++;if(n.nextSibling&&n.nextSibling.nextSibling){n.nextSibling.nextSibling.classList.add("ui-sortable-selected");n.classList.remove("ui-sortable-selected");n=n.nextSibling.nextSibling}}}if(p&&n){var m=p.clientHeight;p.scrollTop=n.offsetTop-m}};k.selectOnClick=function(m){k.focusedIndex=m;var n=document.getElementById("availableColumnsmultiSelectionModel1");if(n){n.focus()}};k.moveDown=function(n){k[n].selectedItemsInSelectedFields=[];k[n].selectedItemsInSelectedFields=k.getSelectedIndices(n);if(k[n].selectedItemsInSelectedFields.length>0){k[n].selectedItemsInSelectedFields.sort(function(p,o){return p==o?0:o>p?1:-1});var m=0;angular.forEach(k[n].selectedItemsInSelectedFields,function(o){if(o<k[n].selectedColumns.length-1){var p=o+1;for(p;p<k[n].selectedColumns.length;p++){if(k[n].selectedItemsInSelectedFields.indexOf(p)==-1){break}}if(p<k[n].selectedColumns.length){var q=k[n].selectedColumns[o];k[n].selectedColumns[o]=k[n].selectedColumns[o+1];k[n].selectedColumns[o+1]=q;k[n].selectedItemsInSelectedFields[m]=o+1}}m=m+1})}};k.moveTop=function(o){k[o].selectedItemsInSelectedFields=[];k[o].selectedItemsInSelectedFields=k.getSelectedIndices(o);if(k[o].selectedItemsInSelectedFields.length>0){var m=0;k[o].selectedItemsInSelectedFields.sort(function(q,p){return q==p?0:p>q?-1:1});angular.forEach(k[o].selectedItemsInSelectedFields,function(p){var r=k[o].selectedColumns[p];var q=p;for(q;q>m;q--){k[o].selectedColumns[q]=k[o].selectedColumns[q-1]}k[o].selectedColumns[m]=r;m=m+1});var n=0;k[o].selectedItemsInSelectedFields=[];for(n;n<m;n++){k[o].selectedItemsInSelectedFields.push(n)}}};k.moveBottom=function(o){k[o].selectedItemsInSelectedFields=[];k[o].selectedItemsInSelectedFields=k.getSelectedIndices(o);if(k[o].selectedItemsInSelectedFields.length>0){var m=k[o].selectedColumns.length-1;k[o].selectedItemsInSelectedFields.sort(function(q,p){return q==p?0:p>q?1:-1});angular.forEach(k[o].selectedItemsInSelectedFields,function(p){var r=k[o].selectedColumns[p];var q=p+1;for(q;q<=m;q++){k[o].selectedColumns[q-1]=k[o].selectedColumns[q]}k[o].selectedColumns[m]=r;m=m-1})}var n=m+1;k[o].selectedItemsInSelectedFields=[];for(n;n<k[o].selectedColumns.length;n++){k[o].selectedItemsInSelectedFields.push(n)}};k.sortableOptionsList=d.extendOptions({connectWith:".sortable-data-container",update:function(m,n){if((n.item.sortable.source[0].id=="selectedColumnsmultiSelectionModel2"&&n.item.sortable.droptarget[0].id!="selectedColumnsmultiSelectionModel2")||(n.item.sortable.source[0].id!="selectedColumnsmultiSelectionModel2"&&n.item.sortable.droptarget[0].id=="selectedColumnsmultiSelectionModel2")){n.item.sortable.cancel()}k.checkSelectedFields()}});k.sortSelectedColumns=function(n){var m=[];if(k[n].selectedItemsInAvailableFields.length>0){angular.forEach(k[n].selectedItemsInAvailableFields,function(o){m.push(k[n].availableColumns[o].APIName)});k[n].selectedItemsInAvailableFields=[]}k[n].availableColumns.sort(function(p,o){return p.fieldLabel==o.fieldLabel?0:o.fieldLabel>p.fieldLabel?-1:1});if(m.length>0){angular.forEach(m,function(p){var o;for(o=0;o<k.availableColumns.length;o++){if(k[n].availableColumns[o].APIName==p){k[n].selectedItemsInAvailableFields.push(o)}}})}}}]);fieldPrioritizationModule.factory("dataServices",["$rootScope","$q",function(a,b){return{getLookupresult:function(d){var c=b.defer();return c.promise}}}]);fieldPrioritizationModule.factory("SSLocalDataStore",["$q",function(a){var b={};return{setAppMetadata:function(c,d){b[c]=d},getAppMetadata:function(c){if(c){return b[c]}else{return appMetada}}}}]);fieldPrioritizationModule.factory("confirmationDialogService",["$modal","$rootScope",function(c,a){var b={};b.showDialog=function(d){return c.open({templateUrl:resourceUrl+"templates/confirmation-dialog-rfadmin.html",controller:["$scope","$modalInstance",function(e,f){e.title=d.title;e.titleI18nKey=d.titleI18nKey;e.text=d.text;e.textI18nKey=d.textI18nKey;e.confirmationYes=_Labels.Yes;e.confirmationNo=_Labels.No;e.confirm=function(){if(d.callBackFn){d.callBackFn()}f.close()};e.dismiss=function(){f.dismiss()}}]})};return b}]);