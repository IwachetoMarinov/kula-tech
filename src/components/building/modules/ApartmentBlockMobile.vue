<template>
  <section>
    <div class="apartment-block-mobile" v-show="!isSelect && apartment.available">
      <div
        class="apartment-block-mobile-top q_flex flex--top relative"
        @click.stop="onIsSelect"
      >
        <div class="img-cover">
          <g-image
            :src="apartment.gallery[0].file.url"
            :alt="apartment.gallery[0].title"
          />
        </div>
        <div class="is--fit">
          <h2 class="q_title">{{ apartment.name }}</h2>
          <div>
            <span class="tx--Recoleta bold">
              <!-- If not Lisbon show per night, if Lisbon show by month -->
              <span>{{ currency.currencySymbol }}</span>
              {{ filterBy.citySelected && filterBy.citySelected.slug === 'lisbon' ? apartment.minPrice * 30 : apartment.minPrice }}
              <span class="tx--14 tx--font-light">{{ filterBy.citySelected && filterBy.citySelected.slug === 'lisbon' ? '/ month' : '/ night' }}</span>
            </span>
          </div>
        </div>
        <div><g-image src="~/assets/image/arrow-down.svg" alt="arrow-down" /></div>
      </div>
      <div class="fully-mobile bg--bege" v-if="!this.apartment.available">FULLY BOOKED</div>
      <div v-else class="apartment-block-mobile-numbs q_flex tx--14 tx--font-light">
        <div>{{ apartment.numberBedrooms }} Bedrooms</div>
        <div>{{ apartment.maxGuests }} Guests</div>
        <div>{{ apartment.numberBathrooms }} Bathrooms</div>
        <div>{{ apartment.apartmentSize }} ㎡</div>
      </div>
    </div>
    <div class="apartment-block-open" v-show="isSelect">
      <apartment-block
        :key="apartment.mewsId"
        :apartment="apartment"
        :selectedApartment="selectedApartment"
        @onCheckAvailability="onCheckAvailability"
        @toggleIsSelect="isSelect = false"
        @onCheckAvailabilityMobile="onCheckAvailabilityMobile"
      />
    </div>
  </section>
</template>

<script>
import ImageSwiper from "../../swiper/ImageSwiper.vue";
import { mapGetters } from "vuex";
import ApartmentBlock from "./ApartmentBlock.vue";

export default {
  name: "ApartmentBlockMobile",
  components: { ImageSwiper, ApartmentBlock },
  props: {
    apartment: {
      type: Object,
      require: true,
    },
    selectedApartment: {
      require: true,
    },
  },
  data() {
    return {
      isSelect: false,
    };
  },
  computed: {
    ...mapGetters(["filterBy", "currency"]),
    isSelectedApartment() {
      if (!this.selectedApartment || !this.apartment) return false;
      else
        return this.selectedApartment.mewsId === this.apartment.mewsId
          ? true
          : false;
    },
    txtBtn() {
      if (!this.apartment.available) return "Fully Booked";
      else if (
        this.isSelectedApartment &&
        this.filterBy.date.startDate &&
        this.filterBy.date.endDate
      )
        return "Book now";
      else if (this.filterBy.date.startDate && this.filterBy.date.endDate)
        return "Select apartment";
      else return "Check availability";
    },
    classBtn() {
      if (!this.apartment.available) return "disabled";
      else return "";
    },
  },
  methods: {
    onCheckAvailability() {
      this.$emit("onCheckAvailability", {
        apartment: this.apartment,
        txtBtn: this.txtBtn,
      });
    },
    onCheckAvailabilityMobile(res) {
      this.$emit("onCheckAvailabilityMobile", res);
    },
    onIsSelect() {
      this.isSelect = true;
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  },
};
</script>

<style>
.img-mobile {
  width: 100px;
}
</style>
