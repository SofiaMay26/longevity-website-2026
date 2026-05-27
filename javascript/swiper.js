const defaultSwiper = new Swiper(".swiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const heroSwiper = new Swiper(".heroSwiper", {
  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".heroSwiper .swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".heroSwiper .swiper-button-next",
    prevEl: ".heroSwiper .swiper-button-prev",
  },
});

// Comment Swiper

const testimonialSwiper = new Swiper(".testimonialSwiper", {
  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".testimonialSwiper .swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});
