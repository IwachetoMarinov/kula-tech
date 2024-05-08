<template>
  <section class="banner-price-wrap">
    <div class="banner-price bg--bege radius--15 flex">
      <div class="banner-price-title">
        <div class="q_title">{{ banner.title }}</div>
        <div v-if="banner.content" class="tx--16 no_mobile" v-html="toHtml(banner.content)"></div>
      </div>
      <div class="is--fit q_flex flex--end tx--16">
        <div class="banner-price-item flex" v-for="(discount, index) in banner.discountPerNight" :key="index">
          <div class="tx--Recoleta bold">{{ discount.percentageDiscount + "% off" }}</div>
          <div class="tx--font-light">{{ discount.numberOfNights + "+ Nights" }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BannerPrice",
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
