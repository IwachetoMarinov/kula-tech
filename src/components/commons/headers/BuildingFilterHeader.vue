<template>
  <header id="headerSticky" class="head-build">
    <div class="flex layout layout-100">
      <g-link to="/" class="logo">
        <g-image
          src="~/assets/image/logo.svg"
          :immediate="true"
          alt="Kula"
        ></g-image>
      </g-link>
      <div
        v-show="!isCheckout"
        class="hold-head-search no_mobile"
        :class="isFilter ? 'active' : ''"
      >
        <a
          class="no_mobile head-discover q_flex"
          v-show="!isFilter && !isSelectFilter"
          @click.stop="isFilter = true"
        >
          Discover your stay
          <g-image
            src="~/assets/image/search.svg"
            :immediate="true"
            alt="search"
          ></g-image>
        </a>
        <div
          v-show="isSelectFilter || isFilter"
          class="head-discover-open border--1 q_flex no_mobile building-layout-container"
          v-click-outside="onClickOutside"
        >
          <city-filter :isBtn="true" :attach="'.building-layout-container'" />
          <search-bar-date-picker-filter :isBtn="true" ref="buildingDate" />
          <guest-filter
            :isBtn="true"
            :attach="'.building-layout-container'"
            @onToggleDate="onToggleDate"
          />
          <button
            @click.stop="onSearch"
            class="search-circ q_flex flex--center"
            :class="{ 'active-btn': isSelectFilter, 'is-active': isLoading }"
          >
            <g-image
              src="~/assets/image/search.svg"
              :immediate="true"
              alt="search"
            ></g-image>
            <span class="loader"></span>
          </button>
        </div>
      </div>
      <div class="flex">
        <!-- <a v-show="!isCheckout" class="glob img-b relative" href=""
          ><g-image
            src="~/assets/image/glob.svg"
            :immediate="true"
            alt=""
          ></g-image> -->
        <!-- <translate /> -->
        <!-- <div
            id="google_translate_element"
            class="google_translate_element"
          ></div> -->
        <!-- </a> -->

        <custom-link
          v-if="header"
          :link="header.outsideLink"
          :customClass="'head-bus no_mobile link-border'"
        />
        <v-menu v-if="header" class="no_mobile" open-on-hover bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="menu_bt bt-reset no_mobile">
              <span class="menu_bt_a">
                <span class="menu_bt_in"
                  ><span class="menu_bt_sep"></span
                ></span>
              </span>
            </v-btn>
          </template>

          <v-list class="menu-list">
            <v-list-item v-for="(menuLink, i) in header.menu" :key="i"
              ><custom-link :link="menuLink"
            /></v-list-item>
          </v-list>
        </v-menu>

        <v-btn @click="onDrawer" class="menu_bt bt-reset mobile_only">
          <span class="menu_bt_a">
            <span class="menu_bt_in"><span class="menu_bt_sep"></span></span>
          </span>
        </v-btn>
      </div>
    </div>
  </header>
</template>

<script>
import { stickyHeader } from "../../../utilities/stickyHeader.js";
import { mapState } from "vuex";
import CityFilter from "../../filters/CityFilter.vue";
// import DatePickerFilter from "../../filters/DatePickerFilter.vue";
import SearchBarDatePickerFilter from '../../filters/SearchBarDatePicker.vue';
import GuestFilter from "../../filters/GuestFilter.vue";
import CustomLink from "../../commons/CustomLink.vue";

export default {
  name: "BuildingFilterHeader",
  components: {
    CityFilter,
    // DatePickerFilter,
    SearchBarDatePickerFilter,
    GuestFilter,
    CustomLink,
  },
  props: {
    header: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      isFilter: false,
      isLoading: false,
    };
  },
  computed: {
    ...mapState({
      date: (state) => state.filterStore.filterBy.date,
      filterBy: (state) => state.filterStore.filterBy,
      isCheckout: (state) => state.optionsStore.isCheckout,
    }),
    isSelectFilter() {
      const def = this.filterBy.adultCount + this.filterBy.childCount;
      if (this.filterBy.citySelected || this.date.startDate || def > 1)
        return true;
      return false;
    },
  },
  methods: {
    async onSearch() {
      this.isLoading = true;
      const filterBy = this.$store.getters.filterBy;
      const query = this.$store.getters.getQuery;
      let find = null;
      if (filterBy.citySelected) {
        find = filterBy.citySelected.buildings.find(
          (b) => b.mewsId === filterBy.selectedBuilding
        );
      }
      await this.$store.dispatch("getAvailability");
      this.isLoading = false;
      if (!find) {
        this.$router.push({
          path: "/city/" + filterBy.citySelected.slug,
          query,
        });
      }
    },
    onClickOutside(ev) {
      if (
        this.isSelectFilter ||
        ev.target.innerText.includes("Discover your stay") ||
        (ev.target.offsetParent &&
          ev.target.offsetParent.className.includes(
            "v-list-item theme--light"
          )) ||
        ev.target.id == "guest-list"
      ) {
        this.isFilter = true;
      } else {
        this.isFilter = false;
      }
    },
    onDrawer() {
      this.$store.commit("setIsDrawer", true);
    },
    onToggleDate() {
      this.$refs.buildingDate.$refs.picker.togglePicker(false);
    },
  },
  mounted() {
    window.addEventListener("scroll", stickyHeader);
    this.isFilter = this.date.startDate ? true : false;
  },
  beforeDestroy() {
    window.removeEventListener("scroll", stickyHeader);
  },
};
</script>
