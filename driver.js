var precioZona=4;
var factorCiudad=0.25;
var factorCarretera=0.18;

var factorTiempo=0.095; // Supera los 15 minutos

$('#btn-calcular').click(function (params) {
    var kmTotal=Number($('#txt-km-total').val());
    var kmCiudad=Number($('#txt-km-ciudad').val());
    var tiempo=Number($('#txt-tiempo').val());
    $('#txt-recorrido').text(calculoCosto(kmTotal,kmCiudad,tiempo));
    $('#txt-recorrido-2').text(calculoCosto2(kmTotal,kmCiudad,tiempo));
});

function calculoCosto(kmTotal,kmCiudad,tiempo) {
    var precioBruto=0;
    if (kmTotal<=1) {
        precioBruto=precioZona;
        console.log('Precio: '+precioBruto+' PrecioTiempo: '+0 );
    }else{
        if(kmTotal==kmCiudad){
            if(4<=kmTotal){
                precioBruto= precioZona+((kmTotal-1)*(factorCiudad-0.06)*precioZona);   
            }else{
                precioBruto= precioZona+((kmTotal-1)*factorCiudad*precioZona);   
            }
            console.log('Precio: '+precioBruto+' PrecioTiempo: '+0 );
        }else{
            var kmCarretera=kmTotal-kmCiudad;
            var precioCiudad=precioZona+((kmCiudad-1)*factorCiudad*precioZona);
            var precioCarretera=kmCarretera*factorCarretera*precioZona;
            precioBruto= precioCiudad+precioCarretera;   
            var precioExtra=0;
            if(tiempo>20){
                precioExtra=tiempo*0.095;
            }else{
                precioExtra=tiempo*0.02;
            }
            precioBruto=precioExtra+precioBruto;
        }
    }
    var precioNeto=Math.floor(precioBruto);
    var aux=precioBruto-precioNeto;
    var aumento=0;
    if(aux<=0.5&&aux>0){
        aumento=0.5;
    }else if(aux>0.5){
        aumento=1;
    }
    return precioBruto;
}

/**
 * Formula 2
 */
var precioBase2=2.8;
var precioKM2=0.52;
var precioMin2=0.12;

var precioBaseCarretera2=7;
var precioKMCarretera2=0.5;
var precioMinCarretera2=0.10;

function calculoCosto2(kmTotal,kmCiudad,tiempo) {
    var precioBruto=0;
    if(kmTotal==kmCiudad){
        precioBruto=precioBruto+precioBase2+kmTotal*precioKM2+tiempo*precioMin2;
    }else{
        precioBruto=precioBruto+precioBaseCarretera2+kmTotal*precioKMCarretera2+tiempo*precioMinCarretera2;
    }
    return precioBruto;
}

