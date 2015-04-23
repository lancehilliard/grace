// ==UserScript==
// @name         GV: Hide Hangouts Ad
// @namespace    http://digitalcreations.cc
// @description  Hide the Hangouts ad which appears on the Voice webpage
// @author       @lancehilliard
// @downloadUrl  https://raw.githubusercontent.com/lancehilliard/grace/master/UserScripts/GoogleVoiceHideHangoutsAd.js
// @version      0.201504231520
// @match        https://www.google.com/voice
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==

if (jQuery) {
    jQuery(document).ready(function () {
        function hideAd() {
            var ads = $('div.jfk-bubble');
            if (ads.length > 0) {
                ads.hide();
            }
            else {
                setTimeout(hideAd, 1000);
            }
        }
        hideAd();
    });
}