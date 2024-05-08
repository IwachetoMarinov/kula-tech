<template>
  <section v-if="apartment" class="mobileCheck bg--light">
    <a
      class="pop-close ic-pointer q_flex flex--center"
      @click="toggleMobileCheckout"
      ><g-image src="~/assets/image/close.svg" alt=""></g-image
    ></a>
    <div>
      <h2 class="q_title">{{ apartment.name }}</h2>
      <div class="mm-check-row tx--font-light m-100 q_flex flex--start">
        <div class="mm-check-ic">
          <g-image src="~/assets/image/calender.svg" alt="calender"></g-image>
        </div>
        <div
          class="mm-check-date q_flex flex--start is--fit"
          v-if="dateSelected"
        >
          {{ dateSelected.startDate | date }}
          <g-image
            src="~/assets/image/arrow-check.svg"
            alt="arrow-check"
          ></g-image>
          {{ dateSelected.endDate | date }}
        </div>
      </div>
      <div class="mm-check-row m-100 tx--font-light q_flex flex--start">
        <div class="mm-check-ic">
          <g-image
            src="~/assets/image/filter-room.svg"
            alt="filter-room"
          ></g-image>
        </div>
        <div>{{ guestSelected }}</div>
      </div>
    </div>
    <!-- End section -->
    <div
      class="hold-mm-check-details border--btm border--top"
      v-if="apartment && apartment.mewsPricing"
    >
      <!-- <div class="tx--24 bold mb--15">Payment Details</div>
      <div class="checkout-bottom-row q_flex">
        <div>
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
      <div v-if="discount" class="checkout-bottom-row q_flex">
        <div>
          <b>{{ discount.percentage }}% off</b> stay more, pay less
        </div>
        <div>-{{ currency.currencySymbol + discount.dif }}</div>
      </div>
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
      <div v-if="discount" class="checkout-bottom-row q_flex">
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
      <div class="checkout-bottom-row tx--22 q_flex bold">
        <div>Total</div>
        <div>
          {{
            currency.currencySymbol +
              apartment[rateTypeTotal].Price.TotalAmount[
                currency.currencyType
              ].GrossValue.toFixed(2)
          }}
        </div>
      </div> -->

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
      <div class="checkout-bottom border--top tx--16 w-100">
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
    </div>
    <!-- End section -->
    <div v-if="!filterBy.code" class="mm-code-row q_flex">
      <div>Promotional code</div>
      <a
        class="tx--under tx--18 block"
        v-show="isDate && apartment && !isCodeInput"
        @click="setMobilePopUp"
      >
        Add
      </a>
    </div>
    <div class="wrap-coupon" v-show="isCodeInput"></div>
    <!-- End section -->
    <a class="bt-primary w-100" @click="onBookNow">Continue to checkout</a>
    <div class="q_center tx--14">
      You will be redirected to our booking platform to complete your
      reservation
    </div>
    <!-- End section -->
    <div v-if="textBanner" class="checkout-banner tx--18 q_flex">
      <g-image :src="textBanner.image.file.url" :alt="textBanner.image.title" />
      <div class="is--fit">
        <div class="bold">{{ textBanner.title }}</div>
        <div v-html="toHtml(textBanner.content)"></div>
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters } from "vuex";

export default {
  name: "CheckoutMobile",
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
  },
  data() {
    return {
      code: null,
      isCodeInput: false,
    };
  },
  filters: {
    date(val) {
      return dayjs(val).format("MMM DD YY");
    },
  },
  computed: {
    ...mapGetters(["filterBy", "currency"]),
    isDate() {
      return this.filterBy.date.startDate && this.filterBy.date.endDate
        ? true
        : false;
    },
    dateSelected() {
      const date = this.$store.getters.filterBy.date;
      if (!date.startDate || !date.endDate) return null;
      return date;
    },
    guestSelected() {
      const adultCount = this.$store.getters.filterBy.adultCount;
      const childCount = this.$store.getters.filterBy.childCount;
      return adultCount + " adults, " + childCount + " children";
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
      percentage = (percentage / 1).toFixed(2).replace(",", ".");
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
    bookNow() {
      const filterBy = this.$store.getters.filterBy;
      if (!filterBy.date.startDate || !filterBy.date.endDate || !this.apartment)
        return "";
      const mewsStart = new Date(filterBy.date.startDate)
        .toISOString()
        .slice(0, 10);
      const mewsEnd = new Date(filterBy.date.endDate)
        .toISOString()
        .slice(0, 10);
      let url = `https://api.mews.com/distributor/${
        this.buildingId
      }?mewsStart=${mewsStart}&mewsEnd=${mewsEnd}&mewsRoom=${
        this.apartment.mewsId
      }&mewsAdultCount=${filterBy.adultCount}&mewsChildCount=${
        filterBy.childCount
      }&mewsRoute=rates`;
      if (this.filterBy.code) {
        url += `&mewsVoucherCode=${this.filterBy.code}`;
      }
      return url;
    },
    getDays() {
      const dif =
        new Date(this.filterBy.date.endDate).getTime() -
        new Date(this.filterBy.date.startDate).getTime();
      return dif / (1000 * 3600 * 24);
    },
  },
  methods: {
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
    toggleMobileCheckout() {
      this.$emit("toggleMobileCheckout");
    },
    setMobilePopUp() {
      this.$store.commit("setMobilePopUp", true);
      this.$store.commit("setCurrentMobilePopUp", "code");
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
    async onBookNow() {
      const mewsStart = dayjs(this.filterBy.date.startDate).format("YYYY-MM-DD");
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
          `/checkout?start=${mewsStart}&end=${mewsEnd}&apMewsId=${apMewsId}&bMewsId=${this.buildingId}&code=${code}&adultCount=${adultCount}&childCount=${childCount}&currency=${currency}`
        );
    },
  },
};
</script>
