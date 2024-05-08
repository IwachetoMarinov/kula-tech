<template>
  <section class="pop-amenities-in">
    <a class="pop-close ic-pointer q_flex flex--center" @click="$emit('close')"><g-image src="~/assets/image/close.svg" alt="close"></g-image></a>
    <h2 class="q_title title--36 mb--42">Polices</h2>
    <div class="block">
      <div class="col--30 m-100" v-for="(category, index) in categories" :key="index">
        <div class="tx--22 font--500 mb--15">{{ category.title }}</div>
        <div>
          <template v-for="(policy, index) in category.policy">
            <amenity :key="index" :amenity="policy" />
          </template>
        </div>
      </div>
    </div>
    
  </section>
</template>

<script>
import Amenity from "../modules/Amenity.vue";

export default {
  name: "PolicesPopUp",
  components: { Amenity },
  props: {
    categories: {
      type: Array,
      require: true,
    },
  },
};
</script>