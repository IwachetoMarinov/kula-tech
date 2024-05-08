<template>
  <div class="head-filter head-filter--price flex flex--start">
    <v-menu
      class="price-filter no_mobile"
      :attach="attach"
      bottom
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" class="bt-reset" @click="$emit('onToggleDate')">
          Price
        </v-btn>
      </template>
      <v-list class="v-list-price">
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
          </v-range-slider>
          <span v-if="priceRange && priceRange.length" class="price-range-cur">
            {{ currency.currencySymbol + priceRange[0] }}
          </span>
          <span v-if="priceRange && priceRange.length" class="price-range-cur">
            {{ currency.currencySymbol + priceRange[1] }}
          </span>
        </div>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PriceFilter",
  props: {
    isBtn: {
      type: Boolean,
      default: false,
    },
    attach: {
      type: String,
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
    async updatePriceRange() {
      await this.$store.dispatch("setFilterBy", {
        isBtn: this.isBtn,
        setFilterBy: {
          type: "priceRange",
          value: this.priceRange,
        },
      });
      if (!this.isBtn) {
        const query = this.$store.getters.getQueryString;
        history.pushState({}, null, `${this.$route.path}?${query}`);
      }
    },
  },
  watch: {
    "$store.getters.filterBy.priceRange"(val) {
      if (process.isClient && val) {
        this.priceRange = val;
      } else if (process.isClient && !val) {
        this.priceRange = [0, 1000];
        this.updatePriceRange();
      }
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
    // } else {
    //   this.priceRange = this.$store.getters.filterBy.priceRange;
    // }
  },
};
</script>

<style lang="scss">
.v-input__append-outer,
.v-input__prepend-outer {
  display: flex;
  align-items: center;
}
</style>
