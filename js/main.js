"use strict";
$(document).ready(function () {


	// $('a[data-toggle="tab"]').on('hide.bs.tab', function (e) {
	// 	var $old_tab = $($(e.target).attr("href"));
	// 	var $new_tab = $($(e.relatedTarget).attr("href"));

	// 	if($new_tab.index() < $old_tab.index()){
	// 		$old_tab.css('position', 'relative').css("right", "0").show();
	// 		$old_tab.animate({"right":"-100%"}, 300, function () {
	// 			$old_tab.css("right", 0).removeAttr("style");
	// 		});
	// 	}
	// 	else {
	// 		$old_tab.css('position', 'relative').css("left", "0").show();
	// 		$old_tab.animate({"left":"-100%"}, 300, function () {
	// 			$old_tab.css("left", 0).removeAttr("style");
	// 		});
	// 	}
	// });

	// $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
	// 	var $new_tab = $($(e.target).attr("href"));
	// 	var $old_tab = $($(e.relatedTarget).attr("href"));

	// 	if($new_tab.index() > $old_tab.index()){
	// 		$new_tab.css('position', 'relative').css("right", "-2500px");
	// 		$new_tab.animate({"right":"0"}, 500);
	// 	}
	// 	else {
	// 		$new_tab.css('position', 'relative').css("left", "-2500px");
	// 		$new_tab.animate({"left":"0"}, 500);
	// 	}
	// });

	// $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	// 	// your code on active tab shown
	// });



 
    /* sidebar left  expand collapase */
    $('.menu-left').on('click', function () {
        $('body').addClass('menu-left-open');
        $('body .wrapper').append('<div class="backdrop"></div>');
        $('.backdrop').on('click', function () {
            $('body').removeClass('menu-left-open');
            $('.backdrop').fadeOut().remove();
        });
    });

    $('.sidebar-close').on('click', function () {
        $('body').removeClass('menu-left-open');
        $('.backdrop').fadeOut().remove();
    });

    /* sideabr right expand collapase */
    $('.menu-right').on('click', function () {
        $('body').addClass('menu-right-open')
        $('body .wrapper').append('<div class="backdrop-right"></div>');
        $('.backdrop-right, .menu-left-close').on('click', function () {
            $('body').removeClass('menu-right-open');
            $('.backdrop-right').fadeOut().remove();
        });
    });

    /* search control visible slide hide slide */
    $('.searchbtn').on('click', function () {
        $('.searchcontrol').addClass('active');
    });
    $('.close-search').on('click', function () {
        $('.searchcontrol').removeClass('active');
    });


    /* page content height for sticky footer */
    $('.content-sticky-footer').css({
        'padding-bottom': $('.footer-wrapper').height()
    });
    $('.footer-wrapper').css('margin-top', -($('.footer-wrapper').height()));


    /* page inside iframe just for demo app */
    if (self !== top) {
        $('body').addClass('max-demo-frame')
    }

});

$(window).on('load', function() {
    $('.loader').remove();
});




$(document).ready(function () {
	$(".nav-link>.fa, .form-control").hover(function () {
		$(this).css("color", "#f28232");
	}, function () {
		$(this).css("color", "rgb(221, 212, 212)");
	});

	$("#login-nav-item").hover(function () {
		$("#login-nav-item .m-overlay-panel-container").css("display", "block");
	});

	$("#login-nav-item").mouseleave(function () {
		$("#login-nav-item .m-overlay-panel-container").css("display", "none");
	});

	$("#cart-nav-item").hover(function () {
		$("#cart-nav-item .m-overlay-panel-container").css("display", "block");
	});

	$("#cart-nav-item").mouseleave(function () {
		$("#cart-nav-item .m-overlay-panel-container").css("display", "none");
	});


	$('.add-to-basket-button').click(function () {
		$(this).addClass('success');
		setTimeout(function () { $('.add-to-basket-button').removeClass('success'); }, 2000);
	});

	$('.scroll-to-basket').click(function () {
		scrollToBasket();
	});

	function showBasketPanel() {
		$("#cart-nav-item .m-overlay-panel-container").show();
		setTimeout(function () { $("#cart-nav-item .m-overlay-panel-container").hide(); }, 2000);
	}

	function scrollToBasket() {
		$('html, body').animate({
			scrollTop: $("#cart-nav-item").offset().top
		}, 500);
		showBasketPanel();
	}

	$(".form-control").hover(function () {
		$(this).css("border-color", "#f28232");
	}, function () {
		$(this).css("color", "rgb(221, 212, 212)");
	});


	$(function () {
		$('#show-more-btn').click(function () {
			$('#datalist p:hidden').slice(0, 3).show();
			if ($('#datalist p').length == $('#datalist p:visible').length) {
				$('#show-more-btn').hide();
			}
		});
	});




	$(".nav1").hover(function () {
		$(".modal").css("display", "none");
	});


	// search box
	$(".search .suggestions-container").css("display", "none");

	$("#search-box-input").keyup(function () {
		if (this.value.length > 1) {
			$(".search .suggestions-container").css("display", "block");
		} else {
			$(".search .suggestions-container").css("display", "none");
		}
	});

	$(".mob-header-search .modal-search-container").css("display", "none");

	$("#mob-search-input").click(function () {
		$(".mob-header-search .modal-search-container").css("display", "block");
	});

	$("#modal-return-link").click(function () {
		$(".mob-header-search .modal-search-container").css("display", "none");
	});

	// Products Filter:
	$(window).click(function () {
		$(".click-outside").css("display", "none");
	});

	$("#renk").click(function () {
		event.stopPropagation();
		$(".click-outside").css("display", "none");
		$("#renk .click-outside").css("display", "block");
	});

	$("#beden").click(function () {
		event.stopPropagation();
		$(".click-outside").css("display", "none");
		$("#beden .click-outside").css("display", "block");
	});

	$("#cinsiyet").click(function () {
		event.stopPropagation();
		$(".click-outside").css("display", "none");
		$("#cinsiyet .click-outside").css("display", "block");
	});

	$("#kategori").click(function () {
		event.stopPropagation();
		$(".click-outside").css("display", "none");
		$("#kategori .click-outside").css("display", "block");
	});

	$("#marka").click(function () {
		event.stopPropagation();
		$(".click-outside").css("display", "none");
		$("#marka .click-outside").css("display", "block");
	});

	$("#materyal").click(function () {
		event.stopPropagation();
		$(".click-outside").css("display", "none");
		$("#materyal .click-outside").css("display", "block");
	});

	$("#Desen").click(function () {
		event.stopPropagation();
		$(".click-outside").css("display", "none");
		$("#Desen .click-outside").css("display", "block");
	});

	// mobile product filter
	$(".mob-modal").css("display", "none");

	$("#modal-close-link").click(function () {
		$(".mob-modal").css("display", "none");
	});

	$("#mob-product-filter-link").click(function () {
		$(".mob-product-filter-modal").css("display", "block");
	});

	$("#mob-renk").click(function () {
		event.stopPropagation();
		$(".click-outside").css("display", "none");
		$("#mob-renk .click-outside").css("display", "block");
	});

	$("#mob-beden").click(function () {
		event.stopPropagation();
		$(".click-outside").css("display", "none");
		$("#mob-beden .click-outside").css("display", "block");
	});

	$("#mob-cinsiyet").click(function () {
		event.stopPropagation();
		$(".click-outside").css("display", "none");
		$("#mob-cinsiyet .click-outside").css("display", "block");
	});

	$("#mob-kategori").click(function () {
		event.stopPropagation();
		$(".click-outside").css("display", "none");
		$("#mob-kategori .click-outside").css("display", "block");
	});

	$("#mob-marka").click(function () {
		event.stopPropagation();
		$(".click-outside").css("display", "none");
		$("#mob-marka .click-outside").css("display", "block");
	});

	$("#mob-materyal").click(function () {
		event.stopPropagation();
		$(".click-outside").css("display", "none");
		$("#mob-materyal .click-outside").css("display", "block");
	});

	$("#mob-Desen").click(function () {
		event.stopPropagation();
		$(".click-outside").css("display", "none");
		$("#mob-Desen .click-outside").css("display", "block");
	});

	// mobile header right section
	$("#mob-cart-link").click(function () {
		$(".mob-basket-modal").css("display", "block");
	});


});

