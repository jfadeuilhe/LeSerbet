
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var login = {};	// @login
	var documentEvent = {};	// @document
// @endregion// @endlock

//	var tabEtats = [];
//	tabEtats.push({ci_Ref_FE:1, iv_Nom_FE:"Mon état", nv_Descriptif:"Indescriptible"});

// eventHandlers// @lock

	login.login = function login_login (event)// @startlock
	{// @endlock
		$$('mainLayout').loadComponent('/geStock.waComponent');
	};// @lock

	login.logout = function login_logout (event)// @startlock
	{// @endlock
		$$('mainLayout').loadComponent('/Accueil.waComponent');
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		var user = waf.directory.currentUser();
		if(user!=null) // && waf.directory.currentUserBelongsTo("Commerce")) //Agir selon user identifié...
			$$('mainLayout').loadComponent('/geStock.waComponent');
		else
			$$('mainLayout').loadComponent('/Accueil.waComponent');
		$$("tInfos").setValue("");
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("login", "login", login.login, "WAF");
	WAF.addListener("login", "logout", login.logout, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
