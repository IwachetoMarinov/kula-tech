<template>
  <swiper v-if="images" class="swiper" :options="swiperOption">
    <swiper-slide v-for="(image, index) in images" :key="index">
      <g-image :src="image.file.url + '?w=800'" :alt="image.title" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "ImageSwiper",
  components: { Swiper, SwiperSlide },
  props: {
    images: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto",
        loop: true,
        initialSlide: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          // renderBullet: function(index, className) {
          //   return '<span v-if="index < 6" class="' + className + '"></span>';
          // },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  // swiper-pagination-bullet
  computed: {
    isMobile() {
      return window.matchMedia("only screen and (max-width: 800px)").matches;
    },
    editImages() {
      if (!this.images) return null;
      else if (this.images.length > 6) return this.images.slice(6);
      else return this.images;
    },
  },
  mounted() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
    // const elementNext = document.querySelector(".swiper-button-next");
    // const elementPrev = document.querySelector(".swiper-button-prev");
    // elementNext.classList.remove("swiper-button-disabled");
    // elementPrev.classList.remove("swiper-button-disabled");
  },
};
</script>
