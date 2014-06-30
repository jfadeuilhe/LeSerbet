
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var bArticles = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	bArticles.click = function bArticles_click (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("bArticles", "click", bArticles.click, "WAF");
// @endregion
};// @endlock
