function show_modal(page, zise) {
    var link_page = page;
    var opcion = zise;
    //	$(".mall-big").fadeIn();

    $('#editar_registro').empty();
    $('#modal_content').empty();
    $('.modalcontent').remove();

    $('#updatagru').removeData('bs.modal');
    if (opcion === 1) {
        $('#updatagru').removeAttr('class');
        $('#zisemodal').removeAttr('class');
        $('#updatagru').addClass('modal fade bs-example-modal-sm');
        $('#zisemodal').addClass('modal-dialog modal-sm');
    }
    if (opcion === 2) {
        $('#updatagru').removeAttr('class');
        $('#zisemodal').removeAttr('class');
        $('#updatagru').addClass('modal fade');
        $('#zisemodal').addClass('modal-dialog');

    }
    if (opcion === 3) {
        $('#updatagru').removeAttr('class');
        $('#zisemodal').removeAttr('class');
        $('#updatagru').addClass('modal fade bs-example-modal-lg');
        $('#zisemodal').addClass('modal-dialog modal-lg');
    }
    if (opcion === 4) {
        $('#updatagru').removeAttr('class');
        $('#zisemodal').removeAttr('class');
        $('#updatagru').addClass('modal fade');
        $('#zisemodal').addClass('modal-dialog modal-xlg');
    }


    var narray = page.split("/");
    var urray = narray[narray.length - 1];



    if (urray === 'in_ordenes') {
        location.href = "pedidos";
    } else {
        
        $('#updatagru').removeData('bs.modal');
        $('#updatagru').modal({
            remote: link_page,
            backdrop: 'static',
            keyboard: true
        });
        $('#modal_content').load(link_page);
    }
}
function fillinputselectoption(dato, optionselectid, id, nombre, title, dir) {
    'use strict';
    var datofis = dato, idfis = id, nombrefis = nombre, dirfis = dir, oselectid = optionselectid, titlefis = title || 'true';
    $('#' + oselectid).empty();
    if (titlefis === true) {
        $('#' + oselectid).append('<option value="-0">Seleccione una opcion</option>');
    }
    $.each(datofis, function (key, datofis) {
        var idvalue = datofis[idfis], namevalue = datofis[nombrefis], dirvalue = datofis[dirfis];
        if (dirfis === false) {
            $('#' + oselectid).append('<option  value=' + idvalue + '>' + namevalue + '</option>');
        } else {
            $('#' + oselectid).append('<option dir=' + dirvalue + ' value=' + idvalue + '>' + namevalue + '</option>');
        }

    });
}

function postInfo(urls, data, success) {
    var infojs = JSON.stringify(data);
   

    if (infojs === undefined) {
        //console.log("indefinido");
        return false;
        // se ejecutan estas instrucciones
    } else {
    

    var url = urls || "funciones/funciones.aspx";
    var params = typeof infojs === 'string' ? infojs : Object.keys(infojs).map(
        function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(infojs[k]); }
    ).join('&');
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url, true);
    xhr.responseType = "json";
    xhr.onload = function () {
    };
    xhr.onreadystatechange = function () {
        
        if (xhr.readyState > 3 && xhr.status === 200) {

            success(xhr.response);
        } else if (xhr.readyState > 3 && xhr.status === 500) {
            var error = [{ status: 0, msg: xhr.response.Message }];
            success(error);
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(params);
        return xhr;
    }
}

function msgnew(idbtn, clase, timeOut) {

    toastr.options = {
        "closeButton": true,
        "debug": true,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": clase,
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "0",
        "hideDuration": "0",
        "timeOut": timeOut,
        "extendedTimeOut": 0,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "toastClass": "toast programa" + idbtn,
        "tapToDismiss": false
    };

    //		Command: toastr["info"]("Enviando Informacion", "Porfavor Espere")	
}


// validar los campos obligatorios mandandole la clase
function inputvacios($inputs, opcio) {
    var inputs = $inputs;   
    var todoCorrecto = true;
    var opci = opcio || 0;

    $(".has-danger-file").removeClass("has-danger-file");
    $(".has-danger-select").removeClass("has-danger-select");
    for (var i = 0; i < inputs.length; i++) {
        var inputid = $(inputs[i]).attr('id');
        //console.log(inputid);
        if (inputid !== undefined) {
            var valorinp = $.trim($('#' + inputid).val());
          
            if (valorinp === null || valorinp === '-0' || /^\s*$/.test(inputs[i].value)) {
                //console.log(inputs[i].type );
                if (inputs[i].type === 'file') {
                    //saber si un div tiene con tenido                   
                    var cantidadfoto = 0;                  
                    var cantidadfoto2 = 0;                  
                    if ($(".file-preview-thumbnails > .file-preview-frame").length > 0) {
                        cantidadfoto = $(".file-preview-thumbnails > .file-preview-frame").size();                       
                        cantidadfoto2 = $(".file-preview-thumbnails > .file-preview-frame").length();                       
                    }
                    console.log(cantidadfoto);
                    console.log("<-->");
                    console.log(cantidadfoto2);

                    if (cantidadfoto > 0) {
                        $($($('#' + inputid).parent()).parent()).parent().removeClass('has-danger');
                        todoCorrecto = true;
                    }
                    if (cantidadfoto === 0) {
                   
                    //$($('#' + inputid).siblings('div')).addClass('has-danger-file');
                    
                        $($($('#' + inputid).parent()).parent()).parent().addClass('has-danger');
                    ////bueno
                    //$($('#' + inputid).siblings('div')).addClass('has-danger');
                        todoCorrecto = false;
                    }
                }
                if (inputs[i].tagName === 'INPUT' || inputs[i].tagName === 'TEXTAREA') {
                    if (inputs[i].type !== 'file') {
                        //$('#' + inputid).addClass('has-danger');
                        $($('#' + inputid).parent()).addClass('has-danger');
                        $($('#' + inputid).parent()).removeClass('has-success');
                        
                       
                        todoCorrecto = false;
                    }
                }
                if (inputs[i].tagName === 'SELECT') {
                    if (opci === 0) {
                        $('#' + inputid).selectpicker('setStyle', 'haserroresselect', 'add');
                    } else if (opci === 3) {                      

                        //$($($('#' + inputid).parent()).select2("container")).addClass("has-danger");


                        //$($('#' + inputid).parent()).select2({ customClass: "Myselectbox"});
                    }else {
                        //$($('#' + inputid).parent()).addClass('has-danger-select');
                        $($('#' + inputid).parent()).addClass('has-danger');
                        
                    }
                    todoCorrecto = false;
                }
            } else {
                if (opci === 0) {
                    $('#' + inputid).selectpicker('setStyle', 'haserroresselect', 'remove');
                }
                else if (opci === 2) {

                    //							$('#'+inputid).removeClass("haserroresselect");	
                    //						$('#'+inputid).select2();

                }
                $($('#' + inputid).parent()).removeClass('has-danger');
                $($('#' + inputid).parent()).addClass('has-success');
                $($($('#' + inputid).parent()).parent()).parent().removeClass('has-danger');
            }
        }
    }
    return todoCorrecto;
}

function ParIngresa(opcion) {
    'use strict';
    var result = '';
    switch (opcion) {
        case 'locaciones':
            result = "2";
            break;
        case 'cajeros':
            result = "3";
            break;
        case 'productos':
            result = "3";
            break;
    }
    return result;
}

function tabla_load(column, datos, nreporte, ntabla) {
    'use strict';
    var reporte = nreporte, size = ParIngresa(reporte) || '3';
    ntabla = ntabla || 'table';
    setTimeout(function () {
        $('#' + ntabla).bootstrapTable('refresh');
        $('#' + ntabla).bootstrapTable({
            search: true,
            //advancedSearch: true,
            showFooter: false,
            searchAlign: 'right',
            showColumns: false,
            showToggle: true,
            showExport: true,
            //Exportexcel: true,
            //exportDataType: "",
            exportTypes: ['excel', 'csv'],
            minimumCountColumns: 3,
            mobileResponsive: true,
            striped: true,
            showPaginationSwitch: true,
            pagination: true,
            pageSize: 25,
            pageList: [25, 50, 100, 200],
            //			toolbar: '#toolbar',
            toolbarAlign: 'left',
            buttonsAlign: 'right',
            fixedColumns: true,
            fixedNumber: 1,
            columns: column
        });
        $('#' + ntabla).bootstrapTable('load', datos);
    }, 1000);
}

function tabla(column, datos, nreporte, toolbaroff, dinamic, contenedor_panel, ntabla, toolbarop, complurl) {
    'use strict';
    var reporte = nreporte, size = ParIngresa(reporte) || '3';
    toolbaroff = parseInt(toolbaroff) || 0;
    var toolbar = '';
    dinamic = dinamic || 0;
    complurl = complurl || "";
    var cadena = "/admin/insert/" + reporte;
    contenedor_panel = contenedor_panel || 'contenedor_panel';
    ntabla = ntabla || 'table';
    toolbarop = toolbarop || 'toolbar';
    var htming = 'Ingresar';
    if (reporte === 'ordenes') {
        htming = 'Nuevo Pedido';
    }
    if (toolbaroff === 1) {

        if (dinamic === 1) {
            cadena = '../base/public/menu/insertar/in_' + reporte;
        }
        toolbar = '<div id="' + toolbarop + '"><button id="button" onclick="javascript: show_modal(\'' + cadena + '\',' + size + ');return false" class="btn btn-default" >' + htming + '</button></div>';
    }



    $('#' + ntabla).bootstrapTable('refresh');
    $('#advancedSearch').removeData('bs.modal');
    $('#' + contenedor_panel).empty();
    $('#' + contenedor_panel).append('<div id="grafica' + toolbarop + '" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>' + toolbar + '<table id="' + ntabla + '" class="table" data-advanced-search="true" data-id-table="advancedTable" data-row-style="rowStyle"></table>');
    $('#advancedSearch').empty();
    $('#' + ntabla).bootstrapTable({
        search: true,
        advancedSearch: true,
        showFooter: false,
        searchAlign: 'right',
        showColumns: false,
        showToggle: true,
        showExport: true,
        //exportDataType: "",
        Exportexcel: true,
        exportTypes: ['excel', 'csv'],
        minimumCountColumns: 3,
        mobileResponsive: true,
        striped: true,
        showPaginationSwitch: true,
        pagination: true,
        pageSize: 25,
        pageList: [25, 50, 100, 200],
        toolbar: '#' + toolbarop,
        toolbarAlign: 'left',
        buttonsAlign: 'right',
        fixedColumns: true,
        fixedNumber: 1,
        columns: column
    });
    $('#' + ntabla).bootstrapTable('load', datos);
    //	}, 0);
}

function procesarFormularior(selector, template) {
    var data = template ? template : {};
    var f, r, valor, m, $e, $elements = $(selector).find("input, select, textarea");

    var conta = $elements.length;
    for (var i = 0; i < conta; i++) {
        $e = $($elements[i]);

        f = $e.data("campos");
        r = $e.attr("required") ? true : false;


        // si no se especificó un campo, ignoramos el elemento
        if (!f) continue;

        // dependiendo de que tipo de control se trate
        valor = "";
        switch ($e[0].nodeName.toUpperCase()) {
            case "LABEL":
                valor = $e.text();
                break;
            case "INPUT":

                var type = $e.attr("type").toUpperCase();

                if (type === "CHECKBOX") {
                    valor = $e.prop("checked") ? 1 : 0;

                }
                else if (type === "RADIO") {
                    if ($e.prop("checked")) {
                        valor = $e.val();
                    }

                }
                //                else if ($e.datepicker){
                //                    valor = $e.datepicker("getDate");
                //					
                //				}
                else {
                    valor = $.trim($e.val());

                }


                break;
            case "TEXTAREA":
            default:
                valor = $.trim($e.val());

        }

        //		

        // grabamos el valor en el objeto
        if (r && (valor === undefined || valor === "")) {
            m = $e.data("mensaje");
            if (m)
                alert(m);
            else
                alert("Necesitas especificar un valor para el campo \"" + f + "\".");
            $e.focus();
            return null;
        } else if (valor !== undefined)
            data[f] = valor;

    }// next

    return data;
}
function insert_catalogo(datos, urlbase) {
    'use strict';
    var datosins = datos || [], urlbaseins = urlbase || "../admin/funciones.aspx/InsertDatos", result = '';



    postInfo(urlbase, datosins, function (datas) {       
        var msg = "";
        var status = parseInt(datas["status"]);
        result = datas;

        if (status === 1) {

            msg = datas["msg"];
            $(".close").trigger('click');
           // multiples();
            var table = $('#example').DataTable({
                'destroy': true,
                'paging': true,
                'lengthChange': true,
                'searching': true,
                'ordering': true,
                'info': true,
                'autoWidth': true
            });
            table.destroy();
            cargatabla();
            msgnew("", "toast-top-full-width", 6000);
            Command: toastr["success"](msg, "");

        } else {
            //mensajeshow(status, datas['msg']);

            msgnew("", "toast-top-full-width", 6000);
            Command: toastr["error"](msg, "");
            console.log(datas["info"]);
        }
        return result;
    });
}

function insert_catalogo_empresas(datos, urlbase) {
    'use strict';
    var datosins = datos || [], urlbaseins = urlbase || "../admin/funciones.aspx/InsertDatos", result = '';



    postInfo(urlbase, datosins, function (datas) {
        var msg = "";
        var status = parseInt(datas["status"]);
        result = datas;

        if (status === 1) {

            msg = datas["msg"];
            $(".close").trigger('click');
            // multiples();
            var table = $('#tabla1').DataTable({
                'destroy': true,
                'paging': true,
                'lengthChange': true,
                'searching': true,
                'ordering': true,
                'info': true,
                'autoWidth': true
            });
            table.destroy();
            carga_tablapri();
            msgnew("", "toast-top-full-width", 6000);
            Command: toastr["success"](msg, "");

        } else {
            //mensajeshow(status, datas['msg']);

            msgnew("", "toast-top-full-width", 6000);
            Command: toastr["error"](msg, "");
            console.log(datas["info"]);
        }
        return result;
    });



}

function insert_catalogo_operadores(datos, urlbase) {
    'use strict';
    var datosins = datos || [], urlbaseins = urlbase || "../admin/funciones.aspx/InsertDatos", result = '';



    postInfo(urlbase, datosins, function (datas) {       
        var msg = "";
        var status = parseInt(datas["status"]);
        result = datas;

        if (status === 1) {

            msg = datas["msg"];
            $(".close").trigger('click');
            // multiples();
            var table = $('#tabla2').DataTable({
                'destroy': true,
                'paging': true,
                'lengthChange': true,
                'searching': true,
                'ordering': true,
                'info': true,
                'autoWidth': true
            });
            table.destroy();
            carga_tablasec();
            msgnew("", "toast-top-full-width", 6000);
            Command: toastr["success"](msg, "");

        } else {
            //mensajeshow(status, datas['msg']);

            msgnew("", "toast-top-full-width", 6000);
            Command: toastr["error"](msg, "");
            console.log(datas["info"]);
        }
        return result;
    });



}

function insert_catalogo_opcional(datos, urlbase,tabla,funcion) {
    'use strict';
    var datosins = datos || [];

    postInfo(urlbase, datosins, function (datas) {

        console.log("despues");
        console.log(datas);
        var msg = "";
        var status = parseInt(datas["status"]);
        var result = datas;

        if (status === 1) {

            msg = datas["msg"];
            $(".close").trigger('click');
            // multiples();
            var table = $(tabla).DataTable({
                'destroy': true,
                'paging': true,
                'lengthChange': true,
                'searching': true,
                'ordering': true,
                'info': true,
                'autoWidth': true
            });
            table.destroy();
            eval(funcion + '()');
            msgnew("", "toast-top-full-width", 6000);
            Command: toastr["success"](msg, "");

        } else {
            //mensajeshow(status, datas['msg']);

            msgnew("", "toast-top-full-width", 6000);
            Command: toastr["error"](msg, "");
            console.log(datas["info"]);
        }
        console.log("todo bien hasta aqui");
        return result;
    });



}


$(".cerrar").click(function () {
    $('#updatagru').data('bs.modal', null);
    $('#updatagru').removeData();
    $('#modal_content').empty();
    $('#updatagru').removeData('bs.modal');


});

$(".cerrarm").click(function () {
    $('#updatagru').data('bs.modal', null);
    $('#updatagru').removeData();

});



function insertarFormulario(selector, template) {
    var data = template ? template : {};
    var f, r, valor, m, $e, $elements = $(selector).find("input, select, textarea");

    var conta = $elements.length;
    for (var i = 0; i < conta; i++) {
        $e = $($elements[i]);


        f = $e.data("campos");
        r = $e.attr("required") ? true : false;



        if (typeof data[f] === 'undefined') {
            // does not exist


        } else {


            switch ($e[0].nodeName.toUpperCase()) {
                case "LABEL":
                    valor = $e.text();
                    break;
                case "INPUT":
                    var type = $e.attr("type").toUpperCase();

                    if (type === "CHECKBOX") {
                        valor = $e.prop("checked") ? 1 : 0;
                       
                        var opcion = false;
                        if (data[f] === "1" || data[f] === 1) {
                            opcion = true;
                        }
                       
                        document.getElementById(f).checked = opcion;
                    }
                    else if (type === "RADIO") {
                        if ($e.prop("checked")) {
                            valor = $e.val();
                        }

                    }
                    else {
                        valor = $.trim($e.val());
                        document.getElementById(f).value = data[f];
                    }


                    break;
                case "SELECT":
                    valor = $e.text();
                    //						document.getElementById('personlist').getElementsByTagName('option')[data[f]].selected = 'selected';
                    document.getElementById(f).value = data[f];
                    break;

                case "TEXTAREA":
                default:
                //                valor = $.trim($e.val());

            }
        }


    }// next

    return data;
}

function enviarfotos(previewId, index, idimagen, divcontenimagendatos) {
        index = index || 0;
        idimagen = idimagen || "imagen";
        divcontenimagendatos = divcontenimagendatos || "icontenimagendatos";
        var urlbase = "/Subida_archivos/Uploadfile";
        previewId = previewId;
        var count = 0;
        if ($("#" + idimagen).length) {
            var fileUpload = $("#" + idimagen).get(0);
            var files = fileUpload.files;
            count = files.length;
        }
        var datas = new FormData();
        if (count > 0) {
            datas.append('imagen[]', files[index]);            
            datas.append('RECURSO', 4);

        }
        $($('#' + previewId).find('.text-warning')).addClass('glyphicon-hand-up text-muted');
        $($('#' + previewId).find('.text-warning')).removeClass('glyphicon-hand-down text-warning');

        $.ajax({
            url: urlbase,
            type: 'POST',
            async: true,
            contentType: false,
            data: datas,
            processData: false,
            xhr: function () {
                //upload Progress
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    $($('#' + previewId).find('.file-thumb-progress')).removeClass('kv-hidden');
                    xhr.upload.addEventListener('progress', function (event) {
                        var percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }

                        $('#sentpedido').attr("disabled", true);
                        $('#uploadpic').val("1");
                        $($('#' + previewId).find('.progress-bar')).css("width", + percent + "%");
                        $($('#' + previewId).find('.progress-bar')).text(percent + "%");
                        $($('#' + previewId).find('.text-muted')).addClass('glyphicon-hand-up text-muted');
                    }, true);
                }
                return xhr;
            },
            cache: false,
            dataType: 'json',
            beforeSend: function () {

            },
            success: function (data) {
                if (data['status'] === 1) {
                    $($('#' + previewId).find('.progress-bar')).removeClass('progress-bar-striped');
                    $($('#' + previewId).find('.progress-bar')).removeClass('bg-info progress-bar-info');
                    $($('#' + previewId).find('.progress-bar')).addClass('bg-success progress-bar-success');
                    $($('#' + previewId).find('.text-muted')).addClass('glyphicon-ok-sign text-success');
                    $('#' + previewId).addClass('file-preview-success');
                    $($('#' + previewId).find('.text-muted')).removeClass('glyphicon-hand-up text-muted');
                    $($('#' + previewId).find('.file-upload-indicator')).attr('title', 'Subido');
                    $($('#' + previewId).find('.progress-bar')).text("Completo");
                    //$($('#' + previewId).find('.file-thumb-progress')).addClass('kv-hidden');
                    var datosimg = '<div id="img-' + previewId + '" class="clsimgcap" >\
				<input type="hidden" value="' + data['unqid'] + '" name="unqid">\
				<input type="hidden" value="' + data['filename'] + '" name="imgname">\
				<input type="hidden" value="' + data['ContentType'] + '" name="type">\
				<input type="hidden" value="' + data['size'] + '" name="size">\
				<input type="hidden" value="' + data['extencion'] + '" name="extension">\
			</div>';
                    $("#" + divcontenimagendatos).append(datosimg);

                    //$('#uploadpic').val("0");
                    //setTimeout(function () {
                    //    var picupload = $('#uploadpic').val();
                    //    if (picupload === 0) {
                    //        $('#sentpedido').attr("disabled", false);
                    //    }

                    //}, 900);

                } else {

                    msgnew("", "toast-top-full-width", 6000);
                    Command: toastr["error"](data['info'], "");
                    $($('#' + previewId).find('.progress-bar')).removeClass('bg-info progress-bar-info');
                    $($('#' + previewId).find('.progress-bar')).addClass('bg-danger progress-bar-danger');
                    $($('#' + previewId).find('.progress-bar')).text('error');
                    $($('#' + previewId).find('.progress-bar')).removeClass('progress-bar-striped');
                    $($('#' + previewId).find('.text-muted')).addClass('glyphicon-exclamation-sign text-danger');
                    $('#' + previewId).addClass('file-preview-error');
                    $($('#' + previewId).find('.text-muted')).removeClass('glyphicon-hand-up text-muted');
                    $($('#' + previewId).find('.file-upload-indicator')).attr('title', 'Error');

                    setTimeout(function () {

                        // $('.kv-file-remove').click();
                    }, 300);
                }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {

            var mensajerror = '<div class="alert alert-danger">\
                                  <button type="button" class="close" data-dismiss="alert">&times;</button>\
                                  <strong>'+ textStatus + '!</strong> ' + errorThrown + '.\
                                </div>';
            $($('#' + previewId).find('.progress-bar')).removeClass('bg-info progress-bar-info');
            $($('#' + previewId).find('.progress-bar')).addClass('bg-danger progress-bar-danger');
            $($('#' + previewId).find('.progress-bar')).text(textStatus + " " + errorThrown);
            $($('#' + previewId).find('.progress-bar')).removeClass('progress-bar-striped');
            $($('#' + previewId).find('.text-muted')).addClass('glyphicon-exclamation-sign text-danger');
            $('#' + previewId).addClass('file-preview-error');
            $($('#' + previewId).find('.text-muted')).removeClass('glyphicon-hand-up text-muted');
            $($('#' + previewId).find('.file-upload-indicator')).attr('title', 'Error');

        });




    }

    function leerimgenv() {
        var datosimg = [];

        $(".clsimgcap").each(function (a) {

            var item = {};

            var unqid = $(this).find('input:hidden[name=unqid]').val();
            var imgname = $(this).find('input:hidden[name=imgname]').val();
            var type = $(this).find('input:hidden[name=type]').val();
            var idprev = $(this).find('input:hidden[name=idprev]').val();
            var size = $(this).find('input:hidden[name=size]').val();
            var extension = $(this).find('input:hidden[name=extension]').val();

            if (unqid !== '') {
                item['unqid'] = unqid;
                item['imgname'] = imgname;
                item['type'] = type;
                item['idprev'] = idprev;
                item['size'] = size;
                item['extension'] = extension;

                datosimg.push(item);
            }


        });
        return datosimg;


    }
    function validar_clave(contrasenna) {

        if (contrasenna.length >= 8) {
            var mayuscula = false;
            var minuscula = false;
            var numero = false;
            var caracter_raro = false;


            for (var i = 0; i < contrasenna.length; i++) {
                if (contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90) {
                    mayuscula = true;
                }
                else if (contrasenna.charCodeAt(i) >= 97 && contrasenna.charCodeAt(i) <= 122) {
                    minuscula = true;
                }
                else if (contrasenna.charCodeAt(i) >= 48 && contrasenna.charCodeAt(i) <= 57) {
                    numero = true;
                }
                else {
                    caracter_raro = true;
                }
            }
            // if (mayuscula == true && minuscula == true && caracter_raro == true && numero == true) {
            if (mayuscula === true && minuscula === true && numero === true) {
                return true;
            }
        }
        return false;
}

