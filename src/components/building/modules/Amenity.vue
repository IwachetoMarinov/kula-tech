<template>
  <div
    class="amenity-item inline"
    :class="amenity.available === 'no' ? 'amenity-disable' : ''"
  >
    <div class="q_flex flex--start">
      <div class="amenity-ic q_flex">
        <g-image
          v-if="amenity.image"
          :src="amenity.image.file.url"
          :alt="amenity.image.title"
        />
        <g-image
          v-if="amenity.icon"
          :src="amenity.icon.file.url"
          :alt="amenity.icon.title"
        />
      </div>
      <div class="tx--18 is--fit">{{ amenity.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Amenity",
  props: {
    amenity: {
      type: Object,
      require: true,
    },
  },
};
</script>
