<template>
  <v-bottom-sheet v-model="mobilePopUp" class="mobile-filter">
    <city-filter
      class="mobile-flow"
      v-show="currentMobilePopUp === 'city'"
      :isSelect="false"
      :isBtn="true"
      :attach="'.mobile-filter'"
    />

    <!-- flex--end-picker-filter -->
    <search-bar-date-picker-filter
      v-show="currentMobilePopUp === 'date'"
      class="mobile-flow has--floor"
      :isSelect="false"
      :isBtn="true"
      :customRef="'wizardPicker'"
      :isTogglePicker="true"
    />

    <!-- <date-picker-mobile
      v-show="currentMobilePopUp === 'date'"
      class="mobile-flow has--floor"
      :isSelect="false"
      :isBtn="true"
      :customRef="'wizardPicker'"
      :isTogglePicker="true"
    /> -->

    <guest-filter
      v-show="currentMobilePopUp === 'guest'"
      :isSelect="false"
      :isBtn="true"
      :attach="'.mobile-filter'"
    />

    <div
      v-if="currentMobilePopUp === 'filters'"
      class="mobile-flow mobile-flow-filters-wrap has--floor"
    >
      <div class="mobile-flow-head q_flex flex--center">
        <a @click="$store.commit('setMobilePopUp', false)">
          <g-image src="~/assets/image/arrow-check-l.svg" alt="arrow"></g-image>
        </a>
        <div class="tx--22 font--500">Filters</div>
      </div>
      <div class="mobile-flow-filters">
        <price-filter-mobile
          :isBtn="true"
          :isClear="isClear"
          @onPriceRange="onPriceRange"
        />
        <room-types-filter
          :isSelect="false"
          :isBtn="true"
          :isClear="isClear"
          :attach="'.mobile-filter'"
          @onRoomTypesSelected="onRoomTypesSelected"
        />
      </div>
      <div class="mobile-flow-footer bg--light q_flex">
        <a class="tx--16 block tx--font" @click="onClearFilters">Clear all</a>
        <button class="bt-primary" @click="onUpdateFilters">
          Update results
        </button>
      </div>
    </div>

    <div
      v-show="currentMobilePopUp === 'code'"
      class="mobile-flow mobile-flow-code-wrap"
    >
      <div class="mobile-flow-head q_flex flex--center">
        <a @click="$store.commit('setMobilePopUp', false)">
          <g-image src="~/assets/image/arrow-check-l.svg" alt="arrow"></g-image>
        </a>
        <div class="tx--22 font--500">Promotional code</div>
      </div>
      <div class="mobile-flow-gus wrap-coupon">
        <v-text-field
          v-model="code"
          placeholder="Enter promo code"
          filled
          :error-messages="codeErrors"
          @input="$v.code.$touch()"
          @keypress.enter="onApply"
        >
        </v-text-field>
        <span v-if="codeMsgErr">{{ codeMsgErr }}</span>
        <button class="bt-primary m-100" @click="onApply">
          Apply
        </button>
      </div>
    </div>
  </v-bottom-sheet>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import CityFilter from "../filters/CityFilter.vue";
// import DatePickerFilter from "../filters/DatePickerFilter.vue";
import SearchBarDatePickerFilter from "../filters/SearchBarDatePicker.vue";
import GuestFilter from "../filters/GuestFilter.vue";
import PriceFilterMobile from "../filters/PriceFilterMobile.vue";
import RoomTypesFilter from "../filters/RoomTypesFilter.vue";

export default {
  name: "PopUpMobile",
  components: {
    CityFilter,
    // DatePickerFilter,
    SearchBarDatePickerFilter,
    GuestFilter,
    PriceFilterMobile,
    RoomTypesFilter,
  },
  data() {
    return {
      roomTypesSelected: null,
      priceRange: null,
      code: null,
      codeMsgErr: null,
      isClear: false,
    };
  },
  validations: {
    code: { required },
  },
  computed: {
    ...mapGetters(["filterBy"]),
    mobilePopUp: {
      get() {
        return this.$store.getters.mobilePopUp;
      },
      set(value) {
        this.$store.commit("setMobilePopUp", value);
      },
    },
    currentMobilePopUp() {
      return this.$store.getters.currentMobilePopUp;
    },
    codeErrors() {
      const errors = [];
      if (!this.$v.code.$dirty) return errors;
      !this.$v.code.required && errors.push("Required field");
      return errors;
    },
  },
  methods: {
    async onClearFilters() {
      this.isClear = true;
      await this.$store.dispatch("setFilterBy", {
        isBtn: this.isBtn,
        setFilterBy: {
          type: "priceRange",
          value: null,
        },
      });
      await this.$store.dispatch("setFilterBy", {
        isBtn: this.isBtn,
        setFilterBy: {
          type: "roomTypesSelected",
          value: null,
        },
      });
      if (!this.isBtn) {
        const query = this.$store.getters.getQueryString;
        history.pushState({}, null, `${this.$route.path}?${query}`);
      }
      this.isClear = false;
    },
    async onUpdateFilters() {
      await this.$store.dispatch("setFilterBy", {
        isBtn: false,
        setFilterBy: {
          type: "roomTypesSelected",
          value: this.roomTypesSelected,
        },
      });
      await this.$store.dispatch("setFilterBy", {
        isBtn: false,
        setFilterBy: {
          type: "priceRange",
          value: this.priceRange,
        },
      });
      const query = this.$store.getters.getQueryString;
      history.pushState({}, null, `${this.$route.path}?${query}`);
      this.$store.commit("setMobilePopUp", false);
      this.$store.commit("setCurrentMobilePopUp", null);
    },
    onRoomTypesSelected(rooms) {
      this.roomTypesSelected = rooms;
    },
    onPriceRange(price) {
      this.priceRange = price;
    },
    async onApply() {
      this.codeMsgErr = null;
      this.$v.$touch();
      if (!this.$v.code.$invalid) {
        const voucher = await this.$store.dispatch("valiflex--endVoucher", {
          hotelId: this.filterBy.citySelected.mewsId,
          code: this.code,
        });
        if (voucher.data.IsValid) {
          this.isCodeInput = false;
          this.$store.dispatch("setFilterBy", {
            isBtn: false,
            setFilterBy: {
              type: "code",
              value: this.code,
            },
          });
          this.$store.commit("setMobilePopUp", false);
        } else {
          this.codeMsgErr = "Promo code is invalid";
        }
      }
    },
  },
};
</script>
