var usu_id = $('#usu_idx').val();

$(document).ready(function(){

    $.post("../../controller/usuario.php?op=total_documentos", {}, function (data) {
        try {
            data = JSON.parse(data);

            if (data && data.total && data.total[0] && data.total[0].total !== undefined) {
                var totalDocumentos = data.total[0].total;
                $('#lbltotal').html(totalDocumentos);
            } else {
                console.error("Respuesta JSON no válida o falta la propiedad 'total'.");
            }
        } catch (error) {
            console.error("Error al analizar la respuesta JSON:", error);
        }
    });

    $('#documentos_data').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
        ],
        "ajax":{
            url:"../../controller/usuario.php?op=get_documentos_totales_admin_top10",
            type:"post",
            data:{},
        },
        "bDestroy": true,
        "responsive": true,
        "bInfo":true,
        "iDisplayLength": 10,
        "order": [[ 0, "desc" ]],
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
    });

});

function certificado(docd_id){
    console.log(docd_id);
    window.open('../Certificado/index.php?docd_id='+ docd_id +'','_blank');
}
