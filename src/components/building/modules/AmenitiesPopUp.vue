<template>
  <section class="pop-amenities-in">
    <a class="pop-close ic-pointer q_flex flex--center" @click="$emit('close')"><g-image src="~/assets/image/close.svg" alt="close"></g-image></a>
    <h2 class="q_title title--36 mb--42">Amenities</h2>
    <div class="block">
      <div class="col--30 m-100" v-for="(category, key, index) in categories" :key="index">
        <div class="tx--22 font--500 mb--15">{{ key }}</div>
        <div>
          <template v-for="(amenity, index) in category">
            <amenity :key="index" :amenity="amenity" />
          </template>
        </div>
      </div>
      <div class="col--30 m-100">
        <div class="tx--22 font--500 mb--15">{{ standardCategory.title }}</div>
        <div
          v-for="(amenity, index) in standardCategory.standardAmenity"
          :key="index"
        >
          <amenity :key="index" :amenity="amenity" />
        </div>
      </div>
    </div>
    
  </section>
</template>

<script>
import Amenity from "../modules/Amenity.vue";

export default {
  name: "AmenitiesPopUp",
  components: { Amenity },
  props: {
    categories: {
      type: Object,
      require: true,
    },
    standardCategory: {
      type: Object,
      require: true,
    },
  },
};
</script>
