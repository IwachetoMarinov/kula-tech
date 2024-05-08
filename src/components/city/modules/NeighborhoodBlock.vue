<template>
  <section class="item-neighborhood" @click.prevent="onNeighborhood">
    <div class="item-neighb-in radius--15">
      <div class="item-neighb-top trigger-hover over--hide img-cover relative">
        <g-image
          class="hover-scale"
          :src="neighborhood.gallery[0].file.url + '?fm=webp&w=380'"
          :alt="neighborhood.gallery[0].title"
        />
      </div>
      <div class="item-neighb-bottom">
        <h3 class="q_title title--28">{{ neighborhood.name }}</h3>
        <div class="text tx--16">{{ neighborhood.oneLineDescription }}</div>
        <div class="item_city_tags flex flex--start">
          <div
            class="tag-fsil"
            v-for="(feature, index) in neighborhood.features"
            :key="index"
          >
            <!-- <g-image :src="feature.image.file.url" :alt="feature.image.title" /> -->
            {{ feature.title }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { EventBus } from "@/event-bus";

export default {
  name: "NeighborhoodBlock",
  props: {
    neighborhood: {
      type: Object,
      require: true,
    },
    position: {
      require: true,
    },
  },
  methods: {
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
    onNeighborhood() {
      EventBus.$emit("onNeighborhood", {
        index: this.position,
        isCenter: true,
      });
      this.$store.dispatch("tagManagerEvent", {
        type: "GetToKnowCityClicked",
        value: {
          cardId: this.neighborhood.name,
          position: this.position,
        },
      });
    },
  },
};
</script>
