
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
	
	//selClient();

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

	this.getCurSrch = function(cs){
//		cs.vArtActifs=$$(getHtmlId("id_vArtActifs")).getValue();
//		cs.vArtDeisgn=$$(getHtmlId("vDesignation")).getValue();
//		cs.vArtMill=$$(getHtmlId("vMillesime")).getValue();
//		cs.vFouActifs=$$(getHtmlId("id_vActifs")).getValue();
//		cs.vFouDesign=$$(getHtmlId("id_vDesignation")).getValue();
//		cs.vFouStar=$$(getHtmlId("id_vFouStar"))._value;
		cs.vCliActifs=$$(getHtmlId("vActifs")).getValue();
		cs.vCliDesign=$$(getHtmlId("id_vDesignation")).getValue();
	};
	
	this.setCurSrch = function(cs){
//		$$(getHtmlId("id_vArtActifs")).setValue(cs.vArtActifs);
//		$$(getHtmlId("vDesignation")).setValue(cs.vArtDeisgn);
//		$$(getHtmlId("vMillesime")).setValue(cs.vArtMill);
//		$$(getHtmlId("id_vActifs")).setValue(cs.vFouActifs);
//		$$(getHtmlId("id_vDesignation")).setValue(cs.vFouDesign);
//		$$(getHtmlId("id_vFouStar"))._value=cs.vFouStar;
		$$(getHtmlId("vActifs")).setValue(cs.vCliActifs);
		$$(getHtmlId("id_vDesignation")).setValue(cs.vCliDesign);
		
		selClient();
	};
	
	function selClient(){
		var tmpTxt = $$(getHtmlId("id_vDesignation")).getValue();
		var valActif = $$(getHtmlId("vActifs")).getValue();
		
		var txtSrch = "";
				
		if(tmpTxt!=""){
		
			txtSrch = txt2Srch_OU(tmpTxt,"Titre,Nom,Contact");

			if(valActif)
				txtSrch = "((Inactif = false) && "+txtSrch+")";
		} else {
			if(valActif)
				txtSrch = "(Inactif = false)";
		}
		
		$$("tInfos").setValue("recherche en cours...");
		$comp.sources.clients.query(txtSrch,{
				onSuccess: function(event){
					$$("tInfos").setValue("");
				}});
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
