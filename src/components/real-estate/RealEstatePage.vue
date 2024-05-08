<template>
  <section>
    <banner-link :banner="page.bannerSection" />
    <section class="busi-hero-img">
      <div class="img-cover relative over--hide">
        <div class="img-scroll absolute">
          <g-image :src="page.mainImage.file.url + '?fm=webp&w=1860'" :alt="page.mainImage.title" class="no_mobile" />
          <g-image :src="page.mainImage.file.url + '?fm=webp&w=768'" :alt="page.mainImage.title" class="mobile_only"/>
        </div>
      </div>
    </section>
    <section class="sec--pad">
      <div class="layout">
        <h2 class="q_title mb--42 q_center m-text-left enter-up">{{ page.featureSectionTitle }}</h2>
        <div class="real-feat-wrap">
          <div class="q_flex flex--top">
            <div class="real-feat enter-up" v-for="(feature, index) in page.featureSection" :key="index">
              <div class="real-feat-in">
                <h3 class="q_title title--28">{{ feature.title }}</h3>
                <div class="tx--16" v-html="toHtml(feature.content)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="sec--pad">
      <div class="layout">
        <h2 class="q_title q_center enter-up">{{ page.kulaInNumbers.title }}</h2>
        <div class="text max--750 q_center marge-auto mb--42 enter-up" v-html="toHtml(page.kulaInNumbers.content)"></div>
        <div class="q_flex flex--top max--1200 marge-auto">
          <div class="real-num q_center enter-up" v-for="(number, index) in page.kulaInNumbers.number" :key="index">
            <h2 class="q_title">{{ number.numberTitle }}
              <div class="real-num-sub">{{ number.title }}</div>
            </h2>
            <div class="text">{{ number.shortDescription }}</div>
          </div>
        </div>
      </div>
    </section>

    <div class="layout">
      <div class="real-pdf-banner relative">
        <div class="">
          <g-image class="no_mobile"
            :src="page.pdfBanner.image.file.url"
            :alt="page.pdfBanner.image.title"
          />
          <g-image class="mobile_only"
            :src="page.pdfBanner.mobileImage.file.url"
            :alt="page.pdfBanner.mobileImage.title"
          />
        </div>
        <div class="real-pdf-tx q_flex">
          <g-image class="real-pdf-icon no_mobile"
            :src="page.pdfBanner.icon.file.url"
            :alt="page.pdfBanner.icon.title"
          />
          <div class="is--fit">
            <h2 class="q_title title--36">{{ page.pdfBanner.title }}</h2>
            <div class="text tx--24" v-html="toHtml(page.pdfBanner.content)"></div>
            <a class="bt-primary q_flex flex--center" :href="page.pdfBanner.pdfFile.file.url" target="_blank" download>
              <g-image src="~/assets/image/download.svg" alt="" />
              {{ page.pdfBanner.buttonText  }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <section class="busi-contact cover sec--pad q_flex flex--column">
      <banner-link :banner="page.bottomBanner" :isBottomBanner="true" />
    </section>
    
  </section>
</template>

<script>
import BannerLink from '../commons/BannerLink.vue';
import CustomLink from "../commons/CustomLink.vue";
import gsap from 'gsap';

export default {
  name: "RealEstate",
  components: { CustomLink, BannerLink },
  props: {
    page: {
      type: Object,
      require: true,
    },
  },
  mounted: function() {
    this.scrollAnimation();
  },
  methods: {
    scrollAnimation() {
      let windowWidth = window.outerWidth;
      let ySettings = -120;
      if(windowWidth<800){
        ySettings = -90;
      }
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
