let datosClima = JSON.parse(jsonClima);
let arrClimas = Array.from(datosClima);
let filasClima = "";
let ides = new Array();
let estados = new Array();
let dias = new Array();

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
console.log(dias);
let opcEstados = "";
opcEstados += `
  <option value="0" selected>Seleccione un estado</option>
`;
estados.forEach((obj) =>{
  opcEstados += `
    <option value="${obj}">${obj}</option>
  `;
});

$(document).ready(() => {
  $("#filas").html(filasClima);
  $("#filasClima").html(filasClima);
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
    "lengthMenu": [ [5, 10, 25, 50, -1], [5, 10, 25, 50, "All"] ],
    "info": false,
  });

  $("#estadoSel").html(opcEstados);

  $("#estadoSel").change(() => {
    $("div#municipioSel").addClass("visually-hidden");
    $("div#diaSel").addClass("visually-hidden");
    let estado = $("#estadoSel").val();
    if(estado != "0"){
      let opcMunicipios = "";
      let municipios = new Array();
      arrClimas.forEach((obj) =>{
        if(obj.nes == estado && obj.ndia == "0"){
          let nombreMun = new String(obj.nmun);
          if(!municipios.includes(nombreMun.valueOf())){
            municipios.push(nombreMun.valueOf());
          }
        }
      });
      opcMunicipios += `
        <option value="0" selected>Seleccione un municipio</option>
      `;
      municipios.forEach((obj) =>{
        opcMunicipios += `
          <option value="${obj}">${obj}</option>
        `;
      });
      $("select#municipioSel").html(opcMunicipios);
      $("div#municipioSel").removeClass("visually-hidden");


    } else{
      $("div#municipioSel").addClass("visually-hidden");
      $("div#diaSel").addClass("visually-hidden");
    }
  });

  $("select#municipioSel").change(() => {
    $("div#diaSel").addClass("visually-hidden");
    let municipio = $("select#municipioSel").val();
    if(municipio != "0"){
      let opcDias = "";
      opcDias += `
        <option value="0" selected>Seleccione un día</option>
      `;
      dias.forEach((obj) =>{
        opcDias += `
          <option value="${obj}">${obj}</option>
        `;
      });
      $("select#diaSel").html(opcDias);
      $("div#diaSel").removeClass("visually-hidden");

    } else{
      $("div#diaSel").addClass("visually-hidden");
    }
  });
});