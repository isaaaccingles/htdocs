//Sacar el precio del producto 1, 2, ,3 y el total de la suma.

a = "12.56€";
b = "7.25€";
c = "36.73€";
//sumaAyB=((12.56*100) + (7.25*100))/100;
//console.log(sumaAyB);


aPunto = a.replace('.',',');
console.log(aPunto);
numeroA = parseFloat(a);
console.log(numeroA);

bPunto = b.replace('.',',');
console.log(bPunto);
numeroB = parseFloat(b);

cPunto = c.replace('.',',');
console.log(cPunto);
numeroC = parseFloat(c);

sumaABC = (((numeroA*100) + (numeroB*100) + (numeroC*100))/100);
console.log(sumaABC);
sumaABCstr = sumaABC.toString();
sumaABCpunto = sumaABCstr.replace('.',',')
console.log(sumaABCpunto);

document.getElementById("Prod1").innerHTML=aPunto;
document.getElementById("Prod2").innerHTML=bPunto;
document.getElementById("Prod3").innerHTML=cPunto;
document.getElementById("Ptotal").innerHTML=sumaABCpunto + "€";
