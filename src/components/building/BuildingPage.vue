<template>
  <div>
    <section class="building-hero">
      <div class="layout">
        <!-- <div class="mews-close" v-show="isCheckout" @click="onMewsClose"></div> -->
        <div class="mobile_only m-build-top-slide relative">
          <image-swiper class="" :images="page.gallery" />
          <button
            class="bt-white q_flex flex--center"
            @click.stop="isGalleryBuilding = true"
          >
            <g-image src="~/assets/image/gallery.svg" alt="gallery"></g-image>
          </button>
          <a
            class="building-hero-link q_flex flex--center"
            @click="isShare = !isShare"
          >
            <g-image src="~/assets/image/ic-share.svg" alt="ic-share"></g-image>
          </a>
          <!-- mobile image swiper  -->
        </div>

        <div class="q_flex flex--bottom relative">
          <div class="building-hero-title">
            <div class="q_flex flex--start">
              <h1 class="q_title">
                {{ page.name }}
              </h1>
              <div class="tag-high inline no_mobile" v-if="page.highDemand">
                <span class="q_flex flex--start">
                  <g-image
                    src="~/assets/image/ic-star.svg"
                    alt="ic-star"
                  ></g-image>
                  High demand
                </span>
              </div>
            </div>
            <div class="text tx--24 underline--decoration">{{ address }}</div>
            <div class="tag-high inline mobile_only" v-if="page.highDemand">
              <span class="q_flex flex--start">
                <g-image
                  src="~/assets/image/ic-star.svg"
                  alt="ic-star"
                ></g-image>
                High demand
              </span>
            </div>
          </div>
          <div class="building-hero-links q_flex">
            <a
              class="building-hero-link map-width q_flex flex--start"
              @click="onMap"
            >
              <g-image src="~/assets/image/ic-map.svg" alt="ic-map"></g-image>
              <span class="link">Map</span>
            </a>
            <a
              class="building-hero-link share-width q_flex flex--start no_mobile"
              @click="isShare = !isShare"
            >
              <g-image
                src="~/assets/image/ic-share.svg"
                alt="ic-share"
              ></g-image>
              <span class="link">Share</span>
            </a>
          </div>
        </div>
        <v-dialog max-width="600" v-model="isShare">
          <a
            class="pop-close ic-pointer q_flex flex--center"
            @click="isShare = false"
            ><g-image src="~/assets/image/close.svg" alt="close"></g-image
          ></a>
          <share-pop-up />
        </v-dialog>
        <div class="building-hero-gall relative no_mobile">
          <div class="building-hero-grid">
            <template v-for="(image, index) in page.gallery">
              <div
                class="building-hero-grid-item c-pointer img-cover"
                v-if="index < 3"
                :key="index"
                :class="'gallery-image' + index"
                @click.stop="isGalleryBuilding = true"
              >
                <g-image
                  :src="image.file.url + '?fm=webp&w=930'"
                  :alt="image.title"
                />
              </div>
            </template>
          </div>
          <button
            class="bt-white q_flex flex--center"
            @click.stop="isGalleryBuilding = true"
          >
            <g-image src="~/assets/image/gallery.svg" alt="gallery"></g-image>
            View all
          </button>
        </div>
      </div>
      <div v-if="isGalleryBuilding">
        <gallery
          :images="page.gallery"
          @onCloseGallery="isGalleryBuilding = false"
        />
      </div>
    </section>
    <!--end building-hero -->

    <section class="building-main relative sec--pad--btm">
      <div class="layout q_flex flex--top flex--reverse">
        <div class="building-main-right">
          <checkout
            :apartment="selectedApartment"
            :textBanner="page.actionBanner"
            :buildingId="page.mewsId"
            :minPrice="minPrice"
            :isTogglePicker="isTogglePicker"
            :onBookMobile="onBookMobile"
            :isAllFully="isAllFully"
            ref="checkout"
            @onTogglePicker="onTogglePicker"

            :apartments="filteredBuilding.apartments"
            @onCheckAvailability="onCheckAvailability"
          />
        </div>
        <div class="building-main-left is--fit over--hide">
          <div class="building-main-dec">
            <div
              class="text tx--24 m-text max--850"
              v-html="toHtml(page.description.initialDescription)"
            ></div>
            <div
              class="text tx--24 m-text max--850"
              v-show="isLongDesc"
              v-html="toHtml(page.description.expendedDescription)"
            ></div>
            <a
              v-if="page.description.expendedDescription"
              class="link text"
              @click.stop="toggleIsLongDesc"
            >
              {{ isLongDesc ? "Show Less" : "Show more" }}
            </a>
          </div>
          <!--end section -->
          <div
            class=""
            v-if="page.stayMorePayLess && page.stayMorePayLess.title"
          >
            <banner-price :banner="page.stayMorePayLess" />
          </div>
          <!--end section -->
          <div ref="buildingFilterHeader"></div>
          <div v-show="!isCheckout" class="hold-building-tabs relative">
            <div class="building-tabs" ref="tabs" :style="isOnTab ? {'pointer-events': 'none'} : {'pointer-events': 'initial'}">
              <v-tabs v-model="selectedTab">
                <v-tab @click="onTab('apartments')"
                  >Choose your apartment</v-tab
                >
                <v-tab @click="onTab('amenities')">Amenities & Standards</v-tab>
                <v-tab @click="onTab('where')">Where you’ll stay</v-tab>
                <v-tab @click="onTab('polices')">Booking policies</v-tab>
              </v-tabs>
            </div>
          </div>
          <!--end section -->
          <div class="sec--pad--top" ref="apartments">
            <h2 class="q_title title--36">Choose your apartment</h2>
            <building-filter :apartments="apartmentsType" />
            <v-sheet
              v-if="isLoading"
              class="list-skeleton"
              :color="`#FFFBF7 ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
            >
              <template v-for="i in filteredBuilding.apartments.length">
                <v-skeleton-loader
                  :key="i"
                  type="image, article, actions"
                ></v-skeleton-loader>
              </template>
            </v-sheet>
            <template
              v-else-if="
                !isLoading &&
                  filteredBuilding.apartments &&
                  filteredBuilding.apartments.length
              "
              v-for="apartment in filteredBuilding.apartments"
            >
              <apartment-block
                class="no_mobile"
                v-if="apartment.exists"
                :key="apartment.mewsId"
                :apartment="apartment"
                :selectedApartment="selectedApartment"
                @onCheckAvailability="onCheckAvailability"
                @onCheckAvailabilityMobile="onCheckAvailabilityMobile"
              />
              <apartment-block-mobile
                v-if="apartment.exists"
                class="mobile_only"
                :key="apartment.mewsId + 1"
                :apartment="apartment"
                :selectedApartment="selectedApartment"
                @onCheckAvailability="onCheckAvailability"
                @onCheckAvailabilityMobile="onCheckAvailabilityMobile"
              />
            </template>
            <div
              class="no-results-wrap q_flex flex--column flex--base"
              v-show="!isLoading && !isApartmentExist && !filteredBuilding.available"
            >
              <div class="ohh-title q_flex">
                <g-image src="~/assets/image/ohh.png" alt=""></g-image>
                <h2 class="q_title">Oops! No results.</h2>
              </div>
              <div class="text tx--22 mb--42">
                Try modifying your search or removing your filters.
              </div>
              <button class="bt-white" @click="clearFilter">
                Reset all filters
              </button>
            </div>
          </div>
          <!--end section -->
          <div class="sec--pad border--btm" ref="amenities">
            <h2 class="q_title title--36 mb--22">Amenities</h2>
            <div class="amenities_all relative q_flex flex--top m-block">
              <div
                class="amenities_left is--fit m-100"
                v-if="amenitiesEnabled && amenitiesEnabled.length"
              >
                <div v-for="(amenity, index) in amenitiesEnabled" :key="index">
                  <amenity
                    v-if="index < amountAmenitiesEnabled"
                    :key="index"
                    :amenity="amenity"
                  />
                </div>
                <template
                  v-if="
                    page.disableAmenitiesCount &&
                      amenitiesDisabled &&
                      amenitiesDisabled.length
                  "
                >
                  <div
                    v-for="(amenity, index) in amenitiesDisabled"
                    :key="index + amenity.title"
                  >
                    <amenity
                      v-if="index < page.disableAmenitiesCount"
                      :key="index"
                      :amenity="amenity"
                    />
                  </div>
                </template>
              </div>
              <button class="bt-white m-100" @click="isAmenities = true">
                Show all {{ page.amenitiesEnabled.length }} amenities
              </button>
              <div class="amenities_right m-100 bg--bege">
                <h3 class="text tx--18 bold mb--15 no_mobile">
                  {{ page.standardAmenityCategory.title }}
                </h3>
                <h3 class="q_title title--36 mb--15 mobile_only">
                  {{ page.standardAmenityCategory.title }}
                </h3>
                <div
                  v-for="(amenity, index) in page.standardAmenityCategory
                    .standardAmenity"
                  :key="index"
                >
                  <amenity v-if="index < 6" :key="index" :amenity="amenity" />
                </div>
              </div>
            </div>
            <v-dialog v-model="isAmenities" width="1200">
              <amenities-pop-up
                :categories="amenitiesCategories"
                :standardCategory="page.standardAmenityCategory"
                @close="isAmenities = false"
              />
            </v-dialog>
          </div>
          <!--end section -->
          <div class="build-where sec--pad border--btm" ref="where">
            <h2 class="q_title title--36 mb--42">Where you’ll stay</h2>
            <Map :locationMarkers="locationMarkers" />
            <address-section
              :address="address"
              :transportation="page.transportation"
            />
          </div>
          <!--end section -->
          <div class="sec--pad border--btm">
            <h2 class="q_title title--36 mb--42">
              {{ page.address.neighborhood.name }} at a glance
            </h2>
            <neighborhood-section :neighborhood="page.address.neighborhood" />
          </div>
          <!--end section -->
          <div ref="polices" class="build-polices sec--pad--top">
            <booking-polices :buildingPolicies="page.buildingPolicies" />
            <banner-text
              v-if="page.cancellationPolicy"
              :banner="page.cancellationPolicy"
            />
          </div>
          <!--end section -->
        </div>
      </div>
    </section>
    <div>
      <v-dialog v-model="isCheckoutModal" width="1200">
        <div class="ps-dialog">
          <a class="ps-dialog__close" @click.prevent="isCheckoutModal = false">
            <i class="icon icon-cross"></i>
          </a>
        </div>
        <checkout-mobile
          :apartment="selectedApartment"
          :textBanner="page.actionBanner"
          :buildingId="page.mewsId"
        />
      </v-dialog>
    </div>

    <more-places :title="page.address.city" :morePlaces="morePlaces" />
  </div>
</template>

<script>
import BannerPrice from "../commons/BannerPrice.vue";
import BannerText from "../commons/BannerText.vue";
import Gallery from "../commons/Gallery.vue";
import AddressSection from "./modules/AddressSection.vue";
import Amenity from "./modules/Amenity.vue";
import ApartmentBlock from "./modules/ApartmentBlock.vue";
import Checkout from "./modules/Checkout.vue";
import CheckoutMobile from "./modules/CheckoutMobile.vue";
import NeighborhoodSection from "./modules/NeighborhoodSection.vue";
import BuildingFilter from "./modules/BuildingFilter.vue";
import AmenitiesPopUp from "./modules/AmenitiesPopUp.vue";
import ApartmentBlockMobile from "./modules/ApartmentBlockMobile.vue";
import Map from "../commons/Map.vue";
import ImageSwiper from "../../components/swiper/ImageSwiper.vue";
import MorePlaces from "./modules/MorePlaces.vue";
import SharePopUp from "./modules/SharePopUp.vue";
import BookingPolices from "./modules/BookingPolices.vue";
import { mapState } from "vuex";

export default {
  components: {
    ApartmentBlock,
    AddressSection,
    NeighborhoodSection,
    Amenity,
    BannerPrice,
    Checkout,
    Gallery,
    BannerText,
    BuildingFilter,
    AmenitiesPopUp,
    ApartmentBlockMobile,
    CheckoutMobile,
    Map,
    ImageSwiper,
    MorePlaces,
    SharePopUp,
    BookingPolices,
  },
  name: "BuildingPage",
  props: {
    page: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      copyPage: null,
      isOnTab: false,
      isLongDesc: false,
      isGalleryBuilding: false,
      isAmenities: false,
      isCheckoutModal: false,
      isShare: false,
      selectedTab: 0,
      selectedTabName: null,
      selectedApartment: null,
      policySelected: null,
      locationMarkers: [],
      amenitiesEnabled: [],
      amenitiesDisabled: [],
      isTogglePicker: false,
      onBookMobile: false,
    };
  },
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  computed: {
    ...mapState({
      isCheckout: (state) => state.optionsStore.isCheckout,
    }),
    address() {
      if (!this.page) return null;
      return (
        this.page.address.street +
        ", " +
        this.page.address.neighborhood.name +
        ", " +
        this.page.address.city
      );
    },
    morePlaces() {
      if (!this.page) return null;
      const city = this.$static.cities.edges.filter(
        (city) => city.node.name === this.page.address.city
      );
      if (!city || !city.length) return null;
      const buildings = city[0].node.buildings;
      const buildingsToSort = buildings.filter(
        (b) => b.slug !== this.filteredBuilding.slug
      );
      if (this.page.morePlacesSortBy === "price low to high") {
        return buildingsToSort.sort((a, b) =>
          parseInt(a.price) > parseInt(b.price) ? 1 : -1
        );
      } else {
        return buildingsToSort.sort((a, b) =>
          parseInt(a.price) < parseInt(b.price) ? 1 : -1
        );
      }
    },
    apartmentsType() {
      return this.page.apartments.map((apartment) => apartment.name);
    },
    amenitiesCategories() {
      if (!this.amenitiesEnabled.length && this.amenitiesDisabled.length)
        return null;
      var newObj = {};
      const aman = [...this.amenitiesEnabled, ...this.amenitiesDisabled];
      for (const key in aman) {
        if (Object.hasOwnProperty.call(aman, key)) {
          const element = aman[key];
          const newKey = element.category;
          if (typeof newObj[newKey] == "undefined") {
            newObj[newKey] = [element];
          } else {
            newObj[newKey].push(element);
          }
        }
      }
      return newObj;
    },
    filteredBuilding() {
      const set = this.copyPage ? this.copyPage : this.page;
      let filteredBuildings = this.$store.getters.filteredBuildings([set]);
      if (this.selectedApartment) {
        const find = filteredBuildings[0].apartments.find(
          (a) => a.mewsId === this.selectedApartment.mewsId
        );
        if (!find || (find && !find.available)) this.selectedApartment = null;
        else this.selectedApartment = find;
      }
      this.copyPage = filteredBuildings[0];
      return filteredBuildings[0];
    },
    isApartmentExist() {
      let exists = false;
      if (
        this.filteredBuilding &&
        this.filteredBuilding.apartments &&
        this.filteredBuilding.apartments.length
      ) {
        this.filteredBuilding.apartments.forEach((a) => {
          if (a.exists && a.available) exists = true;
        });
      }
      return exists;
    },
    minPrice() {
      let arrPrice = this.page.apartments.map(
        (apartment) => apartment.minPrice
      );
      return Math.min(...arrPrice);
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    amountAmenitiesEnabled() {
      if (!this.page || !this.page.disableAmenitiesCount) return 12;
      return 12 - parseInt(this.page.disableAmenitiesCount);
    },
    isAllFully() {
      let bool = true;
      this.filteredBuilding.apartments.forEach((a) => {
        if (a.available) bool = false;
      });
      return bool;
    },
  },
  methods: {
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
    toggleIsLongDesc() {
      this.isLongDesc = !this.isLongDesc;
    },
    clearFilter() {
      this.$store.commit("clearFilterBy");
    },
    onCheckAvailability(res) {
      // console.log('building', res)
      const date = this.$store.getters.filterBy.date;
      if (!date.startDate || !date.endDate) {
        this.$refs.checkout.$refs[
          "date-picker"
        ].$refs.checkoutPicker.togglePicker(true);
        return;
      }
      if (
        this.selectedApartment &&
        this.selectedApartment.mewsId === res.apartment.mewsId
      ) {
        this.selectedApartment = null;
        const position = this.filteredBuilding.apartments.findIndex(
          (a) => res.apartment.mewsId === a.mewsId
        );
        this.$store.dispatch("tagManagerEvent", {
          type: "ApartmentClicked",
          value: {
            state: "deselect",
            apartmentName: res.apartment.name,
            position,
          },
        });
      } else if (!res.apartment.available) {
        this.selectedApartment = null;
      } else {
        this.selectedApartment = res.apartment;
        const position = this.filteredBuilding.apartments.findIndex(
          (a) => res.apartment.mewsId === a.mewsId
        );
        this.$store.dispatch("tagManagerEvent", {
          type: "ApartmentClicked",
          value: {
            state: "select",
            apartmentName: res.apartment.name,
            position,
          },
        });
      }
      // if (res.txtBtn === "Book now") this.isCheckoutModal = true;
    },
    onCheckAvailabilityMobile(res) {
      const date = this.$store.getters.filterBy.date;
      if (!date.startDate || !date.endDate) {
        this.$store.commit("setMobilePopUp", true);
        this.$store.commit("setCurrentMobilePopUp", "date");
      } else if (!res.apartment.available) {
        this.selectedApartment = null;
      } else {
        this.selectedApartment = res.apartment;
        const position = this.filteredBuilding.apartments.findIndex(
          (a) => res.apartment.mewsId === a.mewsId
        );
        this.$store.dispatch("tagManagerEvent", {
          type: "ApartmentClicked",
          value: {
            state: "select",
            apartmentName: res.apartment.name,
            position,
          },
        });
      }
      if (res.txtBtn === "Book now") {
        this.onBookMobile = true;
        setTimeout(() => {
          this.onBookMobile = false;
        }, 500);
      }
    },
    onMap() {
      const element = this.$refs.where;
      const viewportOffset = element.getBoundingClientRect();
      const top = viewportOffset.top;
      window.scrollTo({ top, left: 0, behavior: "smooth" });
    },
    onTab(refName) {
      if (refName === this.selectedTabName || this.isOnTab) return;
      this.isOnTab = true;
      const element = this.$refs[refName];
      const y = element.getBoundingClientRect().top + window.scrollY - 57;
      window.scroll({
        top: y,
        behavior: "smooth",
      });
      switch (refName) {
        case "amenities":
          this.selectedTab = 1;
          break;
        case "where":
          this.selectedTab = 2;
          break;
        case "polices":
          this.selectedTab = 3;
          break;
        default:
          this.selectedTab = 0;
          break;
      }
      this.selectedTabName = refName;
      setTimeout(() => {
        this.isOnTab = false;
      }, 700);
    },
    handleScroll() {
      if (!this.$refs) return;

      const header = document.getElementById("headerSticky");
      const element = this.$refs.buildingFilterHeader;
      const elementTabs = this.$refs.tabs;
      const rectElement = element.getBoundingClientRect();
      const rectElementTabs = elementTabs.getBoundingClientRect();

      const rectAmenities = this.$refs.amenities.getBoundingClientRect();
      const rectWhere = this.$refs.where.getBoundingClientRect();
      const rectPolices = this.$refs.polices.getBoundingClientRect();
      if (!this.isOnTab) {
        if (rectPolices.top <= rectElementTabs.height) {
          this.selectedTab = 3;
          this.selectedTabName = "polices";
        } else if (rectWhere.top <= rectElementTabs.height) {
          this.selectedTab = 2;
          this.selectedTabName = "where";
        } else if (rectAmenities.top <= rectElementTabs.height) {
          this.selectedTab = 1;
          this.selectedTabName = "amenities";
        } else {
          this.selectedTab = 0;
          this.selectedTabName = "apartments";
        }
      }
      if (this.isCheckout) return;
      if (rectElement.top <= 85 - rectElementTabs.height) {
        header.classList.remove("header--sticky");
        elementTabs.classList.add("tabs--sticky");
      } else {
        elementTabs.classList.remove("tabs--sticky");
        header.classList.add("header--sticky");
      }
    },
    onTogglePicker(val) {
      this.$refs.checkout.$refs[
        "date-picker"
      ].$refs.checkoutPicker.togglePicker(true);
    },
  },
  watch: {
    "$store.getters.filterBy.code"(val) {
      if (val) return;
      const index = this.copyPage.apartments.findIndex(
        (a) => a.mewsId === this.selectedApartment.mewsId
      );
      this.copyPage.apartments[index].mewsDiscountPricing = null;
    },
    "$store.getters.filterBy.date"(val) {
      if (val.startDate && val.endDate) {
        this.$refs.checkout.$refs[
          "date-picker"
        ].$refs.checkoutPicker.togglePicker(false);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.locationMarkers.push({
      position: {
        lat: this.page.buildingLocation.lat,
        lng: this.page.buildingLocation.lon,
      },
    });
    this.amenitiesEnabled = this.page.amenitiesEnabled.map((a) => {
      return { ...a, available: "yes" };
    });
    this.amenitiesDisabled = this.page.amenitiesDisabled.map((a) => {
      return { ...a, available: "no" };
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<static-query>
query Cities {
  cities: allContentfulCity {
    edges {
      node {
        name,
        mewsId,
        buildings {
          name,
          slug,
          gallery {
            title,
            file {
              url
            }
          },
          address {
            street,
            city,
            neighborhood {
              name,
              oneLineDescription
            }
          },
          buildingAmenities,
          apartments {
            name,
            mewsId,
            minPrice
          },
          tag {
            title,
            icon {
              title,
              file {
                url
              }
            }
          }
        }
      }
    }
  }
}
</static-query>
