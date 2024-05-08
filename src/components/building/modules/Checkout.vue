<template>
  <section class="hold-checkout">
    <!-- <header-default /> -->
    <div class="checkout no_mobile">
      <div class="q_title title--36" v-show="!isDate">
        From <span>{{ currency.currencySymbol }}</span> {{ minPrice }}
        <span class="text tx--Avenir">/ night</span>
      </div>
      <div class="q_title title--36" v-if="isDate && !apartment">
        {{ isAllFully ? "We’re fully booked!" : "Select Apartment" }}
      </div>
      <div class="q_title title--36" v-if="isDate && apartment">
        {{ apartment.name }}
      </div>
      <div
        class="text tx--16 tx--font-light mb--15"
        v-show="isDate && !apartment"
      >
        Choose from our available properties to continue your booking.
      </div>
      <div
        class="text tx--16 tx--font-light mb--15"
        v-show="isDate && apartment"
      >
        {{
          isAllFully
            ? "Try selecting a different date or choose from one of our other properties."
            : "You will be redirected to our booking platform to complete your reservation"
        }}
      </div>

      <apartment-filter 
      v-if="!isAllFully"
        :isCheckout="true" 
        :attach="'.checkout'" 
        :apartments="apartments"
        :apartment="apartment"
        @onCheckAvailability="onCheckAvailability"
      />

      <search-bar-date-picker-filter
        :key="isTogglePicker"
        :isTogglePicker="isTogglePicker"
        :customRef="'checkoutPicker'"
        ref="date-picker"
      />

      <guest-filter :isCheckout="true" :attach="'.checkout'" />

      <a
        class="tx--under tx--18 mb--22 block"
        v-show="isDate && apartment && !isCodeInput && !filterBy.code"
        @click="isCodeInput = !isCodeInput"
      >
        Add Promotional code
      </a>

      <div class="wrap-coupon" v-show="isCodeInput">
        <div class="tx--18">Promotional code</div>
        <v-text-field
          v-model="code"
          placeholder="Enter promo code"
          filled
          :error-messages="codeErrors"
          @input="$v.code.$touch()"
          @keypress.enter="onApply"
        >
          <template v-slot:append>
            <v-btn depressed tile color="primary" class="ma-0" @click="onApply">
              Apply
            </v-btn>
          </template>
        </v-text-field>
        <span v-if="codeMsgErr">{{ codeMsgErr }}</span>
      </div>

      <div
        class="checkout-bottom border--top tx--16"
        v-if="isDate && apartment"
      >
        <!-- <div v-if="discount" class="q_flex">
          <div>{{ discount.percentage }} % off stay more, pay less</div>
          <div>-{{ currency.currencySymbol + discount.dif }}</div>
        </div> -->
        <div v-if="discountCoupon" class="checkout-bottom-row q_flex">
          <div>
            {{ apartment.mewsDiscountPricing.name }}
            <span
              class="ic-pointer tx--under tx--font-light tx--14"
              @click="onRemoveCode"
              >Remove</span
            >
          </div>
          <div>-{{ currency.currencySymbol + discountCoupon }}</div>
        </div>
        <div class="q_flex">
          <!-- <div>Total</div>
          <v-tooltip
            attach=".checkout-bottom-row"
            bottom
            v-if="apartment.mewsPricing"
          >
            <template v-slot:activator="{ on, attrs }">
              <div
                class="q_flex flex--end relative ic-pointer check-hold-tip"
                v-bind="attrs"
                v-on="on"
              >
                <g-image
                  class=""
                  src="~/assets/image/tooltip.svg"
                  alt="tooltip"
                />
                {{
                  currency.currencySymbol +
                    apartment[rateTypeTotal].Price.TotalAmount[
                      currency.currencyType
                    ].GrossValue
                }}
              </div>
            </template>
            <div
              class="check-tooltip bg--light tx--18"
              v-if="apartment && apartment.mewsPricing"
            >
              <div class="checkout-bottom-row q_flex flex--top">
                <div class="">
                  <span>
                    {{
                      currency.currencySymbol +
                        apartment[rateType].Price.AverageAmountPerNight[
                          currency.currencyType
                        ].NetValue.toFixed(2)
                    }}
                  </span>
                  <span> x {{ getDays }} nights</span>
                </div>
                <div>
                  {{
                    currency.currencySymbol +
                      apartment[rateType].Price.TotalAmount[
                        currency.currencyType
                      ].NetValue.toFixed(2)
                  }}
                </div>
              </div>
              <div
                v-if="discount"
                ref=""
                class="checkout-bottom-row q_flex flex--top"
              >
                <div>
                  <b>{{ discount.percentage }}% off</b> stay more, pay less
                </div>
                <div>-{{ currency.currencySymbol + discount.dif }}</div>
              </div>
              <div
                v-if="discountCoupon"
                class="checkout-bottom-row q_flex flex--top"
              >
                <div>{{ apartment.mewsDiscountPricing.name }}</div>
                <div>-{{ currency.currencySymbol + discountCoupon }}</div>
              </div>
              <div v-if="discount" class="checkout-bottom-row q_flex flex--top">
                <div>Price after discount</div>
                <div>
                  {{
                    currency.currencySymbol +
                      apartment[rateTypeTotal].Price.TotalAmount[
                        currency.currencyType
                      ].NetValue.toFixed(2)
                  }}
                </div>
              </div>
              <div class="checkout-bottom-row q_flex">
                <div>Cleaning Fee</div>
                <div>{{ currency.currencySymbol }}0</div>
              </div>
              <div class="checkout-bottom-row q_flex">
                <div>Tax</div>
                <div>
                  {{
                    currency.currencySymbol +
                      apartment[rateTypeTotal].Price.TotalAmount[
                        currency.currencyType
                      ].TaxValues[0].Value.toFixed(2)
                  }}
                </div>
              </div>
              <div class="checkout-bottom border--top tx--16 q_flex bold">
                <div>Total</div>
                <div>
                  {{
                    currency.currencySymbol +
                      apartment[rateTypeTotal].Price.TotalAmount[
                        currency.currencyType
                      ].GrossValue.toFixed(2)
                  }}
                </div>
              </div>
            </div>
          </v-tooltip>
          <div v-else>{{ currency.currencySymbol + minPrice }}</div> -->

          <div
          class="tx--16 w-100"
          v-if="apartment && apartment.mewsPricing"
          >
            <div class="q_flex bold checkout-bottom-row">Expenses
              <span>
                {{
                  currency.currencySymbol +
                    apartment[rateType].Price.TotalAmount[
                      currency.currencyType
                    ].NetValue.toFixed(2)
                }}
              </span>
            </div>
            <div class="checkout-bottom-row q_flex flex--no-wrap flex--top checkout-row-item">
              <div class="">
                Rent - 
                <span>
                  {{
                    currency.currencySymbol +
                      apartment[rateType].Price.AverageAmountPerNight[
                        currency.currencyType
                      ].NetValue.toFixed(2)
                  }}
                </span>
                <span> x {{ getDays }} nights</span>
              </div>
              <div>
                {{
                  currency.currencySymbol +
                    apartment[rateType].Price.TotalAmount[
                      currency.currencyType
                    ].NetValue.toFixed(2)
                }}
              </div>
            </div>
            <div class="checkout-bottom-row q_flex checkout-row-item">
              <div>Tax</div>
              <div>
                {{
                  currency.currencySymbol +
                    apartment[rateTypeTotal].Price.TotalAmount[
                      currency.currencyType
                    ].TaxValues[0].Value.toFixed(2)
                }}
              </div>
            </div>

            <!-- Discount -->
            <div v-if="discount" class="checkout-bottom border--top tx--16 w-100">
              <div class="q_flex bold checkout-bottom-row">Discount
                <span>
                  -{{ currency.currencySymbol + discount.dif }}
                </span>
              </div>
              <div
                v-if="discount"
                ref=""
                class="checkout-bottom-row q_flex flex--top checkout-row-item flex--no-wrap"
              >
                <div>
                  <b>{{ discount.percentage }}% off</b> stay more, pay less
                </div>
                <div class="no-whitespace">-{{ currency.currencySymbol + discount.dif }}</div>
              </div>
              <div
                v-if="discountCoupon"
                class="checkout-bottom-row q_flex flex--top checkout-row-item"
              >
                <div>{{ apartment.mewsDiscountPricing.name }}</div>
                <div class="no-white-space">-{{ currency.currencySymbol + discountCoupon }}</div>
              </div>
              <div v-if="discount" class="checkout-bottom-row q_flex flex--top checkout-row-item">
                <div>Price after discount</div>
                <div>
                  {{
                    currency.currencySymbol +
                      apartment[rateTypeTotal].Price.TotalAmount[
                        currency.currencyType
                      ].NetValue.toFixed(2)
                  }}
                </div>
              </div>
            </div>

            <!-- One Time Fees -->
            <div class="checkout-bottom border--top tx--16 w-100">
              <div class="checkout-bottom-row q_flex bold">
                <span>One time fees</span>
                <span>{{ currency.currencySymbol }}0</span>
              </div>
            
              <div class="checkout-bottom-row q_flex checkout-row-item">
                <div>Cleaning Fee</div>
                <div>{{ currency.currencySymbol }}0</div>
              </div>
            </div>
            <!-- Total -->
            <div class="checkout-bottom border--top tx--16 q_flex">
              <div>
                <span class="bold">Total</span> 
                <span v-if="durationString && durationString !== 'Duration'"> ({{ durationString.trim() }})</span></div>
              <div>
                {{
                  currency.currencySymbol +
                    apartment[rateTypeTotal].Price.TotalAmount[
                      currency.currencyType
                    ].GrossValue.toFixed(2)
                }}
              </div>
            </div>
          </div>

        </div>
        <!-- Book Now Button -->
        <div class="checkout-bottom">
          <button
            class="bt-primary w-100"
            :class="{
              disabled: !apartment && isDate,
              'distributor-open': apartment && isDate,
              'is-active': isLoading,
            }"
            @click.stop="onCheckout"
          >
            {{ checkoutBtnText }}
            <span class="loader"></span>
          </button>
          <div class="center tx--14" v-show="isDate && apartment">
            You won’t be charged yet
          </div>
        </div>
      </div>
    </div>


    <div v-if="textBanner" class="checkout-banner tx--18 q_flex no_mobile">
      <g-image :src="textBanner.image.file.url" :alt="textBanner.image.title" />
      <div class="is--fit">
        <div class="bold">{{ textBanner.title }}</div>
        <div v-html="toHtml(textBanner.content)"></div>
      </div>
    </div>

    <div class="checkout-mobile bg--light mobile_only">
      <div v-show="!isDate" class="q_flex">
        <div>
          <div>Starting at</div>
          <div class="price q_title title--28">
            {{ currency.currencySymbol + minPrice }}
            <span class="tx--18 tx--Avenir tx--font-light">/ night</span>
          </div>
        </div>
        <button class="bt-white" @click.stop="setMobilePopUp('date')">
          Check availability
        </button>
      </div>

      <div v-show="isDate">
        <div class="q_flex m-checkout-before border--1">
          <div
            class="mm-city-search-input q_flex flex--center col--50"
            @click.stop="setMobilePopUp('date')"
          >
            {{ dateSelected }}
          </div>
          <div
            class="mm-city-search-input q_flex flex--center col--50"
            @click.stop="setMobilePopUp('guest')"
          >
            {{ guestSelected }}
          </div>
        </div>
        <div class="tx--14 q_center">Select apartment to Book</div>
      </div>

      <!-- <div v-show="isDate && apartment">
        <div class="q_flex m-checkout-before border--1">
          <div
            class="mm-city-search-input q_flex flex--center col--50"
            @click.stop="setMobilePopUp('date')"
          >
            {{ dateSelected }}
          </div>
          <div
            class="mm-city-search-input q_flex flex--center col--50"
            @click.stop="setMobilePopUp('guest')"
          >
            {{ guestSelected }}
          </div>
        </div>
        <button class="bt-primary m-100" @click="onMobileBook">Book now</button>
      </div> -->
    </div>

    <v-dialog
      v-if="isDate && apartment"
      v-model="isMobileCheckout"
      fullscreen
      hide-overlay
    >
      <checkout-mobile
        :apartment="apartment"
        :buildingId="buildingId"
        :textBanner="textBanner"
        @toggleMobileCheckout="isMobileCheckout = false"
      />
    </v-dialog>
  </section>
</template>

<script>
import dayjs from "dayjs";
// import DatePickerFilter from "../../filters/DatePickerFilter.vue";
import SearchBarDatePickerFilter from "../../filters/SearchBarDatePicker.vue";
import GuestFilter from "../../filters/GuestFilter.vue";
import ApartmentFilter from "../../filters/ApartmentFilter.vue";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import CheckoutMobile from "./CheckoutMobile.vue";
import HeaderDefault from "../../commons/headers/HeaderDefault.vue";

export default {
  name: "Checkout",
  components: { 
    //DatePickerFilter, 
    SearchBarDatePickerFilter, GuestFilter, ApartmentFilter, CheckoutMobile, HeaderDefault },
  props: {
    textBanner: {
      type: Object,
    },
    apartment: {
      type: Object,
      require: true,
    },
    buildingId: {
      type: String,
      require: true,
    },
    minPrice: {
      require: true,
    },
    isTogglePicker: {
      type: Boolean,
    },
    onBookMobile: {
      type: Boolean,
      default: false,
    },
    isAllFully: {
      type: Boolean,
    },
    apartments: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      isLoading: false,
      isCodeInput: false,
      code: null,
      isHovered: false,
      isMobileCheckout: false,
      codeMsgErr: null,
    };
  },
  validations: {
    code: { required },
  },
  computed: {
    ...mapGetters(["filterBy", "currency", "durationString"]),
    isDate() {
      return this.filterBy.date.startDate && this.filterBy.date.endDate
        ? true
        : false;
    },
    codeErrors() {
      const errors = [];
      if (!this.$v.code.$dirty) return errors;
      !this.$v.code.required && errors.push("Required field");
      return errors;
    },
    rateType() {
      if (!this.apartment || !this.apartment.mewsBasePricing)
        return "mewsPricing";
      return "mewsBasePricing";
    },
    rateTypeTotal() {
      if (!this.apartment || !this.apartment.mewsDiscountPricing)
        return "mewsPricing";
      return "mewsDiscountPricing";
    },
    discount() {
      if (
        !this.apartment ||
        !this.apartment.mewsPricing ||
        !this.apartment.mewsBasePricing
      )
        return null;
      let dif =
        this.apartment.mewsBasePricing.Price.TotalAmount[
          this.currency.currencyType
        ].NetValue -
        this.apartment.mewsPricing.Price.TotalAmount[this.currency.currencyType]
          .NetValue;
      if (dif == 0) return null;
      let percentage =
        (dif * 100) /
        this.apartment.mewsBasePricing.Price.TotalAmount[
          this.currency.currencyType
        ].NetValue;
      dif = (dif / 1).toFixed(2).replace(",", ".");
      percentage = (percentage / 1).toFixed(0).replace(",", ".");
      return { dif, percentage };
    },
    discountCoupon() {
      if (
        !this.apartment ||
        !this.apartment.mewsPricing ||
        !this.apartment.mewsDiscountPricing
      )
        return null;
      let dif =
        this.apartment.mewsPricing.Price.TotalAmount[this.currency.currencyType]
          .NetValue -
        this.apartment.mewsDiscountPricing.Price.TotalAmount[
          this.currency.currencyType
        ].NetValue;
      dif = (dif / 1).toFixed(2).replace(",", ".");
      return dif;
    },
    bookNow() {
      if (
        !this.filterBy.date.startDate ||
        !this.filterBy.date.endDate ||
        !this.apartment
      )
        return "";
      const mewsStart = new Date(this.filterBy.date.startDate)
        .toISOString()
        .slice(0, 10);
      const mewsEnd = new Date(this.filterBy.date.endDate)
        .toISOString()
        .slice(0, 10);
      let url = `https://api.mews.com/distributor/${
        this.buildingId
      }?mewsStart=${mewsStart}&mewsEnd=${mewsEnd}&mewsRoom=${
        this.apartment.mewsId
      }&mewsAdultCount=${this.filterBy.adultCount}&mewsChildCount=${
        this.filterBy.childCount
      }&mewsRoute=rates`;
      if (this.filterBy.code) {
        url += `&mewsVoucherCode=${this.filterBy.code}`;
      }

      return url;
    },
    dateSelected() {
      const date = this.filterBy.date;
      if (!date.startDate || !date.endDate) return null;
      return (
        dayjs(date.startDate)
          .format("MMM DD") +
        " - " +
        dayjs(date.endDate)
          .format("MMM DD")
      );
    },
    guestSelected() {
      if (this.filterBy.adultCount + this.filterBy.childCount == 0)
        return "Who's coming?";
      return (
        this.filterBy.adultCount +
        " adults, " +
        this.filterBy.childCount +
        " children"
      );
    },
    checkoutBtnText() {
      if (!this.isDate) return "Check availability";
      return "Book now";
    },
    getDays() {
      const start = dayjs(
        dayjs(this.filterBy.date.startDate).format("YYYY-MM-DD")
      );
      const end = dayjs(dayjs(this.filterBy.date.endDate).format("YYYY-MM-DD"));
      return end.diff(start, "days");
    },
  },
  methods: {
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
    async onApply() {
      this.codeMsgErr = null;
      this.$v.$touch();
      if (!this.$v.code.$invalid) {
        const voucher = await this.$store.dispatch("validateVoucher", {
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
          this.code = "";
        } else {
          this.codeMsgErr = "Promo code is invalid";
        }
      }
    },
    setMobilePopUp(val) {
      this.$store.commit("setMobilePopUp", true);
      this.$store.commit("setCurrentMobilePopUp", val);
    },
    async onCheckout() {
      if (!this.isDate) {
        this.$emit("onTogglePicker", !this.isTogglePicker);
        return;
      } else if (this.isDate && this.apartment) {
        const mewsStart = dayjs(this.filterBy.date.startDate).format(
          "YYYY-MM-DD"
        );
        const mewsEnd = dayjs(this.filterBy.date.endDate).format("YYYY-MM-DD");
        const apMewsId = this.apartment.mewsId;
        const code = this.filterBy.code;
        const adultCount = this.filterBy.adultCount;
        const childCount = this.filterBy.childCount;
        const currency = this.currency.currencyType;

        this.$store.dispatch("tagManagerEvent", {
          type: "BookNowClicked",
          value: {
            numberOfAdults: adultCount,
            numberOfChildren: childCount,
            date: this.filterBy.date,
          },
        });
        this.$router.push(
          `/checkout?start=${mewsStart}&end=${mewsEnd}&apMewsId=${apMewsId}&bMewsId=${
            this.buildingId
          }&code=${code}&adultCount=${adultCount}&childCount=${childCount}&currency=${currency}`
        );
      }
      // window.open(this.bookNow, "_blank");
      // window.open(this.bookNow, "_self");
    },
    onMobileBook() {
      this.isMobileCheckout = !this.isMobileCheckout;
    },
    onRemoveCode() {
      this.$store.dispatch("setFilterBy", {
        isBtn: false,
        setFilterBy: {
          type: "code",
          value: null,
        },
      });
    },




    onCheckAvailability(res) {
      // console.log('checkout - onCheckAvailability', res)
      this.$emit("onCheckAvailability", {
        apartment: res.apartment,
      });
    },
    // onCheckAvailabilityMobile() {
    //   this.$emit("onCheckAvailabilityMobile", {
    //     apartment: this.apartment,
    //     txtBtn: this.txtBtnMobile,
    //   });
    // },
  },
  watch: {
    "this.filterBy.date"(val, prevVal) {
      if (
        val.startDate &&
        val.endDate &&
        (val.startDate !== prevVal.startDate || val.endDate !== prevVal.endDate)
      )
        this.$emit("onTogglePicker", false);
    },
    onBookMobile(val) {
      if (val) this.isMobileCheckout = true;
    },
  },
};
</script>

<style lang="scss">
.checkout .v-input {
  button {
    background-color: #f2f2f2;
  }
}
</style>
