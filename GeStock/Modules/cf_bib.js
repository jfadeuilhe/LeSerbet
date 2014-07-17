/*	In order to make the helloWorld() function available client-side, you have to add a reference to the 'cf_bib' module in the GUI Designer.
	The helloWorld() function can be executed from your JS file as follows:
	alert(cf_bib.helloWorld());
	
	For more information, refer to http://doc.wakanda.org/Wakanda0.Beta/help/Title/en/page1516.html
*/
exports.helloWorld = function helloWorld () {
	return ('Hello world');
	
};

exports.dupliquer = function dupliquer(src){
	
	//debugger;
	var entC = ds.Fiche.find("ID == :1", src); 	//scr = ID de la fiche..
	var dest = ds.Fiche.createEntity();
	
	var attNames = ds.Fiche.attributes;
	
	for(var i=0 in attNames){
		//var att = attNames[i].name;
		if(attNames[i] != "ID"){
			switch(attNames[i].kind){	//entC[attr].att.kind
				
				case "storage":
					dest[i] = entC[i];
					break;
				
				case "calculated":
					
					break;
				
				case "relatedEntity":
					dest[i] = entC[i]; 		//Par défaut on reste lié à la même entity.
					break;
				
				case "relatedEntities":
					
					//av_jantes, ar_jantes, av_image, ar_image = i
					
					if(entC[i].length > 0){
						var entClass = entC[i].relatedDataClass;
						//var ent = entC[i];
						
	//Faut il ettre une liste vide dans le champ de destination ? C'est peut être déjà fait par défaut ?
	//					var dest[i] = entC[i].relatedDataClass.createEntityCollection(); 	

						//Parcourir les entities liées pour les dupliquer et mettre la copie dans la collection
						for (var srcRE = entC[i].first(); srcRE!=null; srcRE=entC[i].next()){
							
							var destID = dupliquer(srcRE.ID);
							
							if(destID != 0){ 	//Valeur retournée => L'ajouter à la liste locale
								dest[i].add(destID);
								//dest[i].add(entClass.find("ID == :1", destID)); 	//si l'ID direct ne fonctionne pas, essaie cette façon...
							}
							
						}
					}
					
					/*var entClass;
					var ent;
					switch(i){
						case "av_jantes":
							entClass = ds.Av_Avec;
							ent = ds.Fiche.av_jantes;
							break;
							
						case "ar_jantes":
							entClass = ds.Ar_Avec;
							ent = ds.Fiche.ar_jantes;
							break;
						
						case "av_image":
							entClass = ds.Av_images;
							ent = ds.Fiche.av_image;
							break;
						
						case "ar_image":
							entClass = ds.Ar_images;
							ent = ds.Fiche.ar_image;
							break;
					}
					var attNamesB = entClass.attributes;
					for(var m=0 ; m<t ; m++){
						var AJ = entClass.createEntity();
						debugger;
						for(var n in attNamesB){
							if(n != "ID" && n!= "ficheAssociee")
								AJ[n] = ent[n];
							else if(n == "ficheAssociee")
								AJ[n] = dest;
						}
					}
					*/
					
					break;
				
				case "alias":
					
					break;
			}
		}
	}
	//debugger;
	dest.save();
//	ds.Fiche.refresh(); 	//C'est utile ça ??? On est sur le serveur...
	
	return (dest.ID);
};
