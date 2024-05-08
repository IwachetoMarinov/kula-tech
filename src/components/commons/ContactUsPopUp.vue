<template>
  <section>
      <h1>{{ isReceived ? received.title : contact.title }}</h1>
      <div v-html="toHtml(isReceived ? received.content : contact.content)"></div>
      <contact-us-form v-if="!isReceived" @handleSubmit="handleSubmit" />
      <g-link v-if="isReceived" to="/" @click="isReceived = false">Go to home page</g-link>
  </section>
</template>

<script>
import ContactUsForm from "../contact-us/modules/ContactUsForm.vue";
export default {
  components: { ContactUsForm },
  name: "ContactUsPopUp",
  props: {
    contact: {
      type: Object,
      require: true,
    },
    received: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      isReceived: false,
    };
  },
  methods: {
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
    handleSubmit(msg) {
      this.isReceived = true;
    },
  },
};
</script>