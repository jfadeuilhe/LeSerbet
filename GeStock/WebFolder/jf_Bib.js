﻿		function txt2Srch_ET(txt,chTxt,chNum){		var result = "";		var bs, lstVal, lstCT, lstCN;		var i;//debugger;				if((txt != "") && ((chTxt!="") || (chNum !=""))){			lstVal = txt.split(",");						if(chTxt && chTxt != ""){				lstCT = chTxt.split(",");				bs = "("+lstCT[0]+" == '*"+lstVal[0]+"*')";				if(lstVal.length > 1){					for(i=1; i<lstVal.length; i++){						if(lstVal[i] != "")							bs += " && ("+lstCT[0]+" == '*"+lstVal[i]+"*')";					}				} 				if(lstCT.length > 1){					for(j=1; j<lstCT.length; j++){						if(lstCT[j]!=""){							bs += " || ("+lstCT[j]+" == '*"+lstVal[0]+"*')";							if(lstVal.length > 1){								for(i=1; i<lstVal.length; i++){									if(lstVal[i] != "")										bs += " && ("+lstCT[j]+" == '*"+lstVal[i]+"*')";								}							} 						}					}				}				result = bs;			}						if(chNum && chNum != ""){				lstCN = chNum.split(",");				bs = "("+lstCN[0]+" == "+lstVal[0]+")";				if(lstVal.length > 1){					for(i=1; i<lstVal.length; i++){						if(lstVal[i] != "")							bs += " && ("+lstCN[0]+" == "+lstVal[i]+")";					}				} 				if(lstCN.length > 1){					for(j=1; j<lstCT.length; j++){						if(lstCN[j]!=""){							bs += " || ("+lstCN[j]+" == '*"+lstVal[0]+"*')";							if(lstVal.length > 1){								for(i=1; i<lstVal.length; i++){									if(lstVal[i] != "")										bs += " && ("+lstCN[j]+" == '*"+lstVal[i]+"*')";								}							} 						}					}				}				if(result = "")					result = bs;				else 					result = "("+result + ") || ("+bs+")";			}		}				return result;	}		function txt2Srch_OU(txt,chTxt,chNum){		var result = "";		var bs, lstVal, lstCT, lstCN;		var i, j;//debugger;		if((txt != "") && ((chTxt!="") || (chNum !=""))){			lstVal = txt.split(",");						if(chTxt && chTxt != ""){				lstCT = chTxt.split(",");				bs = "("+lstCT[0]+" == '*"+lstVal[0]+"*')";				if(lstVal.length > 1){					for(i=1; i<lstVal.length; i++){						if(lstVal[i] != "")							bs += " || ("+lstCT[0]+" == '*"+lstVal[i]+"*')";					}				} 				if(lstCT.length > 1){					for(j=1; j<lstCT.length; j++){						if(lstCT[j]!=""){							bs += " || ("+lstCT[j]+" == '*"+lstVal[0]+"*')";							if(lstVal.length > 1){								for(i=1; i<lstVal.length; i++){									if(lstVal[i] != "")										bs += " || ("+lstCT[j]+" == '*"+lstVal[i]+"*')";								}							} 						}					}				}				result = bs;			}						if(chNum && chNum != ""){				lstCN = chNum.split(",");				bs = "("+lstCN[0]+" == "+lstVal[0]+")";				if(lstVal.length > 1){					for(i=1; i<lstVal.length; i++){						if(lstVal[i] != "")							bs += " || ("+lstCN[0]+" == "+lstVal[i]+")";					}				} 				if(lstCN.length > 1){						if(lstCN[j]!=""){							bs += " || ("+lstCN[j]+" == '*"+lstVal[0]+"*')";							if(lstVal.length > 1){								for(i=1; i<lstVal.length; i++){									if(lstVal[i] != "")										bs += " || ("+lstCN[j]+" == '*"+lstVal[i]+"*')";								}							} 						}					}				}				if(result = "")					result = bs;				else 					result = "("+result + ") || ("+bs+")";			}		}				return result;	}