
(function Component (id) {// @lock

// Add the code that needs to be shared between components here
	
function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Rapports';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var vSrchSrch = {};	// @textField
	var bFermer = {};	// @button
	var vDMoins = {};	// @textField
	var cbPeriode = {};	// @combobox
	var dgRapp = {};	// @dataGrid
	var tabEtatsEvent = {};	// @dataSource
	var bExecuter = {};	// @button
	var vSrchRapp = {};	// @textField
	// @endregion// @endlock
	
	//--- Mes déclarations
	//Sélection des rapports
	var srchDef = "(iv_Type_Fichier = 0) && (nv_DispoDansRapports = true)"; 	//Ne prendre que les états autorisés !
	
	//Gestion des dates
	var cbPeriode = $$(getHtmlId("cbPeriode"));
	var vDMoins = $$(getHtmlId("vDMoins"));
	var $DMoins = $(getHtmlObj("vDMoins"));
	var vDDebut = $$(getHtmlId("vDDebut"));
	var $DDebut = $(getHtmlObj("vDDebut"));
	var vDFin = $$(getHtmlId("vDFin"));
	var $DFin = $(getHtmlObj("vDFin"));
		
	//--- Mes méthodes ---
	
	
	function dd(){
	
		var PopUp = cbPeriode.getValue();
		var NbMoins = vDMoins.getValue();
		
		//debugger;
		
		switch(PopUp){
			case "D":
				$DMoins.hide();
				$DDebut.show();
				$DFin.show();
				break;
				
			case "A":
				$DMoins.show();
				$DDebut.hide();
				$DFin.hide();
				break;
				
			case "T":
				$DMoins.show();
				$DDebut.hide();
				$DFin.hide();
				break;
				
			case "M":
				$DMoins.show();
				$DDebut.hide();
				$DFin.hide();
				break;
				
			case "S":
				$DMoins.show();
				$DDebut.hide();
				$DFin.hide();
				break;
				
			default: 	//Non
				$DMoins.hide();
				$DDebut.hide();
				$DFin.hide();
				break;
		}
		
	}
	
	function execSrch(quoi){
		
		var txtDes;
		var txtSrchR, txtSrchE, txtInfo;
		var lst;
		
	debugger;
		
		$$("tInfos").setValue("");
		txtInfo = "";
		
		//Appliquer la recherche sur les Etats
		if(quoi == 1){ 		//Faire Rapports, sinon que recherches
			
			txtDes = $$(getHtmlId("vSrchRapp")).getValue();
			txtSrchR = "";
			if(txtDes != ""){
				txtSrchR = txt2Srch_ET(txtDes,"iv_Nom_FE");
				txtInfo = "Rapports : " + txtSrchR;
			}
			$comp.sources.tabEtats.query(txtSrchR);
			
		}
		
		//Apliquer la recherche sur les Recherches
		txtDes = $$(getHtmlId("vSrchSrch")).getValue();
		if($comp.sources.tabEtats.iv_Num_Table != null)
			txtSrchE ="(iv_Num_Table = " + $comp.sources.tabEtats.iv_Num_Table+")"; 
		else
			txtSrchE = "";
			
		if(txtDes != ""){
			if(txtSrchE!="")
				txtSrchE += ' && ';
			txtSrchE += txt2Srch_ET(txtDes,"iv_Nom_FE");
		}
		if(txtSrchE != "")
			txtInfo += " Etats : " + txtSrchE;
		$comp.sources.tabSrch.query(txtSrchE);
		
		$$("tInfos").setValue(txtInfo);
		
	}
	
	//--- Mes Initialisations ---
	
	//Init des dates de recherche
	dd();
	execSrch(0);
	
	//Récupérer les états autorisés
	$comp.sources.sYS_FIC_EXTERNES.WAK_FicExt_Get(0,{	
					onSuccess: function(event){ 	
						if(event.result){
							srcEtats = event.result.lesFic.slice(0); 	//Pour garder une copie !
							tabEtats = event.result.lesFic.slice(0); 	//Pour garder une copie !
							this[getHtmlId("tabEtats")] = tabEtats; //event.result.lesFic; 
							$comp.sources.tabEtats.sync();
						}
					},
					onError: function(error){
						$$("tInfos").setValue("Ereur : "+error.error[0].message);
					}});
					
	//Récupérer les recherches existantes
	$comp.sources.sYS_FIC_EXTERNES.WAK_FicExt_Get(2,{
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

	vSrchSrch.keyup = function vSrchSrch_keyup (event)// @startlock
	{// @endlock
		execSrch(0);
		
//		var txtDes = $$(getHtmlId("vSrchSrch")).getValue();
//		var txtSrch = "";
//		var pris = false;
//		
//		$$("tInfos").setValue("");
//		
//		if(txtDes != ""){
//			var lst = txtDes.split(" ");
//			var newTab = [];
//			
//			for(var l=0; l<tabEtats.length; l++){
//				pris = false;
//				
//				if(tabEtats[l].iv_Nom_FE == '*'+lst[0]+'*'){
//					pris = true;
//					for(var i=1; i<lst.length; i++){
//						if(tabEtats[l].iv_Nom_FE != '*'+lst[0]+'*')
//							pris = false;
//					}
//				}
//				
//				if(pris)
//					newTab.push(tabEtats[l]);
//			}
//			
//			this[getHtmlId("tabEtats")] = newTab;
//			
//		} else {
//			this[getHtmlId("tabEtats")] = tabEtats;
//		}
//		
//		$comp.sources.tabSrch.sync();
		
		
	/*	$comp.sources.tabEtats.all(); */
	
//		if(txtDes != ""){
//			var lst = txtDes.split(" ");
//			txtSrch = "(iv_Nom_FE = '*"+lst[0]+"*')";
//			if(lst.length > 1){
//				for(var i=1; i<lst.length; i++){
//					if(lst[i] != "")
//						txtSrch += " && (iv_Nom_FE = '*"+lst[i]+"*')";
//				}
//			} 
//			$$("tInfos").setValue("Filtre : " + txtSrch);
//		}
//		$comp.sources.tabEtats.query(txtSrch);
		
		/*$comp.sources.tabEtats.sync();*/
	};// @lock

	bFermer.click = function bFermer_click (event)// @startlock
	{// @endlock
		$(getHtmlObj("affResultats")).hide();
		$(getHtmlObj("cont_Selecteur")).show();
	};// @lock

	vDMoins.keyup = function vDMoins_keyup (event)// @startlock
	{// @endlock
		dd();
	};// @lock

	cbPeriode.change = function cbPeriode_change (event)// @startlock
	{// @endlock
		dd();
	};// @lock

	dgRapp.onRowClick = function dgRapp_onRowClick (event)// @startlock
	{// @endlock
		execSrch(0);
		
	//	var leRapp = tabEtats[$$(getHtmlId("dgRapp")).getSelectedRows()[0]];
		//var dgSrch = $$(getHtmlId("dgSrch"));
		
	/*	$comp.sources.tabSrch.query("",{
			onSuccess:function(event){
				$comp.sources.tabSrch.query("iv_Num_Table = " + leRapp.iv_Num_Table);
			}
		});*/
		
		//var txtSrch = "iv_Num_Table = " + leRapp.iv_Num_Table;
							
	//	$comp.sources.tabSrch.query("iv_Num_Table = " + leRapp.iv_Num_Table); /*,{
	/*		onSuccess:function(event){
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
		o.periode = $$(getHtmlId("cbPeriode")).getValue();
		o.moins = $$(getHtmlId("vDMoins")).getValue();
		o.du = $$(getHtmlId("vDDebut")).getValue();
		o.au = $$(getHtmlId("vDFin")).getValue();
		
		$$("tInfos").setValue("Etat en cours d'execution...");
		$("#affWait").show();
		
		$comp.sources.sYS_FIC_EXTERNES.WAK_ficExt_Exec(o,{
								onSuccess: function(event){ 	//code à exécuter lorsque la méthode 4D a terminé
									$$("tInfos").setValue("");
									$("#affWait").hide();
									if(event.result){
										var o = event.result;//$comp.sources.tabEtats
										if(o.retour = "OK"){
											$(getHtmlObj("txtResultats")).html(o.valeur);
											$(getHtmlObj("txtResultats")).attr("class","scrollOn");
											$(getHtmlObj("affResultats")).show();
											$(getHtmlObj("cont_Selecteur")).hide();
										}else
											$$("tInfos").setValue(o.retour +" : "+o.valeur );
										
									}
								},
								onError: function(error){
									$("#affWait").hide();
									$$("tInfos").setValue("Ereur : "+error.error[0].message);
								}});
	};// @lock

	vSrchRapp.keyup = function vSrchRapp_keyup (event)// @startlock
	{// @endlock
		execSrch(1);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_vSrchSrch", "keyup", vSrchSrch.keyup, "WAF");
	WAF.addListener(this.id + "_bFermer", "click", bFermer.click, "WAF");
	WAF.addListener(this.id + "_vDMoins", "keyup", vDMoins.keyup, "WAF");
	WAF.addListener(this.id + "_cbPeriode", "change", cbPeriode.change, "WAF");
	WAF.addListener(this.id + "_dgRapp", "onRowClick", dgRapp.onRowClick, "WAF");
	WAF.addListener(this.id + "_tabEtats", "onCollectionChange", tabEtatsEvent.onCollectionChange, "WAF");
	WAF.addListener(this.id + "_bExecuter", "click", bExecuter.click, "WAF");
	WAF.addListener(this.id + "_vSrchRapp", "keyup", vSrchRapp.keyup, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
