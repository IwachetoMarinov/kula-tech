<template>
  <section v-if="images" class="gallery pop-wrap">
    <div class="pop-inner q_flex flex--column">
      <div class="popup" v-click-outside="onCloseGallery">
        <a
          class="pop-close-cric ic-pointer q_flex flex--center"
          @click="onCloseGallery"
          ><g-image src="~/assets/image/close.svg" alt="close"></g-image
        ></a>
        <div class="thumb-example relative">
          <div class="relative">
            <div class="swipe-count">
              {{ currImgIndex }} / {{ images.length }}
            </div>
            <!-- swiper1 -->
            <swiper
              class="swiper gallery-top"
              :options="swiperOptionTop"
              ref="swiperTop"
            >
              <swiper-slide
                v-for="(image, index) in images"
                :key="index"
                :style="{
                  backgroundImage: 'url(' + image.file.url + ')',
                }"
              ></swiper-slide>
              <div
                ref="buttonNext"
                class="swiper-button-next swiper-button-white"
                slot="button-next"
                @click="handleClickSlide('next')"
              ></div>
              <div
                ref="buttonPrev"
                class="swiper-button-prev swiper-button-white"
                slot="button-prev"
                @click="handleClickSlide('prev')"
              ></div>
            </swiper>
          </div>
          <div class="swiper2-wrap relative">
            <!-- swiper2 Thumbs -->
            <swiper
              class="swiper gallery-thumbs"
              :options="swiperOptionThumbs"
              ref="swiperThumbs"
            >
              <swiper-slide
                v-for="(image, index) in images"
                :key="index"
                :style="{
                  backgroundImage: 'url(' + image.file.url + ')',
                }"
              ></swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "Gallery",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    images: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      swiperOptionTop: {
        loop: true,
        loopedSlides: this.images.length, // looped slides should be the same
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: this.images.length, // looped slides should be the same
        spaceBetween: 4,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
      currImgIndex: 1,
    };
  },
  methods: {
    onCloseGallery() {
      this.$emit("onCloseGallery");
    },
    handleKeydown(event) {
      if (event.key === "Escape") {
        this.$emit("onCloseGallery");
      } else if (event.key === "ArrowLeft") {
        this.$refs.buttonPrev.click();
      } else if (event.key === "ArrowRight") {
        this.$refs.buttonNext.click();
      }
    },
    handleClickSlide(type) {
      if (type === "next") {
        if (this.currImgIndex === this.images.length) this.currImgIndex = 1;
        else this.currImgIndex++;
      } else {
        if (this.currImgIndex === 1) this.currImgIndex = this.images.length;
        else this.currImgIndex--;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
};
</script>

<style lang="scss" scoped></style>
