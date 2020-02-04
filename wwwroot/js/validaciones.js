$(document).on("keypress", ".UpperCase", function (e) {
    //$(".UpperCase").on("keypress", function () {
    $input = $(this);
    setTimeout(function () {
        $input.val($input.val().toUpperCase());
    }, 50);
});


$(document).on("keyup change", ".solo_numeros", function (e) {
    console.log("entra keyup");
   // this.value = (this.value + '').replace(/[^0-9]/g, '');
});

$(document).on("blur", ".valida-mail", function (e) {
    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

    if (regex.test($(this).val().trim())) {
        //alert('Correo validado');

    } else {
        $(this).val("");
        alert('La direccón de correo no es válida');
    }
    
});

//$("#curp").blur(function () {
//$('#validate').click(function () {

//    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

//    if (regex.test($('#email').val().trim())) {
//        alert('Correo validado');

//    } else {
//        alert('La direccón de correo no es válida');
//    }
//});

//$('.solo-numero').keyup(function () {
//    this.value = (this.value + '').replace(/[^0-9]/g, '');
//});