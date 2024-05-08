<template>
  <section class="building-block-map item_city">
    <div v-if="building" class="item-neighb-in bg--light radius--15 relative">
      <div class="item-neighb-top over--hide relative">
        <div class="item_city_rebon flex flex--start" v-if="building.tag">
          <g-image
            :src="building.tag.icon.file.url"
            :alt="building.tag.icon.title"
          />
          <div>{{ building.tag.title }}</div>
        </div>
        <image-swiper :images="building.gallery" />
      </div>
      <a
        class="item-neighb-bottom block no-white-space"
        @click="onBuilding(building.slug)"
      >
        <h2 class="q_title title--28">{{ building.name }}</h2>
        <div class="text tx--16">
          {{ building.address.neighborhood.oneLineDescription }}
        </div>
        <div class="item_city_tags flex flex--start flex--top">
          <template v-for="(amenity, index) in building.buildingAmenities">
            <div class="tag-fsil" v-if="index < 2" :key="index">
              {{ amenity }}
            </div>
          </template>
          <div class="tag-fsil" v-if="building.buildingAmenities.length > 2">
            +{{ building.buildingAmenities.length - 2 }}
          </div>
        </div>
        <div class="tx--16 hold-from-price">
          from
          <span class="tx--Recoleta bold">
            <span>{{ currency.currencySymbol }}</span
            >{{ price }}
          </span>
        </div>
      </a>
    </div>
  </section>
</template>

<script>
import ImageSwiper from "../../swiper/ImageSwiper.vue";
import { mapGetters } from "vuex";

export default {
  name: "BuildingBlockMap",
  components: { ImageSwiper },
  props: {
    building: {
      type: Object,
      require: true,
    },
    position: {
      require: true,
    },
  },
  computed: {
    ...mapGetters(["currency"]),
    price() {
      let priceArr = this.building.apartments.map(
        (apartment) => apartment.minPrice
      );
      return Math.min(...priceArr);
    },
  },
  methods: {
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
    onBuilding(slug) {
      this.$store.dispatch("tagManagerEvent", {
        type: "MorePlacesClicked",
        value: {
          cardId: this.building.name,
          position: this.position
        },
      });
      const query = this.$store.getters.getQuery;
      let routeData = this.$router.resolve({
        path: "/building/" + slug,
        query
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>
