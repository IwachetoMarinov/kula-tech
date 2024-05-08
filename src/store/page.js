import axios from "axios";

export const pageStore = {
  state: {
    page: null,
    pagePreview: null
  },
  getters: {},
  mutations: {
    setPage(state, { page }) {
      state.page = page;
    },
    setPagePreview(state, { pagePreview }) {
      state.pagePreview = pagePreview;
    },
  },
  actions: {
    async getPage({ commit }, { pageType }) {
      try {
        const response = await axios.get(
          `/.netlify/functions/server/page/${pageType}`
        );
        commit({ type: "setPage", page: response.data[0] });
      } catch (err) {
        console.log(err);
      }
    },
    async getPagePreview({ commit }, { pageType }) {
      try {
        const response = await axios.get(
          `/.netlify/functions/server/page/preview/${pageType}`
        );
        commit({ type: "setPagePreview", pagePreview: response.data[0] });
      } catch (err) {
        console.log(err);
      }
    },
    async updatePage({ commit }, { pageType }) {
      try {
        const response = await axios.get(
          `/.netlify/functions/server/contentful`
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
};
