
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
	var id_vFouStar = {};	// @radioGroup
	var id_vActifs = {};	// @checkbox
	var bEffacer = {};	// @button
	var id_vDesignation = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	id_vFouStar.change = function id_vFouStar_change (event)// @startlock
	{// @endlock
		selFourn();
	};// @lock

	id_vActifs.change = function id_vActifs_change (event)// @startlock
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
		var valActif = $$(getHtmlId("id_vActifs")).getValue();
		var valStar = $$(getHtmlId("id_vFouStar"))._value; 
		
		var txtSrch = "";
				
		if(tmpTxt!=""){
		
			txtSrch = txt2Srch_OU(tmpTxt,"Titre,Nom,Contact,Ville");
			
			if(valActif)
				txtSrch = "((Inactif = false) && "+txtSrch+")";
		} else {
			if(valActif)
				txtSrch = "(Inactif = false)";
		}

		if(valStar == "1")
			txtSrch += " && (Code_Fournis_A.Domaine_Star = true)";
		else if(valStar == "2")
			txtSrch = " && (Code_Fournis_A.Domaine_Star = false)";
			
		$comp.sources.fournisseurs.query(txtSrch); 	//'Titre = :1 || Nom = :1 || Contact = :1',{ params: ["*" + tmpTxt + "*"]});
	};

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_id_vFouStar", "change", id_vFouStar.change, "WAF");
	WAF.addListener(this.id + "_id_vActifs", "change", id_vActifs.change, "WAF");
	WAF.addListener(this.id + "_bEffacer", "click", bEffacer.click, "WAF");
	WAF.addListener(this.id + "_id_vDesignation", "keyup", id_vDesignation.keyup, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
