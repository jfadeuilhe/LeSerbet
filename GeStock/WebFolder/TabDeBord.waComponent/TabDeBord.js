
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'TabDeBord';
	// @endregion// @endlock
	
	//var comboTDB = getHtmlId("comboTDB");
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var comboTDB = {};	// @combobox
	// @endregion// @endlock

	function affTableau(){
		var comboTDB = getHtmlId("comboTDB");
	//	var tmpTXT = "tmpTXT";//getHtmlId("tmpTXT");
		var zoneAff$ = getHtmlObj("zoneAff");
		
		//alert($$(comboTDB).getValue());
		$$("tInfos").setValue("Sélection menu : "+$$(comboTDB).getValue());
		
		$(zoneAff$).html("");
		
		//debugger;
		
		$comp.sources.cUMULS_Mens.WAK_TDB_Get($$(comboTDB).getValue(),{
			onSuccess: function(event){ 			//code à exécuter lorsque la méthode 4D a terminé}
				$(zoneAff$).html(event.result);
				$$("tInfos").setValue("");
			},
			onError: function(error){
				$$("tInfos").setValue("Ereur : "+error.error[0].message);
		}});
		
//		$comp.sources.cUMULS_Mens.query("Année >= :1",2004,{
//					onSuccess: function(event){ 
//						$$("tInfos").setValue("Sélection reçue...");
//						var sel = event.dataSource.getEntityCollection();
////						var txt = "";
////						for(var n in sel)
////							txt += n + " - ";
////						$$("tInfos").setValue(txt);
//						sel.WAK_TDB_Get($$(comboTDB).getValue(),{
//								onSuccess: function(event){ 			//code à exécuter lorsque la méthode 4D a terminé}
//									$(zoneAff$).html(event.result);
//									$$("tInfos").setValue("");
//								},
//								onError: function(error){
//									$$("tInfos").setValue("Ereur : "+error.error[0].message);
//								}});
//						},
//					onError: function(error){
//							$$("tInfos").setValue("Erreur : "+error.error[0].message);
//							}
//					});
	}
	
	affTableau();
	
	// eventHandlers// @lock

	comboTDB.change = function comboTDB_change (event)// @startlock
	{// @endlock
		affTableau();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_comboTDB", "change", comboTDB.change, "WAF");
	// @endregion// @endlock

	};// @lock

}// @startlock
return constructor;
})();// @endlock
