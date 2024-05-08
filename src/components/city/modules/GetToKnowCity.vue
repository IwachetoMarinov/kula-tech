<template>
  <section>
    <h1 class="q_title">Get to know {{ page.name }}</h1>
    <div class="text max--750" v-html="toHtml(page.description.initialDescription)"></div>
    <div class="text max--750"
      v-show="isLongDesc"
      v-html="toHtml(page.description.expendedDescription)"
    ></div>
    <a v-if="page.description.expendedDescription" class="link text" @click.stop="toggleIsLongDesc">
      {{ isLongDesc ? "Show Less" : "Show more" }}
    </a>
    <group-swiper :items="page.neighborhoods" type="city" />
  </section>
</template>

<script>
import GroupSwiper from "../../swiper/GroupSwiper.vue";

export default {
  name: "CityPage",
  components: { GroupSwiper },
  props: {
    page: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      isLongDesc: false,
    };
  },
  methods: {
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
    toggleIsLongDesc() {
      this.isLongDesc = !this.isLongDesc;
    },
  },
};
</script>
