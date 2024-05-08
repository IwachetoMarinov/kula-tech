<template>
  <div class="know-city-wrap">
    <swiper
      v-if="items && items.length > 1"
      class="swiper know-city"
      :class="{'sm-no-pd': items.length < 5}"
      :options="swiperOption"
    >
      <swiper-slide v-for="(item, index) in items" :key="index">
        <neighborhood-block
          v-if="type === 'city'"
          :neighborhood="item"
          :position="index"
        />
        <building-block-map v-if="type === 'building'" :building="item" :position="index" />
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <div v-else class="flex">
      <template v-for="(item, index) in items">
        <neighborhood-block
          v-if="type === 'city'"
          :key="index"
          :neighborhood="item"
          :position="index"
        />
        <building-block-map
          v-if="type === 'building'"
          :key="index"
          :building="item"
          :position="index"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import NeighborhoodBlock from "../city/modules/NeighborhoodBlock.vue";
import BuildingBlockMap from "../city/modules/BuildingBlockMap.vue";

export default {
  name: "GroupSwiper",
  components: { NeighborhoodBlock, Swiper, SwiperSlide, BuildingBlockMap },
  props: {
    items: {
      type: Array,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      isLongDesc: false,
      swiperOption: {
        spaceBetween: 30,
        //centeredSlides: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        //loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1700: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1600: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1080: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          680: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      },
    };
  },
  mounted() {
    // window.dispatchEvent(new Event('resize'));
  }
};
</script>
