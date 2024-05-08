<template>
  <div v-if="link">
    <a
      v-if="link.type && link.type === 'Open in same tab'"
      :href="link.path"
      :class="customClass"
    >
      {{ link.title }}
    </a>
    <a v-else :class="customClass" :href="link.path" target="_blank">{{
      link.title
    }}</a>
  </div>
</template>

<script>
export default {
  name: "CustomLink",
  props: {
    link: {
      type: Object,
      require: true,
    },
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>
