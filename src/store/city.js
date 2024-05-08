import axios from "axios";

export const cityStore = {
  state: {
    cities: [],
    city: null,
  },
  getters: {
    cities(state) {
      return state.cities;
    },
  },
  mutations: {
    setCities(state, payload) {
      state.cities = payload.cities;
    },
    setCity(state, payload) {
      state.city = payload.city;
    },
  },
  actions: {
    async getCities({ commit }, payload) {
      try {
        const response = await axios.get(
          "/.netlify/functions/server/city/"
        );
        commit({ type: "setCities", response });
      } catch (err) {
        console.log(err);
      }
    },

    async getCity({ commit }, { citySlug }) {
      try {
        const response = await axios.get(
          `/.netlify/functions/server/city/${citySlug}`
        );
        commit({ type: "setCity", response });
      } catch (err) {
        console.log(err);
      }
    },
  },
};