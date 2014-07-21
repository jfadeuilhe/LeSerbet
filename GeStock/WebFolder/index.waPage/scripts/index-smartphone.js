
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var id_vCibleType = {};	// @radioGroup
	var id_vCibleVal = {};	// @textField
	var bAnnul = {};	// @button
	var bVal = {};	// @button
	var bCible = {};	// @button
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
	var cibleTimeout; 	//Pour gérer un délais avant recherche
	var $art = $("#cArt");
	var $noId = $("#id_NoId");
	var $ouvreArt = $("#cDetails");

	
	vCible.Type = "P";
	vCible.Valeur = "US";
	vCible.Libellé = "Etats-Unis";
	
	vArticle.codeArt = "";
	vArticle.PVente = "";
	vArticle.StockDispo = "";
	
	$$("bCible").setValue(vCible.Libellé);
	
// eventHandlers// @lock

	id_vCibleType.click = function id_vCibleType_click (event)// @startlock
	{// @endlock
		var t = $$("id_vCibleType").getValue();
		
		if(t == vCible.Type){	//Reprendre les valeurs de départ
			$$("id_vCibleVal").setValue(vCible.Valeur);
			$$("id_vCibleLib").setValue(vCible.Libellé);
			$$("bVal").enable();
		}else{
			$$("id_vCibleVal").setValue("");
			$$("id_vCibleLib").setValue("Entrez une valeur");
			$$("bVal").disable();
		}
	};// @lock

	id_vCibleVal.keyup = function id_vCibleVal_keyup (event)// @startlock
	{// @endlock
		if(cibleTimeout != null)
			clearTimeout(cibleTimeout);
		
		cibleTimeout = setTimeout(verifValCible,500);
	};// @lock
	
	function verifValCible(){
		var t = $$("id_vCibleType").getValue();
		var v = $$("id_vCibleVal").getValue();
		var l = $$("id_vCibleLib").getValue();
	
		sources.articles.WAK_Art_VerifCible(t,v,{
			onSuccess: function(event){
				if(event.result){
					tabLib = event.result.lib;
					tabVal = event.result.val;
					if(tabLib.length==1){
						$$("id_vCibleVal").setValue(tabVal[0]);
						$$("id_vCibleLib").setValue(tabLib[0]);
						$$("bVal").enable();
					} else {
						$$("id_vCibleLib").setValue("Entrez une valeur");
						$$("bVal").disable();
					}
				}
			},
			onError: function(error){
				$$("tInfos").setValue("Ereur : "+error.error[0].message);
			}});		
	}

	bAnnul.click = function bAnnul_click (event)// @startlock
	{// @endlock
		var $pop = $("#Choix_Cible");
		
		$pop.hide();
	};// @lock

	bVal.click = function bVal_click (event)// @startlock
	{// @endlock
		var $pop = $("#Choix_Cible");
		
		vCible.Type = $$("id_vCibleType").getValue();
		vCible.Valeur = $$("id_vCibleVal").getValue();
		vCible.Libellé = $$("id_vCibleLib").getValue();
	
		$$("bCible").setValue(vCible.Libellé);
		
		$pop.hide();
	};// @lock

	bCible.click = function bCible_click (event)// @startlock
	{// @endlock
		var $pop = $("#Choix_Cible");
		
		$pop.show();
		
		$$("id_vCibleType").setValue(vCible.Type);
		$$("id_vCibleVal").setValue(vCible.Valeur);
		$$("id_vCibleLib").setValue(vCible.Libellé);
		
	};// @lock

	iEfface.click = function iEfface_click (event)// @startlock
	{// @endlock
		$$("id_txtArt").setValue("");
	};// @lock

	iPrec.click = function iPrec_click (event)// @startlock
	{// @endlock
		sources.articles.selectPrevious({
			onSuccess: function(event){ infoArticle(); 
		}});
	};// @lock

	iFerme.click = function iFerme_click (event)// @startlock
	{// @endlock
		$ouvreArt.hide();
	};// @lock

	iSuiv.click = function iSuiv_click (event)// @startlock
	{// @endlock
		sources.articles.selectNext({
			onSuccess: function(event){ infoArticle(); 
		}});
	};// @lock

	dgStock.onRowDblClick = function dgStock_onRowDblClick (event)// @startlock
	{// @endlock
		$ouvreArt.show();
		infoArticle();
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
		if(srchTimeout != null)
			clearTimeout(srchTimeout);
		
		srchTimeout = setTimeout(selArticles,500);
	};// @lock


	function selArticles(){
		var tmpTxt = $$("id_txtArt").getValue();
		
		var txtSrch="((Epuisé = false) && ((Stock_Départ=0) || (Stock_Theorique>0)))";
		
		if(tmpTxt!=""){
		
			txtSrch += " && "+txt2Srch_OU_ET(tmpTxt,"Désignation,Titre_Fournis,NomFournisseur,Millésime,Couleur,Code_Cru_A.Village,Code_Cru_A.Secteur,Code_Cru_A.Région_Appellation");
			
			//alert("Recherche : "+txtSrch);
		} 
		
		sources.articles.query(txtSrch,{
			onSuccess: function(event){ infoArticle(); }});
		
	};
	
	function infoArticle(){
		
		if(sources.articles.Code_Article != vArticle.codeArt){
			sources.articles.WAK_Art_Info(vCible.Type ,vCible.Valeur,{
				onSuccess: function(event){
					if(event.result){
						vArticle.codeArt = event.result.codeArt;
						vArticle.PVente = event.result.PVente;
						vArticle.StockDispo = event.result.StockDispo;
						if(sources.articles.Code_Article == vArticle.codeArt ){
							$$("id_StockDispo").setValue(vArticle.StockDispo);
							$$("id_PVente").setValue(vArticle.PVente);
						}else{
							$$("id_StockDispo").setValue("...");
							$$("id_PVente").setValue("...");
						}
					}
				},
				onError: function(error){
					$$("tInfos").setValue("Ereur : "+error.error[0].message);
				}});	
		}
	};
	
// @region eventManager// @startlock
	WAF.addListener("id_vCibleType", "click", id_vCibleType.click, "WAF");
	WAF.addListener("id_vCibleVal", "keyup", id_vCibleVal.keyup, "WAF");
	WAF.addListener("bAnnul", "click", bAnnul.click, "WAF");
	WAF.addListener("bVal", "click", bVal.click, "WAF");
	WAF.addListener("bCible", "click", bCible.click, "WAF");
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
