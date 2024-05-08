<template>
  <section v-show="apartment.available" class="apartment-block q_flex item_city flex--top">
    <div
      class="mm-toggle-block mobile_only q_flex relative"
      @click="$emit('toggleIsSelect')"
    >
      <h2 class="q_title title--28 mobile_only">{{ apartment.name }}</h2>
      <div class="arrow-down">
        <g-image src="~/assets/image/arrow-down.svg" alt="arrow-down" />
      </div>
    </div>

    <div class="item_city_left relative" @click="toggleIsGallery">
      <image-swiper :images="apartment.gallery.slice(0, 6)" />
      <button class="bt-white q_flex flex--center mobile_only">
        <g-image src="~/assets/image/gallery.svg" alt="gallery"></g-image>
      </button>
    </div>
    <div class="item_city_content is--fit relative block no-white-space">
      <div>
        <h2 class="q_title title--28 no_mobile">{{ apartment.name }}</h2>
        <v-tooltip bottom v-show="!apartment.available">
          <template v-slot:activator="{ on, attrs }">
            <div
              class="cal-blocked flex flex--center"
              v-bind="attrs"
              v-on="on"
              v-show="!apartment.available"
            >
              <g-image src="~/assets/image/cal-blocked.svg" alt="cal-blocked" />
            </div>
          </template>
          <div class="check-tooltip bg--light tx--14">
            We’re fully booked. <br/>Try choosing a different date!
          </div>
        </v-tooltip>
      </div>
      <div class="item_apartment_options flex flex--start">
        <div class="item_apartment_option" v-if="apartment.numberBedrooms">
          {{ apartment.numberBedrooms }} Bedrooms
        </div>
        <div class="item_apartment_option" v-if="apartment.maxGuests">
          {{ apartment.maxGuests }} Guests
        </div>
        <div class="item_apartment_option" v-if="apartment.numberBathrooms">
          {{ apartment.numberBathrooms }} Bathrooms
        </div>
        <div class="item_apartment_option" v-if="apartment.apartmentSize">
          {{ apartment.apartmentSize }} ㎡
        </div>
      </div>
      <div class="item_city_tags flex flex--start">
        <div v-for="(amenity, index) in apartment.amenities" :key="index">
          <div class="tag-fsil" v-if="index < 4">
            {{ amenity }}
          </div>
        </div>
      </div>
      <div class="item_city_options">
        <div class="hold-sleeping">
          <div class="title--14">Sleeping arrangements</div>
          <div class="arrange_items q_flex flex--start">
            <div
              v-for="(arrangement, index) in apartment.sleepingArrangements"
              :key="index"
              class="flex"
            >
              <g-image
                :src="arrangement.sleepingArrangement.icon.file.url"
                :alt="arrangement.sleepingArrangement.icon.title"
              />
              <div>{{ arrangement.number }}</div>
              <div>{{ arrangement.sleepingArrangement.title }}</div>
            </div>
          </div>
        </div>
        <div class="q_flex flex--bottom flex--reverse m-block">
          <div
            v-if="apartment.mewsPricing && filterBy.date.startDate"
            class="price q_title title--28 tx--right"
          >
            <div class="mb--22">
              {{ currency.currencySymbol }}
              {{
                apartment.mewsPricing.Price.TotalAmount[currency.currencyType]
                  .GrossValue
              }}
            </div>
            <div class="tx--14 tx--Avenir tx--font-light no_mobile">
              <span v-if="apartment.mewsBasePricing && isDiscount" class="tx--line">
                {{ currency.currencySymbol
                }}{{
                  apartment.mewsBasePricing.Price.AverageAmountPerNight[
                    currency.currencyType
                  ].GrossValue
                }}
              </span>
              {{
                currency.currencySymbol +
                  apartment.mewsPricing.Price.AverageAmountPerNight[
                    currency.currencyType
                  ].GrossValue
              }}

              PER NIGHT
            </div>
            <div class="tx--14 tx--Avenir tx--font-light is-last">
              INCLUDING TAXES AND FEES
            </div>
          </div>
          <div v-else class="price q_title title--28">
            <!-- If not Lisbon show per night, if Lisbon show by month -->
            <span>{{ currency.currencySymbol }}</span>
              {{ filterBy.citySelected && filterBy.citySelected.slug === 'lisbon' ? apartment.minPrice * 30 : apartment.minPrice }}
              <span class="tx--18 tx--Avenir tx--font-light">{{ filterBy.citySelected && filterBy.citySelected.slug === 'lisbon' ? '/ month' : '/ night' }}</span>
          </div>
          <button
            class="bt-border m-100 btn-apartment"
            @click.stop="onCheckAvailability"
            :class="classBtn"
            @mouseover="isHoveredSelected = true"
            @mouseleave="isHoveredSelected = false"
          >
            {{ txtBtn }}
          </button>
          <button
            class="bt-border m-100 btn-apartment-mobile"
            @click.stop="onCheckAvailabilityMobile"
            :class="classBtnMobile"
          >
            {{ txtBtnMobile }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="isGallery">
      <gallery
        :images="apartment.gallery"
        @onCloseGallery="isGallery = false"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ImageSwiper from "../../swiper/ImageSwiper.vue";
import Gallery from "../../commons/Gallery.vue";

export default {
  name: "ApartmentBlock",
  components: { ImageSwiper, Gallery },
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
      isHoveredSelected: false,
      isGallery: false,
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
        this.isHoveredSelected &&
        this.isSelectedApartment &&
        this.filterBy.date.startDate &&
        this.filterBy.date.endDate
      )
        return "Unselect";
      else if (
        this.isSelectedApartment &&
        this.filterBy.date.startDate &&
        this.filterBy.date.endDate
      )
        return "Selected apartment";
      else if (this.filterBy.date.startDate && this.filterBy.date.endDate)
        return "Select apartment";
      else return "Check availability";
    },
    txtBtnMobile() {
      if (!this.apartment.available) return "Fully Booked";
      else if (this.filterBy.date.startDate && this.filterBy.date.endDate)
        return "Book now";
      else return "Check availability";
    },
    classBtn() {
      if (!this.apartment.available) return "disabled";
      else if (
        this.isSelectedApartment &&
        this.filterBy.date.startDate &&
        this.filterBy.date.endDate
      )
        return "selected";
      else return "";
    },
    classBtnMobile() {
      if (!this.apartment.available) return "disabled";
      else if (this.filterBy.date.startDate && this.filterBy.date.endDate)
        return "selected";
      else return "";
    },
    isDiscount() {
      const dif = this.apartment.mewsBasePricing.Price.AverageAmountPerNight[
        this.currency.currencyType
      ].GrossValue -
        this.apartment.mewsPricing.Price.AverageAmountPerNight[
          this.currency.currencyType
        ].GrossValue;
      return dif ? true : false;
    },
  },
  methods: {
    onCheckAvailability() {
      this.$emit("onCheckAvailability", {
        apartment: this.apartment,
        txtBtn: this.txtBtn,
      });
    },
    onCheckAvailabilityMobile() {
      this.$emit("onCheckAvailabilityMobile", {
        apartment: this.apartment,
        txtBtn: this.txtBtnMobile,
      });
    },
    toggleIsGallery(ev) {
      if (
        ev.target.ariaLabel !== "Next slide" &&
        ev.target.ariaLabel !== "Previous slide"
      ) {
        this.isGallery = true;
      }
    },
  },
  // mounted() {
  //   console.log(this.filterBy.citySelected.slug)
  // }
};
</script>

<style lang="scss">
.btn-apartment {
  @media only screen and (max-width: 800px) {
    display: none !important;
  }
}
.btn-apartment-mobile {
  @media only screen and (min-width: 800px) {
    display: none !important;
  }
}
</style>
