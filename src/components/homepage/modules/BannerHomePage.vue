<template>
  <section>
    <div
      class="banner-home"
      v-for="(banner, index) in banners"
      :key="index"
      :style="{ backgroundImage: 'url(' + banner.image.file.url + + '?fm=webp)' }"
    >
      <h1>{{ banner.title }}</h1>
      <div v-html="toHtml(banner.content)"></div>
      <p>{{ banner.location }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "BannerHomePage",
  props: {
    banners: {
      type: Array,
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
