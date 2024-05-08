<template>
  <div class="layout q_center">
    <div class="max--850 marge-auto sec--pad--btm">
      <h1 class="q_title title--big mb--42" v-if="banner.title && !isBottomBanner">{{ banner.title }}</h1>
      <h2 class="q_title title--big mb--42" v-if="banner.title && isBottomBanner">{{ banner.title }}</h2>
      <div class="text tx--24 mb--42"
        v-if="banner.content"
        v-html="toHtml(banner.content)"
      ></div>
      <custom-link class="bt-primary bt--big bt--min-w bg--blue-d" v-if="banner.link" :link="banner.link" />
    </div>
  </div>
</template>

<script>
import CustomLink from "../commons/CustomLink.vue";
import gsap from 'gsap';

export default {
  name: "BannerLink",
  components: { CustomLink },
  props: {
    banner: {
      type: Object,
      require: true,
    },
    isBottomBanner: {
      type: Boolean,
      default: false
    }
  },
   mounted: function() {
    this.scrollAnimation();
  },
  methods: {
    scrollAnimation() {
     if(!this.isBottomBanner) return;
    },
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
  },
};
</script>
