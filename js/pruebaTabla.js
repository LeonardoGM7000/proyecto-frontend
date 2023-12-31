let datosClima = JSON.parse(jsonClima);   //datosClima guarda el JSON de clima parseado
let arrClimas = Array.from(datosClima);   //arrClimas guarda el JSON de clima parseado en un array
let filasClima = "";                      //filasClima guarda el código HTML de las filas de la tabla de clima
let estados = new Array();                //estados guarda los nombres de los estados
let dias = new Array();                   //dias guarda los días
var miGrafica;
var graficaPastel;
var miArreglo = new Array(4);
let dia1 = new Array(5).fill(0);
let dia2 = new Array(5).fill(0);
let dia3 = new Array(5).fill(0);
let dia4 = new Array(5).fill(0);
let cargado = false;

//Se recorre el array de clima para generar las filas de la tabla de clima, además de guardar los nombres de los estados y los días
arrClimas.forEach((obj) =>{
  let dloc = new String(obj.dloc);
  let dia = "".concat(dloc.valueOf().slice(6,8),"/",dloc.valueOf().slice(4,6),"/",dloc.valueOf().slice(0,4));

  filasClima += `
    <tr>
      <td>${obj.nes}</td>
      <td>${obj.nmun}</td>
      <td>${dia}</td>    
      <td>${obj.tmax}</td>
      <td>${obj.tmin}</td>
      <td>${obj.desciel}</td>
      <td>${obj.probprec}</td>
    </tr>
  `;
  let nombreEs = new String(obj.nes);
  if(!estados.includes(nombreEs.valueOf())){
    estados.push(nombreEs.valueOf());
  }
  if(!dias.includes(dia)){
    dias.push(dia);
  }
});

arrClimas.forEach((obj) =>{
  let dloc = new String(obj.dloc);
  let diaObj = "".concat(dloc.valueOf().slice(6,8),"/",dloc.valueOf().slice(4,6),"/",dloc.valueOf().slice(0,4));

  if(diaObj == dias[0]){
    if(obj.desciel == "Despejado"){
      dia1[0]++;
    } else if(obj.desciel == "Medio nublado"){
      dia1[1]++;
    } else if(obj.desciel == "Poco nuboso"){
      dia1[2]++;
    } else if(obj.desciel == "Cielo nublado"){
      dia1[3]++;
    } else if(obj.desciel == "Cielo cubierto"){
      dia1[4]++;
    }
  } else if(diaObj == dias[1]){
    if(obj.desciel == "Despejado"){
      dia2[0]++;
    } else if(obj.desciel == "Medio nublado"){  
      dia2[1]++;
    } else if(obj.desciel == "Poco nuboso"){
      dia2[2]++;
    } else if(obj.desciel == "Cielo nublado"){
      dia2[3]++;
    } else if(obj.desciel == "Cielo cubierto"){
      dia2[4]++;
    }
  } else if(diaObj == dias[2]){
    if(obj.desciel == "Despejado"){
      dia3[0]++;
    } else if(obj.desciel == "Medio nublado"){
      dia3[1]++;
    } else if(obj.desciel == "Poco nuboso"){
      dia3[2]++;
    } else if(obj.desciel == "Cielo nublado"){
      dia3[3]++;
    } else if(obj.desciel == "Cielo cubierto"){
      dia3[4]++;
    }
  } else if(diaObj == dias[3]){
    if(obj.desciel == "Despejado"){
      dia4[0]++;
    } else if(obj.desciel == "Medio nublado"){
      dia4[1]++;
    } else if(obj.desciel == "Poco nuboso"){
      dia4[2]++;
    } else if(obj.desciel == "Cielo nublado"){
      dia4[3]++;
    } else if(obj.desciel == "Cielo cubierto"){
      dia4[4]++;
    }
  }
});

//Agrega los estados y los días a los select de estados y días
let opcEstados = "";
opcEstados += `
  <option value="0" selected>Seleccione un estado</option>
`;
estados.forEach((obj) =>{
  opcEstados += `
    <option value="${obj}">${obj}</option>
  `;
});

let opcDias = "";
opcDias += `
  <option value="0" selected>Seleccione un día</option>
`;
dias.forEach((obj) =>{
  opcDias += `
    <option value="${obj}">${obj}</option>
  `;
});

//Se ejecuta cuando el documento está listo
$(document).ready(() => {
  let municipio = "";
  let estado = "";
  let dia = "";
  
  $("#filasClima").html(filasClima);      //Se agrega el código HTML de las filas de la tabla de clima
  
  //Se inicializa la tabla de clima con DataTables
  $('#tablaClima').DataTable({
    "order": [[ 0, 'asc' ]],
    language: {
      info: 'Mostrando página _PAGE_ de _PAGES_',
      infoEmpty: 'No hay registros disponibles',
      infoFiltered: '(filtrados de _MAX_ registros totales)',
      lengthMenu: 'Muestra _MENU_ registros por página',
      zeroRecords: 'No encontrado',
      search: 'Buscar:',
      paginate: {
        first:    '«',
        previous: '‹',
        next:     '›',
        last:     '»'
      },
    },
    pagingType: "full_numbers",
    "lengthMenu": [ [5, 10, 25, 50, -1], [5, 10, 25, 50, "Todos"] ],
    "info": false,
  });

  $("#estadoSel").html(opcEstados);       //Se agrega el código HTML de los estados al select de estados

  //Se ejecuta cuando se cambia el valor del select de estados, mostrará o desaparecerá los select de municipios y días dependiendo del valor del select de estados
  $("#estadoSel").change(() => {
    $("div#info").addClass("visually-hidden");
    $("#munSelDiv").addClass("visually-hidden");
    $("#diaSelDiv").addClass("visually-hidden");
    estado = $("#estadoSel").val();
    if(estado != "0"){
      let opcMunicipios = "";
      let municipios = new Array();             //municipios guarda los nombres de los municipios del estado seleccionado
      //Se recorre el array de clima para guardar los nombres de los municipios del estado seleccionado
      arrClimas.forEach((obj) =>{
        if(obj.nes == estado && obj.ndia == "0"){
          let nombreMun = new String(obj.nmun);
          if(!municipios.includes(nombreMun.valueOf())){
            municipios.push(nombreMun.valueOf());
          }
        }
      });
      //Se agrega el código HTML de los municipios al select de municipios
      opcMunicipios += `
        <option value="0" selected>Seleccione un municipio</option>
      `;
      municipios.forEach((obj) =>{
        opcMunicipios += `
          <option value="${obj}">${obj}</option>
        `;
      });
      $("select#municipioSel").html(opcMunicipios);
      $("#munSelDiv").removeClass("visually-hidden");
    } else{
      $("div#info").addClass("visually-hidden");
      $("#munSelDiv").addClass("visually-hidden");
      $("#diaSelDiv").addClass("visually-hidden");
    }
  });

  //Se ejecuta cuando se cambia el valor del select de municipios, mostrará o desaparecerá el select de días dependiendo del valor del select de municipios
  $("select#municipioSel").change(() => {
    $("div#info").addClass("visually-hidden");
    $("#diaSelDiv").addClass("visually-hidden");
    municipio = $("select#municipioSel").val();
    
    if(municipio != "0"){
      $("select#diaSel").html(opcDias);
      $("#diaSelDiv").removeClass("visually-hidden");
    } else{
      $("div#info").addClass("visually-hidden");
      $("#diaSelDiv").addClass("visually-hidden");
    }
  });

  $("select#diaSel").change(() => {
    $("div#info").addClass("visually-hidden");
    let opcVarGraf = `<option value="1" selected>Temperatura máxima</option>
    <option value="2">Temperatura mínima</option>
    <option value="3">Probabilidad de precipitación</option>
    <option value="4">Velocidad del viento</option>`;
    $("select#varGraf").html(opcVarGraf);
    dia = $("select#diaSel").val();

    if(dia != "0"){
      let indice = 0;
      arrClimas.forEach((obj) =>{
        let dloc = new String(obj.dloc);
        let nmun = new String(obj.nmun);
        let diaObj = "".concat(dloc.valueOf().slice(6,8),"/",dloc.valueOf().slice(4,6),"/",dloc.valueOf().slice(0,4));

        if(obj.nes==estado && nmun.valueOf()==municipio){
          miArreglo[indice]=obj;
          indice++;
        }

        if(nmun.valueOf() == municipio && diaObj == dia){
          $("#filasInfo").html(`
            <tr>
              <td>${obj.nes}</td>
              <td>${obj.nmun}</td>
              <td>${dia}</td>    
              <td>${obj.tmax}</td>
              <td>${obj.tmin}</td>
              <td>${obj.desciel}</td>
              <td>${obj.probprec}</td>
            </tr>
          `);

          $("#estadosCard").html('<h5>Entidad federativa:  '+obj.nes+'</h5><h5>Alcaldia/Municipio:  '+obj.nmun+'</h5>');

          if(obj.probprec >= 0 && obj.probprec <= 33){
            $("#precipCard").html('<h5>Probabilidad de precipitación: ' + obj.probprec + '%</h5><p>PRONÓSTICO: No se prevén lluvias en esta región, la probabilidad es muy baja.</p>');
          } else if(obj.probprec >= 34 && obj.probprec <= 66){
              $("#precipCard").html('<h5>Probabilidad de precipitación: ' + obj.probprec + '%</h5><p>PRONÓSTICO: Probabilidad moderada de lluvia, existe riesgo de una precipitación moderada en esta zona.</p>');
          } else {
              $("#precipCard").html('<h5>Probabilidad de precipitación: ' + obj.probprec + '%</h5><p>PRONÓSTICO: Probabilidad alta de precipitación, se recomienda mantenerse en su hogar hasta que pase.</p>');
          }
          
          if(obj.velvien >= 0 && obj.velvien <= 5){
              $("#vientoCard").html('<h5>Velocidad del viento: ' + obj.velvien + ' km/h</h5><p>PRONÓSTICO: Viento moderado, solo se pueden llegar a presenciar vientos de máximo 5 km/h.</p>');
          } else if(obj.velvien >= 6 && obj.velvien <= 9){
              $("#vientoCard").html('<h5>Velocidad del viento: ' + obj.velvien + ' km/h</h5><p>PRONÓSTICO: Viento moderadamente fuerte, solo se pueden llegar a presenciar vientos de máximo 9 km/h.</p>');
          } else {
              $("#vientoCard").html('<h5>Velocidad del viento: ' + obj.velvien + ' km/h</h5><p>PRONÓSTICO: Vientos fuertes registrados, extreme precauciones y mantenga sus objetos de valor resguardados.</p>');
          }
          
          if(obj.tmin <= 14){
              $("#tempMinCard").html('<h5>Temperatura mínima: ' + obj.tmin + '°C</h5><p>Se prevén bajas temperaturas, pudiendo descender hasta 10°C, se recomienda abrigarse y mantener precauciones.</p>');
          } else if(obj.tmin >= 15 && obj.tmin <= 24){
              $("#tempMinCard").html('<h5>Temperatura mínima: ' + obj.tmin + '°C</h5><p>Se prevé una temperatura mínima normal, existirá un ambiente cálido y hostil.</p>');
          } else {
              $("#tempMinCard").html('<h5>Temperatura mínima: ' + obj.tmin + '°C</h5><p>Se prevé una temperatura mínima encima del promedio, existirá un ambiente cálido y probables olas de calor en la zona.</p>');
          }
          
          if(obj.tmax <= 14){
            $("#tempMaxCard").html('<h5>Temperatura máxima: ' + obj.tmax + '°C</h5><p>Se prevén temperaturas máximas muy bajas, en general se estima un ambiente frío, se recomienda salir abrigado.</p>');
          } else if(obj.tmax >= 15 && obj.tmin <= 24){
            $("#tempMaxCard").html('<h5>Temperatura máxima: ' + obj.tmax + '°C</h5><p>Se prevé una temperatura máxima normal, en general se estima un ambiente hostil, susceptible a bajas de temperatura.</p>');
          } else {
            $("#tempMaxCard").html('<h5>Temperatura máxima: ' + obj.tmax + '°C</h5><p>Se prevé una temperatura máxima encima del promedio, con la posibilidad de olas de calor extremas, se recomienda mantener sus precauciones.</p>');
          }

          if(obj.desciel === "Cielo cubierto"){
            $("#desCielCard").html('<span class="iconify" data-icon="meteocons:overcast-fill" data-width="200" data-height="200"></span><h5>Descripción del Cielo: ' + obj.desciel + '</h5><p>PRONÓSTICO: El cielo estará completamente cubierto, sin visibilidad del sol debido a la presencia de densas nubes en la atmósfera.</p>');
          } else if(obj.desciel === "Cielo nublado"){
              $("#desCielCard").html('<span class="iconify" data-icon="meteocons:cloudy-fill" data-width="200" data-height="200"></span><h5>Descripción del Cielo: ' + obj.desciel + '</h5><p>PRONÓSTICO: Habrá nubes en el cielo, aunque no completamente cubierto. La visibilidad del sol puede estar parcialmente obstruida por las nubes dispersas.</p>');
          } else if(obj.desciel === "Despejado"){
              $("#desCielCard").html('<span class="iconify" data-icon="meteocons:clear-day-fill" data-width="200" data-height="200"></span><h5>Descripción del Cielo: ' + obj.desciel + '</h5><p>PRONÓSTICO: El cielo estará completamente despejado, sin presencia de nubes. Se espera un día soleado y sin obstrucciones en la visibilidad del sol.</p>');
          } else if(obj.desciel === "Medio nublado"){
              $("#desCielCard").html('<span class="iconify" data-icon="meteocons:partly-cloudy-day-fill" data-width="200" data-height="200"></span><h5>Descripción del Cielo: ' + obj.desciel + '</h5><p>PRONÓSTICO: Se observarán algunas nubes en el cielo, pero la visibilidad del sol será considerable. La presencia de nubes será parcial y no totalmente cubierto.</p>');
          } else if(obj.desciel === "Poco nuboso"){
              $("#desCielCard").html('<span class="iconify" data-icon="meteocons:haze-day-fill" data-width="200" data-height="200"></span><h5>Descripción del Cielo: ' + obj.desciel + '</h5><p>PRONÓSTICO: Habrá pocas nubes en el cielo, con una visibilidad clara del sol. El cielo estará mayormente despejado, permitiendo disfrutar de un día soleado con algunas nubes dispersas.</p>');
          } else {
              // Manejar el caso en el que el valor no coincide con ninguna de las opciones conocidas
              $("#desCielCard").html('<h5>Descripción del Cielo: ' + obj.desciel + '</h5><p>PRONÓSTICO: Información no disponible o no reconocida.</p>');
          }
        }
      });
      $("#varGraf").change(() => {
        let varSeleccionada = $("#varGraf").val();
        if(varSeleccionada=="1"){
          realizarGraficotMax();
        } else if(varSeleccionada=="2"){
          realizarGraficotMin();
        } else if(varSeleccionada=="3"){
          realizarGraficopP();
        } else if(varSeleccionada=="4"){
          realizarGraficovV();
        }
      });
      realizarGraficotMax();
      $("div#info").removeClass("visually-hidden");
    } else{
      $("div#info").addClass("visually-hidden");
    }
  });

  graficasPastel('pastelDia1',dia1, dias[0]);
  graficasPastel('pastelDia2',dia2, dias[1]);
  graficasPastel('pastelDia3',dia3, dias[2]);
  graficasPastel('pastelDia4',dia4, dias[3]);

  cargado = true;


  var mediaqueryList = window.matchMedia("(max-width: 768px)");
  mediaqueryList.addListener( function(EventoMediaQueryList) {
    var ctx1 = document.getElementById('pastelDia1');
    var ctx2 = document.getElementById('pastelDia2');
    var ctx3 = document.getElementById('pastelDia3');
    var ctx4 = document.getElementById('pastelDia4');
    
    if(EventoMediaQueryList.matches) {
      // Realizamos las acciones cuando cambia el estado de la mediaquery y ahora cumple su valor
      ctx1.parentNode.style.height = '50vh';
      ctx1.parentNode.style.width = '50vw';
      
      ctx2.parentNode.style.height = '50vh';
      ctx2.parentNode.style.width = '50vw';

      ctx3.parentNode.style.height = '50vh';
      ctx3.parentNode.style.width = '50vw';

      ctx4.parentNode.style.height = '50vh';
      ctx4.parentNode.style.width = '50vw';
    } else {
      ctx1.parentNode.style.height = '60vh';
      ctx1.parentNode.style.width = '30vw';

      ctx2.parentNode.style.height = '60vh';
      ctx2.parentNode.style.width = '30vw';
      
      ctx3.parentNode.style.height = '60vh';
      ctx3.parentNode.style.width = '30vw';
      
      ctx4.parentNode.style.height = '60vh';
      ctx4.parentNode.style.width = '30vw';
    }
  });
});

function graficasPastel(id,datos,titulo){
  // Obtén el contexto del canvas
  var ctx = document.getElementById(id);

  // Crea la instancia del gráfico
  graficaPastel = new Chart(ctx, {

    type: 'pie', // Tipo de gráfico (puede ser 'line', 'bar', 'radar', etc.)
    data: {
        labels: ['Despejado','Medio nublado','Poco nuboso','Cielo nublado','Cielo cubierto'],
        datasets: [{
          label: 'Municipios',
          data: datos,
          backgroundColor: ['rgb(251, 140, 13)','rgb(13, 124, 251)','rgb(51, 70, 91)','rgb(255, 229, 0)','rgb(100, 172, 6)'], // Color de fondo de las barras
          hoverOffset: 4
        }]
    },
    options: {
      plugins: {
          title: {
              display: true,
              text: titulo,
              font: {
                size: 20
              }
          }
      },
      maintainAspectRatio: false,
    }
  });  
}

function realizarGraficotMax(){

  // Obtén el contexto del canvas
  var ctx = document.getElementById('miGrafica');

  if (miGrafica) {
      miGrafica.destroy();
  }

  // Crea la instancia del gráfico
   miGrafica = new Chart(ctx, {

  type: 'line', // Tipo de gráfico (puede ser 'line', 'bar', 'radar', etc.)
  data: {
      labels: dias,
      datasets: [{
      label: 'Temperatura maxima',
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
      labels: dias,
      datasets: [{
      label: 'Temperatura minima',
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
      labels: dias,
      datasets: [{
      label: 'Velocidad del viento',
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
      labels: dias,
      datasets: [{
      label: 'Probabilidad de prec.',
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