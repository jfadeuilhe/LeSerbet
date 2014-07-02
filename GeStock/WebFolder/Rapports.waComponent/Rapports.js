
(function Component (id) {// @lock

// Add the code that needs to be shared between components here
	
function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Rapports';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var dgRapp = {};	// @dataGrid
	var tabEtatsEvent = {};	// @dataSource
	var bExecuter = {};	// @button
	var vSrchRapp = {};	// @textField
	// @endregion// @endlock
	
//	var tabEtats = [];
//	tabEtats.push({ci_Ref_FE:1, iv_Nom_FE:"Mon état", nv_Descriptif:"Indescriptible"});

	var srchDef = "(iv_Type_Fichier = 0) && (nv_DispoDansRapports = true)"; 	//Ne prendre que les états autorisés !
//	var zeEtats = [{ci_Ref_FE:67, iv_Nom_FE:"Récap Commandes", nv_Descriptif:""}];
		
	$comp.sources.sYS_FIC_EXTERNES.WAK_FicExt_Get(0,{	//Récupérer les états autorisés
					onSuccess: function(event){ 	
						if(event.result){
							tabEtats = event.result.lesFic.slice(0); 	//Pour garder une copie !
							this[getHtmlId("tabEtats")] = event.result.lesFic; 
							$comp.sources.tabEtats.sync();
						}
					},
					onError: function(error){
						$$("tInfos").setValue("Ereur : "+error.error[0].message);
					}});
		
	$comp.sources.sYS_FIC_EXTERNES.WAK_FicExt_Get(2,{	//Récupérer les recherches existantes
					onSuccess: function(event){ 	
						if(event.result){
							tabSrch = event.result.lesFic;//.slice(0); 	//Pour garder une copie !
							this[getHtmlId("tabSrch")] = event.result.lesFic; 
							$comp.sources.tabSrch.sync();
						}
					},
					onError: function(error){
						$$("tInfos").setValue("Ereur : "+error.error[0].message);
					}});
	
	// eventHandlers// @lock

	dgRapp.onRowClick = function dgRapp_onRowClick (event)// @startlock
	{// @endlock
		var leRapp = tabEtats[$$(getHtmlId("dgRapp")).getSelectedRows()[0]];
		//var dgSrch = $$(getHtmlId("dgSrch"));
		
	/*	$comp.sources.tabSrch.query("",{
			onSuccess:function(event){
				$comp.sources.tabSrch.query("iv_Num_Table = " + leRapp.iv_Num_Table);
			}
		});*/
		
		//var txtSrch = "iv_Num_Table = " + leRapp.iv_Num_Table;
							
		$comp.sources.tabSrch.query("iv_Num_Table = " + leRapp.iv_Num_Table); /*,{
			onSuccess:function(event){
				this[getHtmlId("tabSrch")] = event.entityCollection;
				$comp.sources.tabSrch.sync();
			}
		});*/
		
	};// @lock

	tabEtatsEvent.onCollectionChange = function tabEtatsEvent_onCollectionChange (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

	bExecuter.click = function bExecuter_click (event)// @startlock
	{// @endlock
		var dgRapp = $$(getHtmlId("dgRapp"));	//Récupérer la datagrid
		var dgSrch = $$(getHtmlId("dgSrch"));	//Récupérer la datagrid
		var o = {};
		
		o.quoi = "ExecRapport";
		o.quel = tabEtats[dgRapp.getSelectedRows()[0]];
		o.cli = $$(getHtmlId("vCli")).getValue();
		o.fou = $$(getHtmlId("vFou")).getValue();
		o.srch = tabSrch[dgSrch.getSelectedRows()[0]];
		o.du = $$(getHtmlId("vDDebut")).getValue();
		o.au = $$(getHtmlId("vDFin")).getValue();
		
		$$("tInfos").setValue("Etat en cours d'execution...");
		
		$comp.sources.sYS_FIC_EXTERNES.WAK_ficExt_Exec(o,{
								onSuccess: function(event){ 	//code à exécuter lorsque la méthode 4D a terminé
									$$("tInfos").setValue("");
									if(event.result){
										var o = event.result;//$comp.sources.tabEtats
										if(o.retour != "Aucun"){
											
										}
									}
								},
								onError: function(error){
									$$("tInfos").setValue("Ereur : "+error.error[0].message);
								}});
	};// @lock

	vSrchRapp.keyup = function vSrchRapp_keyup (event)// @startlock
	{// @endlock
		var txtDes = $$(getHtmlId("vSrchRapp")).getValue();
		var txtSrch = "";
		var pris = false;
		
		$$("tInfos").setValue("");
		if(txtDes != ""){
			var lst = txtDes.split(" ");
			var newTab = [];
			
			for(var l=0; l<tabEtats.length; l++){
				pris = false;
				
				if(tabEtats[l].iv_Nom_FE == '*'+lst[0]+'*'){
					pris = true;
					for(var i=1; i<lst.length; i++){
						if(tabEtats[l].iv_Nom_FE != '*'+lst[0]+'*')
							pris = false;
					}
				}
				
				if(pris)
					newTab.push(tabEtats[l]);
			}
			
			this[getHtmlId("tabEtats")] = newTab;
			
		} else {
			this[getHtmlId("tabEtats")] = tabEtats;
		}
		
		$comp.sources.tabEtats.sync();
		
		
	/*	$comp.sources.tabEtats.all();
		$$("tInfos").setValue("");
		if(txtDes != ""){
			var lst = txtDes.split(" ");
			txtSrch = "(iv_Nom_FE = '*"+lst[0]+"*')";
			if(lst.length > 1){
				for(var i=1; i<lst.length; i++){
					if(lst[i] != "")
						txtSrch += " && (iv_Nom_FE = '*"+lst[i]+"*')";
				}
			} 
			$$("tInfos").setValue("Filtre : " + txtSrch);
		}
		$comp.sources.tabEtats.query(txtSrch);
		$comp.sources.tabEtats.sync();*/
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_dgRapp", "onRowClick", dgRapp.onRowClick, "WAF");
	WAF.addListener(this.id + "_tabEtats", "onCollectionChange", tabEtatsEvent.onCollectionChange, "WAF");
	WAF.addListener(this.id + "_bExecuter", "click", bExecuter.click, "WAF");
	WAF.addListener(this.id + "_vSrchRapp", "keyup", vSrchRapp.keyup, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
