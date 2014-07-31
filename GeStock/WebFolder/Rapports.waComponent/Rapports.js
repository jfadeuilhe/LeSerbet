
(function Component (id) {// @lock

//Add the code that needs to be shared between components here
	
function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Rapports';
	// @endregion// @endlock

	var srchTimeout; 	//Pour gérer un délais avant recherche
	var o = null;
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var bOuvrir = {};	// @button
	var bLastResult = {};	// @button
	var id_vFouStar = {};	// @radioGroup
	var dgSrch = {};	// @dataGrid
	var bFermer = {};	// @button
	var vDMoins = {};	// @textField
	var cbPeriode = {};	// @combobox
	var dgRapp = {};	// @dataGrid
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
	
	//$comp.sources.vCliDesign.syn();
	
	//--- Mes méthodes ---
	
	function init(){
		
		var DJ = new Date(); 	//Date du jour
		
		//debugger;
		
		DJ.setDate(1);//Se mettre au 1er du mois en cours
		vDDebut.setValue(affDate(DJ));
		
		DJ.setMonth(DJ.getMonth() + 1); 	//Premier jour du mois suivant...
		DJ.setDate(DJ.getDate() - 1); 		//Dernier jour du mois en cours !
		vDFin.setValue(affDate(DJ));
		
		dd(); 
		
	};

	function dd(){
	
		var DJ = new Date(); 	//Date du jour
		var PopUp = cbPeriode.getValue();
		var NbMoins = vDMoins.getValue();
		
		var DJ = new Date(); 	//Date du jour
		
		if(PopUp == "Non"){ 		//Pas de dates
			$DMoins.hide();
			$DDebut.hide();
			$DFin.hide();
		}else if(PopUp == "D"){ 	//Entre deux dates saisies
			$DDebut.show();
			$DFin.show();
			$DMoins.hide();
			vDDebut.setReadOnly(false);
			vDFin.setReadOnly(false);
		}else{ 						//Période prédéfinie
			$DDebut.show();
			$DFin.show();
			$DMoins.show();
			vDDebut.setReadOnly(true);
			vDFin.setReadOnly(true);
			switch(PopUp){
				case "A":
					DJ.setDate(1); 	//Se mettre au 1er du mois en cours
					DJ.setMonth(0); //Se mettre au 1er mois du mois en course l'année
					if(NbMoins!=0)
						DJ.setYear(DJ.getFullYear()-NbMoins);
					vDDebut.setValue(affDate(DJ));
					DJ.setYear(DJ.getFullYear()+1);
					DJ.setDate(DJ.getDate() - 1);
					vDFin.setValue(affDate(DJ));
					break;
					
				case "T":
					DJ.setDate(1); 	//Se mettre au 1er du mois en cours
					DJ.setMonth((Math.floor(DJ.getMonth()/3)-NbMoins)*3);
					vDDebut.setValue(affDate(DJ));
					DJ.setMonth(M+3);
					DJ.setDate(DJ.getDate() - 1);
					vDFin.setValue(affDate(DJ));
					break;
					
				case "M":
					DJ.setDate(1); 	//Se mettre au 1er du mois en cours
					if(NbMoins!=0)
						DJ.setMonth(DJ.getMonth()-NbMoins);
					vDDebut.setValue(affDate(DJ));
					DJ.setMonth(DJ.getMonth()+1);
					DJ.setDate(DJ.getDate() - 1);
					vDFin.setValue(affDate(DJ));
					break;
					
				case "S":
					DJ.setDate(DJ.getDate()-DJ.getDay()); 	//Se mettre au 1er jour de la semaine
					if(NbMoins!=0)
						DJ.setDate(DJ.getDate()-(NbMoins*7));
					vDDebut.setValue(affDate(DJ));
					DJ.setDate(DJ.getDate()+6); 
					vDFin.setValue(affDate(DJ));
					break;
					
			}
		}
		
	};
	
	function srchRech(){
								
		//Récupérer les recherches existantes
		if($comp.sources.tabEtats.iv_Num_Table != null)
			var table = $comp.sources.tabEtats.iv_Num_Table;
		else
			var table = 0;
		 	
		$comp.sources.sYS_FIC_EXTERNES.WAK_FicExt_Get(2, "", table, {
			onSuccess: function(event){ 	
				if(event.result){
					tabSrch = event.result.lesFic;//.slice(0); 	//Pour garder une copie !
					this[getHtmlId("tabSrch")] = event.result.lesFic; 
					$comp.sources.tabSrch.sync();
					//if($comp.sources.tabEtats.iv_Num_Table != null)
					//	$comp.sources.tabSrch.query("(iv_Num_Table = " + $comp.sources.tabEtats.iv_Num_Table+")"); 
				}
			},
			onError: function(error){
				$$("tInfos").setValue("Ereur : "+error.error[0].message);
			}});
		
	};
	
	function srchRapp(){
		
		var txtDes;
		var txtSrchR, txtSrchE, txtInfo;
		var lst;
		
//	debugger;
		
		txtDes = $$(getHtmlId("vSrchRapp")).getValue();
		
		$$("tInfos").setValue("");
		txtInfo = "";
		
		//Récupérer les états autorisés
		$comp.sources.sYS_FIC_EXTERNES.WAK_FicExt_Get(0,txtDes, 0, {	
				onSuccess: function(event){ 	
					if(event.result){
						srcEtats = event.result.lesFic.slice(0); 	//Pour garder une copie !
						tabEtats = event.result.lesFic.slice(0); 	//Pour garder une copie !
						this[getHtmlId("tabEtats")] = tabEtats; //event.result.lesFic; 
						$comp.sources.tabEtats.sync();
						
						srchRech();
					}
				},
				onError: function(error){
					$$("tInfos").setValue("Ereur : "+error.error[0].message);
				}});
	};
	
	//--- Mes Initialisations ---
	
	init();			//Init pour les dates de recherche		
	srchRapp(); 	//Init de la liste des rapports
	
	// eventHandlers// @lock

	bOuvrir.click = function bOuvrir_click (event)// @startlock
	{// @endlock
		 var fen = window.open("PageVide.html");
     
	     if(fen){
		 	var zeTxt = "<H1>"+o.quel.iv_Nom_FE+"</H1>";
		 	zeTxt += $(getHtmlObj("txtResultats")).html();
		 	fen.document.write(zeTxt);
		 }
		
		$(getHtmlObj("affResultats")).hide();
		$(getHtmlObj("cont_Selecteur")).show();
	};// @lock

	bLastResult.click = function bLastResult_click (event)// @startlock
	{// @endlock
		$(getHtmlObj("affResultats")).show();
		$(getHtmlObj("cont_Selecteur")).hide();
	};// @lock

	id_vFouStar.change = function id_vFouStar_change (event)// @startlock
	{// @endlock
		selArticles();
	};// @lock

	dgSrch.onRowClick = function dgSrch_onRowClick (event)// @startlock
	{// @endlock
		$$(getHtmlId("cbAvecRecherche")).setValue(true); //Cocher "avace recherche" si on sélectionne une recherche !
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
		srchRech();
	};// @lock

	this.getCurSrch = function(cs){
		cs.vArtActifs=$$(getHtmlId("id_vArtActifs")).getValue();
		cs.vArtDeisgn=$$(getHtmlId("id_vArtDesign")).getValue();
		cs.vArtMill=$$(getHtmlId("id_vArtMill")).getValue();
		cs.vFouActifs=$$(getHtmlId("id_vFouActifs")).getValue();
		cs.vFouDesign=$$(getHtmlId("id_vFouDesign")).getValue();
		cs.vFouStar=$$(getHtmlId("id_vFouStar"))._value;
		cs.vCliActifs=$$(getHtmlId("id_vCliActifs")).getValue();
		cs.vCliDesign=$$(getHtmlId("id_vCliDesign")).getValue();
	};
	
	this.setCurSrch = function(cs){
		$$(getHtmlId("id_vArtActifs")).setValue(cs.vArtActifs);
		$$(getHtmlId("id_vArtDesign")).setValue(cs.vArtDeisgn);
		$$(getHtmlId("id_vArtMill")).setValue(cs.vArtMill);
		$$(getHtmlId("id_vFouActifs")).setValue(cs.vFouActifs);
		$$(getHtmlId("id_vFouDesign")).setValue(cs.vFouDesign);
		$$(getHtmlId("id_vFouStar"))._value=cs.vFouStar;
		$$(getHtmlId("id_vCliActifs")).setValue(cs.vCliActifs);
		$$(getHtmlId("id_vCliDesign")).setValue(cs.vCliDesign);
	};
	
	bExecuter.click = function bExecuter_click (event)// @startlock
	{// @endlock
		var dgRapp = $$(getHtmlId("dgRapp"));	//Récupérer la datagrid
		var dgSrch = $$(getHtmlId("dgSrch"));	//Récupérer la datagrid
		o = {};
	
		o.quoi = "ExecRapport";
		o.quel = tabEtats[dgRapp.getSelectedRows()[0]];//$comp.sources.tabEtats ;//
		o.cli = {"Design": $$(getHtmlId("id_vCliDesign")).getValue().split(","),
				 "Actifs": $$(getHtmlId("id_vCliActifs")).getValue()
				};
		o.fou = {"Design": $$(getHtmlId("id_vFouDesign")).getValue().split(","),
				 "Star": $$(getHtmlId("id_vFouStar"))._value,
				 "Actifs": $$(getHtmlId("id_vFouActifs")).getValue()
				};
		o.art = {"Design": $$(getHtmlId("id_vArtDesign")).getValue().split(","),
				 "Mill": $$(getHtmlId("id_vArtMill")).getValue().split(","),
				 "Actifs": $$(getHtmlId("id_vArtActifs")).getValue()
				};
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
										var o = event.result;
										if(o.retour == "OK"){
											$(getHtmlObj("txtResultats")).html("<CENTER>"+o.valeur+"</CENTER>");
											$(getHtmlObj("txtResultats")).attr("class","scrollOn");
											$(getHtmlObj("affResultats")).show();
											$(getHtmlObj("cont_Selecteur")).hide();
										}else
											alert("Rapport non réalisé :\n"+o.valeur ); //$$("tInfos").setValue(o.retour +" : "+o.valeur );
									}
								},
								onError: function(error){
									$$("tInfos").setValue("");
									$("#affWait").hide();
									alert("Ereur : "+error.error[0].message);
								}});
	};// @lock

	vSrchRapp.keyup = function vSrchRapp_keyup (event)// @startlock
	{// @endlock
		if(srchTimeout != null)
			clearTimeout(srchTimeout);
		
		srchTimeout = setTimeout(srchRapp,500);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_bOuvrir", "click", bOuvrir.click, "WAF");
	WAF.addListener(this.id + "_bLastResult", "click", bLastResult.click, "WAF");
	WAF.addListener(this.id + "_id_vFouStar", "change", id_vFouStar.change, "WAF");
	WAF.addListener(this.id + "_dgSrch", "onRowClick", dgSrch.onRowClick, "WAF");
	WAF.addListener(this.id + "_bFermer", "click", bFermer.click, "WAF");
	WAF.addListener(this.id + "_vDMoins", "keyup", vDMoins.keyup, "WAF");
	WAF.addListener(this.id + "_cbPeriode", "change", cbPeriode.change, "WAF");
	WAF.addListener(this.id + "_dgRapp", "onRowClick", dgRapp.onRowClick, "WAF");
	WAF.addListener(this.id + "_bExecuter", "click", bExecuter.click, "WAF");
	WAF.addListener(this.id + "_vSrchRapp", "keyup", vSrchRapp.keyup, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
