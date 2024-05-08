<template>
  <section class="item_city flex flex--top" @mouseover="onBuildingHover(building.buildingLocation)">
    <div class="item_city_left relative" @click.stop="toggleIsGallery">
      <div class="item_city_rebon bg--bege center" v-show="!building.available">
        <div>FULLY BOOKED</div>
      </div>
      <div
        class="item_city_rebon flex flex--start"
        v-if="building.tag && building.available"
      >
        <g-image
          :src="building.tag.icon.file.url"
          :alt="building.tag.icon.title"
        />
        <div>{{ building.tag.title }}</div>
      </div>
      <image-swiper :images="building.gallery" />
    </div>
    <a
      class="item_city_content is--fit relative block no-white-space"
      @click="onBuilding(building.slug)"
    >
      <h2 class="q_title title--28">
        {{ building.name }}
      </h2>
      <template v-if="!building.available">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div
              class="cal-blocked flex flex--center"
              v-bind="attrs"
              v-on="on"
              v-if="!building.available"
            >
              <g-image src="~/assets/image/cal-blocked.svg" alt="blocked" />
            </div>
          </template>
          <span>We’re fully booked. <br/>Try choosing a different date!</span>
        </v-tooltip>
      </template>
      <div class="text">
        {{ building.address.neighborhood.oneLineDescription }}
      </div>
      <div class="item_city_tags flex flex--start">
        <div
          v-for="(amenity, index) in building.buildingAmenities"
          :key="index"
        >
          <div class="tag-fsil" v-if="index < 4">
            {{ amenity }}
          </div>
        </div>
        <div class="tag-fsil" v-if="building.buildingAmenities.length > 4">
          +{{ building.buildingAmenities.length - 4 }}
        </div>
      </div>
      <div class="item_city_options flex flex--start">
        <template v-for="(apartment, index) in building.apartments">
          <div
            class="item_city_option"
            v-if="index < 3"
            :key="apartment.mewsId"
            :class="apartment.available ? '' : 'disabled'"
          >
          <div class="tx--16">{{ apartment.name }}</div>
          <!-- If not Lisbon show per night, if Lisbon show by month -->
          <div class="tx--16" v-show="apartment.available">
              from
              <span class="tx--Recoleta bold">
                <span>{{ currency.currencySymbol }}</span
                >
                {{ filterBy.citySelected && filterBy.citySelected.name === 'Lisbon' ? apartment.minPrice * 30 : apartment.minPrice }}
              </span>
              <div class="tx--16">
                {{ filterBy.citySelected && filterBy.citySelected.name === 'Lisbon' ? 'per month' : 'per night' }}</div>
            </div>

            <div v-show="!apartment.available">Unavailable</div>
          </div>
        </template>
        <div
          class="item_city_option"
          v-if="building.apartments.length > 3"
          :class="building.available ? '' : 'disabled'"
        >
          <div>+ {{ building.apartments.length - 3 }} more</div>
          <div v-show="building.available" class="underline--decoration">
            View all
          </div>
          <div v-show="!building.available">Unavailable</div>
        </div>
      </div>
    </a>
    <div v-if="isGallery">
      <gallery :images="building.gallery" @onCloseGallery="isGallery = false" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ImageSwiper from "../../swiper/ImageSwiper.vue";
import Gallery from "../../commons/Gallery.vue";

export default {
  name: "BuildingBlock",
  components: { ImageSwiper, Gallery },
  props: {
    building: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      isGallery: false,
    };
  },
  computed: {
    ...mapGetters(["currency", "filterBy"]),
  },
  methods: {
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
    onBuilding(slug) {
      const query = this.$store.getters.getQuery;
      let routeData = this.$router.resolve({
        path: "/building/" + slug,
        query
      });
      window.open(routeData.href, "_blank");
      // this.$router.push({ path: "/building/" + slug, query });
    },
    toggleIsGallery(ev) {
      if (
        ev.target.ariaLabel !== "Next slide" &&
        ev.target.ariaLabel !== "Previous slide"
      ) {
        this.isGallery = true;
      }
    },
    onBuildingHover(buildingLocation) {
      this.$emit("onBuildingHover", buildingLocation)
    }
  },
};
</script>

<style>
.underline--decoration {
  text-decoration: underline;
}
</style>
