<template>
  <section>
    <div class="neighborhood-section-img relative over--hide no_mobile">
      <div class="img-cover c-pointer" @click.stop="isGallery = true">
        <g-image
          :src="neighborhood.gallery[0].file.url + '?fm=webp&w=1200'"
          :alt="neighborhood.gallery[0].title" class="no_mobile"
        />
         <g-image
          :src="neighborhood.gallery[0].file.url + '?fm=webp&w=768'"
          :alt="neighborhood.gallery[0].title" class="mobile_only"
        />
      </div>
      <button
        class="bt-white q_flex flex--center"
        @click.stop="isGallery = true"
      >
        <g-image src="~/assets/image/gallery.svg" alt="gallery"></g-image>
        View all
      </button>
    </div>
    <div class="mobile_only neighborhood-section-slide over--hide">
      <image-swiper class="" :images="neighborhood.gallery" />
    </div>

    <div v-if="isGallery">
      <gallery
        :images="neighborhood.gallery"
        @onCloseGallery="isGallery = false"
      />
    </div>
    <div
      class="text mb--42 max--850"
      v-html="toHtml(neighborhood.fullDescription)"
    ></div>

    <h3 class="title--16">The neighborhood vibe</h3>
    <div class="build-map-address neighbor-f q_flex flex--top m-block">
      <div
        class="item_city_option q_flex flex--start--top is--fit"
        v-for="(feature, index) in neighborhood.features"
        :key="index"
      >
        <g-image :src="feature.image.file.url" :alt="feature.image.title" />
        <div class="is--fit">
          <div class="tx--16">{{ feature.title }}</div>
          <div class="tx--16" v-html="toHtml(feature.content)"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Gallery from "../../commons/Gallery.vue";
import ImageSwiper from '../../swiper/ImageSwiper.vue';

export default {
  name: "NeighborhoodSection",
  components: { Gallery, ImageSwiper },
  props: {
    neighborhood: {
      type: Object,
      require: false,
    },
  },
  data() {
    return {
      isGallery: false,
    };
  },
  methods: {
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
  },
};
</script>
