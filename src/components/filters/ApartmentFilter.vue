<template>
  <div class="hold-apartment-bt">
    <!--
      Apartment Dropdown in Checkout Component:
      Uses state from Checkout & BuildingPage components
    -->
    <v-select
      v-if="isSelect && apartments && filterBy.date.startDate && filterBy.date.endDate"
      id="apartment-select"
      :items="apartments"
      :attach="attach"
      item-text="name"
      item-value="mewsId"
      autocomplete
      placeholder="Select Apartment"
      @change="onCheckAvailability"
      v-model="selectedApartment"
      class="select-apartment-dropdown"
    >
    
      <template slot="item" slot-scope="data">
        <div class="v-list-apartment"  :class="[data.item.available ? '' : 'disabled']">
        
          <p>{{ data.item.name }}</p>
        </div>
      </template>

    </v-select>

    <div v-else class="no-select-apartment-dropdown" @click.stop="onCheckAvailability">
      <span>Check Availability</span>
    </div>

    <!-- Mobile Version not needed -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ApartmentFilter",
  props: {
    isBtn: {
      type: Boolean,
      default: false,
    },
    isSelect: {
      type: Boolean,
      default: true,
    },
    isCheckout: {
      type: Boolean,
      default: false,
    },
    attach: {
      type: String,
    },
    apartments: {
      type: Array,
      default: null
    },
    apartment: {
      type: Object,
      require: true,
    },
    isAllFully: {
      type: Boolean,
    },
  },
  data() {
    return {
      isLoading: false,
      selectedApartment: null,
    };
  },
  computed: {
    ...mapGetters(["filterBy"]),
  },
  watch: {
    // Need to add a watcher - if the apartment is selected in the ApartmentBlock component we need to update the dropdown value
    apartment(newValue) {
      this.selectedApartment = newValue
    }
  },
  methods: {
    onCheckAvailability() {
      // console.log('selected', this.selectedApartment)
      // Loop through & find the selected apartment by matching mewsId (value = mewsId on the dropdown)
      const selectedApartment = this.apartments.find((apartment) => apartment.mewsId === this.selectedApartment);
      
      // This needs to be passed up to Checkout component then BuildingPage component to update the selectedApartment
      this.$emit("onCheckAvailability", {
        apartment: selectedApartment,
      });
    },
  },
  mounted() {
    // console.log('available? ', this.isAllFully)
    // console.log('apartment ', this.apartments)
    this.selectedApartment = this.apartment
  },
  beforeDestroy() {
    // window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
