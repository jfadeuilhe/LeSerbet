
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
	var vFourn = {};	// @textField
	var vMillesime = {};	// @textField
	var id_vFouStar = {};	// @radioGroup
	var bEffacer = {};	// @button
	var id_vArtActifs = {};	// @checkbox
	var vDesignation = {};	// @textField
	// @endregion// @endlock
	
	// eventHandlers// @lock

	vFourn.keyup = function vFourn_keyup (event)// @startlock
	{// @endlock
		doSelArticle();
	};// @lock

	vMillesime.keyup = function vMillesime_keyup (event)// @startlock
	{// @endlock
		doSelArticle();
	};// @lock

	id_vFouStar.change = function id_vFouStar_change (event)// @startlock
	{// @endlock
		//debugger;
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
	
	vDesignation.keyup = function vDesignation_keyup (event)// @startlock
	{// @endlock
		doSelArticle();
	};// @lock
	
	//Mes Méthodes
	
	this.getCurSrch = function(cs){
		cs.vArtActifs=$$(getHtmlId("id_vArtActifs")).getValue();
		cs.vArtDeisgn=$$(getHtmlId("vDesignation")).getValue();
		cs.vArtMill=$$(getHtmlId("vMillesime")).getValue();
//		cs.vFouActifs=;
		cs.vFouDesign=$$(getHtmlId("vFourn")).getValue();
		cs.vFouStar=$$(getHtmlId("id_vFouStar"))._value;
//		cs.vCliActifs=;
//		cs.vCliDesign=;
	};
	
	this.setCurSrch = function(cs){
		$$(getHtmlId("id_vArtActifs")).setValue(cs.vArtActifs);
		$$(getHtmlId("vDesignation")).setValue(cs.vArtDeisgn);
		$$(getHtmlId("vMillesime")).setValue(cs.vArtMill);
//		cs.vFouActifs=;
		$$(getHtmlId("vFourn")).setValue(cs.vFouDesign);
		$$(getHtmlId("id_vFouStar"))._value=cs.vFouStar;
//		cs.vCliActifs=;
//		cs.vCliDesign=;

		selArticles();
	};
	
	function clearSrch(){
		//debugger;
		$$(getHtmlId("id_vArtActifs")).setValue(true);
		$$(getHtmlId("id_vFouStar")).setValue("0");
		$$(getHtmlId("vDesignation")).setValue("");
		$$(getHtmlId("vFourn")).setValue("");
		$$(getHtmlId("vMillesime")).setValue("");
		
		selArticles();	
	};
	
	function doSelArticle(){
		
		if(srchTimeout != null)
			clearTimeout(srchTimeout);
		
		srchTimeout = setTimeout(selArticles,500);
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
			txtSrch += " && ("+txt2Srch_OU_ET(txtDes,"Désignation,Couleur")+")";	//" && (Désignation = '*" + txtDes + "*')";
		if(txtMill != "")
			txtSrch += " && ("+txt2Srch_OU(txtMill,"Millésime")+")";	//" && (Millésime = '" + txtMill + "')";
		if(txtFour != "")
			txtSrch += " && ("+txt2Srch_OU(txtFour,"Titre_Fournis")+")";	//"" && (Titre_Fournis = '" + txtFour + "*')";
			
		$$("tInfos").setValue("recherche en cours...");
		$comp.sources.articles.query(txtSrch,{
				onSuccess: function(event){
					$$("tInfos").setValue("");
					//infoArticle();
				}});
	};
	
	function infoArticle(){
		
		if($comp.sources.articles.Code_Article != ""){
			//$$(getHtmlId("id_StockDispo")).setValue("");
			//$$(getHtmlId("id_PVente")).setValue("");
			$comp.sources.articles.WAK_Art_Info("P" ,"US",{
				onSuccess: function(event){
					if(event.result){
						//vArticle.codeArt = event.result.codeArt;
						//vArticle.PVente = event.result.PVente;
						//vArticle.StockDispo = event.result.StockDispo;
						if($comp.sources.articles.Code_Article == event.result.codeArt ){
							$$(getHtmlId("id_StockDispo")).setValue(event.result.StockDispo);
							$$(getHtmlId("id_PVente")).setValue(event.result.PVente);
						}else{
							$$(getHtmlId("id_StockDispo")).setValue("...");
							$$(getHtmlId("id_PVente")).setValue("...");
						}
					}
				},
				onError: function(error){
					$$("tInfos").setValue("Ereur : "+error.error[0].message);
				}});	
		}
	};
	
	// @region eventManager// @startlock
	WAF.addListener(this.id + "_vFourn", "keyup", vFourn.keyup, "WAF");
	WAF.addListener(this.id + "_vMillesime", "keyup", vMillesime.keyup, "WAF");
	WAF.addListener(this.id + "_vDesignation", "keyup", vDesignation.keyup, "WAF");
	WAF.addListener(this.id + "_id_vFouStar", "change", id_vFouStar.change, "WAF");
	WAF.addListener(this.id + "_bEffacer", "click", bEffacer.click, "WAF");
	WAF.addListener(this.id + "_id_vArtActifs", "change", id_vArtActifs.change, "WAF");
	// @endregion// @endlock

	};// @lock

}// @startlock
return constructor;
})();// @endlock
