﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here
	
function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Rapports';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var dgSrch = {};	// @dataGrid
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
	
	init();
	
	function init(){
		
		var DJ = new Date(); 	//Date du jour
		
		//debugger;
		
		DJ.setDate(1);//Se mettre au 1er du mois en cours
		vDDebut.setValue(affDate(DJ));
		
		DJ.setMonth(DJ.getMonth() + 1); 	//Premier jour du mois suivant...
		DJ.setDate(DJ.getDate() - 1); 		//Dernier jour du mois en cours !
		vDFin.setValue(affDate(DJ));
		
	};
	
	function dd(){
	
		var PopUp = cbPeriode.getValue();
		var NbMoins = vDMoins.getValue();
		
		//debugger;
		
		var DJ = new Date(); 	//Date du jour
		
		
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
		
	};
	
	function execSrch(quoi){
		
		var txtDes;
		var txtSrchR, txtSrchE, txtInfo;
		var lst;
		
//	debugger;
		
		txtDes = $$(getHtmlId("vSrchRapp")).getValue();
		
		$$("tInfos").setValue("");
		txtInfo = "";
		
		//Récupérer les états autorisés
		$comp.sources.sYS_FIC_EXTERNES.WAK_FicExt_Get(0,txtDes,{	
				onSuccess: function(event){ 	
					if(event.result){
						srcEtats = event.result.lesFic.slice(0); 	//Pour garder une copie !
						tabEtats = event.result.lesFic.slice(0); 	//Pour garder une copie !
						this[getHtmlId("tabEtats")] = tabEtats; //event.result.lesFic; 
						$comp.sources.tabEtats.sync();
								
								//Récupérer les recherches existantes
						$comp.sources.sYS_FIC_EXTERNES.WAK_FicExt_Get(2,{
							onSuccess: function(event){ 	
								if(event.result){
									tabSrch = event.result.lesFic;//.slice(0); 	//Pour garder une copie !
									this[getHtmlId("tabSrch")] = event.result.lesFic; 
									$comp.sources.tabSrch.sync();
									
									if($comp.sources.tabEtats.iv_Num_Table != null)
										$comp.sources.tabSrch.query("(iv_Num_Table = " + $comp.sources.tabEtats.iv_Num_Table+")"); 
								}
							},
							onError: function(error){
								$$("tInfos").setValue("Ereur : "+error.error[0].message);
							}});
							}
				},
				onError: function(error){
					$$("tInfos").setValue("Ereur : "+error.error[0].message);
				}});
		
		
		
//		//Appliquer la recherche sur les Etats
//		if(quoi == 1){ 		//Faire Rapports, sinon que recherches
//			
//			txtDes = $$(getHtmlId("vSrchRapp")).getValue();
//			txtSrchR = "";
//			if(txtDes != ""){
//				txtSrchR = txt2Srch_ET(txtDes,"iv_Nom_FE");
//				txtInfo = "Rapports : " + txtSrchR;
//			}
//			$comp.sources.tabEtats.query(txtSrchR);
//			
//		}
//		
//		//Apliquer la recherche sur les Recherches
//		//txtDes = $$(getHtmlId("vSrchSrch")).getValue();
//		if($comp.sources.tabEtats.iv_Num_Table != null)
//			txtSrchE ="(iv_Num_Table = " + $comp.sources.tabEtats.iv_Num_Table+")"; 
//		else
//			txtSrchE = "";
//			
////		if(txtDes != ""){
////			if(txtSrchE!="")
////				txtSrchE += ' && ';
////			txtSrchE += txt2Srch_ET(txtDes,"iv_Nom_FE");
////		}
//		if(txtSrchE != "")
//			txtInfo += " Etats : " + txtSrchE;
//		$comp.sources.tabSrch.query(txtSrchE);
		
		$$("tInfos").setValue(txtInfo);
		
	};
	
	//--- Mes Initialisations ---
	
	//Init des dates de recherche
	dd();
	execSrch(0);
	
//	//Récupérer les états autorisés
//	$comp.sources.sYS_FIC_EXTERNES.WAK_FicExt_Get(0,{	
//					onSuccess: function(event){ 	
//						if(event.result){
//							srcEtats = event.result.lesFic.slice(0); 	//Pour garder une copie !
//							tabEtats = event.result.lesFic.slice(0); 	//Pour garder une copie !
//							this[getHtmlId("tabEtats")] = tabEtats; //event.result.lesFic; 
//							$comp.sources.tabEtats.sync();
//						}
//					},
//					onError: function(error){
//						$$("tInfos").setValue("Ereur : "+error.error[0].message);
//					}});
//					
//	//Récupérer les recherches existantes
//	$comp.sources.sYS_FIC_EXTERNES.WAK_FicExt_Get(2,{
//					onSuccess: function(event){ 	
//						if(event.result){
//							tabSrch = event.result.lesFic;//.slice(0); 	//Pour garder une copie !
//							this[getHtmlId("tabSrch")] = event.result.lesFic; 
//							$comp.sources.tabSrch.sync();
//						}
//					},
//					onError: function(error){
//						$$("tInfos").setValue("Ereur : "+error.error[0].message);
//					}});
	
	// eventHandlers// @lock

	dgSrch.onRowClick = function dgSrch_onRowClick (event)// @startlock
	{// @endlock
		$$(getHtmlId("cbAvecRecherche")).setValue(true);
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
	debugger;
		o.quoi = "ExecRapport";
		o.quel = tabEtats[dgRapp.getSelectedRows()[0]];//$comp.sources.tabEtats ;//
		o.cli = $$(getHtmlId("vCli")).getValue();
		o.fou = $$(getHtmlId("vFou")).getValue();
		if($$(getHtmlId("cbAvecRecherche")).getValue() == true)
			o.srch = tabSrch[dgSrch.getSelectedRows()[0]];
		else
			o.srch = null;
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
	WAF.addListener(this.id + "_dgSrch", "onRowClick", dgSrch.onRowClick, "WAF");
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
