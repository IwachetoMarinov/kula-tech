<template>
  <section class="banner-text bg--bege radius--15 tx--18 flex flex--start">
    <g-image v-if="banner.image" class="img--width" :src="banner.image.file.url" :alt="banner.image.title" />
    <div class="q_flex flex--start m-block is--fit">
      <h3 class="tx--18 tx--Recoleta" v-if="banner.title">{{ banner.title }}</h3>
      <div v-if="banner.content" v-html="toHtml(banner.content)"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BannerText",
  props: {
    banner: {
      type: Object,
      require: true,
    },
  },
  methods: {
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
  },
};
</script>

<style>
.img--width {
  width: 36px;
}
</style>
