<template>
  <div class="hold-filter--check">
    <div v-show="!isSelect" class="mobile_only mobile-flow-head q_flex flex--center">
      <a @click="$store.commit('setCurrentMobilePopUp', 'city')">
        <g-image src="~/assets/image/arrow-check-l.svg" alt="arrow"></g-image>
      </a>
      <div class="tx--22 font--500">Select Dates</div>
    </div>
    <date-range-picker
      :ref="customRef"
      class="head-filter head-filter--check flex flex--start"
      :class="customRef === 'wizardPicker' ? 'mobile-date-picker-wizard' : ''"
      v-model="dateRange"
      :min-date="yesterday"
      :date-format="dateFormat"
      :ranges="ranges"
      :locale-data="localeData"
      :auto-apply="true"
      @change="updateDate"
      :opens="customRef === 'wizardPicker' ? 'inline' : 'center'"
      :single-date-picker="customRef === 'wizardPicker' ? 'range' : false"
    >
      <template #input="picker" style="min-width: 350px;">
        <div v-if="picker.startDate">
          {{ getDate(picker.startDate) }}
          <g-image src="~/assets/image/arrow-check.svg" alt="arrow"></g-image>
          {{ getDate(picker.endDate) }}
        </div>
        <div v-if="!picker.startDate">
          Check-in
          <g-image src="~/assets/image/arrow-check.svg" alt="arrow"></g-image>
          Check-out
        </div>
      </template>

      <div class="ranges">
          <ul>
            <li
              v-for="(range, name) in ranges.ranges"
              :key="name"
              :class="selectedRange === name ? 'active--range' : ''"
            >
              <b>{{ name }}</b>
            </li>
          </ul>
      </div>

      <!-- <template #ranges="ranges">
        <div class="ranges">
          <ul>
            <li
              v-for="(range, name) in ranges.ranges"
              :key="name"
              @click.stop="
                ranges.clickRange(range);
                selectedRange = name;
              "
              :class="selectedRange === name ? 'active--range' : ''"
            >
              <b>{{ name }}</b>
            </li>
          </ul>
        </div>
      </template> -->

      <div
        slot="footer"
        class="slot"
        :items="duration"
        @change="updateDate"
        
      >
      <div class="footer-ranges">
        <ul>
          <li class="text-black" :class="durationDays > 1 ? 'duration-img' : ''">{{ (filterBy.citySelected && filterBy.citySelected.slug === 'lisbon') && durationDays < 30 ? 'Minimum stay 1 month' : duration }}</li>
        </ul>
      </div>
        <!-- <button class="ranges" @click="onToday">Today</button> -->
        <button :class="dateRange.endDate ? '' : 'disabled'" @click="onClear">
          Clear
        </button>
      </div>
    </date-range-picker>
    <!-- <a @click.stop="openPicker">click</a> -->
    <div v-show="!isSelect" class="mobile_only mobile-flow-footer bg--light q_flex">
      <a class="tx--16 block tx--font" @click="onClear">Clear</a>
      <button
        class="bt-primary"
        @click="$store.commit('setCurrentMobilePopUp', 'guest')"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import { mapGetters } from "vuex";

export default {
  name: "DatePickerFilter",
  components: { DateRangePicker },
  props: {
    isBtn: {
      type: Boolean,
      default: false,
    },
    isTogglePicker: {
      type: Boolean,
      default: false,
    },
    isSelect: {
      type: Boolean,
      default: true,
    },
    customRef: {
      type: String,
      default: "picker",
    },
  },
  data() {
    let today = new Date();
    let week = new Date();
    week.setDate(today.getDate() + 7);
    let twoWeeks = new Date();
    twoWeeks.setDate(today.getDate() + 14);

    return {
      // isAutoApply: true,
      selectedRange: null,
      dateRange: { startDate: null, endDate: null },
      ranges: {
        // "today": [today, today],
        // "±7 day": [today, week],
        // "±14 day": [today, twoWeeks],
      },
      localeData: {
        direction: "ltr",
        format: "mm/dd/yyyy",
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      duration: 'Duration',
      durationDays: 0,
    };
  },
  computed: {
    yesterday() {
      return dayjs().add(-1, 'day').$d
    },
    ...mapGetters(["selectedDuration", "filterBy"]),
  },
  filters: {
    dateCell(value) {
      let dt = new Date(value);

      return dt.getDate();
    },
  },
  // computed: {
  //   isAutoApply() {
  //     return true;
  //   }
  // },
  watch: {
    dateRange: {
      handler: function(val, oldVal) {
        if (
          !val.endDate ||
          !val.startDate ||
          (val.endDate === oldVal.endDate && val.startDate === oldVal.startDate)
        ) {
          this.selectedRange = null;
          return;
        } else {
          const oneDay = 24 * 60 * 60 * 1000;
          const days = (val.endDate - val.startDate) / oneDay;
          if (days === 1) this.selectedRange = "today";
          // else if (days === 7) this.selectedRange = "±7 day";
          // else if (days === 14) this.selectedRange = "±14 day";
          else this.selectedRange = null;
          this.updateDate();
          // call the method that will update duration & show days
          this.getDuration();
        }
      },
      deep: true,
    },
    isTogglePicker(val) {
      if (!val || !this.isSelect) return;
      this.openPicker();
    },
    '$store.getters.filterBy.date'(val) {
      if (process.isClient && val && this.dateRange.startDate !== val.startDate) {
        this.dateRange = { startDate: val.startDate, endDate: val.endDate }
      } else if(process.isClient && !val) {
        this.dateRange = { startDate: null, endDate: null };
      }
    }
  },
  methods: {
    getDate(val) {
      if(this.customRef === 'homePagePicker') {
        return (
          dayjs(val)
            .format("ddd, MMM DD")
        );
      }
      return (
        dayjs(val)
            .format("MMM DD")
      )
    },
    getDuration() {
      // If no dates have been officially selected save them as a user hovers over dates
      let date1 = '', date2 = ''
      // If mobile datepicker
      if (this.customRef === "wizardPicker") {
        date1 = new Date(this.$refs.wizardPicker.end); 
        date2 = new Date(this.$refs.wizardPicker.start);
      } else if(this.$refs.homePagePicker) {
        date1 = new Date(this.$refs.homePagePicker.end); 
        date2 = new Date(this.$refs.homePagePicker.start);
      } else if(this.customRef === 'checkoutPicker') {
        date1 = new Date(this.$refs.checkoutPicker.end); 
        date2 = new Date(this.$refs.checkoutPicker.start);
      } else {
        date1 = new Date(this.$refs.picker.end); 
        date2 = new Date(this.$refs.picker.start);
      }

      // Make total number of days
      const difference = date1.getTime() - date2.getTime();
      const totalDays = Math.round(difference / (1000 * 3600 * 24)); 
      
      // Save number of days so it can be checked in CityFilter
      this.durationDays = totalDays;

      // Display duration in years, months & days
      const years = Math.floor(difference / 3.154e+10);
      const differenceMinusYears = difference - (years * 3.154e+10);
      const months = Math.floor(difference / 2.628e+9) % 12;
      const differenceMinusMonths = differenceMinusYears - (months * 2.628e+9);
      const days = Math.floor(differenceMinusMonths / 8.64e+7);

      // Calculate duration in years, months & days and display as a string n footer of datepicker
      if(totalDays > 0) {
        const yearStr = years === 1 ? years+' year ' : years > 1 ? years+' years ' : '' ;
        const monthStr = months === 1 ? months+' month ' : months > 1 ? months+' months ' : '' ;
        const dayStr = days === 1 ? days+' day ' : days > 1 ? days+' days ' : '' ;

        return this.duration = yearStr + monthStr + dayStr;
      } else {
        return this.duration = 'Duration';
      }

    },
    async updateDate() {
      const formatStart = dayjs(this.dateRange.startDate).format("YYYY-MM-DD");
      const formatEnd = dayjs(this.dateRange.endDate).format("YYYY-MM-DD");
      if(formatStart === formatEnd ) {
        const addDay = dayjs(formatStart, "YYYY-MM-DD").add(1, 'days').format("YYYY-MM-DD");
        this.dateRange.endDate = new Date(addDay);
      }
      let set = {
        isBtn: this.isBtn,
        setFilterBy: {
          type: "date",
          value: this.dateRange,
        },
      }
      if(this.$store.getters.filterBy.date.startDate ===  this.dateRange.startDate && 
        this.$store.getters.filterBy.date.endDate ===  this.dateRange.endDate) return;
      if(this.customRef === 'checkoutPicker') set.type = 'checkoutDate';
      await this.$store.dispatch("setFilterBy", set);
      if(!this.isBtn) {
        const query = this.$store.getters.getQueryString;
        history.pushState(
        {},
        null,
        `${this.$route.path}?${query}`
        );
      }
      this.$store.commit("setSelectedDuration", this.durationDays);
      this.$store.commit("setDurationString", this.duration);
    },
    async onClear() {
      this.dateRange = { startDate: null, endDate: null };
      this.durationDays = 0;
      this.duration = 'Duration';
      this.$store.commit("setSelectedDuration", this.durationDays);
      this.$store.commit("setDurationString", '');
      await this.$store.dispatch("setFilterBy", {
        isBtn: this.isBtn,
        setFilterBy: {
          type: "date",
          value: this.dateRange,
        },
      });
      if(!this.isBtn) {
        const query = this.$store.getters.getQueryString;
        history.pushState(
        {},
        null,
        `${this.$route.path}?${query}`
        );
      }
    },
    dateFormat(classes, date) {
      if (!classes.disabled) {
        classes.disabled = date.getTime() < new Date() + 1;
      }
      return classes;
    },
    openPicker() {
      this.$refs.checkoutPicker.togglePicker(true);
    },
    onToday() {
      this.isAutoApply = false;
      // this.dateRange.startDate = new Date();
      this.dateRange = { startDate: new Date(), endDate: new Date() };
      this.isAutoApply = true;
    }
  },
  mounted() {
    // if (this.customRef === "wizardPicker") {
    //   this.$refs.wizardPicker.togglePicker(true);
    // }
    // this.dateRange = this.$store.getters.filterBy.date;
    if(this.$route.query && this.$route.query.start_date && this.$route.query.end_date) {
      this.dateRange = { startDate: this.$route.query.start_date, endDate: this.$route.query.end_date };
      if(this.$store.getters.filterBy.date.startDate !== this.$route.query.start_date || 
        this.$store.getters.filterBy.date.endDate !== this.$route.query.end_date
      ) {
        this.$store.dispatch("setFilterBy", {
          isBtn: true,
          setFilterBy: {
            type: "date",
            value: this.dateRange,
          },
          isInit: true
        });
      }
    }
  },
};
</script>

<style lang="scss">

.active--range {
  background-color: black;
  color: white;
}

.mobile-date-picker-wizard {
  .daterangepicker .drp-calendar {
    width: 100% !important; 
  }

  .daterangepicker {
    box-shadow: none !important;
    border: none !important;
  }
}
</style>>
</style>