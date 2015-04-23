// ==UserScript==
// @name         IRCCloud++
// @namespace    http://digitalcreations.cc
// @version      0.201504231605
// @author       @lancehilliard
// @downloadUrl  https://raw.githubusercontent.com/lancehilliard/grace/master/UserScripts/IRCCloud%2B%2B.js
// @match        *.irccloud.com/*
// @grant        none 
// ==/UserScript==

if (jQuery) {
    jQuery(document).ready(function () {        
        if (jQuery(':contains(© 2015 IRCCloud Ltd.)').length > 0 && jQuery(':contains(Icons from FatCow)').length > 0) {
            
            var channelIsVisible = !document.hidden;
            
            var names = {};
            names['qobmr'] = 'Qnavry Obmrzna'
            names['gqo_'] = 'Gvz Oebjanjryy';
            names['envyfpbqre'] = 'Xrvgu Znggvk';
            names['Nepunivhf'] = 'Wrss Yrngu';
            names['qgyrqorggre'] = 'Qvyyba Yrqorggre';
            names['sryvkcqk'] = 'Oenaqba Jbegba';
            names['wjbbq05'] = 'Wbanguna Jbbq';
            names['WFpnecnpr'] = 'Wrss Fpnecnpr';
            names['Flyvqqne'] = 'Wnfba Zlref';
            names['angunanryfzvgu'] = 'Angunanry Fzvgu';
            names['qfgnearf'] = 'Qbhtynf Fgnearf';
            names['qezbuhaqeb'] = 'Qnivq Zbuhaqeb';
            names['Znyrhf'] = 'Revx Qbzvathrm';
            names['xvqgnatrevar'] = 'Oenq Unapbpx';
            names['Zrygurbhf'] = 'Qnavry Fbfxry';
            names['oxzbagtbzrel'] = 'Oenq Zbagtbzrel';
            names['otfjnafba'] = 'Oevna Fjnafba';
            names['qcevgpurgg'] = 'Qnavry Cevgpurgg';
            names['fcrnxvatpbqr'] = 'Qnavry Yvffare';
            names['ibatevccra'] = 'Zvxr Pbpuena';
            names['tcfcnxr'] = 'Trbetr Fcnxr';
            names['fnafrers'] = 'Avpbyr Yrjnaqbjfxv';
            names['oebo'] = 'Oelna Ebovafba';
            names['wbrcsrethfba'] = 'Wbr Srethfba';
            names['svaavbhf'] = 'Fpbgg Svaarl';
            names['wbfujyrjvf'] = 'Wbfu Yrjvf';
            names['ynapruvyyvneq'] = 'Ynapr Uvyyvneq';
            names['Ryivf'] = 'Ryivf uhobg';
            names['wzpunearf'] = 'Wnfba Punearf';
            names['wbrloebja'] = 'Wbrl Oebja';
            names['iregvtbfvgl'] = 'Gnyvrffva Crasbhaq';
            names['bevnf'] = 'Pynhqvb Qbaaqryvatre';
            names['Qna9186'] = 'Qnavry Urff';
            names['qpbura613'] = 'Qnivq Pbura';
            names['wnzrfselzna'] = 'Wnzrf Selzna';
            names['wselzna'] = 'Wnzrf Selzna';
            names['wnzrfjuvgr'] = 'Wnzrf Juvgr';
            names['zqcngevpx'] = 'Qna Cngevpx';
            names['g0qqj'] = 'Gbqq Jevtug';
            names['gunqbbq'] = 'Zngg Uneqre';
            names['xlnfuvv'] = 'Pnffvr Pbyrzna';
            names['Tracuyhk'] = 'Oenaqba Gvpr';
            names['Ybatyvhf'] = 'Znggurj Ybatyrl';
            names['pevggre42'] = 'Qnaal Punzoreyva';
            names['rgrecf'] = 'Revp Grecfgen';
            names['wrerzlxraqnyy'] = 'Wrerzl Xraqnyy';
            names['freebsg'] = 'Sbeerfg Jvyyvnzf';
            names['ercvi'] = 'Wbfu Gnlybe';
            
            nameplateDiv = $('<div style="padding: 5px; background-color: #1E72FF; position: absolute; right: 0; bottom: 0; font-size: small; color: white;">IRCCloud++</div>')
            nameplateDiv.appendTo('body');
            
            function rot13(s) { // http://stackoverflow.com/a/617685/116895
                return s.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
            }
            
            var showRealNameFunc = function (link) {
                var knownUser = false;
                $.each(names, function(ircName, realName) {
                    ircName = rot13(ircName);
                    realName = rot13(realName);
                    if (!knownUser && link.text().toLowerCase().indexOf(ircName.toLowerCase()) !== -1) {
                        var originalLinkTitle = link.attr('title') + '';
                        if (originalLinkTitle.indexOf(realName) === -1) {
                            var newLinkTitle = originalLinkTitle + ' (' + realName + ')';
                            link.attr('title', newLinkTitle);
                        }
                        jQuery('textarea[name="msg"]').attr('placeholder', ircName + ': ' + realName);
                        knownUser = true;
                    }
                });
                link.css('font-style', knownUser ? 'normal' : 'italic');
            }
            
            DomWatcher = window.MutationObserver || window.WebKitMutationObserver;
            var observer = new DomWatcher(function(mutations, observer) {
                mutations.forEach(function(mutation) {
                    if (mutation.target.id !== 'timeContainer') {
                        addedNode:
                        for (var addedNodesIndex = 0; addedNodesIndex < mutation.addedNodes.length; addedNodesIndex++) {
                            var addedNode = mutation.addedNodes[addedNodesIndex];
                            if (addedNode.classList && addedNode.classList.length > 0) {
                                for (var classListIndex = 0; classListIndex < addedNode.classList.length; classListIndex++) { 
                                    var className = addedNode.classList[classListIndex];
                                    if (className === 'messageRow' || className === 'user') {
                                        showRealNameFunc($(addedNode).find('a.bufferLink').last());
                                        break addedNode;
                                    }
                                }
                            }
                        }
                    }
                });
            });
            
            observer.observe(document, {
                subtree: true,
                childList: true
            });

            setTimeout(function() {
                $('a.bufferLink').filter(function(){
                    return $(this).text().indexOf('(') === -1;
                }).each(function() {
                    showRealNameFunc($(this));
                });
            }, 5000);
            
            $('<style type="text/css">::-webkit-input-placeholder { text-align:right; }\ninput:-moz-placeholder { text-align:right; }</style>').appendTo($('head'));

            setInterval(function(){
                if (channelIsVisible) {
                    var embedCloseLinks = $('a.embedClose, a.close');
                    embedCloseLinks.each(function(){
                        var embedCloseLink = $(this);
                        setTimeout(function(){
                            embedCloseLink.hide().click().remove();
                        }, 6000);
                    });
                }
            }, 1000);
            
            document.addEventListener("visibilitychange", function(){channelIsVisible = !document.hidden;}, false);

        }
    });
}