$(document).ready(function(){

  var swiper = new Swiper('.swipe-slider', {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 1,
        autoplay: false,
        // autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: false,
        //   },
        loop: true,
        freeMode: true,
        loopedSlides: 5, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
            '@0.00': {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            '@0.75': {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            '@1.00': {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            '@1.50': {
              slidesPerView: 7,
              spaceBetween: 10,
            },
        }
    });

    var galleryTop = new Swiper('.swiper-details', {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
  
        thumbs: {
            swiper: galleryThumbs,
        },
    });
})


