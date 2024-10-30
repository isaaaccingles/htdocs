
ahora = new Date();
/*console.log(ahora.getFullYear()+"/"+ahora.getMonth()+"/"+ahora.getDate(ahora));
console.log(ahora.getHours()+"/"+ahora.getMinutes()+"/"+ahora.getSeconds());
*/
meses = ["Junio", "Julio", "Agosto", "Septiembre", 
    "Octubre", "Noviembre", "Diciembre"];

for(i = 0; i<meses.length; i++){
    if(ahora.getMonth() == i + 5){
        console.log(ahora.getFullYear()+"/"+meses[i]+"/"+ahora.getDate(ahora));

    }
}
