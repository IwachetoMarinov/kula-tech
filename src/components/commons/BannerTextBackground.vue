<template>
  <section class="ab-bottom">
    <div class="busi-hero-img has--bg--top">
      <div class="img-cover relative over--hide">
        <g-image
            :src="banner.image.file.url"
            :alt="banner.image.file.title"
          />
      </div>
    </div>
    <div class="ab-bottom-cont sec--pad">
      <div class="layout">
        <div class="max--850">
          <h2 class="q_title mb--42" v-if="banner.title">{{ banner.title }}</h2>
          <div class="text tx-24 mb--42" v-if="banner.content" v-html="toHtml(banner.content)"></div>
          <a href="/" class="bt-primary bt--big bt--min-w bg--blue-d">Drop us a line</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BannerTextBackground",
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
