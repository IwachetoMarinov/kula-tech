<template>
  <section class="hp-cities sec--pad z--1">
    <div class="layout">
      <div class="hp-cities-title q_flex">
        <h1 class="q_title title--36 mb--22">{{ citySection.title }}</h1>
        <a
          v-show="citiesNum > 6"
          class="title--16 tx--under no_mobile"
          href="javascript:void(0)"
          @click="isShow = !isShow"
        >
          {{ !isShow ? "SHOW MORE CITIES" : "SHOW LESS CITIES" }}
        </a>
      </div>
      <div id="CityCard_" class="cities q_flex flex--top flex--start">
        <template v-for="(city, index) in citySection.city">
          <div
            class="cities_item"
            :key="city.slug"
            @click="route(city.slug)"
            v-if="isAllCities(index) || isMobile"
          >
            <a
              class="cities_item_in block over--hide"
              :style="{ 'background-color': city.backgroundColor }"
            >
              <span
                class="cities_item_top block relative trigger-hover over--hide img-cover"
              >
                <span class="block hover-scale absolute">
                  <g-image
                    :src="city.image.file.url + '?fm=webp&w=450'"
                    :alt="city.image.title"
                  />
                </span>
              </span>
              <span class="cities_item_bottom block">
                <h3 class="q_title block">{{ city.name }}</h3>
                <span class="tx--14 block">
                  {{ city.neighborhoods.length }} Neighborhoods
                </span>
              </span>
            </a>
          </div>
        </template>
        <template v-for="(cityCS, index) in citySection.cityComingSoon">
          <div
            class="cities_item cities_item-soon"
            :key="cityCS.name"
            v-if="isAllCities(citySection.city.length + index) || isMobile"
          >
            <a
              class="cities_item_in block over--hide"
              :style="{ 'background-color': cityCS.backgroundColor }"
            >
              <span
                class="cities_item_top block relative trigger-hover over--hide img-cover"
              >
                <span class="block hover-scale absolute">
                  <g-image
                    class=""
                    :src="cityCS.image.file.url + '?fm=webp&w=450'"
                    :alt="cityCS.title"
                  />
                </span>
              </span>
              <span class="cities_item_bottom block">
                <h3 class="q_title block">{{ cityCS.name }}</h3>
                <span class="tx--14 block">
                  Coming Soon
                </span>
              </span>
            </a>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import gsap from "gsap";
//import gsap from 'scrollTrigger';

export default {
  name: "CityHomePage",
  props: {
    citySection: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      isClick: false,
      isShow: false,
    };
  },
  mounted: function() {
    this.scrollAnimation();
  },
  computed: {
    citiesNum() {
      if (!this.citySection.city && !this.citySection.cityComingSoon) return 0;
      else if (!this.citySection.city && this.citySection.cityComingSoon)
        return this.citySection.cityComingSoon.length;
      else if (this.citySection.city && !this.citySection.cityComingSoon)
        return this.citySection.city.length;
      else
        return (
          this.citySection.city.length + this.citySection.cityComingSoon.length
        );
    },
    isMobile() {
      if (process.client) {
        return window.matchMedia("only screen and (max-width: 800px)").matches;
      }
      return false;
    },
  },
  methods: {
    scrollAnimation() {
      gsap.fromTo(
        ".cities_item",
        {
          y: 60,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: ".cities_item",
            start: "20px 95%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
        }
      );
    },
    isAllCities(index) {
      if (this.isShow) return true;
      return index < 6 ? true : false;
    },
    route(slug) {
      const query = this.$store.getters.getQuery;

      this.$router.push({ path: "/city/" + slug, query });
    },
  },
};
</script>
