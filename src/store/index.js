import Vue from "vue";
import Vuex from "vuex";
import { buildingStore } from "./building.js";
import { pageStore } from "./page.js";
import { optionsStore } from "./options.js";
import { cityStore } from "./city.js";
import { filterStore } from "./filter.js";

import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseDomain: "https://staykula.com"
  },
  getters: {
    toHtml: (state) => (doc) => {
      return documentToHtmlString(doc);
    },
    baseDomain(state) {
      return state.baseDomain;
    }
  },
  actions: {
    tagManagerEvent({ state }, payload) {
      // console.log(payload);
      if (typeof window !== "undefined") {
        window.dataLayer.push({
          event: payload.type,
          eventObj: payload.value,
        });
      }
    },
  },
  modules: {
    buildingStore,
    cityStore,
    pageStore,
    optionsStore,
    filterStore,
  },
});
