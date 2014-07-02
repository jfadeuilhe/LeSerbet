﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'geStock';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var bRapports = {};	// @button
	var bTabDeBord = {};	// @button
	var bArticles = {};	// @button
	var bClients = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock
	
	var curState = ""; 	//Articles
	affState("Articles");
	
	bRapports.click = function bRapports_click (event)// @startlock
	{// @endlock
		chgState("Rapports"); //$$(getHtmlId('ecransComp')).loadComponent('/Rapports.waComponent');
	};// @lock

	bTabDeBord.click = function bTabDeBord_click (event)// @startlock
	{// @endlock
		chgState("TabDeBord"); //$$(getHtmlId('ecransComp')).loadComponent('/TabDeBord.waComponent');
	};// @lock

	bArticles.click = function bArticles_click (event)// @startlock
	{// @endlock
		chgState("Articles"); //$$(getHtmlId('ecransComp')).loadComponent('/Articles.waComponent');
	};// @lock

	bClients.click = function bClients_click (event)// @startlock
	{// @endlock
		chgState("Clients"); //$$(getHtmlId('ecransComp')).loadComponent('/Clients.waComponent');
	};// @lock

	function chgState(s){
	
		if(curState != s){
			affState(s)
			$$(getHtmlId('ecransComp')).loadComponent('/'+s+'.waComponent');
		}
	}
	
	function affState(s){
		
		if(curState != ""){
			$(getHtmlObj("b"+curState)).css("width", "158");
			$(getHtmlObj("b"+curState)).removeAttr("disabled");
		}
		curState = s;
		if(curState != ""){
			$(getHtmlObj("b"+curState)).css("width", "188");
			$(getHtmlObj("b"+curState)).attr("disabled","disabled");
		}
	}

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_bRapports", "click", bRapports.click, "WAF");
	WAF.addListener(this.id + "_bTabDeBord", "click", bTabDeBord.click, "WAF");
	WAF.addListener(this.id + "_bArticles", "click", bArticles.click, "WAF");
	WAF.addListener(this.id + "_bClients", "click", bClients.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock