var PE=String.fromCharCode(1055);var NONPRINT=String.fromCharCode(172);var DZHE=String.fromCharCode(1119);var EF=String.fromCharCode(1092);var NEW_SEPARATOR_PREFIX=String.fromCharCode(182)+String.fromCharCode(2365)+String.fromCharCode(1240);var PE_NEW=NEW_SEPARATOR_PREFIX+PE;var NONPRINT_NEW=NEW_SEPARATOR_PREFIX+NONPRINT;var DZHE_NEW=NEW_SEPARATOR_PREFIX+DZHE;var EF_NEW=NEW_SEPARATOR_PREFIX+EF;var NEWSEPARATORMAP=new Object();NEWSEPARATORMAP[PE]=PE_NEW;NEWSEPARATORMAP[NONPRINT]=NONPRINT_NEW;NEWSEPARATORMAP[DZHE]=DZHE_NEW;NEWSEPARATORMAP[EF]=EF_NEW;function RFSplit(a,c,b){var d=[];if(a&&a.indexOf(NEW_SEPARATOR_PREFIX)!=-1){c=NEWSEPARATORMAP[c]}if(b){d=a.split(c,b)}else{d=a.split(c)}return d}function getSeparatorByCustomSetting(a){if(isUseOldSeparator){return a}else{return NEWSEPARATORMAP[a]}}function getNewOrOldSeparator(a,b){if(a&&a.indexOf(NEW_SEPARATOR_PREFIX)!=-1){b=NEWSEPARATORMAP[b]}return b};