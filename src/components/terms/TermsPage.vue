<template>
  <section class="layout">
    <div class="max--850 marge-auto">
      <h1 class="q_title title--big">{{ page.title }}</h1>
      <div class="title--16 mb--22">
        Last Updated: {{ getDate(page.lastUpdated) }}
      </div>
      <div class="text main_tx" v-html="toHtml(page.content)"></div>
      <div
        v-if="page.linkedContent"
        id="linkedContent"
        class="text main_tx"
        v-html="toHtml(page.linkedContent)"
      ></div>
    </div>
  </section>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "TermsPage",
  props: {
    page: {
      type: Object,
      require: true,
    },
  },
  methods: {
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
    getDate(date) {
      return dayjs(date).format("MMM DD, YYYY");
    },
  },
  mounted() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const el = document.querySelector(this.getAttribute("href"));
        window.scrollTo({ behavior: "smooth", top: el.offsetTop - 85 });
      });
    });
  },
  beforeDestroy() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.removeEventListener("click", function(e) {
        e.preventDefault();
        const el = document.querySelector(this.getAttribute("href"));
        window.scrollTo({ behavior: "smooth", top: el.offsetTop - 85 });
      });
    });
  },
};
</script>