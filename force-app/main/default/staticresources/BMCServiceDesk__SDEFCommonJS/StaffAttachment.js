var WinMsg;function closeWindow(){window.close()}function deleteAttachmentHandler(b){var a=confirm(confirmationMessage);if(a==true){deleteAttachment(b)}}function triggerAttachmentCountEvent(a){var b=new CustomEvent("activityFeedAttachFileChange",{detail:a});window.opener.document.dispatchEvent(b)}var i=1;var intervalID;clearInterval(intervalID);function openAttchment(a){if(a.substring(0,3)=="069"){window.open("/"+a)}else{if(a.substring(0,3)=="00P"){window.open("/servlet/servlet.FileDownload?file="+a)}}return false}function AddAttachment(){var c=setInterval(progressbar,10);var d=true;var k=isFileEnabled?document.getElementById("inputFileHtml"):document.getElementsByName(inputfileid+":inputFile:file")[0];try{if((typeof(k.value)!="undefined")&&(typeof(k.value)!="undefined")){var h=k.files[0];if(h!=null&&h!=undefined){size=h.size;d=isFileEnabled?(maxFileSizeInBytes>=size):(maxAttachmentSizeInBytes>=size);if(!d){var l=isFileEnabled?MaxFileSizeLimit:MaxSizeLimit;GetMessageBox("bmc-message").show({msg:l,minWidth:300,title:error,height:"auto",icon:Ext.MessageBox.ERROR,buttons:Ext.MessageBox.OK,cls:"textAlignCenter"});clearInterval(c);var f=document.getElementById("loading_img");f.style.display="none";k.value="";return false}else{if(typeof(size)!="undefined"&&size<=0){Ext.Msg.show({msg:FileLengthZeroKB,minWidth:300,height:"auto",buttons:Ext.MessageBox.OK,cls:"textAlignCenter"});clearInterval(c);var f=document.getElementById("loading_img");f.style.display="none";k.value="";return false}}}}else{d=true}}catch(g){d=true}if(!d){return false}if(isFileEnabled){var b,j=false;if(!parentID&&!AttRefGeneratorID){var a=new sforce.SObject(namespace+"AttachmentRefGenerator__c");sforce.connection.create([a],{onSuccess:function(e,m){if(e[0].getBoolean("success")){b=e[0].id;AttRefGeneratorID=b;j=true;window.opener.AttRefGeneratorID=b;window.opener.setAttRefGeneratorId(b)}else{GetMessageBox("bmc-message").show({title:error,msg:MaxFileSizeLimit,icon:Ext.MessageBox.ERROR,minWidth:300,height:"auto",buttons:error.faultstring,cls:"textAlignCenter"});clearInterval(c);var n=document.getElementById("loading_img");n.style.display="none"}},onFailure:function(e,m){GetMessageBox("bmc-message").show({msg:e.faultstring,icon:Ext.MessageBox.ERROR,title:e,minWidth:300,height:"auto",buttons:Ext.MessageBox.OK,cls:"textAlignCenter"});clearInterval(c);var n=document.getElementById("loading_img");n.style.display="none"}})}else{if(parentID){b=parentID}else{b=AttRefGeneratorID}}client.createBlob("ContentVersion",{Origin:"C",PathOnClient:h.name,Title:h.name},h.name,"VersionData",h,function(m){var o=sforce.connection.query("select id, ContentDocumentId from ContentVersion WHERE Id ='"+m.id+"' limit 1");records=o.getArray("records");var e=new sforce.SObject("ContentDocumentLink");var n=records[0].ContentDocumentId;e.ContentDocumentId=n;e.LinkedEntityId=b;e.ShareType=(isChatAttachment||AttRefGeneratorID)?"I":"V";sforce.connection.create([e],{onSuccess:function(p,q){if(p[0].getBoolean("success")){if(j){assignAttRefGeneratorID(AttRefGeneratorID)}else{refreshGrid()}insertChatMessage(n,h.name);if(window.opener&&typeof(window.opener.addFileToMap)!="undefined"){window.opener.addFileToMap(records[0].Id,n)}}else{GetMessageBox("bmc-message").show({msg:((p[0].errors.message)?p[0].errors.message:fileUploadFailed),minWidth:300,icon:Ext.MessageBox.ERROR,title:error,height:"auto",buttons:Ext.MessageBox.OK,cls:"textAlignCenter"});clearInterval(c);var r=document.getElementById("loading_img");r.style.display="none"}},onFailure:function(p,q){GetMessageBox("bmc-message").show({msg:((p.message)?p.message:fileUploadFailed),minWidth:300,height:"auto",icon:Ext.MessageBox.ERROR,title:p,buttons:Ext.MessageBox.OK,cls:"textAlignCenter"});clearInterval(c);var r=document.getElementById("loading_img");r.style.display="none"}})},function(n,e,m){GetMessageBox("bmc-message").show({msg:((e)?e:fileUploadFailed),minWidth:300,height:"auto",icon:Ext.MessageBox.ERROR,title:error,buttons:Ext.MessageBox.OK,cls:"textAlignCenter"});clearInterval(c);var o=document.getElementById("loading_img");o.style.display="none"})}else{if(parentID){attachFile()}else{createAttRefGenerator()}}}function GetMessageBox(a){if(WinMsg==null){WinMsg=Ext.create("Ext.window.MessageBox")}WinMsg.baseCls=a;return WinMsg}function progressbar(){var a=document.getElementById("loading_img");a.style.display="block";if(i>100){i=10}a.style.width=(i++)+"%"};