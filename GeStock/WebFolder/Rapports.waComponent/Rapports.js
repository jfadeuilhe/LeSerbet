
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Rapports';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var vSrchRapp_2 = {};	// @textField
	var vSrchRapp = {};	// @textField
	// @endregion// @endlock

	var srchDef = "(iv_Type_Fichier = 0) && (nv_DispoDansRapports = true)"; 	//Ne prendre que les états autorisés !
//	var zeEtats = [{ci_Ref_FE:67, iv_Nom_FE:"Récap Commandes", nv_Descriptif:""}];
		
	var lesEtats = $comp.sources.sYS_FIC_EXTERNES.WAK_FicExt_Get(0,{
								onSuccess: function(event){ 	//code à exécuter lorsque la méthode 4D a terminé
								
									if(event.result){
										
										tabEtats = event.result.lesEtats;
										tabEtats.push({ci_Ref_FE:1, iv_Nom_FE:"Mon état", nv_Descriptif:"Indescriptible"});
										
										$comp.sources.tabEtats.sync();
										
										var dgRapp = $$(getHtmlId("dgRapp"));	//Récupérer la datagrid
										
										dgRapp.gridController.dataGrid.redraw();
										
									}
									
								},
								onError: function(error){
									$$("tInfos").setValue("Ereur : "+error.error[0].message);
								}});
	
	//$comp.sources.sYS_FIC_EXTERNES.query(srchDef);
	
	// eventHandlers// @lock

	vSrchRapp_2.keyup = function vSrchRapp_2_keyup (event)// @startlock
	{// @endlock
		
		//var dgRapp = $$(getHtmlId("dgRapp"));	//Récupérer la datagrid
		var txtDes = $$(getHtmlId("vSrchRapp_2")).getValue();
		var txtSrch = "";
		
		if(txtDes != ""){
			var lst = txtDes.split(" ");
			txtSrch = "(iv_Nom_FE = '*"+lst[0]+"*')";
			if(lst.length > 1){
				for(var i=1; i<lst.length; i++){
					if(lst[i] != "")
						txtSrch += " && (iv_Nom_FE = '*"+lst[i]+"*')";
				}
			} 
		}
		$comp.sources.tabEtats.query(txtSrch);
		
	};// @lock

	vSrchRapp.keyup = function vSrchRapp_keyup (event)// @startlock
	{// @endlock
		var txtDes = $$(getHtmlId("vSrchRapp")).getValue();
		var txtSrch = srchDef;
		
		if(txtDes != ""){
			var lst = txtDes.split(" ");
			txtSrch += " && (iv_Nom_FE = '*"+lst[0]+"*')";
			if(lst.length > 1){
				for(var i=1; i<lst.length; i++){
					if(lst[i] != "")
						txtSrch += " && (iv_Nom_FE = '*"+lst[i]+"*')";
				}
			} 
		}
		$comp.sources.sYS_FIC_EXTERNES.query(txtSrch);
		
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_vSrchRapp_2", "keyup", vSrchRapp_2.keyup, "WAF");
	WAF.addListener(this.id + "_vSrchRapp", "keyup", vSrchRapp.keyup, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
