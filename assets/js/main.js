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

$('.tab-slider').owlCarousel({
    loop:true,
    nav:false,
    dots: false,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:3,

        },
        600:{
            items:5,
        },
        1000:{
            items:5,
        }
    }
});
