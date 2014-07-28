
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Clients';
	// @endregion// @endlock
	
	var srchTimeout; 	//Pour gérer un délais avant recherche
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var vActifs = {};	// @checkbox
	var bAppliquer = {};	// @button
	var id_vDesignation = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock
//debugger;
	//$comp.sources.vCliDesign.sync();
	
	selClient();

	vActifs.change = function vActifs_change (event)// @startlock
	{// @endlock
		selClient();
	};// @lock

	bAppliquer.click = function bAppliquer_click (event)// @startlock
	{// @endlock
		$$(getHtmlId("id_vDesignation")).setValue("");
		selClient();
	};// @lock

	id_vDesignation.keyup = function id_vDesignation_keyup (event)// @startlock
	{// @endlock
		if(srchTimeout != null)
			clearTimeout(srchTimeout);
		
		srchTimeout = setTimeout(selClient,500);
	};// @lock

	function selClient(){
//		debugger;
		var tmpTxt = $$(getHtmlId("id_vDesignation")).getValue();
		var valActif = $$(getHtmlId("vActifs")).getValue();
		
		var txtSrch = "";
				
		if(tmpTxt!=""){
		
			txtSrch = txt2Srch_OU(tmpTxt,"Titre,Nom,Contact");
//debugger;	
			
//			var lst = tmpTxt.split(" ");
//			txtSrch = "(((Titre = '*"+lst[0]+"*') || (Nom = '*"+lst[0]+"*') || (Contact = '*"+lst[0]+"*'))";
//			if(lst.length > 1){
//				for(var i=1; i<lst.length; i++){
//					if(lst[i] != "")
//						txtSrch += " || ((Titre = '*"+lst[i]+"*') || (Nom = '*"+lst[i]+"*') || (Contact = '*"+lst[i]+"*'))";
//				}
//			} 

			if(valActif)
				txtSrch = "((Inactif = false) && "+txtSrch+")";
		} else {
			if(valActif)
				txtSrch = "(Inactif = false)";
		}
			
		$comp.sources.clients.query(txtSrch); 	//'Titre = :1 || Nom = :1 || Contact = :1',{ params: ["*" + tmpTxt + "*"]});
	};
	
	// @region eventManager// @startlock
	WAF.addListener(this.id + "_vActifs", "change", vActifs.change, "WAF");
	WAF.addListener(this.id + "_id_vDesignation", "keyup", id_vDesignation.keyup, "WAF");
	WAF.addListener(this.id + "_bAppliquer", "click", bAppliquer.click, "WAF");
	// @endregion// @endlock

	};// @lock

}// @startlock
return constructor;
})();// @endlock
