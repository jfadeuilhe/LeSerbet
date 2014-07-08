﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Articles';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var bEffacer = {};	// @buttonImage
	var vFStar = {};	// @radioGroup
	var vActifs = {};	// @checkbox
	var vMillesime = {};	// @textField
	var vFourn = {};	// @textField
	var vDesignation = {};	// @textField
	// @endregion// @endlock

	//$$(getHtmlId("vActifs")).setValue(true);
	
	clearSrch();
	
	// eventHandlers// @lock

	bEffacer.click = function bEffacer_click (event)// @startlock
	{// @endlock
		clearSrch();
	};// @lock

	vFStar.change = function vFStar_change (event)// @startlock
	{// @endlock
		selArticles();
	};// @lock

	vActifs.change = function vActifs_change (event)// @startlock
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
		$$(getHtmlId("vActifs")).setValue(true);
		$$(getHtmlId("vFStar")).setValue("0");
		$$(getHtmlId("vDesignation")).setValue("");
		$$(getHtmlId("vFourn")).setValue("");
		$$(getHtmlId("vMillesime")).setValue("");
		
		selArticles();	
	};
	
	function selArticles(){

		var txtDes = $$(getHtmlId("vDesignation")).getValue();
		var txtFour = $$(getHtmlId("vFourn")).getValue();
		var txtMill = $$(getHtmlId("vMillesime")).getValue();
		var valActif = $$(getHtmlId("vActifs")).getValue();
		var valStar = $$(getHtmlId("vFStar"))._value; //sgetValue();
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
	WAF.addListener(this.id + "_bEffacer", "click", bEffacer.click, "WAF");
	WAF.addListener(this.id + "_vFStar", "change", vFStar.change, "WAF");
	WAF.addListener(this.id + "_vActifs", "change", vActifs.change, "WAF");
	WAF.addListener(this.id + "_vMillesime", "change", vMillesime.change, "WAF");
	WAF.addListener(this.id + "_vFourn", "change", vFourn.change, "WAF");
	WAF.addListener(this.id + "_vDesignation", "change", vDesignation.change, "WAF");
	// @endregion// @endlock

	};// @lock

}// @startlock
return constructor;
})();// @endlock
