<template>
  <div class="building-filter relative">
    <div class="q_flex flex--start no_mobile bulding-main">
      <price-filter :attach="'.bulding-main'" />
      <room-types-filter :attach="'.bulding-main'" />
    </div>
    <div @click="setMobilePopUp('filters')" class="mm-city-filter q_flex flex--start mobile_only">
      <g-image src="~/assets/image/filters1.svg" alt="filters" />
      Filters
    </div>
  </div>
</template>

<script>
import PriceFilter from '../../filters/PriceFilter.vue';
import RoomTypesFilter from '../../filters/RoomTypesFilter.vue';

export default {
  components: { PriceFilter, RoomTypesFilter },
  name: "BuildingFilter",
  props: {
    apartments: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      apartmentSelect: null,
    };
  },
  methods: {
    setMobilePopUp(val) {
      this.$store.commit("setMobilePopUp", true);
      this.$store.commit("setCurrentMobilePopUp", val);
    },
  }
};
</script>
