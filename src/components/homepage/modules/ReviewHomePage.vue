<template>
  <section class="sec-hp-review sec--pad">
    <div class="hp-stories-top layout q_flex">
      <div class="col--50 m-100 m-center">
        <h2 class="q_title">{{ reviewSection.title }}</h2>
        <div
          class="text p--no tx--font-light"
          v-html="toHtml(reviewSection.content)"
        ></div>
      </div>
      <div class="col--50 hp-review-right q_flex flex--top flex--end m-100">
        <div
          class="bg--bege"
          v-for="(feature, index) in reviewFeatures"
          :key="index"
        >
          <div class="q_title">{{ feature.title }}</div>
          <div class="stars" v-if="index === 1 && rating">
            <g-image
              v-for="i in rating"
              :key="i"
              src="~/assets/image/Path.svg"
              alt="rating"
            />
          </div>
          <div class="text p--no" v-html="toHtml(feature.content)"></div>
        </div>
      </div>
    </div>
    <div class="elfsight-app-16d9d2ae-5b6b-401e-94ed-087f29679b19"></div>
  </section>
</template>

<script>
export default {
  name: "ReviewHomePage",
  props: {
    reviewSection: {
      type: Object,
      require: true,
    },
    reviewFeatures: {
      type: Array,
      require: true,
    },
  },
  computed: {
    rating() {
      if (!this.reviewFeatures || !this.reviewFeatures[1]) return null;
      let num = parseFloat(this.reviewFeatures[1].title);
      if (!num) return null;
      return Math.ceil(num);
    },
  },
  methods: {
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
  },
};
</script>
