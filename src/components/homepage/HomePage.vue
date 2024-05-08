<template>
  <section v-if="page" class="home-page">
    <section class="hp-hero relative img-cover over--hide">
      <!-- Hero Text Overlay -->
      <div class="hp-hero-hello">
        <div class="layout q_center">
          <h2
            class="hp-hero-hello-text q_title title--big bold"
          >
            {{ page.heroOverlayText.titleBeforeAnimation }}
            <span class="hold-hero-words relative">
              <span
                v-for="(word, i) in page.heroOverlayText.animationWord"
                :key="i"
                class="tx--primary home-page-hero-word"
              >
                {{ word.text }}
              </span>
              <span class="hold-hero-words-hide">
                {{ page.heroOverlayText.titleBeforeAnimation }}
              </span>
            </span>
          </h2>
        </div>
      </div>

      <div class="img-scroll absolute">
        <g-image
          class="mobile_only"
          :immediate="true"
          :src="page.mainImageMobile.file.url + '?fm=webp&w=968'"
          :alt="page.mainImageMobile.title"
        />
        <g-image
          class="no_mobile"
          :src="page.mainImage.file.url + '?fm=webp&w=1920'"
          :alt="page.mainImage.title"
        />
      </div>
    </section>
    <ClientOnly>
      <section class="sec-hp-search no_mobile relative">
        <div class="hp-search-hold">
          <div
            class="hp-search head-discover-open border--1 q_flex main-home-container"
            ref="bannerSearch"
          >
            <city-filter
              :class="isLoading ? 'disabled' : ''"
              :isBtn="true"
              :attach="'.main-home-container'"
            />
            <search-bar-date-picker-filter
              :isBtn="true"
              :isSelect="false"
              :customRef="'homePagePicker'"
              :class="isLoading ? 'disabled' : ''"
              ref="homeDate"
            />
            <guest-filter
              :class="isLoading ? 'disabled' : ''"
              :isBtn="true"
              :attach="'.main-home-container'"
              @onToggleDate="onToggleDate('homeDate', 'homePagePicker')"
            />
            <button
              class="hp-search-submit"
              @click.stop="onSearch('full')"
              :class="{
                'btn-active': date.startDate && date.endDate && city,
                'is-active': isLoading,
              }"
            >
              Search
              <span class="loader"></span>
            </button>
          </div>
        </div>
      </section>
    </ClientOnly>
    <!-- here discover-->
    <div class="hp-search-tiny no_mobile" ref="discoverSearch">
      <div class="hold-head-search" :class="isFilter ? 'active' : ''">
        <a
          class="no_mobile head-discover q_flex"
          v-show="!isFilter && !isSelectFilter"
          @click.stop="isFilter = true"
        >
          Discover your stay
          <g-image src="~/assets/image/search.svg" alt=""></g-image>
        </a>
        <div
          v-show="isFilter || isSelectFilter"
          class="head-discover-open border--1 q_flex no_mobile top-home-container"
          v-click-outside="onClickOutside"
        >
          <city-filter :isBtn="true" :attach="'.top-home-container'" />
          <search-bar-date-picker-filter
            :isBtn="true"
            :customRef="'homePagePicker'"
            ref="homeDateDiscover"
          />
          <guest-filter
            :isBtn="true"
            :attach="'.top-home-container'"
            @onToggleDate="onToggleDate('homeDateDiscover', 'homePagePicker')"
          />
          <button
            @click.stop="onSearch('mini')"
            class="search-circ q_flex flex--center"
            :class="{
              'btn-active': date.startDate && date.endDate && city,
              'is-active': isLoading,
            }"
          >
            <g-image src="~/assets/image/search.svg" alt=""></g-image>
            <span class="loader"></span>
          </button>
        </div>
      </div>
    </div>

    <section class="mobile-hp-search bg--light mobile_only z--1">
      <h2 class="q_title">{{ page.mobileTitle }}</h2>
      <a
        class="mobile-hp-search-btn q_flex"
        ref="mobileSearch"
        @click="setMobilePopUp('city')"
      >
        <span class="tx--24">
          Discover your stay
        </span>
        <span class="hp-search-submit q_flex flex--center">
          <g-image src="~/assets/image/search.svg" alt=""></g-image>
        </span>
      </a>
    </section>
    <a
      ref="discoverSearchMobile"
      class="dis-mobile mobile_only bg--light"
      @click="setMobilePopUp('city')"
    >
      <span class="q_flex flex--center">
        Discover your stay
        <g-image src="~/assets/image/search.svg" alt=""></g-image>
      </span>
    </a>
    <city-home-page :citySection="citySection" />
    <div class="hp-hello">
      <div class="layout q_center">
        <h2
          class="hp-hello-big q_title title--big bold no-marge q_flex flex--center"
        >
          {{ page.heroSection.titleBeforeAnimation }}
          <span class="hold-words relative">
            <span
              v-for="(word, i) in page.heroSection.animationWord"
              :key="i"
              class="tx--primary home-page-word"
            >
              {{ word.text }}
            </span>
            <span class="hold-words-hide">
              {{ page.heroSection.titleBeforeAnimation }}
            </span>
          </span>
        </h2>
        <div class="hp-hello-sub q_title bold">
          {{ page.heroSection.titleAfterAnimation }}
        </div>
        <div
          class="hp-hello-tx q_title title--36"
          v-html="toHtml(page.heroSection.content)"
        ></div>
      </div>
    </div>
    <!--
    <div class="hp-lottie" style="">
      <lottie :options="lottieOptions" v-on:animCreated="handleAnimation" />
    </div>
    -->
    <standards-home-page :standards="page.standardSection" />
    <about-home-page
      :aboutSection="page.aboutSection"
      :title="page.aboutSectionTitle"
    />
    <section class="sec-hp-banner-save sec--pad--btm">
      <div class="layout">
        <div class="hp-banner-save relative">
          <div
            class="hp-banner-save-in absolute q_flex flex--column flex--base m-block max--100"
          >
            <div class="q_title title--36" v-if="page.featureSection.title">
              {{ page.featureSection.title }}
            </div>
            <div
              class="text tx--22"
              v-if="page.featureSection.content"
              v-html="toHtml(page.featureSection.content)"
            ></div>
            <custom-link class="bt-border" :link="page.featureSection.link" />
          </div>
          <g-image
            class="w-100 no_mobile"
            :src="page.featureSection.image.file.url + '?fm=webp'"
            :alt="page.featureSection.title"
          />
          <g-image
            class="w-100 mobile_only"
            :src="page.featureSectionMobileImage.file.url + '?fm=webp'"
            :alt="page.featureSectionMobileImage.title"
          />
        </div>
      </div>
    </section>
    <review-home-page
      :reviewSection="page.reviewSection"
      :reviewFeatures="page.reviewFeatures"
    />
    <business-home-page :businessSection="page.businessSection" />
  </section>
</template>

<script>
import BannerPrice from "../commons/BannerPrice.vue";
import CustomLink from "../commons/CustomLink.vue";
import CityFilter from "../filters/CityFilter.vue";
// import DatePickerFilter from "../filters/DatePickerFilter.vue";
import SearchBarDatePickerFilter from "../filters/SearchBarDatePicker.vue";
import GuestFilter from "../filters/GuestFilter.vue";
import AboutHomePage from "./modules/AboutHomePage.vue";
import BusinessHomePage from "./modules/BusinessHomePage.vue";
import CityHomePage from "./modules/CityHomePage.vue";
import StandardsHomePage from "./modules/StandardsHomePage.vue";
import ReviewHomePage from "./modules/ReviewHomePage.vue";
// import Lottie from "vue-lottie";
// import * as animationData from "~/assets/image/lottie-m.json";
import { mapState } from "vuex";
import gsap from "gsap";
import dayjs from "dayjs";
//import ScrollTrigger from 'gsap/dist/ScrollTrigger';

export default {
  name: "HomePage",
  components: {
    // Lottie,
    CityHomePage,
    BannerPrice,
    StandardsHomePage,
    AboutHomePage,
    BusinessHomePage,
    // DatePickerFilter,
    SearchBarDatePickerFilter,
    CityFilter,
    GuestFilter,
    CustomLink,
    ReviewHomePage,
  },
  props: {
    page: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      isLoading: false,
      isFilter: false,
      // anim: null,
      // lottieOptions: { animationData: animationData.default },
    };
  },
  computed: {
    ...mapState({
      date: (state) => state.filterStore.filterBy.date,
      city: (state) => state.filterStore.filterBy.citySelected,
      adultCount: (state) => state.filterStore.filterBy.adultCount,
      childCount: (state) => state.filterStore.filterBy.childCount,
    }),
    dateSelected() {
      const date = this.$store.getters.filterBy.date;
      if (!date.startDate || !date.endDate) return "Select dates";
      return (
        dayjs(date.startDate).format("MMM DD") +
        " - " +
        dayjs(date.endDate).format("MMM DD")
      );
    },
    isSelectFilter() {
      const def = this.adultCount + this.childCount;
      if (this.city || this.date.startDate || def > 1) return true;
      return false;
    },
    citySection() {
      if (!this.page) return null;
      return {
        title: this.page.citySectionTitle,
        city: this.page.cities,
        cityComingSoon: this.page.citiesComingSoon
      };
    },
  },
  mounted: function() {
    window.addEventListener("scroll", this.handleScroll);
    this.scrollAnimationOn();
    const elements = document.querySelectorAll(".home-page-word");
    elements[0].classList.add("home-page-word-active");
    
    const heroOverlayElements = document.querySelectorAll(".home-page-hero-word");
    heroOverlayElements[0].classList.add("home-page-hero-word-active");
    
    const addAnimation = (element, classname) => {
      let count = 1;
      return setInterval(() => {
        element[count].classList.add(classname);
        if (count) element[count - 1].classList.remove(classname);
        else
          element[element.length - 1].classList.remove(classname);
        if (count !== element.length - 1) count++;
        else count = 0;
        47;
      }, 2800);
    }

    addAnimation(elements, "home-page-word-active");
    addAnimation(heroOverlayElements, "home-page-hero-word-active")
  },
  methods: {
    scrollAnimationOn() {
      let windowWidth = window.outerWidth;
      let ySettings = 150;
      if (windowWidth < 800) {
        ySettings = 40;
      }
      // gsap.fromTo(
      //   ".hp-lottie",
      //   {
      //     y: ySettings,
      //   },
      //   {
      //     scrollTrigger: {
      //       trigger: ".hp-lottie",
      //       start: "20px 80%",
      //       end: "center -150%",
      //       scrub: true,
      //       toggleActions: "restart pause reverse pause",
      //     },
      //     y: -100,
      //     duration: 1,
      //   }
      // );
      const boxes = gsap.utils.toArray(".enter-up");
      boxes.forEach((box) => {
        gsap.fromTo(
          box,
          {
            y: 60,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: box,
              start: "20px 90%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
          }
        );
      });
    },
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
    // handleAnimation: function(anim) {
    //   this.anim = anim;
    // },
    onClickOutside(ev) {
      if (
        this.date.startDate ||
        this.city ||
        this.adultCount + this.childCount > 1 ||
        ev.target.innerText.includes("Discover your stay") ||
        (ev.target.offsetParent &&
          ev.target.offsetParent.className.includes(
            "v-list-item theme--light"
          )) ||
        ev.target.id == "guest-list"
      ) {
        this.isFilter = true;
      } else {
        this.isFilter = false;
      }
    },
    async onSearch(state) {
      const filterBy = this.$store.getters.filterBy;
      const query = this.$store.getters.getQuery;

      if (
        !filterBy.date.startDate ||
        !filterBy.date.endDate ||
        !filterBy.citySelected
      ) {
        return;
      } else {
        this.isLoading = true;
        await this.$store.dispatch("getAvailability");
        const strDate =
          dayjs(filterBy.date.startDate).format("DD/MM/YY") +
          " - " +
          dayjs(filterBy.date.endDate).format("DD/MM/YY");
        this.$store.dispatch("tagManagerEvent", {
          type: "SearchSubmitted",
          value: {
            state,
            city: filterBy.citySelected.slug,
            numberOfAdults: filterBy.adultCount,
            numberOfChildren: filterBy.childCount,
            date: strDate,
          },
        });
        this.isLoading = false;
        this.$router.push({
          path: "/city/" + filterBy.citySelected.slug,
          query,
        });
      }
    },
    handleScroll() {
      if (!this.$refs) return;
      const bannerSearch = this.$refs.bannerSearch;
      const discoverSearch = this.$refs.discoverSearch;
      const rect = bannerSearch.getBoundingClientRect();
      if (rect.bottom <= 85) {
        discoverSearch.classList.add("hp-search-active");
      } else {
        discoverSearch.classList.remove("hp-search-active");
      }
      // mobile
      const discoverSearchMobile = this.$refs.discoverSearchMobile;
      const mobileSearch = this.$refs.mobileSearch;
      const rectMobile = mobileSearch.getBoundingClientRect();
      if (rectMobile.y <= 0) {
        discoverSearchMobile.classList.add("hp-search-active");
      } else {
        discoverSearchMobile.classList.remove("hp-search-active");
      }
    },
    setMobilePopUp(val) {
      this.$store.commit("setMobilePopUp", true);
      this.$store.commit("setCurrentMobilePopUp", val);
    },
    onToggleDate(cmpRef, dateRef) {
      this.$refs[cmpRef].$refs[dateRef].togglePicker(false);
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
.display--none {
  display: none;
}

.main-home-container {
  .v-menu__content {
    top: 79px !important;
  }
}
</style>
