<template>
  <section v-if="brands">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(brand, index) in brands" :key="index">
        <g-image :src="brand.file.url" :alt="brand.title" />
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "Brands",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    brands: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        slidesPerView: 3,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
};
</script>
