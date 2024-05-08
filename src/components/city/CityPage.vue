<template>
  <div class="city-page">
    <section class="city-page-top relative">
      <div
        class="city-map-wrap"
        ref="stickyMap"
        :class="isListLayout ? '' : 'active'"
      >
        <a
          ref="discoverSearchMobile"
          class="dis-mobile mobile_only bg--light"
          style="display:none"
          @click="setMobilePopUp('city')"
        >
          <span class="q_flex flex--center">
            Discover your stay
            <g-image src="~/assets/image/search.svg" alt="search"></g-image>
          </span>
        </a>
        <div class="city-map-in">
          <Map
            ref="mapSection"
            class="city-map"
            :isCityPage="true"
            :locationMarkers="locationMarkers"
            :firstBuilding="page.buildings[0]"
            :polygons="polygons"
            @changeSelectedMarker="changeSelectedMarker"
          ></Map>
          <button class="arrow-map" @click="toggleLayout">
            <div class="flex" v-show="isListLayout">
              <g-image
                src="~/assets/image/arrow-l.svg"
                :immediate="true"
                alt="arrow"
              />
            </div>
            <div class="q_flex no_mobile" v-show="!isListLayout">
              <g-image
                src="~/assets/image/arrow-r.svg"
                :immediate="true"
                alt="arrow"
              />
              <span>Shrink the map</span>
            </div>
            <div class="q_flex flex--center mobile_only" v-show="!isListLayout">
              <g-image
                src="~/assets/image/close.svg"
                :immediate="true"
                alt="close"
              />
            </div>
          </button>

          <button class="map-center flex flex--center" @click.stop="onCenter">
            <g-image
              src="~/assets/image/ic-center.svg"
              :immediate="true"
              alt="center"
            />
          </button>
          <button
            class="arrow-map arrow-map-filter"
            @click="setMobilePopUp('filters')"
          >
            <div class="q_flex flex--center">
              <g-image src="~/assets/image/filters1.svg" alt="filters" />
            </div>
          </button>
        </div>
        <template
          v-if="filteredBuildingsByMap && filteredBuildingsByMap.length"
        >
          <building-block-map
            v-if="!isListLayout && selectedBuilding"
            :building="selectedBuilding"
            :class="isListLayout ? '' : 'active'"
          />
        </template>
      </div>
      <div
        class="city-main"
        v-show="isListLayout"
        :class="isListLayout ? '' : 'active'"
      >
        <div class="layout layout-100">
          <div class="city-main-in">
            <div class="city-main-head mobile_only">
              <div class="mobile_only">
                <div class="mm-city-search border--1">
                  <div
                    class="mm-city-search-input q_flex flex--start border--btm"
                    @click="setMobilePopUp('city')"
                  >
                    <g-image src="~/assets/image/place.svg" alt="place" />
                    {{ citySelected }}
                  </div>
                  <div class="q_flex">
                    <div
                      class="mm-city-search-input q_flex flex--start col--50"
                      @click="setMobilePopUp('date')"
                    >
                      <g-image
                        src="~/assets/image/calender.svg"
                        alt="calender"
                      />
                      {{ dateSelected }}
                    </div>
                    <div
                      class="mm-city-search-input q_flex flex--start col--50"
                      @click="setMobilePopUp('guest')"
                    >
                      <g-image
                        src="~/assets/image/filter-room.svg"
                        alt="filter"
                      />
                      {{ guestSelected }}
                    </div>
                  </div>
                </div>
                <div class="mm-city-filters q_flex tx--14 tx--font-light">
                  <div
                    class="mm-city-filter q_flex flex--start"
                    @click="setMobilePopUp('filters')"
                  >
                    <g-image src="~/assets/image/filters1.svg" alt="filter" />
                    Filters
                  </div>
                  <v-select
                    :items="sort"
                    item-text="text"
                    item-value="value"
                    :value="sortSelected"
                    @change="onSort"
                  ></v-select>
                </div>
              </div>
              <!-- mobile -->
              <div
                ref="showMapCalc"
                class="show-m-fix tx--16 q_flex flex--center show-calc"
              ></div>
              <a
                ref="showMap"
                class="show-m-fix tx--16 q_flex flex--center"
                @click="toggleLayout"
              >
                <g-image src="~/assets/image/place.svg" alt="place"></g-image>
                <span class="tx--font">Show Map</span>
              </a>
            </div>
            <!-- If city is Lisbon show mimimum stay banner otherwise show flexible cancellation -->
            <banner-text
              v-if="page.minimumStay && filterBy.citySelected && filterBy.citySelected.name === 'Lisbon'"
              :banner="page.minimumStay"
              class="minimum-stay"
            />
            <banner-text
              v-if="page.cancellationPolicy &&filterBy.citySelected && filterBy.citySelected.name !== 'Lisbon'"
              :banner="page.cancellationPolicy"
            />

            <div class="mobile_only hold-results-city">
              <div class="q_flex">
                <div class="tx--14 tx--font-light">
                  {{ page.buildings.length }} results
                </div>
                <a class="c-pointer tx--14 tx--link" @click.stop="onGetToKnow">
                  Get to know {{ page.name }} >
                </a>
                <a
                  class="show-m-sm tx--14 tx--font-light q_flex"
                  @click="toggleLayout"
                >
                  <g-image src="~/assets/image/place.svg" alt="place"></g-image>
                  <span class="tx--font-light">Show Map</span>
                </a>
              </div>
            </div>

            <div class="city-main-head flex no_mobile">
              <div class="flex flex--start">
                <div class="tx--16 tx--font-light">
                  {{
                    filteredBuildingsByMap ? filteredBuildingsByMap.length : 0
                  }}
                  results
                  <span class="no_mobile">for {{ page.name }}</span>
                </div>
                <a
                  class="c-pointer tx--16 tx--font-light tx--link"
                  @click.stop="onGetToKnow"
                >
                  Get to know {{ page.name }} better
                </a>
                <div class="tablet_only">
                  <v-select
                    :items="sort"
                    item-text="text"
                    item-value="value"
                    :value="sortSelected"
                    @change="onSort"
                  ></v-select>
                </div>
              </div>
              <div class="no_tablet">
                <v-select
                  :items="sort"
                  item-text="text"
                  item-value="value"
                  :value="sortSelected"
                  @change="onSort"
                ></v-select>
              </div>
              <a
                class="show-m-sm tablet_only tx--14 tx--font-light q_flex"
                @click="toggleLayout"
              >
                <g-image src="~/assets/image/place.svg" alt="place"></g-image>
                <span class="tx--font-light">Show Map</span>
              </a>
            </div>
            <v-sheet
              class="list-skeleton"
              v-if="
                isLoading &&
                  filteredBuildingsByMap &&
                  filteredBuildingsByMap.length
              "
              :color="`#FFFBF7 ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
            >
              <template v-for="i in filteredBuildingsByMap.length">
                <v-skeleton-loader
                  :key="i"
                  type="image, article, actions"
                ></v-skeleton-loader>
              </template>
            </v-sheet>
            <div
              v-if="
                filteredBuildingsByMap &&
                  filteredBuildingsByMap.length &&
                  !isLoading
              "
              class="city-main-list"
              ref="cityMainList"
            >
              <template v-for="(building, index) in filteredBuildingsByMap">
                <building-block
                  :id="building.mewsId"
                  :building="building"
                  :key="building.mewsId"
                  @onBuildingHover="onBuildingHover"
                />


                <!-- If city is Lisbon show flexible cancellation otherwise show price banner -->
                <div class="banner-price-wrap" v-if="index === 1 && page.cancellationPolicy &&filterBy.citySelected && filterBy.citySelected.name === 'Lisbon'">
                  <banner-text
                    :banner="page.cancellationPolicy"
                    class="minimum-stay-cancellation"
                  />
                </div>

                <banner-price
                  v-if="index === 1 && page.stayMorePayLess &&filterBy.citySelected && filterBy.citySelected.name !== 'Lisbon'"
                  :key="index"
                  :banner="page.stayMorePayLess"
                />
              </template>
            </div>
            <div
              class="no-results-wrap q_flex flex--column flex--base"
              v-show="
                !filteredBuildingsByMap ||
                  (!filteredBuildingsByMap.length && !isLoading)
              "
            >
              <div class="ohh-title q_flex">
                <g-image src="~/assets/image/ohh.png" alt="place"></g-image>
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
        </div>
      </div>
      <!--end city-main -->
    </section>
    <section
      ref="getToKnowCitySection"
      class="city-page-bottom sec--pad over--hide"
      :class="isListLayout ? '' : 'hide-me'"
    >
      <div class="layout layout-100">
        <div ref="getToKnowCity">
          <get-to-know-city :page="page" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BuildingBlock from "./modules/BuildingBlock.vue";
import BuildingBlockMap from "./modules/BuildingBlockMap.vue";
import GetToKnowCity from "./modules/GetToKnowCity.vue";
import BannerPrice from "../commons/BannerPrice.vue";
import BannerText from "../commons/BannerText.vue";
import Map from "../commons/Map.vue";
import { mapGetters } from "vuex";
import dayjs from "dayjs";
import { EventBus } from "@/event-bus";

export default {
  components: {
    GetToKnowCity,
    BuildingBlock,
    BuildingBlockMap,
    BannerPrice,
    BannerText,
    Map,
  },
  name: "CityPage",
  props: {
    page: {
      type: Object,
      require: true,
    },
  },
  computed: {
    ...mapGetters(["currency", "filterBy"]),
    cities() {
      return this.$static.cities.edges.map((city) => {
        return {
          mewsId: city.node.mewsId,
          slug: city.node.slug,
          buildings: city.node.buildings,
          name: city.node.title,
        };
      });
    },
    filteredBuildings() {
      const set = this.copyBuildings ? this.copyBuildings : this.page.buildings;
      let filteredBuildings = this.$store.getters.filteredBuildings(set);
      const existedBuildings = filteredBuildings.filter((b) => b.exists);
      if (!existedBuildings || !existedBuildings.length) {
        this.locationMarkers = [];
        return null;
      }
      const sortedBuildings = this.sortBuildings(existedBuildings);
      this.copyBuildings = filteredBuildings;
      return sortedBuildings;
    },
    filteredBuildingsByMap() {
      if (!this.buildingsByMap || !this.buildingsByMap.length)
        return this.filteredBuildings;
      let buildings = [];
      this.buildingsByMap.forEach((bm) => {
        this.filteredBuildings.forEach((b) => {
          if (
            bm.position.lat == b.buildingLocation.lat &&
            bm.position.lng == b.buildingLocation.lon
          ) {
            buildings.push(b);
          }
        });
      });
      return buildings;
    },
    sortSelected() {
      return this.$store.getters.sortSelected;
    },
    selectedBuilding() {
      if (
        !this.filteredBuildings ||
        !this.filteredBuildings.length ||
        !this.locationMarkers ||
        !this.locationMarkers.length
      )
        return null;
      if (!this.selectedMarker)
        this.selectedMarker = this.locationMarkers[0].position;
      const index = this.filteredBuildings.findIndex(
        (b) =>
          b.buildingLocation.lat === this.selectedMarker.lat &&
          b.buildingLocation.lon === this.selectedMarker.lng
      );
      if (index === -1) return this.filteredBuildings[0];
      else return this.filteredBuildings[index];
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    citySelected() {
      const citySelected = this.$store.getters.filterBy.citySelected;
      if (!this.cities || !citySelected || !citySelected.mewsId) return "City";
      const find = this.cities.find(
        (city) => citySelected.mewsId === city.mewsId
      );
      if (find) return find.name;
      else return "City";
    },
    dateSelected() {
      const date = this.$store.getters.filterBy.date;
      if (!date.startDate || !date.endDate) return "Select dates";
      return (
        dayjs(date.startDate).format("MMM DD") +
        " - " +
        dayjs(date.endDate).format("MMM DD")
      );
    },
    guestSelected() {
      const adultCount = this.$store.getters.filterBy.adultCount;
      const childCount = this.$store.getters.filterBy.childCount;
      if (!adultCount && !childCount) return "Who's coming?";
      return adultCount + childCount + " Guests";
    },
  },
  data() {
    return {
      copyBuildings: null,
      isListLayout: true,
      sort: this.$store.getters.sortOptions,
      locationMarkers: [],
      selectedMarker: null,
      buildingsByMap: null,
      polygons: [],
    };
  },
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  methods: {
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
    onSort(ev) {
      this.$store.commit("setSortSelected", ev);
    },
    toggleLayout() {
      this.isListLayout = !this.isListLayout;
      if (!this.isListLayout) {
        document.body.classList.add("over--hide-m");
      } else {
        document.body.classList.remove("over--hide-m");
      }
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 500);
    },
    onGetToKnow() {
      const element = this.$refs.getToKnowCity;
      const viewportOffset = element.getBoundingClientRect();
      const top = viewportOffset.top - 76;
      window.scrollTo({ top, left: 0, behavior: "smooth" });
    },
    changeSelectedMarker(pos) {
      this.selectedMarker = pos;
      const neighborhoodIndex = this.page.buildings.findIndex(
        (b) =>
          b.buildingLocation.lat === pos.lat &&
          b.buildingLocation.lon === pos.lng
      );
      if (neighborhoodIndex !== -1) {
        EventBus.$emit("onNeighborhood", {
          index: neighborhoodIndex,
          isCenter: false,
        });
      }
      const index = this.filteredBuildings.findIndex(
        (b) =>
          b.buildingLocation.lat === pos.lat &&
          b.buildingLocation.lon === pos.lng
      );
      if (index !== -1 && this.isListLayout) {
        const id = this.filteredBuildings[index].mewsId;
        const element = document.getElementById(id);
        const top = element.offsetTop + 76;
        window.scrollTo({ top, left: 0, behavior: "smooth" });
      }
    },
    sortBuildings(buildingsToEdit) {
      const buildings = buildingsToEdit.map((building) => {
        let sorted = building.apartments.sort((a, b) =>
          parseInt(a.minPrice) > parseInt(b.minPrice) ? 1 : -1
        );
        return { ...building, apartments: sorted };
      });
      if (this.sortSelected === "priceHightToLow") {
        return buildings.sort((a, b) =>
          parseInt(a.apartments[0].minPrice) <
          parseInt(b.apartments[0].minPrice)
            ? 1
            : -1
        );
      } else {
        return buildings.sort((a, b) =>
          parseInt(a.apartments[0].minPrice) >
          parseInt(b.apartments[0].minPrice)
            ? 1
            : -1
        );
      }
    },
    handleShowMap() {
      const elementShowMap = this.$refs.showMap;
      const elementShowMapCalc = this.$refs.showMapCalc;
      const rectShowMap = elementShowMapCalc.getBoundingClientRect();
      const element = this.$refs.getToKnowCitySection;
      const rectElement = element.getBoundingClientRect();
      const count = rectShowMap.top + rectShowMap.height;
      if (rectElement.top <= count) {
        elementShowMap.classList.add("display-none");
      } else {
        elementShowMap.classList.remove("display-none");
      }
    },
    setMobilePopUp(val) {
      this.$store.commit("setMobilePopUp", true);
      this.$store.commit("setCurrentMobilePopUp", val);
    },
    clearFilter() {
      this.$store.commit("clearFilterBy", true);
    },
    onSearchArea() {
      this.$refs.mapSection.$refs.mapRef.$mapPromise.then((map) => {
        const bounds = map.getBounds();
        this.buildingsByMap = [];
        this.locationMarkers.forEach((m) => {
          if (
            bounds.contains(
              new google.maps.LatLng(m.position.lat, m.position.lng)
            )
          ) {
            this.buildingsByMap.push(m);
          }
        });
      });
      indow.scrollTo(0, 0);
    },
    onCenter() {
      this.$refs.mapSection.$refs.mapRef.$mapPromise.then((map) => {
        map.setCenter(this.locationMarkers[0].position);
        map.setZoom(13);
      });
    },
    onBuildingHover(buildingLocation) {
      const neighborhoodIndex = this.page.buildings.findIndex(
        (b) =>
          b.buildingLocation.lat === buildingLocation.lat &&
          b.buildingLocation.lon === buildingLocation.lon
      );
      if (neighborhoodIndex !== -1) {
        EventBus.$emit("onNeighborhood", {
          index: neighborhoodIndex,
          isCenter: false,
        });
      }
      const tmp = this.locationMarkers.map((marker) => {
        if (
          marker.position.lat === buildingLocation.lat &&
          marker.position.lng === buildingLocation.lon
        ) {
          marker.icon.url = "https://i.postimg.cc/VL5Jvj2t/Union.png";
          marker.label.color = "white";
        } else {
          marker.icon.url = "https://i.postimg.cc/Bbd4hspQ/union.png";
          marker.label.color = "black";
        }
        return { ...marker };
      });

      this.locationMarkers = JSON.parse(JSON.stringify(tmp));
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    window.addEventListener("scroll", this.handleShowMap);
    const city = this.cities.find((city) => city.slug === this.page.slug);
    if (!city) return;
    this.$store.dispatch("setFilterBy", {
      isBtn: true,
      setFilterBy: {
        type: "citySelected",
        value: city,
      },
      isInit: true,
    });

    if (!this.filteredBuildings || !this.filteredBuildings.length) {
      this.locationMarkers = [];
      return;
    }

    this.filteredBuildings.forEach((building, i) => {
      const tmp = {
        lat: building.buildingLocation.lat,
        lng: building.buildingLocation.lon,
      };
      this.locationMarkers.push({
        position: tmp,
        icon: {
          url:
            // !i
            //   ?
            // "https://i.postimg.cc/VL5Jvj2t/Union.png",
            // :
            "https://i.postimg.cc/Bbd4hspQ/union.png",
          scaledSize: { width: 80, height: 56 },
          labelOrigin: { x: 40, y: 20 },
        },
        label: {
          text: this.currency.currencySymbol + building.apartments[0].minPrice,
          color: "black",
          fontSize: "15px",
          fontWeight: "bold",
        },
      });
    });
    // this.selectedMarker = this.locationMarkers[0].position;
    this.page.neighborhoods.forEach((n) => {
      if (n.polygon && n.polygon.points) this.polygons.push(n.polygon.points);
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleShowMap);
  },
  watch: {
    selectedMarker(val) {
      if (!this.locationMarkers || !this.locationMarkers.length || !val) return;
      const tmp = this.locationMarkers.map((marker) => {
        if (
          marker.position.lat === val.lat &&
          marker.position.lng === val.lng
        ) {
          marker.icon.url = "https://i.postimg.cc/VL5Jvj2t/Union.png";
          marker.label.color = "white";
        } else {
          marker.icon.url = "https://i.postimg.cc/Bbd4hspQ/union.png";
          marker.label.color = "black";
        }
        return { ...marker };
      });
      this.locationMarkers = JSON.parse(JSON.stringify(tmp));
    },
    filteredBuildings(val) {
      if (!val || !val.length) {
        this.locationMarkers = null;
        return;
      }
      let tmp = [];
      val.forEach((building, i) => {
        tmp.push({
          position: {
            lat: building.buildingLocation.lat,
            lng: building.buildingLocation.lon,
          },
          icon: {
            url:
              // !i
              //   ?
              // "https://i.postimg.cc/VL5Jvj2t/Union.png",
              // :
              "https://i.postimg.cc/Bbd4hspQ/union.png",
            scaledSize: { width: 80, height: 56 },
            labelOrigin: { x: 40, y: 20 },
          },
          label: {
            text:
              this.currency.currencySymbol + building.apartments[0].minPrice,
            color: "black",
            // color: !i ? "white" : "black",
            fontSize: "15px",
            fontWeight: "bold",
          },
        });
      });

      this.locationMarkers = JSON.parse(JSON.stringify(tmp));
      // this.selectedMarker = this.locationMarkers[0].position;
    },
  },
};
</script>

<style lang="scss">
.display-none {
  display: none;
}
.show-calc {
  background-color: inherit;
  box-shadow: none;
}
</style>

<static-query>
query Cities {
  cities: allContentfulCity {
    edges {
      node {
        mewsId,
        slug,
        buildings {
          mewsId
        }, 
        title
      }
    }
  }
}
</static-query>
