<template>
  <div>
    <h2 class="q_title title--36 mb--42">Booking policies</h2>
    <div class="q_flex flex--top flex--start no_mobile">
      <div
        class="col-polices m-100"
        v-for="(category, index) in buildingPolicies.buildingPolicies"
        :key="index"
      >
        <h3 class="font--500 mb--15">{{ category.title }}</h3>
        <template v-for="(policy, index) in category.policy">
          <amenity v-if="index < 3" :key="index" :amenity="policy" />
        </template>
      </div>
      <button class="bt-white m-100" @click="isPolices = true">
        Show all 
      </button>
    </div>
    <v-dialog v-model="isPolices" width="1200">
      <polices-pop-up
        :categories=" buildingPolicies.buildingPolicies"
        @close="isPolices = false"
      />
    </v-dialog>
    <div class="mobile_only">
      <div
        class="police-item-m border--btm"
        v-for="(category, index) in buildingPolicies.buildingPolicies"
        :key="index"
        :class="activePolicy === index ? 'active' : ''"
      >
        <div class="relative q_flex" @click.stop="selectPolicyMobile(index)">
          <h2 class="q_title title--28">{{ category.title }}</h2>
          <div v-if="category.description" class="tx--18">
            {{ category.description }}
          </div>
          <div class="arrow-down ease">
            <g-image src="~/assets/image/arrow-down.svg" alt="arrow-down" />
          </div>
        </div>
        <div
          class=""
          v-show="activePolicy === index"
          v-for="(policy, i) in category.policy"
          :key="i"
        >
          <amenity :amenity="policy" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Amenity from "./Amenity.vue";
import PolicesPopUp from "../modules/PolicesPopUp.vue";

export default {
  name: "BookingPolices",
  components: { Amenity, PolicesPopUp },
  props: {
    buildingPolicies: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      activePolicy: null,
      isPolices: false
    };
  },
  methods: {
    selectPolicyMobile(i) {
      if (this.activePolicy === i) this.activePolicy = null;
      else this.activePolicy = i;
    },
  },
};
</script>
