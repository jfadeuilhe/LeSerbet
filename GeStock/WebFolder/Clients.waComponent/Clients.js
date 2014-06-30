
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Clients';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var bAppliquer = {};	// @button
	var id_vDesignation = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	bAppliquer.click = function bAppliquer_click (event)// @startlock
	{// @endlock
		selArticles()
	};// @lock

	id_vDesignation.change = function id_vDesignation_change (event)// @startlock
	{// @endlock
		selClient();
	};// @lock

	function selClient(){
		var tmpTxt = $$(getHtmlId("id_vDesignation")).getValue();
		$comp.sources.clients.query('Titre = :1 || Nom = :1 || Contact = :1',{ params: ["*" + tmpTxt + "*"]});
	};
	
	// @region eventManager// @startlock
	WAF.addListener(this.id + "_bAppliquer", "click", bAppliquer.click, "WAF");
	WAF.addListener(this.id + "_id_vDesignation", "change", id_vDesignation.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
