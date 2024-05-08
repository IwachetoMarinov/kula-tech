<template>
  <section class="careers">
    <banner-link :banner="page.bannerSection" />
    <section class="career-gall sec--pad has--bg--btm">
      <swiper
      class="swiper" 
        :options="swiperOption"
      >
        <swiper-slide
          v-for="(image, index) in page.gallery"
          :key="index"
        >
          <div class="img-cover">
            <g-image :src="image.file.url + '?fm=webp&w=930'" :alt="image.title" />
          </div>
        </swiper-slide>
      </swiper>
    </section>
    <section class="sec--pad has--bg">
      <div class="layout">
        <div class="max--850 marge-auto m-center">
          <div class="text tx--24" v-html="toHtml(page.description)"></div>
        </div>
      </div>
    </section>
    <section class="sec--pad has--bg--top career-scroll" style="display:none">
      <div class="scroll-letters1">
        <span class="q_title title--big">No fees or hard feelings.</span>
        <span class="q_title title--big">Free cancelation available.</span>
        <span class="q_title title--big">No fees or hard feelings.</span>
        <span class="q_title title--big">Free cancelation available.</span>
        <span class="q_title title--big">No fees or hard feelings.</span>
      </div>
      <div class="scroll-letters2">
        <span class="q_title title--big">No fees or hard feelings.</span>
        <span class="q_title title--big">Free cancelation available.</span>
        <span class="q_title title--big">No fees or hard feelings.</span>
        <span class="q_title title--big">Free cancelation available.</span>
        <span class="q_title title--big">No fees or hard feelings.</span>
      </div>
    </section>
    <section class="career-why sec--pad">
      <div class="layout">
        <h2 class="q_title mb--42 enter-up">{{ page.featureSectionTitle }}</h2>
        <div class="q_flex flex--top">
          <div class="career-why-item m-100 enter-up" v-for="(feature, index) in page.featureSection" :key="index">
            <h3 class="q_title title--28">{{ feature.title }}</h3>
            <div class="tx--16" v-html="toHtml(feature.content)"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="sec--pad">
      <div class="layout">
        <h2 class="q_title">{{ page.positionSectionTitle }}</h2>
        <div class="wrap-positions q_flex flex--top flex--start">

          <div class="position-item" v-for="(position, index) in page.positions" :key="index">
            <div class="position-item-in bg--bege">
              <h2 class="q_title title--36">{{position.title}}</h2>
              <div class="text tx--18 tx--font-light">{{position.location}}</div>
              <div class="text" v-html="toHtml(position.description)">
              </div>
              <div class="item_city_tags flex flex--start">
                <div class="tag-fsil" v-for="tag in position.tags" :key="tag">
                  {{tag}}
                </div>
              </div>
              <custom-link :link="position.link" :customClass="'bt-primary bt--min-w'" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import BannerTextBackground from "../commons/BannerTextBackground.vue";
import BannerLink from '../commons/BannerLink.vue';
import gsap from 'gsap';
import CustomLink from '../commons/CustomLink.vue';

export default {
  name: "CareersPage",
  components: { BannerTextBackground, Swiper, SwiperSlide, BannerLink, CustomLink },
  props: {
    page: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        loopedSlides: this.page.gallery.length, 
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    }
  },
  mounted: function() {
    this.scrollAnimation();
  },
  methods: {
    scrollAnimation() {
      // gsap.fromTo(".scroll-letters1", {
      //     x: -10,
      // }, {
      //     scrollTrigger: {
      //         trigger: ".scroll-letters1",
      //         start: "20px 90%",
      //         scrub: 2,
      //         toggleActions: "restart pause reverse pause"
      //     },
      //     x: -100,
      //     duration: 1,
      // });
      // gsap.fromTo(".scroll-letters2", {
      //     x: 0,
      // }, {
      //     scrollTrigger: {
      //         trigger: ".scroll-letters1",
      //         start: "20px 90%",
      //         scrub: 2,
      //         toggleActions: "restart pause reverse pause"
      //     },
      //     x: 100,
      //     duration: 1,
      // });
      const boxes = gsap.utils.toArray('.enter-up');
      boxes.forEach((box, i) => {
        gsap.fromTo(box, { 
           y: 60,
          opacity: 0,
        }, {
          scrollTrigger: {
              trigger: box,
              start: "20px 90%",
              toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          duration: 1,
          delay: i * 0.06,
          //stagger: 0.2,
        })
      });
    },
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
  },
};
</script>

<style lang="scss" scoped>
// .careers {
//   .slide {
//     width: 80%;

//     &:nth-child(2n) {
//       width: 60%;
//     }
//     &:nth-child(3n) {
//       width: 40%;
//     }
//   }
// }
</style>
