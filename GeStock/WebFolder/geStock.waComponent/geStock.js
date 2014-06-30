
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
	var bTDB = {};	// @button
	var bArticles = {};	// @button
	var bClients = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	bRapports.click = function bRapports_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('ecransComp')).loadComponent('/Rapports.waComponent');
	};// @lock

	bTDB.click = function bTDB_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('ecransComp')).loadComponent('/TabDeBord.waComponent');
	};// @lock

	bArticles.click = function bArticles_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('ecransComp')).loadComponent('/Articles.waComponent');
	};// @lock

	bClients.click = function bClients_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('ecransComp')).loadComponent('/Clients.waComponent');
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_bRapports", "click", bRapports.click, "WAF");
	WAF.addListener(this.id + "_bTDB", "click", bTDB.click, "WAF");
	WAF.addListener(this.id + "_bArticles", "click", bArticles.click, "WAF");
	WAF.addListener(this.id + "_bClients", "click", bClients.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
