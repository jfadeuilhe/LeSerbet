
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var iEfface = {};	// @image
	var iPrec = {};	// @image
	var iFerme = {};	// @image
	var iSuiv = {};	// @image
	var dgStock = {};	// @dataGrid
	var id_Login = {};	// @login
	var documentEvent = {};	// @document
	var id_txtArt = {};	// @textField
// @endregion// @endlock
	
	var srchTimeout; 	//Pour gérer un délais avant recherche
	var $art = $("#cArt");
	var $noId = $("#id_NoId");
	var $ouvreArt = $("#cDetails");

// eventHandlers// @lock

	iEfface.click = function iEfface_click (event)// @startlock
	{// @endlock
		$$("id_txtArt").setValue("");
	};// @lock

	iPrec.click = function iPrec_click (event)// @startlock
	{// @endlock
		sources.articles.selectPrevious();
	};// @lock

	iFerme.click = function iFerme_click (event)// @startlock
	{// @endlock
		$ouvreArt.hide();
	};// @lock

	iSuiv.click = function iSuiv_click (event)// @startlock
	{// @endlock
		sources.articles.selectNext();
	};// @lock

	dgStock.onRowDblClick = function dgStock_onRowDblClick (event)// @startlock
	{// @endlock
		$ouvreArt.show();
	};// @lock

	id_Login.logout = function id_Login_logout (event)// @startlock
	{// @endlock
		$art.hide();
		$noId.show();
	};// @lock

	id_Login.login = function id_Login_login (event)// @startlock
	{// @endlock
		selArticles();
		$art.show();
		$noId.hide();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		var user = waf.directory.currentUser();
		$ouvreArt.hide();
		if(user!=null) {
			$art.show();
			$noId.hide();
			selArticles();
		}else{
			$art.hide();
			$noId.show();
		}

	};// @lock

	id_txtArt.change = function id_txtArt_change (event)// @startlock
	{// @endlock
		selArticles();
	};// @lock


	function selArticles(){
		var tmpTxt = $$("id_txtArt").getValue();
		
		var txtSrch="(Epuisé = false)";
		
		if(tmpTxt!=""){
		
			txtSrch = "(Epuisé = false) && "+txt2Srch_OU_ET(tmpTxt,"Désignation,Titre_Fournis,NomFournisseur,Millésime,Couleur,Code_Cru_A.Village,Code_Cru_A.Secteur,Code_Cru_A.Région_Appellation");
			
			//alert("Recherche : "+txtSrch);
		} 
		
		sources.articles.query(txtSrch);
		
	};
// @region eventManager// @startlock
	WAF.addListener("iEfface", "click", iEfface.click, "WAF");
	WAF.addListener("iPrec", "click", iPrec.click, "WAF");
	WAF.addListener("iFerme", "click", iFerme.click, "WAF");
	WAF.addListener("iSuiv", "click", iSuiv.click, "WAF");
	WAF.addListener("dgStock", "onRowDblClick", dgStock.onRowDblClick, "WAF");
	WAF.addListener("id_Login", "logout", id_Login.logout, "WAF");
	WAF.addListener("id_Login", "login", id_Login.login, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("id_txtArt", "change", id_txtArt.change, "WAF");
// @endregion
};// @endlock
