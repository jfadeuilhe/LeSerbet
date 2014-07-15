
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var bClose = {};	// @buttonImage
	var dgStock = {};	// @dataGrid
	var id_Login = {};	// @login
	var documentEvent = {};	// @document
	var id_txtArt = {};	// @textField
// @endregion// @endlock
	
	var srchTimeout; 	//Pour gérer un délais avant recherche
	var $art = $("#cArt");
	var $ouvreArt = $("#cDetails");

// eventHandlers// @lock

	bClose.click = function bClose_click (event)// @startlock
	{// @endlock
		$ouvreArt.hide();
	};// @lock

	dgStock.onRowDblClick = function dgStock_onRowDblClick (event)// @startlock
	{// @endlock
		$ouvreArt.show();
	};// @lock

	id_Login.logout = function id_Login_logout (event)// @startlock
	{// @endlock
		$art.hide();
	};// @lock

	id_Login.login = function id_Login_login (event)// @startlock
	{// @endlock
		selArticles();
		$art.show();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		var user = waf.directory.currentUser();
		$ouvreArt.hide();
		if(user!=null) {
			$art.show();
			selArticles();
		}else{
			$art.hide();
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
		
			txtSrch = "(Epuisé = false) && "+txt2Srch_OU_ET(tmpTxt,"Désignation,Titre_Fournis,NomFournisseur,Millésime");//,Couleur,Code_Cru_A.Village");

		} 
		
		//alert("Recherche : "+txtSrch);
		
		sources.articles.query(txtSrch);
		
		//sources.articles.query(txtSrch); 	//'Titre = :1 || Nom = :1 || Contact = :1',{ params: ["*" + tmpTxt + "*"]});
	};
// @region eventManager// @startlock
	WAF.addListener("bClose", "click", bClose.click, "WAF");
	WAF.addListener("dgStock", "onRowDblClick", dgStock.onRowDblClick, "WAF");
	WAF.addListener("id_Login", "logout", id_Login.logout, "WAF");
	WAF.addListener("id_Login", "login", id_Login.login, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("id_txtArt", "change", id_txtArt.change, "WAF");
// @endregion
};// @endlock
