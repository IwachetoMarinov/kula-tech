<template>
  <div class="v-list-price">
    <div class="tx--18 mb--15">Price / Night</div>
    <div class="relative">
      <v-range-slider
        v-model="priceRange"
        @change="updatePriceRange"
        :max="max"
        :min="min"
        hide-details
        class="align-center"
      >
        <template v-slot:prepend>
          <span class="price-range-cur" style="right:auto;left:0;">{{ currency.currencySymbol + priceRange[0] }}</span>
        </template>
        <template v-slot:append>
          <span class="price-range-cur">{{ currency.currencySymbol + priceRange[1] }}</span>
        </template>
      </v-range-slider>
      <!-- <span v-if="priceRange && priceRange.length" class="price-range-cur">{{
        currency.currencySymbol + priceRange[0]
      }}</span>
      <span v-if="priceRange && priceRange.length" class="price-range-cur">{{
        currency.currencySymbol + priceRange[1]
      }}</span> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PriceFilterMobile",
  props: {
    isBtn: {
      type: Boolean,
      default: false,
    },
    isClear: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      min: 0,
      max: 1000,
      priceRange: null,
    };
  },
  computed: {
    ...mapGetters(["currency"]),
  },
  methods: {
    updatePriceRange() {
      this.$emit("onPriceRange", this.priceRange);
      // this.$store.dispatch("setFilterBy", {
      //   isBtn: this.isBtn,
      //   setFilterBy: {
      //     type: "priceRange",
      //     value: this.priceRange,
      //   },
      // });
    },
  },
  watch: {
    "$store.getters.filterBy.priceRange"(val) {
      if (process.isClient && val) {
        this.priceRange = val;
      } else if (process.isClient && !val) {
        this.priceRange = [0, 1000];
      }
    },
    isClear(val) {
      if (!val) return;
      this.priceRange = [0, 1000];
    },
  },
  mounted() {
    if (this.$route.query && this.$route.query.prices) {
      this.priceRange = JSON.parse(
        decodeURIComponent(this.$route.query.prices)
      );
      if (
        !this.$store.getters.filterBy.priceRange ||
        this.priceRange[0] !== this.$store.getters.filterBy.priceRange[0] ||
        this.priceRange[1] !== this.$store.getters.filterBy.priceRange[1]
      ) {
        this.$store.dispatch("setFilterBy", {
          isBtn: true,
          setFilterBy: {
            type: "priceRange",
            value: this.priceRange,
          },
          isInit: true
        });
      }
    } else {
      this.priceRange = [0, 1000];
      this.$store.dispatch("setFilterBy", {
        isBtn: true,
        setFilterBy: {
          type: "priceRange",
          value: this.priceRange,
        },
        isInit: true
      });
    }
    // if (!this.$store.getters.filterBy.priceRange) {
    //   this.priceRange = [0, 1000];
    //   this.updatePriceRange();
    // } else {
    //   this.priceRange = this.$store.getters.filterBy.priceRange;
    // }
  },
};
</script>

<style lang="scss">
.v-input {
  width: 300px;
}
</style>
