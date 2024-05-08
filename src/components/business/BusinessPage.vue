<template>
  <section>
    <banner-link :banner="page.bannerSection" />
    <section class="busi-hero-img">
      <div class="img-cover relative over--hide">
        <div class="img-scroll absolute">
          <g-image :src="page.mainImage.file.url + '?fm=webp&w=1860'" :alt="page.mainImage.title" class="no_mobile"/>
          <g-image :src="page.mainImage.file.url + '?fm=webp&w=768'" :alt="page.mainImage.title" class="mobile_only"/>
        </div>
      </div>
    </section>

    <div class="about-section sec--pad">
      <div class="layout">
        <h2 class="q_title title--big q_center enter-up">{{ page.aboutSectionTitle }}</h2>
        <div class="busi-how-wrap">
          <div
            v-for="(about, index) in page.aboutSection"
            :key="index"
            class="busi-how-item q_flex enter-up"
          >
           <div class="busi-how-img col--50 m-100 q_flex flex--center">
              <div class="img-cover relative">
                <g-image
                  :src="about.image.file.url + '?fm=webp&w=700'"
                  :alt="about.image.title"
                />
              </div>
            </div>
            <div class="busi-how-cont col--50 m-100 m-center">
              <h2 class="q_title mb--42">{{ about.title }}</h2>
              <div class="text" v-html="toHtml(about.content)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="busi-contact cover sec--pad q_flex flex--column">
      <banner-link :banner="page.bottomBanner" :isBottomBanner="true" />
    </section>

    <section class="sec-busi-testim sec--pad">
      <div class="layout">
        <h2 class="q_title mb--42 enter-up">{{ page.companiesTestimonials.title }}</h2>
        <div class="busi-testim-wrap q_flex flex--top">
          <div class="busi-testim relative enter-up"
            v-for="(testimonial, index) in page.companiesTestimonials.testimonials"
            :key="index"
          >
            <div class="text tx--16" v-html="toHtml(testimonial.content)"></div>
            <div class="busi-testim-name">
              <div class="tx--18 font--500">{{ testimonial.author }}</div>
              <div class="tx--16 tx--font-light">{{ testimonial.authorRole }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </section>
</template>

<script>
import ContactUsPopUp from "../commons/ContactUsPopUp.vue";
import BannerPrice from "../commons/BannerPrice.vue";
import Brands from "./modules/Brands.vue";
import CustomLink from "../commons/CustomLink.vue";
import BannerLink from "../commons/BannerLink.vue";
import gsap from 'gsap';

export default {
  components: { BannerPrice, Brands, ContactUsPopUp, CustomLink, BannerLink },
  name: "BusinessPage",
  props: {
    page: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      isContactUs: false,
    };
  },
  mounted() {
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
