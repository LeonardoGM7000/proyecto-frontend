var contadorList=0;
var miArreglo = new Array(4);
var miGrafica;

//var botonN=document.getElementById("botonNav");
//botonN.addEventListener("click",obtenerB,false); //Realiza la busqueda de la barra de navegacion


document.getElementById("abc").addEventListener("click",function(){
    introJs().setOptions({
        steps: [
          {
            intro: '¡Bienvenido a nuestra pagina! A continuación, te mostrare como utilizarla de manera sencilla.',
          },
          {
            element: "#filrt",
            intro: 'En esta seccion podras realizar la busqueda del municipio que deseas.',
          },
          {
            element: '#secEst',
            intro: 'Al hacer click sobre esta opción, se desplegara una lista con todos los estados, selecciona el estado de tu agrado.',
          },
          {
            element: '#sMun',
            intro: 'Despues de que selecciones un estado, en este otro listado encontraras todos los municipios de dicho estado, selecciona el que deseas consutar.',
          },
          {
            element: '#sDia',
            intro: 'Aqui podras elegir el dia el cual quieres consultar, ya sea hoy, o alguno de los tres dias posteriores.',
          },
          {
            element: '#botonClima',
            intro: 'Haz click posteriormente sobre este boton y se te mostrara una descripcion del sitio que hayas elegido.',
          },
          {
            element: '#secEst',
            intro: 'Para realizar cualquier otra busqueda, dirigete nueamente a los filtros de busqueda y elige tu nueva preferencia, y repite el mismo procedimiento.',
          },
          {
            element: '#listN',
            intro: 'En esta seccion encontraras de forma general el clima de todos los municipios para el dia de hoy.',
          },
          {
            element: '#sig', 
            intro: 'Con estos botones de los extremos, puedes avanzar o retroceder de 5 en 5 listas, recuerda que cada lista contiene 5 municipios.',
          },
          {
            element: '#tercero', 
            intro: 'Con estos botones puedes navegar entre los municipios actuales de cada lista.',
          },
          {
            element: '#mapeo', 
            intro: 'En este partado, encontraras los climas que existen en México, ademas de ver como se conforman las regiones y zonas.',
          },
          {
            element: '#inf', 
            intro: 'En cada apartado encontraras un boton como estos, puedes dar click sobre estos para ver una descripción de su funcionamiento.',
          },
          {
            intro: 'Y has terminado contiene un pequeño boton naranja del cual te puedes apoyar con sus indicaciones ¡NOS VEMOS PRONTO!',
          },
          // Agrega más pasos según sea necesario
        ],
        showStepNumbers: false,
        showBullets: true,
        exitOnOverlayClick: true,
        exitOnEsc: true,
        nextLabel: 'Siguiente',
        prevLabel: 'Anterior',
        //skipLabel: 'Saltar',
        doneLabel: 'Finalizar',
      }).start();

});

// Inicializa los tooltips al cargar la página
/*document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
});*/

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    // Abre el modal automáticamente
    var modalInstance = M.Modal.getInstance(document.getElementById('modal1'));
    modalInstance.open();
});

document.getElementById("inf").addEventListener("click",function(){
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    // Abre el modal automáticamente
    var modalInstance = M.Modal.getInstance(document.getElementById('modal2'));
    modalInstance.open();

});

document.getElementById("inf2").addEventListener("click",function(){
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    // Abre el modal automáticamente
    var modalInstance = M.Modal.getInstance(document.getElementById('modal3'));
    modalInstance.open();

});

document.getElementById("inf3").addEventListener("click",function(){
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    // Abre el modal automáticamente
    var modalInstance = M.Modal.getInstance(document.getElementById('modal4'));
    modalInstance.open();

});

/*document.getElementById("inf4").addEventListener("click",function(){
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    // Abre el modal automáticamente
    var modalInstance = M.Modal.getInstance(document.getElementById('modal5'));
    modalInstance.open();

});*/

document.getElementById("inf5").addEventListener("click",function(){
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    // Abre el modal automáticamente
    var modalInstance = M.Modal.getInstance(document.getElementById('modal6'));
    modalInstance.open();

});

document.getElementById("comparar").addEventListener("click",function(){

   

    if(selectorParametro.value=="Probabilidad de Precipitación"){
        realizarGraficopP();
        document.getElementById("pron").innerHTML="GRAFICO COMPARATIVO - PROBABILIDAD DE PRECIPITACIÓN";
    }
    else if(selectorParametro.value=="Velocidad de Viento"){
        realizarGraficovV();
        document.getElementById("pron").innerHTML="GRAFICO COMPARATIVO - VELOCIDAD DE VIENTO";
    }
    else if(selectorParametro.value=="Temperatura Minima"){
        realizarGraficotMin();
        document.getElementById("pron").innerHTML="TEMPERATURA MINIMA";
    }
    else if(selectorParametro.value=="Temperatura Maxima"){
        realizarGraficotMax();
        document.getElementById("pron").innerHTML="GRAFICO COMPARATIVO - TEMPERATURA MAXIMA";
        
    }

});



var boton=document.getElementById("botonClima");
boton.addEventListener("click",procesarDatos,false); //Realiza las busquedas de los selectores

var selectorEstado=document.getElementById("secEst"); //Indica que si cambiamos el estado actualize la lista de municipios
selectorEstado.addEventListener("input",cambiarMunicipios,false);

var selectorMun=document.getElementById("sMun");
var selectorDia=document.getElementById("sDia");
var selectorParametro=document.getElementById("pam");

var botNext=document.getElementById("sig");
botNext.addEventListener("click",actualizarListadomas,false);

var botPrev=document.getElementById("ant");
botPrev.addEventListener("click",actualizarListadomenos,false);

document.getElementById("primero").addEventListener("click",function(){mostrarTabGeneral((contadorList)*5)},false);
document.getElementById("segundo").addEventListener("click",function(){mostrarTabGeneral((contadorList+1)*5)},false);
document.getElementById("tercero").addEventListener("click",function(){mostrarTabGeneral((contadorList+2)*5)},false);
document.getElementById("cuarto").addEventListener("click",function(){mostrarTabGeneral((contadorList+3)*5)},false);
document.getElementById("quinto").addEventListener("click",function(){mostrarTabGeneral((contadorList+4)*5)},false);

function obtenerB(){

    let datos = JSON.parse(jsonClima);
    var res=document.getElementById("res");
    res.innerHTML='';
    var busq=document.getElementById("search").value;
    var cont=0;

    for(let item of datos){
        if((busq==item.nes || busq==item.nmun) && item.ndia==1){
            cont++;
            res.innerHTML+= "<tr>"+"<td>"+item.nes+ "</td>"+"<td>"+item.nmun+ "</td>"+"<td>"+item.tmin+ "</td>"+"<td>"+item.tmax+"</td>"+"<td>"+item.probprec+ "</td>"+"<td>"+item.cc+ "</td>"+"<td>"+item.velvien+ "</td>"+"</tr>";
        }
    }
    if(cont==0){
        res.innerHTML+="NO SE ENCONTRARON COINCIDENCIAS";
    }

}



function procesarDatos(){

    document.getElementById("tabB").classList.remove("des");

    let datos = JSON.parse(jsonClima);
    var indice=0;

    var res=document.getElementById("res");
    res.innerHTML='';
    var cont=0;

    var dia;
    if(selectorDia.value=="HOY"){
        dia=0;
    }
    else if(selectorDia.value=="MAÑANA"){
        dia=1;
    }
    else if(selectorDia.value=="2 DIAS"){
        dia=2;
    }
    else{
        dia=3;
    }

   for(let item of datos){
        
        if(item.nes==selectorEstado.value && selectorMun.value==item.nmun){
            miArreglo[indice]=item;
            indice++;
        }

        if(item.nes==selectorEstado.value && selectorMun.value==item.nmun && item.ndia==dia){

            

            res.innerHTML+= "<tr>"+"<td>"+item.nes+ "</td>"+"<td>"+item.nmun+ "</td>"+"<td>"+item.tmin+ "</td>"+"<td>"+item.tmax+"</td>"+"<td>"+item.probprec+ "</td>"+"<td>"+item.cc+ "</td>"+"<td>"+item.velvien+ "</td>"+"</tr>";
            cont++;

            document.getElementById("entidad").innerHTML='<p class="light">ENTIDAD FEDERATIVA:  '+item.nes+'</p><p class="light">ALCALDIA/MUNICIPIO:  '+item.nmun+'</p>';

            if(item.probprec>=0 && item.probprec<=33){
                document.getElementById("lluvia").innerHTML='<p class="light">PROBABILIDAD DE PRECIPITACION  '+item.probprec+'</p><p class="light">PRONOSTICO:  No se preveen lluvias en esta region, la probabilidad es muy baja.</p>';
            }
            else if(item.probprec>=34 && item.probprec<=66){
                document.getElementById("lluvia").innerHTML='<p class="light">PROBABILIDAD DE PRECIPITACION  '+item.probprec+'</p><p class="light">PRONOSTICO:  Probabilidad moderada de lluvia, existe riesgo de una precipitación moderada en esta zona.</p>';
            }
            else{
                document.getElementById("lluvia").innerHTML='<p class="light">PROBABILIDAD DE PRECIPITACION  '+item.probprec+'</p><p class="light">PRONOSTICO:  Probabilidad alta de precipitación, se recomienda mantenerse en su hogar hasta que pase.</p>';
            }



            if(item.velvien>=0 && item.velvien<=5){
                document.getElementById("viento").innerHTML='<p class="light">VELOCIDAD DEL VIENTO (Km/h):  '+item.velvien+'</p><p class="light">PRONOSTICO:  Viento moderado, solo se pueden llegar a presenciar vientos de maximo 5 Km/h.</p>';
            }
            else if(item.velvien>=6 && item.velvien<=9){
                document.getElementById("viento").innerHTML='<p class="light">VELOCIDAD DEL VIENTO (Km/h):  '+item.velvien+'</p><p class="light">PRONOSTICO:  Viento moderadamente fuerte, solom se pueden llegar a precensiar vientos de maximo 9 Km/h.</p>';
            }
            else{
                document.getElementById("viento").innerHTML='<p class="light">VELOCIDAD DEL VIENTO (Km/h):  '+item.velvien+'</p><p class="light">PRONOSTICO:  Vientos fuertes registrados, extreme precauciones y mantenga sus objetos de valor resguardados.</p>';
            }



            if(item.tmin<=14){
                document.getElementById("tmin").innerHTML='<p class="light">TEMPERATURA MINIMA (°C):  '+item.tmin+'</p><p class="light">Se preeven bajas temperaturas, pudiendo descender hasta 10°C, se recomienda abrigarse y mantener precauciones.</p>';
            }
            else if(item.tmin>=15 && item.tmin<=24){
                document.getElementById("tmin").innerHTML='<p class="light">TEMPERATURA MINIMA (°C):  '+item.tmin+'</p><p class="light">Se prevee una temperatura minima normal, existira un ambiente calido y ostil.</p>';
            }
            else{
                document.getElementById("tmin").innerHTML='<p class="light">TEMPERATURA MINIMA (°C):  '+item.tmin+'</p><p class="light">Se prevee una temperatura minima encima del promedio, existira un ambiente calido y probables olas de calor en la zona.</p>';
            }



            if(item.tmax<=14){
                document.getElementById("tmax").innerHTML='<p class="light">TEMPERATURA MAXIMA (°C):  '+item.tmax+'</p><p class="light">Se preeven temperaturas maximas muy bajas, en general se estima un ambiente frio, se recomienda salir abrigado.</p>';
            }
            else if(item.tmax>=15 && item.tmin<=24){
                document.getElementById("tmax").innerHTML='<p class="light">TEMPERATURA MAXIMA (°C):  '+item.tmax+'</p><p class="light">Se prevee una temperatura maxima normal, en general se estima un ambiente hostil, suceptible a bajas de temperatura.</p>';
            }
            else{
                document.getElementById("tmax").innerHTML='<p class="light">TEMPERATURA MAXIMA (°C):  '+item.tmax+'</p><p class="light">Se prevee una temperatura maxima encima del promedio, con la posibilidad de olas de calor extremas, se recomienda mantener sus precauciones.</p>';
            }

            document.getElementById("cielo").innerHTML=('<p class="light">'+item.desciel+'</p>');


            if(item.probprec>=80 ){
                if(item.velvien>=9){
                    document.getElementById("cielo").innerHTML+='<p class="light">Extreme precauciones, vientos sumamente fuertes y una precipitación intensa, se recomienda mantenerse en su hogar.</p>';
                }
                else if(item.velvien>=6 && item.velvien<=8){
                    document.getElementById("cielo").innerHTML+='<p class="light">Probabilidad de fuertes precipitaciones, con vientos moderadamente fuertes, mantenga precauciones.</p>';
                }
                else if(item.velvien>=2 && item.velvien<=5){
                    document.getElementById("cielo").innerHTML+='<p class="light">Probabilidad elevada de precipitaciones con vientos no tan fuertes, mantengase abrigado.</p>';
                }
                else{
                    document.getElementById("cielo").innerHTML+='<p class="light">Solamente precipitacion sin frentes frios, se recomienda esperar a que pasen las lluvias intensas.</p>';
                }
                
            }

            else if(item.probprec>=50 && item.probprec<=79 ){
                if(item.velvien>=9){
                    document.getElementById("cielo").innerHTML+='<p class="light">Una elevada probabilidad de precipitación acompañado de fuertes lluvias, se recomienda mantenerse abrigado.</p>';
                }
                else if(item.velvien>=6 && item.velvien<=8){
                    document.getElementById("cielo").innerHTML+='<p class="light">Una moderada probabilidad de lluvia con vientos igual de moderados, se recomienda mantenerse abrigado.</p>';
                }
                else if(item.velvien>=2 && item.velvien<=5){
                    document.getElementById("cielo").innerHTML+='<p class="light">Una moderada probabilidad de precipitaciones, con vientos no tan fuertes, no sera una lluvia de gran duración.</p>';
                }
                else{
                    document.getElementById("cielo").innerHTML+='<p class="light">Moderada probabilidad de lluvia, con vientos inexistentes, no es necesario tomar precauciones.</p>';
                }
            }

            else if(item.probprec>=20 && item.probprec>=49){
                if(item.velvien>=9){
                    document.getElementById("cielo").innerHTML+='<p class="light">Probabilidad de precipitación bajas, pero con fuertes vientos, se recomienda tomar precauciones.</p>';
                }
                else if(item.velvien>=6 && item.velvien<=8){
                    document.getElementById("cielo").innerHTML+='<p class="light">Probabilidad de precipitación bajas, con la existencia de vientos moderados, no necesita tomar precauciones.</p>';
                }
                else if(item.velvien>=2 && item.velvien<=5){
                    document.getElementById("cielo").innerHTML+='<p class="light">Probabilidad de precipitación bajas, con vientos casi inexistentes, es un clima amigable para todo publico.</p>';
                }
                else{
                    document.getElementById("cielo").innerHTML+='<p class="light">Probabilidad de precipitación bajas, sin la presencia de viento, excelente ambiente para salir a pasear.</p>';
                }
            }

            else{
                if(item.velvien>=9){
                    document.getElementById("cielo").innerHTML+='<p class="light">Probabilidad de precipitación casi inexistente, pero con vientos fuertes, se recomienda abrigarse.</p>';
                }
                else if(item.velvien>=6 && item.velvien<=8){
                    document.getElementById("cielo").innerHTML+='<p class="light">Probabilidad de precipitación casi inexistente, pero con vientos moderados, un ambiente amigable en general.</p>';
                }
                else if(item.velvien>=2 && item.velvien<=5){
                    document.getElementById("cielo").innerHTML+='<p class="light">Probabilidad de precipitación casi inexistente, vientos moderados, un ambiente bastante despejado en general.</p>';
                }
                else{
                    document.getElementById("cielo").innerHTML+='<p class="light">Probabilidad de precipitación bajas, sin ningun tipo de viento, excelente clima para el dia de hoy.</p>';
                }

            }


        }
  
    }

    if(cont==0){
        res.innerHTML+="NO SE ENCONTRARON COINCIDENCIAS";
        document.getElementById("pronostico").style.display="none";
        return;
    }


    
    realizarGraficotMax();
    var tab=document.getElementById("pronostico");
    tab.style.display='block';
 
}

function cambiarMunicipios(){

    let datos = JSON.parse(jsonClima);

    var resMun=document.getElementById("mun");
    resMun.innerHTML='';

    for(let item of datos){
        if(item.nes==selectorEstado.value && item.ndia==1){
            resMun.innerHTML+="<option>"+item.nmun+"</option>";

        }
    }
    
}

function actualizarListadomas(){

    //2462*4+3
 
    
    if(contadorList==490){
        return;
    }

   else if(contadorList==485){
        contadorList=contadorList+5;
        document.getElementById("primero").innerHTML=contadorList+1;
        document.getElementById("segundo").innerHTML=contadorList+2;
        document.getElementById("tercero").style.display="none";
        document.getElementById("cuarto").style.display="none";
        document.getElementById("quinto").style.display="none";
        mostrarTabGeneral(contadorList*5);
        //console.log(contadorList);
        return;
    }

    document.getElementById("tercero").style.display="block";
    document.getElementById("cuarto").style.display="block";
    document.getElementById("quinto").style.display="block";

    contadorList=contadorList+5;

    document.getElementById("primero").innerHTML=contadorList+1;
    document.getElementById("segundo").innerHTML=contadorList+2;
    document.getElementById("tercero").innerHTML=contadorList+3;
    document.getElementById("cuarto").innerHTML=contadorList+4;
    document.getElementById("quinto").innerHTML=contadorList+5;

    mostrarTabGeneral(contadorList*5);
    //console.log(contadorList);
}

function actualizarListadomenos(){

    if(contadorList==0){
        return;
    }

    document.getElementById("tercero").style.display="block";
    document.getElementById("cuarto").style.display="block";
    document.getElementById("quinto").style.display="block";

    contadorList=contadorList-5;

    document.getElementById("primero").innerHTML=contadorList+1;
    document.getElementById("segundo").innerHTML=contadorList+2;
    document.getElementById("tercero").innerHTML=contadorList+3;
    document.getElementById("cuarto").innerHTML=contadorList+4;
    document.getElementById("quinto").innerHTML=contadorList+5;

    mostrarTabGeneral(contadorList*5);
    //console.log(contadorList);
}

function mostrarTabGeneral(numP){

    let datos = JSON.parse(jsonClima);
    var tabla=document.getElementById("ps");
    tabla.innerHTML="";
    numP=numP*4;

    for(let i=0;i<5;i++) {
        //console.log("Accediendo a elemento: "+(numP+(4*i)));
        var inf=datos[numP+(4*i)];
        tabla.innerHTML+= "<tr>"+"<td>"+inf.nes+ "</td>"+"<td>"+inf.nmun+ "</td>"+"<td>"+inf.tmin+ "</td>"+"<td>"+inf.tmax+"</td>"+"<td>"+inf.probprec+ "</td>"+"<td>"+inf.cc+ "</td>"+"<td>"+inf.velvien+ "</td>"+"</tr>";
    }

}

function mostrarTabGeneralUlt(numP){

    let datos = JSON.parse(jsonClima);
    var tabla=document.getElementById("ps");
    tabla.innerHTML="";
    numP=numP*4;


    for(let i=0;i<3;i++) {
        //console.log("Accediendo a elemento: "+(numP+(4*i)));
        var inf=datos[numP+(4*i)];
        tabla.innerHTML+= "<tr>"+"<td>"+inf.nes+ "</td>"+"<td>"+inf.nmun+ "</td>"+"<td>"+inf.tmin+ "</td>"+"<td>"+inf.tmax+"</td>"+"<td>"+inf.probprec+ "</td>"+"<td>"+inf.cc+ "</td>"+"<td>"+inf.velvien+ "</td>"+"</tr>";
    }

}



function realizarGraficotMax(){

    // Obtén el contexto del canvas
    var ctx = document.getElementById('miGrafica').getContext('2d');

    if (miGrafica) {
        miGrafica.destroy();
    }

    // Crea la instancia del gráfico
     miGrafica = new Chart(ctx, {

    type: 'line', // Tipo de gráfico (puede ser 'line', 'bar', 'radar', etc.)
    data: {
        labels: ['Hoy', 'Mañana', '2 dias...', '3 dias...'],
        datasets: [{
        label: 'Mi Gráfica',
        data: [miArreglo[0].tmax,miArreglo[1].tmax,miArreglo[2].tmax,miArreglo[3].tmax],
        backgroundColor: 'rgba(249, 180, 45, 0.2)', // Color de fondo de las barras
        borderColor: 'rgba(249, 180, 45, 1)', // Color del borde de las barras
        borderWidth: 1 // Ancho del borde de las barras
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: false
        }
        }
    }
    });

}

function realizarGraficotMin(){

    // Obtén el contexto del canvas
    var ctx = document.getElementById('miGrafica').getContext('2d');

    if (miGrafica) {
        miGrafica.destroy();
    }

    // Crea la instancia del gráfico
     miGrafica = new Chart(ctx, {

    type: 'line', // Tipo de gráfico (puede ser 'line', 'bar', 'radar', etc.)
    data: {
        labels: ['Hoy', 'Mañana', '2 dias...', '3 dias...'],
        datasets: [{
        label: 'Mi Gráfica',
        data: [miArreglo[0].tmin,miArreglo[1].tmin,miArreglo[2].tmin,miArreglo[3].tmin],
        backgroundColor: 'rgba(249, 180, 45, 0.2)', // Color de fondo de las barras
        borderColor: 'rgba(249, 180, 45, 1)', // Color del borde de las barras
        borderWidth: 1 // Ancho del borde de las barras
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: false
        }
        }
    }
    });

}

function realizarGraficovV(){

    // Obtén el contexto del canvas
    var ctx = document.getElementById('miGrafica').getContext('2d');

    if (miGrafica) {
        miGrafica.destroy();
    }

    // Crea la instancia del gráfico
     miGrafica = new Chart(ctx, {

    type: 'line', // Tipo de gráfico (puede ser 'line', 'bar', 'radar', etc.)
    data: {
        labels: ['Hoy', 'Mañana', '2 dias...', '3 dias...'],
        datasets: [{
        label: 'Mi Gráfica',
        data: [miArreglo[0].velvien,miArreglo[1].velvien,miArreglo[2].velvien,miArreglo[3].velvien],
        backgroundColor: 'rgba(249, 180, 45, 0.2)', // Color de fondo de las barras
        borderColor: 'rgba(249, 180, 45, 1)', // Color del borde de las barras
        borderWidth: 1 // Ancho del borde de las barras
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: false
        }
        }
    }
    });

}

function realizarGraficopP(){

    // Obtén el contexto del canvas
    var ctx = document.getElementById('miGrafica').getContext('2d');

    if (miGrafica) {
        miGrafica.destroy();
    }

    // Crea la instancia del gráfico
     miGrafica = new Chart(ctx, {

    type: 'line', // Tipo de gráfico (puede ser 'line', 'bar', 'radar', etc.)
    data: {
        labels: ['Hoy', 'Mañana', '2 dias...', '3 dias...'],
        datasets: [{
        label: 'Mi Gráfica',
        data: [miArreglo[0].probprec,miArreglo[1].probprec,miArreglo[2].probprec,miArreglo[3].probprec],
        backgroundColor: 'rgba(249, 180, 45, 0.2)', // Color de fondo de las barras
        borderColor: 'rgba(249, 180, 45, 1)', // Color del borde de las barras
        borderWidth: 1 // Ancho del borde de las barras
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: false
        }
        }
    }
    });

}





