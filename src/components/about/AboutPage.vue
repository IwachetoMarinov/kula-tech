<template>
  <section>
    <div class="layout q_center">
      <div class="max--850 marge-auto">
        <h1 class="q_title title--big mb--42" v-if="page.bannerSection.title">
          {{ page.bannerSection.title }}
        </h1>
        <div
          class="text tx--24"
          v-if="page.bannerSection.content"
          v-html="toHtml(page.bannerSection.content)"
        ></div>
      </div>
    </div>
    <section class="ab-gallery sec--pad relative has--bg--btm">
      <div
        class="ab-gallery-item over--hide"
        v-for="(image, index) in page.gallery"
        :key="index"
      >
        <div class="img-cover">
          <g-image :src="image.file.url + '?fm=webp&w=360'" :alt="image.title" />
        </div>
      </div>
    </section>
    <section class="ab-mid sec--pad has--bg">
      <div class="layout q_center">
        <div class="max--850 marge-auto">
          <h2 class="q_title mb--42" v-if="page.abovePicSection.title">
            {{ page.abovePicSection.title }}
          </h2>
          <div
            class="text tx--24"
            v-if="page.abovePicSection.content"
            v-html="toHtml(page.abovePicSection.content)"
          ></div>
        </div>
      </div>
    </section>
    <div class="ab-corner busi-hero-img has--bg--top">
      <div class="img-cover relative over--hide">
        <div class="img-scroll absolute">
          <g-image class="no_mobile" :src="page.picDesktop.file.url + '?fm=webp&w=1860'" :alt="page.picDesktop.title" />
          <g-image class="mobile_only" :src="page.picMobile.file.url + '?fm=webp&w=768'" :alt="page.picMobile.title" />
        </div>
      </div>
    </div>
    <banner-link class="ab-grow align-left" :banner="page.underPicSection" :isBottomBanner="true" />
  </section>
</template>

<script>
import AboutHomePage from "../homepage/modules/AboutHomePage.vue";
import BusinessHomePage from "../homepage/modules/BusinessHomePage.vue";
import gsap from "gsap";
import BannerLink from '../commons/BannerLink.vue';

export default {
  components: { BusinessHomePage, AboutHomePage, BannerLink },
  name: "AboutPage",
  data() {
    return {
      aboutSection: { title: null, about: this.page.aboutSection },
    };
  },
  props: {
    page: {
      type: Object,
      require: true,
    },
  },
  mounted() {
    this.scrollAnimation();
  },
  methods: {
    scrollAnimation() {
      let windowWidth = window.outerWidth;
      let yDesk1 = 120;
      let yDesk2 = -80;
      let ySettings = -120;
      if(windowWidth<800){
        yDesk1 = 30;
        yDesk2 = -40;
        ySettings = -90;
      }
      const boxes = gsap.utils.toArray('.ab-gallery-item');
      boxes.forEach((box, i) => {
        gsap.fromTo(box, { 
          y: yDesk1,
        }, {
          scrollTrigger: {
              trigger: box,
              start: "20px 80%",
              scrub: 2,
              toggleActions: "restart pause reverse reset"
          },
          y: yDesk2,
          //duration: i * 0.5,
          delay: i * 0.4,
        })
      });
       gsap.fromTo(".img-scroll", {
          y: 0,
        }, {
          scrollTrigger: {
              trigger: ".img-scroll",
              start: "20px 90%",
              end: "center -90%",
              scrub: 3,
              toggleActions: "restart pause reverse pause"
          },
          y: ySettings,
          duration: .6,
      });
      
    },
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
  },
};
</script>

<style>
.align-left {
  text-align: left;
}
</style>