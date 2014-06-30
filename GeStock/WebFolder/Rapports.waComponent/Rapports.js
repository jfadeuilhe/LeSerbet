
(function Component (id) {// @lock

// Add the code that needs to be shared between components here
	
function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Rapports';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var tabEtatsEvent = {};	// @dataSource
	var bExecuter = {};	// @button
	var vSrchRapp_2 = {};	// @textField
	// @endregion// @endlock
	
//	var tabEtats = [];
//	tabEtats.push({ci_Ref_FE:1, iv_Nom_FE:"Mon état", nv_Descriptif:"Indescriptible"});

	var srchDef = "(iv_Type_Fichier = 0) && (nv_DispoDansRapports = true)"; 	//Ne prendre que les états autorisés !
//	var zeEtats = [{ci_Ref_FE:67, iv_Nom_FE:"Récap Commandes", nv_Descriptif:""}];
		
	var lesEtats = $comp.sources.sYS_FIC_EXTERNES.WAK_FicExt_Get(0,{
								onSuccess: function(event){ 	//code à exécuter lorsque la méthode 4D a terminé
								
									if(event.result){
										
									//	var tEtats = this[getHtmlId("tabEtats")];//$$(getHtmlId("tabEtats"));	//Récupérer le tableau !
										
										/*tabEtats = event.result.lesEtats;//$comp.sources.tabEtats
										tabEtats.push({ci_Ref_FE:1, iv_Nom_FE:"Mon état", nv_Descriptif:"Indescriptible"});
										tabEtats.push({ci_Ref_FE:1, iv_Nom_FE:"Mon tab", nv_Descriptif:getHtmlId("tabEtats")});*/
										
										this[getHtmlId("tabEtats")] = event.result.lesEtats;//$comp.sources.tabEtats
										
										$comp.sources.tabEtats.sync();
										
										//var dgRapp = $$(getHtmlId("dgRapp"));	//Récupérer la datagrid
										
										//dgRapp.gridController.dataGrid.sources.redraw();
										
									}
									
								},
								onError: function(error){
									$$("tInfos").setValue("Ereur : "+error.error[0].message);
								}});
	
	//var lesFicExt = $comp.sources.sYS_FIC_EXTERNES.all();
	
	//$comp.sources.sYS_FIC_EXTERNES.query(srchDef);
	
	// eventHandlers// @lock

	tabEtatsEvent.onCollectionChange = function tabEtatsEvent_onCollectionChange (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

	bExecuter.click = function bExecuter_click (event)// @startlock
	{// @endlock
		var dgRapp = $$(getHtmlId("dgRapp"));	//Récupérer la datagrid
		var o = {};
		var tab = $comp.sources.tabEtats.sources;//this[getHtmlId("tabEtats")];
		
		o.quoi = "ExecRapport";
		o.quel = tab[dgRapp.getSelectedRows()[0]];
		o.du = $$(getHtmlId("vDDebut")).getValue();
		o.au = $$(getHtmlId("vDFin")).getValue();
		
		//o.dgRapp = $$(getHtmlId("dgRapp"));
		//o.src = $$(getHtmlId("dgRapp")).getSelectedRows();
		
		$comp.sources.sYS_FIC_EXTERNES.WAK_ficExt_Exec(o);
		
	};// @lock

	vSrchRapp_2.keyup = function vSrchRapp_2_keyup (event)// @startlock
	{// @endlock
		//var dgRapp = $$(getHtmlId("dgRapp"));	//Récupérer la datagrid
		var txtDes = $$(getHtmlId("vSrchRapp_2")).getValue();
		var txtSrch = "";
		
		//$comp.sources.tabEtats.all();
		
		if(txtDes != ""){
			var lst = txtDes.split(" ");
			txtSrch = "(iv_Nom_FE = '*"+lst[0]+"*')";
			if(lst.length > 1){
				for(var i=1; i<lst.length; i++){
					if(lst[i] != "")
						txtSrch += " && (iv_Nom_FE = '*"+lst[i]+"*')";
				}
			} 
			$comp.sources.tabEtats.query(txtSrch);
			$comp.sources.tabEtats.sync();
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_tabEtats", "onCollectionChange", tabEtatsEvent.onCollectionChange, "WAF");
	WAF.addListener(this.id + "_bExecuter", "click", bExecuter.click, "WAF");
	WAF.addListener(this.id + "_vSrchRapp_2", "keyup", vSrchRapp_2.keyup, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
