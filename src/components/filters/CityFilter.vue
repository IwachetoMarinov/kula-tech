<template>
  <div class="head-filter head-filter--city flex flex--start">
    <v-select
      ref="classclass"
      v-if="isSelect && cities"
      :items="cities"
      :attach="attach"
      item-text="text"
      item-value="value"
      v-model="citySelected"
      @change="filterCity"
      solo
      autocomplete
      placeholder="City"
      :menu-props="{ top: false, offsetY: true }"
    >
      <template slot="item" slot-scope="data">
        <!-- If Dates selected are less than 30 days then disable Lisbon as an option -->
        <div v-if="filterBy.date.startDate && data.item.text === 'Lisbon' && selectedDuration < 30" class="location-disabled">
          <h4>{{ data.item.text }}</h4>
          <p>Stays over 30+ days only</p>
        </div>

        <div v-else>
          <h4>{{ data.item.text }}</h4>
          <p>{{ data.item.neighborhoods }}</p>
        </div>
      </template>
    </v-select>

    <div v-if="!isSelect">
      <div class="q_flex mobile-flow-search">
        <v-text-field
          placeholder="Select destination"
          v-model="search"
        ></v-text-field>
        <a
          class="tx--16 tx--font"
          @click="$store.commit('setMobilePopUp', false)"
          >Cancel</a
        >
      </div>
      <div class="hold-mm-results">
        <template v-if="citiesBySearch && citiesBySearch.length">
          <div
            v-for="city in citiesBySearch"
            :key="city.value"
            class="mm-result-row q_flex flex--start"
            @click="popUpFilter(city)"
          >
            <div class="img-cover relative">
              <g-image
                :src="city.image.file.url + '?fm=webp&w=200'"
                :alt="city.image.title"
              />
            </div>
            <div class="is--fit">
              <div class="q_title">{{ city.text }}</div>
              <div class="tx--14 tx--font-light">{{ city.neighborhoods }}</div>
            </div>
          </div>
        </template>
        <div
          v-show="!citiesBySearch || !citiesBySearch.length"
          class="no-results-wrap q_flex flex--column flex--base"
        >
          <div class="ohh-title q_flex">
            <g-image src="~/assets/image/ohh.png" alt="ohh"></g-image>
            <h2 class="q_title">Oops!</h2>
          </div>
          <div class="text tx--16">
            We couldn’t find what you were looking for.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CityFilter",
  props: {
    isBtn: {
      type: Boolean,
      default: false,
    },
    isSelect: {
      type: Boolean,
      default: true,
    },
    attach: {
      type: String,
    },
  },
  computed: {
    ...mapGetters(["filterBy", "selectedDuration"]),
    cities() {
      if (
        !this.$static.cities ||
        !this.$static.cities.edges ||
        !this.$static.cities.edges.length
      )
        return [];
      return this.$static.cities.edges.map((city) => {
        return {
          text: city.node.title,
          value: city.node.mewsId,
          neighborhoods: city.node.neighborhoods.length + " neighborhoods",
          slug: city.node.slug,
          buildings: city.node.buildings,
          image: city.node.image,
        };
      });
    },
    citiesBySearch() {
      if (!this.search) return this.cities;
      return this.cities.filter((city) =>
        city.text.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  data() {
    return {
      citySelected: null,
      search: null,
      isDateAboveRange: true,
    };
  },
  watch: {
    "$store.getters.filterBy.citySelected"(val) {
      if (process.isClient && val) {
        if (
          !this.citySelected ||
          (this.citySelected && val && this.citySelected.mewsId !== val.mewsId)
        ) {
          this.citySelected = val.mewsId;
        }
      } else if (process.isClient && !val) {
        this.citySelected = val;
      }
    },
  },
  methods: {
    async filterCity() {
      const city = this.cities.find((city) => city.value === this.citySelected);
      const prevCity = this.$store.getters.filterBy.citySelected;
      if (
        !city ||
        (this.citySelected &&
          prevCity &&
          this.citySelected.mewsId === prevCity.mewsId)
      )
        return;
      this.$store.dispatch("setFilterBy", {
        isBtn: this.isBtn,
        setFilterBy: {
          type: "citySelected",
          value: {
            mewsId: city.value,
            slug: city.slug,
            buildings: city.buildings,
          },
        },
      });
      if (this.$route.path.includes("/city/")) {
        this.$store.dispatch("tagManagerEvent", {
          type: "FilterClicked",
          value: {
            filter: "citySelected",
            previousValue: this.$store.getters.filterBy.citySelected.slug,
            value: city.slug,
          },
        });
      }
      if (!this.isBtn) {
        const query = this.$store.getters.getQuery;
        this.$router.push({ path: "/city/" + city.slug, query });
      }
    },
    async popUpFilter(city) {
      if (this.isBtn) {
        await this.$store.dispatch("setFilterBy", {
          isBtn: this.isBtn,
          setFilterBy: {
            type: "citySelected",
            value: {
              mewsId: city.value,
              slug: city.slug,
              buildings: city.buildings,
            },
          },
        });
        this.$store.commit("setCurrentMobilePopUp", "date");
      } else {
        const query = this.$store.getters.getQuery;
        this.$router.push({ path: "/city/" + city.slug, query });
      }
    },
  },
  mounted() {
    if (!this.$store.getters.filterBy.citySelected) return;
    this.citySelected = this.$store.getters.filterBy.citySelected.mewsId;
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
        slug,
        image {
          title,
          file {
            url
          }
        },
        neighborhoods {
          name
        },
        buildings {
          mewsId
        }
      }
    }
  }
}
</static-query>
