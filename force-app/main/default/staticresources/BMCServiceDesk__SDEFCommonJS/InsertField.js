function setDisplayText(d,c,b){if(b<=4||c.value.lastIndexOf(":lookup:")==-1){generateMergeField(d,c,b)}else{var a=document.getElementById("messageDiv");if(a!=null||a!="undefined"){a.style.display="block"}}}function generateMergeField(f,b,a){rerenderPanel(a,b.value,"{{"+b.value+"}}");if(b.value.lastIndexOf(">")==-1){var e="";var c=document.getElementById(f);if(c!=null&&c!="undefined"){c.value=b.options[b.selectedIndex].text}var c=document.getElementById(f+"API");if(c!=null&&c!="undefined"){c.value="{{"+b.value+e+"}}"}togglePanel()}else{var d=document.getElementById("displayPanel");if(d!=null&&d!="undefined"){d.style.display="none"}}}function togglePanel(){var a=document.getElementById("displayPanel");if(a!=null&&a!="undefined"){a.style.display="block"}}function insertMergeField(d){var e;var f=document.getElementById(d);if(f!=null&&f!="undefined"){e=f.value;if(e.search(":lookup:")!=-1){e=e.replace(":lookup:",".")}if(window.opener!=null&&!window.opener.closed){var c=window.opener.HTTPHeaders;if(window.opener.document.selection){c.focus();sel=window.opener.document.selection.createRange();sel.text=e}else{if(c.selectionStart||c.selectionStart=="0"){var b=c.selectionStart;var a=c.selectionEnd;c.value=c.value.substring(0,b)+e+c.value.substring(a,c.value.length);c.selectionStart=b+e.length;c.selectionEnd=b+e.length}else{c.value+=e}}}window.close()}};