<template>
  <section>
    <div class="tx--18">{{ address }}</div>
    <div class="build-map-address q_flex flex--top m-block">
      <div v-for="(item, index) in transportation" :key="index" class="item_city_option q_flex flex--start--top is--fit">
        <g-image :src="item.icon.file.url" :alt="item.icon.title" />
        <div class="is--fit">
          <div class="tx--16">{{ item.title }}:</div>
          <div class="tx--14">{{ item.description}}.</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AddressSection",
  props: {
    address: {
      type: String,
      require: true,
    },
    transportation: {
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
