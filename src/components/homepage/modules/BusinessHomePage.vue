<template>
  <section class="sec-hp-bus sec--pad bg--bege">
  <div class="layout q_flex m-block">
    <div class="hp-bus-left m-100">
      <h2 class="q_title">{{ businessSection.title }}</h2>
      <div class="tx--24" v-html="toHtml(businessSection.content)" />
      <custom-link class="bt-border bt--big" :link="businessSection.link" />
    </div>
    <div class="hp-bus-right no_mobile">
      <div class="img-cover relative">
        <g-image :src="businessSection.image.file.url + '?fm=webp&w=630'" :alt="businessSection.image.title" />
      </div>
    </div>
  </div>
  </section>
</template>

<script>
import CustomLink from '../../commons/CustomLink.vue';
import gsap from 'gsap';

export default {
  components: { CustomLink },
  name: "BusinessHomePage",
  props: {
    businessSection: {
      type: Object,
      require: true,
    },
  },
   mounted: function() {
    this.scrollAnimation();
  },
  methods: {
    scrollAnimation() {
      
    },
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
  },
};
</script>
