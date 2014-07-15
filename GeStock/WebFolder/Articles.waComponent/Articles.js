
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Articles';
	// @endregion// @endlock

	var srchTimeout; 	//Pour gérer un délais avant recherche
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var id_vFouStar = {};	// @radioGroup
	var bEffacer = {};	// @button
	var id_vArtActifs = {};	// @checkbox
	var vMillesime = {};	// @textField
	var vFourn = {};	// @textField
	var vDesignation = {};	// @textField
	// @endregion// @endlock

	//$$(getHtmlId("vActifs")).setValue(true);
	
	clearSrch();
	
	// eventHandlers// @lock

	id_vFouStar.change = function id_vFouStar_change (event)// @startlock
	{// @endlock
		selArticles();
	};// @lock

	bEffacer.click = function bEffacer_click (event)// @startlock
	{// @endlock
		clearSrch();
	};// @lock

	id_vArtActifs.change = function id_vArtActifs_change (event)// @startlock
	{// @endlock
		selArticles();
	};// @lock

	vMillesime.change = function vMillesime_change (event)// @startlock
	{// @endlock
		selArticles();
	};// @lock

	vFourn.change = function vFourn_change (event)// @startlock
	{// @endlock
		selArticles();
	};// @lock
	
	vDesignation.change = function vDesignation_change (event)// @startlock
	{// @endlock
		selArticles();
	};// @lock
	
//	selArticles()
	
	
	function clearSrch(){
		//debugger;
		$$(getHtmlId("id_vArtActifs")).setValue(true);
		$$(getHtmlId("id_vFouStar")).setValue("0");
		$$(getHtmlId("vDesignation")).setValue("");
		$$(getHtmlId("vFourn")).setValue("");
		$$(getHtmlId("vMillesime")).setValue("");
		
		selArticles();	
	};
	
	function selArticles(){

		var txtDes = $$(getHtmlId("vDesignation")).getValue();
		var txtFour = $$(getHtmlId("vFourn")).getValue();
		var txtMill = $$(getHtmlId("vMillesime")).getValue();
		var valActif = $$(getHtmlId("id_vArtActifs")).getValue();
		var valStar = $$(getHtmlId("id_vFouStar"))._value; //sgetValue();
		var txtSrch = "";
//debugger;
		if(valActif == true)
			txtSrch = "(Epuisé = false)";
		else
			txtSrch = "(Désignation != '')";
		if(valStar == "1")
			txtSrch += " && (Code_Fournis_A.Domaine_Star = true)";
		else if(valStar == "2")
			txtSrch = " && (Code_Fournis_A.Domaine_Star = false)";
		if(txtDes != "")
			txtSrch += " && ("+txt2Srch_ET(txtDes,"Désignation")+")";	//" && (Désignation = '*" + txtDes + "*')";
		if(txtMill != "")
			txtSrch += " && ("+txt2Srch_OU(txtMill,"Millésime")+")";	//" && (Millésime = '" + txtMill + "')";
		if(txtFour != "")
			txtSrch += " && ("+txt2Srch_OU(txtFour,"Titre_Fournis")+")";	//"" && (Titre_Fournis = '" + txtFour + "*')";
		
		$comp.sources.articles.query(txtSrch);
			
		//$comp.sources.articles.query(':1',{ params: [ txtSrch + "*"]});
		//sources.mainLayout_component2_articles.query('Désignation = :1',{ params: ["*" + design + "*"]});
		//$$('component0_articles').query('Désignation = :1',{ params: ["*" + tmpTxt + "*"]});
	};
	
	// @region eventManager// @startlock
	WAF.addListener(this.id + "_id_vFouStar", "change", id_vFouStar.change, "WAF");
	WAF.addListener(this.id + "_bEffacer", "click", bEffacer.click, "WAF");
	WAF.addListener(this.id + "_id_vArtActifs", "change", id_vArtActifs.change, "WAF");
	WAF.addListener(this.id + "_vMillesime", "change", vMillesime.change, "WAF");
	WAF.addListener(this.id + "_vFourn", "change", vFourn.change, "WAF");
	WAF.addListener(this.id + "_vDesignation", "change", vDesignation.change, "WAF");
	// @endregion// @endlock

	};// @lock

}// @startlock
return constructor;
})();// @endlock
