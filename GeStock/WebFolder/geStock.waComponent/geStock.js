
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'geStock';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var bFournisseurs = {};	// @button
	var bRapports = {};	// @button
	var bTabDeBord = {};	// @button
	var bArticles = {};	// @button
	var bClients = {};	// @button
	// @endregion// @endlock

	//Mes déclarations
	var curState = ""; 		//État courant d'affichage
	var curSrch = {
			"vArtActifs":true,
			"vArtDeisgn":"",
			"vArtMill":"",
			"vFouActifs":true,
			"vFouDesign":"",
			"vFouStar":"0",
			"vCliActifs":true,
			"vCliDesign":""
		};
		
	//Mes initialisations
	chgState("Articles");
	
	// eventHandlers// @lock

	bFournisseurs.click = function bFournisseurs_click (event)// @startlock
	{// @endlock
		chgState("Fournisseurs"); //$$(getHtmlId('ecransComp')).loadComponent('/Articles.waComponent');
	};// @lock
	
	bRapports.click = function bRapports_click (event)// @startlock
	{// @endlock
		chgState("Rapports"); //$$(getHtmlId('ecransComp')).loadComponent('/Rapports.waComponent');
	};// @lock

	bTabDeBord.click = function bTabDeBord_click (event)// @startlock
	{// @endlock
		chgState("TabDeBord"); //$$(getHtmlId('ecransComp')).loadComponent('/TabDeBord.waComponent');
	};// @lock

	bArticles.click = function bArticles_click (event)// @startlock
	{// @endlock
		chgState("Articles"); //$$(getHtmlId('ecransComp')).loadComponent('/Articles.waComponent');
	};// @lock

	bClients.click = function bClients_click (event)// @startlock
	{// @endlock
		chgState("Clients"); //$$(getHtmlId('ecransComp')).loadComponent('/Clients.waComponent');
	};// @lock

	function chgState(s){

		if(curState != s){
			if(curState != ""){ 	//Récupérer les variables...
				//debugger;
				var curComp = $$(getHtmlId("ecransComp"));
				if(curComp.getCurSrch != null){
					curComp.getCurSrch(curSrch);
				}
			}
			affState(s); 			//Changer d'état
			if(curState != ""){ 	//Installer le composant
				$$(getHtmlId('ecransComp')).loadComponent({
					path: '/'+curState+'.waComponent',
					onSuccess: function(){
						//Remettre les variables
						setTimeout(appSrch,500);
				}});
			} else { 				//Virer le composant ?...
				$$(getHtmlId('ecransComp')).removeComponent();
			}
		}
	}
	
	function appSrch(){
		var curComp = $$(getHtmlId("ecransComp"));
		if(curComp.setCurSrch != null)
			curComp.setCurSrch(curSrch);
	};
	
	function affState(s){
		
		if(curState != ""){
			$(getHtmlObj("b"+curState)).css("width", "158");
			var bout = $$(getHtmlId("b"+curState));
			bout.enable();
		}
		curState = s;
		if(curState != ""){
			$(getHtmlObj("b"+curState)).css("width", "188");
			var bout = $$(getHtmlId("b"+curState));
			bout.disable();
		}
	}

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_bFournisseurs", "click", bFournisseurs.click, "WAF");
	WAF.addListener(this.id + "_bRapports", "click", bRapports.click, "WAF");
	WAF.addListener(this.id + "_bTabDeBord", "click", bTabDeBord.click, "WAF");
	WAF.addListener(this.id + "_bArticles", "click", bArticles.click, "WAF");
	WAF.addListener(this.id + "_bClients", "click", bClients.click, "WAF");
	// @endregion// @endlock

	};// @lock

}// @startlock
return constructor;
})();// @endlock
