
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Fournisseurs';
	// @endregion// @endlock

	var srchTimeout; 	//Pour gérer un délais avant recherche
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var vActifs = {};	// @checkbox
	var bEffacer = {};	// @button
	var id_vDesignation = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	vActifs.change = function vActifs_change (event)// @startlock
	{// @endlock
		selFourn();
	};// @lock

	bEffacer.click = function bEffacer_click (event)// @startlock
	{// @endlock
		$$(getHtmlId("id_vDesignation")).setValue("");
		selFourn();
	};// @lock

	id_vDesignation.keyup = function id_vDesignation_keyup (event)// @startlock
	{// @endlock
		if(srchTimeout != null)
			clearTimeout(srchTimeout);
		
		srchTimeout = setTimeout(selFourn,500);
	};// @lock

	function selFourn(){
		var tmpTxt = $$(getHtmlId("id_vDesignation")).getValue();
		var valActif = $$(getHtmlId("vActifs")).getValue();
		
		var txtSrch = "";
				
		if(tmpTxt!=""){
		
			txtSrch = txt2Srch_OU(tmpTxt,"Titre,Nom,Contact,Ville");
//debugger;	

			if(valActif)
				txtSrch = "((Inactif = false) && "+txtSrch+")";
		} else {
			if(valActif)
				txtSrch = "(Inactif = false)";
		}
			
		$comp.sources.fournisseurs.query(txtSrch); 	//'Titre = :1 || Nom = :1 || Contact = :1',{ params: ["*" + tmpTxt + "*"]});
	};

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_vActifs", "change", vActifs.change, "WAF");
	WAF.addListener(this.id + "_bEffacer", "click", bEffacer.click, "WAF");
	WAF.addListener(this.id + "_id_vDesignation", "keyup", id_vDesignation.keyup, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
