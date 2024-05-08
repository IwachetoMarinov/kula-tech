<template>
  <div class="hold-guest-bt">
    <!-- open-on-hover -->
    <v-menu
      v-if="isSelect"
      :attach="attach"
      bottom
      :top="false"
      :offsetY="true"
      :close-on-content-click="false"
      solo
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="isSelect" class="guest-bt" v-bind="attrs" v-on="on" @click="$emit('onToggleDate')">
          <g-image src="~/assets/image/filter-room.svg" alt="filter"></g-image>
          {{ adultCount + childCount }} Guests
        </v-btn>
      </template>

      <v-list class="v-list-guest">
        <v-list-item id="guest-list" class="flex guest-row">
          <div>
            <h3>Adults</h3>
            <!-- <p>Ages 13 or above</p> -->
          </div>
          <div class="flex">
            <button @click.stop="handleGuestsCount(false, 'adultCount')">
              <span class="q_flex flex--center"
                ><g-image src="~/assets/image/ic-minus.svg" alt="minus"
              /></span>
            </button>
            <div>{{ adultCount }}</div>
            <button @click.stop="handleGuestsCount(true, 'adultCount')">
              <span class="q_flex flex--center"
                ><g-image src="~/assets/image/ic-plus.svg" alt="plus"
              /></span>
            </button>
          </div>
        </v-list-item>
        <v-list-item class="flex guest-row">
          <div>
            <h3>Children</h3>
            <p>Ages 0-18</p>
          </div>
          <div class="flex">
            <button @click.stop="handleGuestsCount(false, 'childCount')">
              <span class="q_flex flex--center"
                ><g-image src="~/assets/image/ic-minus.svg" alt="minus"
              /></span>
            </button>
            <div>{{ childCount }}</div>
            <button @click.stop="handleGuestsCount(true, 'childCount')">
              <span class="q_flex flex--center"
                ><g-image src="~/assets/image/ic-plus.svg" alt="plus"
              /></span>
            </button>
          </div>
        </v-list-item>
      </v-list>
    </v-menu>

    <div v-if="!isSelect" class="mobile-flow mobile-flow-gus-wrap">
      <div class="mobile-flow-head q_flex flex--center">
        <a @click="$store.commit('setCurrentMobilePopUp', 'date')">
          <g-image src="~/assets/image/arrow-check-l.svg" alt="arrow"></g-image>
        </a>
        <div class="tx--22 font--500">Who's coming?</div>
      </div>
      <div class="mobile-flow-gus">
        <div class="mobile-flow-gus-input q_flex mb--22">
          <div class="q_flex is--fit flex--start">
            <g-image src="~/assets/image/filter-room.svg" alt="filter" />
            <div class="tx--16">Adults</div>
          </div>
          <div class="flex">
            <button @click.stop="handleGuestsCount(false, 'adultCount')">
              <span class="q_flex flex--center"
                ><g-image src="~/assets/image/ic-minus.svg" alt="minus"
              /></span>
            </button>
            <div class="tx--22">{{ adultCount }}</div>
            <button @click.stop="handleGuestsCount(true, 'adultCount')">
              <span class="q_flex flex--center"
                ><g-image src="~/assets/image/ic-plus.svg" alt="plus"
              /></span>
            </button>
          </div>
        </div>

        <div class="mobile-flow-gus-input q_flex">
          <div class="q_flex is--fit flex--start">
            <g-image src="~/assets/image/baby.svg" alt="baby" />
            <div class="tx--16">Children</div>
          </div>
          <div class="flex">
            <button @click.stop="handleGuestsCount(false, 'childCount')">
              <span class="q_flex flex--center"
                ><g-image src="~/assets/image/ic-minus.svg" alt="minus"
              /></span>
            </button>
            <div class="tx--22">{{ childCount }}</div>
            <button @click.stop="handleGuestsCount(true, 'childCount')">
              <span class="q_flex flex--center"
                ><g-image src="~/assets/image/ic-plus.svg" alt="plus"
              /></span>
            </button>
          </div>
        </div>
        <div class="note mb--15">Ages 0-18</div>
      </div>
      <div class="mobile-flow-footer bg--light q_flex">
        <a class="tx--16 block tx--font" @click="onClear">Clear</a>
        <button
          class="bt-primary"
          :class="{ 'is-active': isLoading }"
          @click="onSearch"
        >
          Search
          <span class="loader"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuestFilter",
  props: {
    isBtn: {
      type: Boolean,
      default: false,
    },
    isSelect: {
      type: Boolean,
      default: true,
    },
    isCheckout: {
      type: Boolean,
      default: false,
    },
    attach: {
      type: String,
    },
  },
  data() {
    return {
      adultCount: 1,
      childCount: 0,
      isLoading: false,
    };
  },
  watch: {
    "$store.getters.filterBy.adultCount"(val) {
      if (process.isClient && val) {
        this.adultCount = val;
      } else if (process.isClient && !val) {
        this.adultCount = 1;
      }
    },
    "$store.getters.filterBy.childCount"(val) {
      if (process.isClient && val) {
        this.childCount = val;
      } else if (process.isClient && !val) {
        this.childCount = 0;
      }
    },
  },
  methods: {
    async handleGuestsCount(operator, type) {
      if (operator && this[type] < 100) {
        this[type]++;
      } else {
        if (type === "adultCount" && this.adultCount > 1) this.adultCount--;
        else if (type === "childCount" && this.childCount > 0)
          this.childCount--;
      }

      let set = {
        isBtn: this.isBtn,
        setFilterBy: {
          type,
          value: this[type],
        },
      };
      if (this.isCheckout) set.type = "checkoutGuest";

      await this.$store.dispatch("setFilterBy", set);
      if (!this.isBtn) {
        const query = this.$store.getters.getQueryString;
        history.pushState({}, null, `${this.$route.path}?${query}`);
      }
    },
    async onSearch() {
      this.isLoading = true;
      const filterBy = this.$store.getters.filterBy;
      const query = this.$store.getters.getQuery;
      let def = filterBy.adultCount + filterBy.childCount;
      if (filterBy.date.startDate && filterBy.date.endDate && def) {
        const query = this.$store.getters.getQueryString;
        history.pushState({}, null, `${this.$route.path}?${query}`);
        await this.$store.dispatch("getAvailability");
      }
      if (
        filterBy.citySelected.slug !== this.$route.params.slug &&
        !this.$route.path.includes("building")
      ) {
        this.$router.push({
          path: "/city/" + filterBy.citySelected.slug,
          query,
        });
      }
      this.$store.commit("setMobilePopUp", false);
      this.$store.commit("setCurrentMobilePopUp", null);
      this.isLoading = false;
    },
    async onClear() {
      await this.$store.dispatch("setFilterBy", {
        isBtn: false,
        setFilterBy: {
          type: "adultCount",
          value: 1,
        },
      });
      this.adultCount = 1;
      await this.$store.dispatch("setFilterBy", {
        isBtn: false,
        setFilterBy: {
          type: "childCount",
          value: 0,
        },
      });
      this.childCount = 0;
      if (!this.isBtn) {
        const query = this.$store.getters.getQueryString;
        history.pushState({}, null, `${this.$route.path}?${query}`);
      }
    },
  },
  mounted() {
    if (this.$route.query && this.$route.query.adult_count) {
      this.adultCount = parseInt(this.$route.query.adult_count);
      if (
        this.$store.getters.filterBy.adultCount !==
        this.$route.query.adult_count
      ) {
        this.$store.dispatch("setFilterBy", {
          isBtn: true,
          setFilterBy: {
            type: "adultCount",
            value: this.adultCount,
          },
        });
      }
    } else {
      this.adultCount = 1;
    }

    if (this.$route.query && this.$route.query.child_count) {
      this.childCount = parseInt(this.$route.query.child_count);
      if (
        this.$store.getters.filterBy.childCount !==
        this.$route.query.child_count
      ) {
        this.$store.dispatch("setFilterBy", {
          isBtn: true,
          setFilterBy: {
            type: "childCount",
            value: this.childCount,
          },
          isInit: true,
        });
      }
    } else {
      this.childCount = 0;
    }
    // this.adultCount = this.$store.getters.filterBy.adultCount;
    // this.childCount = this.$store.getters.filterBy.childCount;
  },
  beforeDestroy() {
    // window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
