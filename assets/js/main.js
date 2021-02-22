$(document).ready(function(){
    $('#search2').on('keydown, keyup', function () {
        var texInputValue = $('#search2').val();
        $('#search1').val(texInputValue);
    });
    $('#search1').on('keydown, keyup', function () {
        var texInputValue = $('#search1').val();
        $('#search2').val(texInputValue);
    }); 
})
