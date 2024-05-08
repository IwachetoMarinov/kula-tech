import axios from "axios";

export const buildingStore = {
  state: {
    buildings: [],
    building: null,
  },
  getters: {
    buildings(state) {
      return state.buildings;
    },
  },
  mutations: {
    setBuildings(state, payload) {
      state.buildings = payload.buildings;
    },
    setBuilding(state, payload) {
      state.building = payload.building;
    },
  },
  actions: {
    async getBuildings({ commit }, payload) {
      try {
        const response = await axios.get(
          "/.netlify/functions/server/building/"
        );
        commit({ type: "setBuildings", response });
      } catch (err) {
        console.log(err);
      }
    },

    async getBuilding({ commit }, { buildingId }) {
      try {
        const response = await axios.get(
          `/.netlify/functions/server/building/${buildingId}`
        );
        commit({ type: "setBuilding", response });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
