$(document).ready(() => {
  let datosClima = JSON.parse(jsonClima);
  let arrClimas = Array.from(datosClima);
  let filasClima = "";

  arrClimas.forEach((obj) =>{
    let dia = "";
    if(obj.dloc=="20231109T00"){
      dia = "09/11/2023";
    } else if(obj.dloc=="20231110T00"){
      dia = "10/11/2023";
    } else if(obj.dloc=="20231111T00"){
      dia = "11/11/2023";
    } else{
      dia = "12/11/2023";
    }

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
  });

  $("#filasClima").html(filasClima);

  /*
  $("#diaSel").change(()=>{
    let diaSel = $("#diaSel").val();
    

    if(diaSel=="0"){
      
    }else if(diaSel=="1"){
      arrClimas.forEach((obj) =>{
        if(obj.dloc=="20231109T00"){
          filasClima += `
            <tr>
              <td>${obj.nes}</td>
              <td>${obj.nmun}</td>
              <td>${obj.tmax}</td>
              <td>${obj.tmin}</td>
              <td>${obj.desciel}</td>
              <td>${obj.probprec}</td>
            </tr>
          `;
        }
      });
    }
  });*/
  
  $('#myTable').DataTable({
    "order": [[ 0, 'asc' ], [ 1, 'asc' ], [ 2, 'asc' ]],
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
    initComplete: function () {
      this.api()
          .columns()
          .every(function () {
              let column = this;

              // Create select element
              let select = document.createElement('select');
              select.add(new Option(''));
              column.footer().replaceChildren(select);

              // Apply listener for user change in value
              select.addEventListener('change', function () {
                  var val = DataTable.util.escapeRegex(select.value);

                  column
                      .search(val ? '^' + val + '$' : '', true, false)
                      .draw();
              });

              // Add list of options
              column
                  .data()
                  .unique()
                  .sort()
                  .each(function (d, j) {
                      select.add(new Option(d));
              select.append('<option value="' + d + '">' + d.substr(0,30) + '</option>')

                  });
          });
      },
  });
});