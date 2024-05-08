<template>
  <section
    class="building-bottom border--top city-page-bottom sec--pad over--hide"
    v-if="morePlaces"
  >
    <div class="layout">
      <h2 class="q_title title--36">Check out our other properties</h2>
      <group-swiper :items="morePlaces" type="building" />
    </div>
  </section>
</template>

<script>
import GroupSwiper from "../../swiper/GroupSwiper.vue";

export default {
  name: "MorePlaces",
  components: { GroupSwiper },
  props: {
    title: {
      type: String,
      require: true,
    },
    morePlaces: {
      type: Array,
      require: true,
    },
  },
};
</script>
