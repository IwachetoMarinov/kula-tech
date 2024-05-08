<template>
  <header class="filterHeader bg--light" ref="filterHeader">
    <div class="layout layout-100">
      <div
        class="filterHeader-in flex flex--start no_mobile city-layout-container"
      >
        <city-filter :isBtn="false" :attach="'.city-layout-container'" />
        <search-bar-date-picker-filter ref="cityDate" />
        <guest-filter
          :attach="'.city-layout-container'"
          @onToggleDate="onToggleDate"
        />
        <price-filter
          :attach="'.city-layout-container'"
          @onToggleDate="onToggleDate"
        />
        <room-types-filter :attach="'.city-layout-container'" />
      </div>

      <div class="mobile_only">
        <div class="m-head-before q_flex flex--center">
          <div @click="setMobilePopUp('city')" class="tx--14">
            {{ citySelected }}
          </div>
          <div @click="setMobilePopUp('date')" class="tx--14">
            {{ dateSelected }}
          </div>
          <div @click="setMobilePopUp('guest')" class="tx--14">
            {{ guestSelected }}
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import dayjs from "dayjs";
// import DatePickerFilter from "../../filters/DatePickerFilter.vue";
import SearchBarDatePickerFilter from "../../filters/SearchBarDatePicker.vue";
import CityFilter from "../../filters/CityFilter.vue";
import PriceFilter from "../../filters/PriceFilter.vue";
import RoomTypesFilter from "../../filters/RoomTypesFilter.vue";
import GuestFilter from "../../filters/GuestFilter.vue";

export default {
  name: "FilterHeader",
  components: {
    // DatePickerFilter,
    SearchBarDatePickerFilter,
    CityFilter,
    PriceFilter,
    RoomTypesFilter,
    GuestFilter,
  },
  data() {
    return {
      isMobileOpen: false,
    };
  },
  computed: {
    cities() {
      return this.$static.cities.edges.map((city) => {
        return {
          name: city.node.title,
          mewsId: city.node.mewsId,
        };
      });
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
        dayjs(date.startDate)
          .format("MMM DD") +
        " - " +
        dayjs(date.endDate)
          .format("MMM DD")
      );
    },
    guestSelected() {
      const adultCount = this.$store.getters.filterBy.adultCount;
      const childCount = this.$store.getters.filterBy.childCount;
      if (!adultCount && !childCount) return "Who's coming?";
      return adultCount + childCount + " Guests";
    },
  },
  methods: {
    handleSticky() {
      const element = this.$refs.filterHeader;
      const top = element.offsetTop;
      if (window.pageYOffset > 150) {
        element.classList.add("header--sticky");
      } else {
        element.classList.remove("header--sticky");
      }
    },
    setMobilePopUp(val) {
      this.$store.commit("setMobilePopUp", true);
      this.$store.commit("setCurrentMobilePopUp", val);
    },
    onToggleDate() {
      this.$refs.cityDate.$refs.picker.togglePicker(false);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleSticky);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleSticky);
  },
};
</script>

<static-query>
query Cities {
  cities: allContentfulCity {
    edges {
      node {
        title,
        mewsId,
      }
    }
  }
}
</static-query>
