import axios from "axios";

export const optionsStore = {
  state: {
    currency: { currencyType: "", currencySymbol: "" },
    footer: null,
    voucher: null,
    sortSelected: "priceHightToLow",
    sortOptions: [
      { text: "Price (High to Low)", value: "priceHightToLow" },
      { text: "Price (Low to High)", value: "priceLowToHight" },
    ],
    mobilePopUp: false,
    currentMobilePopUp: null,
    breadcrumb: null,
    isDrawer: false,
    isCheckout: false,
    durationString: '',
    selectedDuration: 0,
  },
  getters: {
    currency(state) {
      return state.currency;
    },
    voucher(state) {
      return state.voucher;
    },
    sortSelected(state) {
      return state.sortSelected;
    },
    sortOptions(state) {
      return state.sortOptions;
    },
    mobilePopUp(state) {
      return state.mobilePopUp;
    },
    currentMobilePopUp(state) {
      return state.currentMobilePopUp;
    },
    breadcrumb(state) {
      return state.breadcrumb;
    },
    isDrawer(state) {
      return state.isDrawer;
    },
    isCheckout(state) {
      return state.isCheckout;
    },
    durationString(state) {
      return state.durationString;
    },
    selectedDuration(state) {
      return state.selectedDuration;
    },
  },
  mutations: {
    setFooter(state, payload) {
      state.footer = payload.footer;
    },
    setVoucher(state, payload) {
      state.voucher = payload.voucher;
    },
    setSortSelected(state, payload) {
      state.sortSelected = payload;
    },
    setMobilePopUp(state, payload) {
      state.mobilePopUp = payload;
    },
    setCurrentMobilePopUp(state, payload) {
      state.currentMobilePopUp = payload;
    },
    setCurrency(state, payload) {
      state.currency = payload;
    },
    setBreadcrumb(state, payload) {
      state.breadcrumb = payload;
    },
    setBreadcrumb(state, payload) {
      state.breadcrumb = payload;
    },
    setIsDrawer(state, payload) {
      state.isDrawer = payload;
    },
    setIsCheckout(state, payload) {
      state.isCheckout = payload;
    },
    setDurationString(state, payload) {
      state.durationString = payload;
    },
    setSelectedDuration(state, payload) {
      state.selectedDuration = payload;
    },
  },
  actions: {
    async getFooter({ commit }, payload) {
      try {
        const response = await axios.get(
          `/.netlify/functions/server/options/footer`
        );
        commit({ type: "setFooter", response });
      } catch (err) {
        console.log(err);
      }
    },
    async validateVoucher({ commit }, { hotelId, code }) {
      try {
        let voucher = { hotelId, code };
        const response = await axios.post(
          `/.netlify/functions/server/options/voucher`,
          { voucher }
        );
        voucher = { ...response.data, code };
        commit({ type: "setVoucher", voucher });
        return response;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
