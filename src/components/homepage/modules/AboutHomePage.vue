<template>
  <section class="hp-about sec--pad enter-up2">
    <div class="layout">
      <h2 class="q_title q_center mb--42" v-if="aboutSectionTitle">
        {{ aboutSectionTitle }}
      </h2>
      <div class="relative no_mobile">
        <div class="hp-about-items q_flex flex--top">
          <a
            class="hp-about-item q_center c-pointer block no-white-space"
            v-for="(about, index) in aboutSection"
            :key="index"
            @click="changeImage(index)"
            @mouseover="changeImage(index)"
          >
            <h3 class="q_title title--28 ease">{{ about.title }}</h3>
            <div class="tx--18 ease" v-html="toHtml(about.content)"></div>
          </a>
        </div>
        <div class="hp-about-img img-cover">
          <g-image
            v-for="(about, index) in aboutSection"
            :src="about.image.file.url + '?fm=webp&w=500'"
            :alt="about.image.title"
            :key="index"
            :class="index === imageIndex ? 'active-in' : 'go-out'"
          />
        </div>
      </div>
      <div class="hp-about-slide mobile_only">
        <swiper
          v-if="aboutSection"
          class="swiper"
          :options="swiperOption"
        >
          <swiper-slide
            class="hp-about-item q_center c-pointer block no-white-space"
            v-for="(about, index) in aboutSection"
            :key="index"
          >
            <div class="hp-about-img img-cover">
              <g-image :src="about.image.file.url + '?fm=webp&w=500'" :alt="about.image.title" />
            </div>
            <h3 class="q_title title--28">{{ about.title }}</h3>
            <div class="tx--18" v-html="toHtml(about.content)"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import gsap from "gsap";

export default {
  name: "AboutHomePage",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    aboutSection: {
      type: Array,
      require: true,
    },
    aboutSectionTitle: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      imageIndex: 0,
      swiperOption: {
        slidesPerView: 1,
        loop: true,
       autoHeight: true,
      //  effect: 'fade',
      //   fadeEffect: {
      //     crossFade: true
      //   },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
      },
    };
  },
  mounted: function() {
    this.scrollAnimation();
  },
  methods: {
    scrollAnimation() {
    const boxes = gsap.utils.toArray('.enter-up2');
      boxes.forEach((box, i) => {
        gsap.fromTo(box, { 
          y: 60,
          opacity: 0,
        }, {
          scrollTrigger: {
              trigger: box,
              start: "20px 60%",
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
    changeImage(index) {
      this.imageIndex = index;
    },
  },
};
</script>
