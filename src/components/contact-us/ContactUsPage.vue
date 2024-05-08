<template>
  <section>
    <banner-link :banner="page.bannerSection" />
    <div class="busi-hero-img">
      <div class="img-cover relative over--hide">
        <div class="img-scroll absolute">
          <g-image
            :src="page.mainImage.file.url + '?fm=webp&w=1860'"
            :alt="page.mainImage.title"
            class="no_mobile"
          />
          <g-image
            :src="page.mainImage.file.url + '?fm=webp&w=768'"
            :alt="page.mainImage.title"
            class="mobile_only"
          />
        </div>
      </div>
    </div>
    <section class="sec-cont-office sec--pad">
      <div class="layout">
        <h2 class="q_title mb--42">{{ page.contactCountriesTitle }}</h2>
        <div class="hold-all-office">
          <div ref="contactForm" class="q_flex flex--top flex--start">
            <div
              class="office-item"
              v-for="(country, index) in page.contactCountriesSection"
              :key="index"
            >
              <div class="q_flex flex--start q_title title--28">
                <g-image :src="country.icon.file.url" :alt="country.title" />
                {{ country.country }}
              </div>
              <div class="text">
                {{ country.phone }}<br />
                <a href="mailto:">{{ country.email }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section ref="formSection" class="sec-cont-form sec--pad">
      <div class="layout q_flex">
        <div class="cont-form-img img-cover relative no_mobile">
          <g-image
            :src="page.contactImage.file.url + '?fm=webp&w=600'"
            :alt="page.contactImage.title"
          />
        </div>
        <div class="cont-form m-100" v-show="!$route.query.success">
          <h2 class="q_title">{{ page.contactSection.title }}</h2>
          <div
            class="text tx--22 mb--42"
            v-html="toHtml(page.contactSection.content)"
          ></div>
          <contact-us-form
            :formGeneralQuestions="page.formGeneralQuestions"
            @handleScroll="handleScroll"
          />
        </div>

        <div class="cont-form m-100" v-show="$route.query.success">
          <h2 class="q_title">{{ page.thanksContactSection.title }}</h2>
          <div
            class="text tx--22 mb--42"
            v-html="toHtml(page.thanksContactSection.content)"
          ></div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import BannerLink from "../commons/BannerLink.vue";
import BannerTextBackground from "../commons/BannerTextBackground.vue";
import ContactUsForm from "./modules/ContactUsForm.vue";
import gsap from "gsap";

export default {
  components: { ContactUsForm, BannerTextBackground, BannerLink },
  name: "ContactUsPage",
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
      if (windowWidth < 800) {
        ySettings = -90;
      }
      gsap.fromTo(
        ".img-scroll",
        {
          y: 0,
        },
        {
          scrollTrigger: {
            trigger: ".img-scroll",
            start: "20px 90%",
            end: "center -90%",
            scrub: 3,
            toggleActions: "restart pause reverse pause",
          },
          y: ySettings,
          duration: 0.6,
        }
      );
    },
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
    handleScroll() {
      const element = this.$refs.formSection;
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    },
  },
  watch: {
    "$route.query"(val) {
      if (val.success) {
        const element = this.$refs.contactForm;
        setTimeout(() => {
          element.scrollIntoView();
        }, 300);
      }
    },
  },
};
</script>
