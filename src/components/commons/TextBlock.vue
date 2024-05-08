<template>
  <section>
    <h3>{{ section.title }}</h3>
    <div v-html="toHtml(section.content)"></div>
  </section>
</template>

<script>
export default {
  name: "TextBlock",
  props: {
    section: {
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
