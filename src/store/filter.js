import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs";

function getRoomTypes(buildings) {
  let roomTypes = [];
  buildings.forEach((building) => {
    building.apartments.forEach((apartment) => {
      if (roomTypes.length) {
        const find = roomTypes.find((r) => r.trim() === apartment.name.trim());
        if (!find) roomTypes.push(apartment.name);
      } else {
        roomTypes.push(apartment.name);
      }
    });
  });
  return roomTypes;
}

function getAvailabilityByPrice(minPrice, priceRange) {
  if (priceRange && priceRange.length) {
    if (minPrice < priceRange[0] || minPrice > priceRange[1]) {
      return false;
    }
  }
  return true;
}

function getAvailabilityByGuests(maxGuests, adultCount, childCount) {
  if (adultCount || childCount) {
    const sum = adultCount + childCount;
    if (maxGuests < sum) return false;
  }
  return true;
}

function getAvailabilityByRoom(apartmentType, roomTypesSelected) {
  if (roomTypesSelected && roomTypesSelected.length) {
    const apartment = roomTypesSelected.filter(
      (type) => type && type.trim() === apartmentType.trim()
    );
    if (!apartment || !apartment.length) return false;
  }
  return true;
}

function filterWithoutMews(buildings, filterBy) {
  return buildings.map((building) => {
    const filteredApartments = building.apartments.map((apartment) => {
      let available = true;
      let exists = true;
      let availableByPrice = getAvailabilityByPrice(
        apartment.minPrice,
        filterBy.priceRange
      );
      let availableByGuests = getAvailabilityByGuests(
        apartment.maxGuests,
        filterBy.adultCount,
        filterBy.childCount
      );
      let availableByRoom = getAvailabilityByRoom(
        apartment.name,
        filterBy.roomTypesSelected
      );
      available =
        availableByPrice && availableByGuests && availableByRoom ? true : false;
      exists =
        availableByPrice && availableByRoom && availableByGuests ? true : false;
      return { ...apartment, available, exists };
    });
    const findBuilding = filteredApartments.filter((a) => a.available);
    const findBuildingExists = filteredApartments.filter((a) => a.exists);
    const available = findBuilding && findBuilding.length ? true : false;
    const exists =
      findBuildingExists && findBuildingExists.length ? true : false;
    return { ...building, apartments: filteredApartments, available, exists };
  });
}

function filterWithMews(buildings, availabilityByMews, filterBy) {
  let filteredBuildings = [];
  buildings.forEach((building) => {
    const findBuildingIndex = availabilityByMews.findIndex(
      (b) => b.buildingMewsId === building.mewsId
    );
    if (findBuildingIndex !== -1) {
      const filteredApartments = building.apartments.map((apartment) => {
        const rate = availabilityByMews[
          findBuildingIndex
        ].apartments.Rates.find(
          // (r) => r.Name["en-US"] === "Non Refundable Rate"
          (r) => r.Name["en-US"].includes("Refundable")
        );

        const baseRate = availabilityByMews[
          findBuildingIndex
        ].apartments.Rates.find((r) => r.Name["en-US"].includes("WEBRATE"));

        const discountRate = availabilityByMews[
          findBuildingIndex
        ].apartments.Rates.find((r) => {
          if (
            !r.Name["en-US"].includes("WEBRATE") &&
            !r.Name["en-US"].includes("Refundable") &&
            !r.Name["en-US"].includes("Flexible")
          ) {
            return r;
          }
        });

        const rateId = rate ? rate.Id : null;
        const baseRateId = baseRate ? baseRate.Id : null;
        const discountRateId = discountRate ? discountRate.Id : null;
        const discountRateName = discountRate
          ? discountRate.Name["en-US"]
          : null;
        const findApartment = availabilityByMews[
          findBuildingIndex
        ].apartments.RoomCategoryAvailabilities.find(
          (a) => a.RoomCategoryId === apartment.mewsId
        );
        let mewsPricing = null;
        let mewsBasePricing = null;
        let mewsDiscountPricing = null;
        if (findApartment && findApartment.RoomOccupancyAvailabilities.length) {
          findApartment.RoomOccupancyAvailabilities.forEach((availability) => {
            mewsPricing = availability.Pricing.find((p) => p.RateId === rateId);
            mewsBasePricing = availability.Pricing.find(
              (p) => p.RateId === baseRateId
            );
            mewsDiscountPricing = availability.Pricing.find(
              (p) => p.RateId === discountRateId
            );
            if (mewsDiscountPricing)
              mewsDiscountPricing.name = discountRateName;
          });
        }
        let available = true;
        let exists = true;
        let availableByMews = findApartment ? true : false;
        let availableByPrice = getAvailabilityByPrice(
          apartment.minPrice,
          filterBy.priceRange
        );
        let availableByGuests = getAvailabilityByGuests(
          apartment.maxGuests,
          filterBy.adultCount,
          filterBy.childCount
        );
        let availableByRoom = getAvailabilityByRoom(
          apartment.name,
          filterBy.roomTypesSelected
        );
        available =
          availableByMews &&
          availableByPrice &&
          availableByGuests &&
          availableByRoom
            ? true
            : false;
        exists =
          availableByPrice && availableByGuests && availableByRoom
            ? true
            : false;
        return {
          ...apartment,
          available,
          exists,
          mewsPricing,
          mewsBasePricing:
            !mewsDiscountPricing && apartment.mewsBasePricing
              ? apartment.mewsBasePricing
              : mewsBasePricing,
          // ? mewsBasePricing
          // : apartment.mewsBasePricing
          // ? apartment.mewsBasePricing
          // : null,
          mewsDiscountPricing: mewsDiscountPricing,
          // ? mewsDiscountPricing
          // : apartment.mewsDiscountPricing
          // ? apartment.mewsDiscountPricing
          // : null,
        };
      });
      const findBuilding = filteredApartments.filter((a) => a.available);
      const findBuildingExists = filteredApartments.filter((a) => a.exists);
      const available = findBuilding && findBuilding.length ? true : false;
      const exists =
        findBuildingExists && findBuildingExists.length ? true : false;
      filteredBuildings.push({
        ...building,
        apartments: filteredApartments,
        available,
        exists,
      });
    } else {
      const filteredApartments = building.apartments.map((a) => {
        let availableByPrice = getAvailabilityByPrice(
          a.minPrice,
          filterBy.priceRange
        );
        let availableByGuests = getAvailabilityByGuests(
          a.maxGuests,
          filterBy.adultCount,
          filterBy.childCount
        );
        let availableByRoom = getAvailabilityByRoom(
          a.name,
          filterBy.roomTypesSelected
        );
        const exists =
          availableByPrice && availableByGuests && availableByRoom
            ? true
            : false;
        return { ...a, available: false, exists };
      });
      filteredBuildings.push({
        ...building,
        apartments: filteredApartments,
        available: false,
        exists: true,
      });
    }
  });
  return filteredBuildings;
}

export const filterStore = {
  state: {
    availabilityByMews: null,
    filterBy: {
      date: { startDate: null, endDate: null },
      priceRange: null,
      citySelected: null,
      roomTypesSelected: null,
      adultCount: 1,
      childCount: 0,
      code: null,
      selectedBuilding: null,
      buildingCode: null,
    },
    roomTypes: [],
    isLoading: false,
  },
  getters: {
    filterBy(state) {
      return state.filterBy;
    },
    roomTypes(state) {
      return state.roomTypes;
    },
    availabilityByMews(state) {
      return state.availabilityByMews;
    },
    filteredBuildings: (state) => (buildings) => {
      const filterBy = state.filterBy;
      if (!state.availabilityByMews) {
        return filterWithoutMews(buildings, filterBy);
      } else {
        return filterWithMews(buildings, state.availabilityByMews, filterBy);
        0;
      }
    },
    getQuery(state) {
      let query = {};
      if (state.filterBy.date.startDate) {
        query.start_date = dayjs(state.filterBy.date.startDate).format(
          "YYYY-MM-DD"
        );
      }
      if (state.filterBy.date.endDate) {
        query.end_date = dayjs(state.filterBy.date.endDate).format(
          "YYYY-MM-DD"
        );
      }
      query.adult_count = state.filterBy.adultCount;
      query.child_count = state.filterBy.childCount;
      if (state.filterBy.roomTypesSelected) {
        query.room_types = encodeURIComponent(
          JSON.stringify(state.filterBy.roomTypesSelected)
        );
      }
      if (state.filterBy.priceRange) {
        query.prices = encodeURIComponent(
          JSON.stringify(state.filterBy.priceRange)
        );
      } else {
        query.prices = encodeURIComponent(JSON.stringify([0, 1000]));
      }

      return query;
    },
    getQueryString(state) {
      let query = "";
      if (state.filterBy.date.startDate) {
        query +=
          "start_date=" +
          dayjs(state.filterBy.date.startDate).format("YYYY-MM-DD");
      }
      if (state.filterBy.date.endDate) {
        query +=
          "&end_date=" +
          dayjs(state.filterBy.date.endDate).format("YYYY-MM-DD");
      }
      if (state.filterBy.date.startDate) query += "&";
      query += "adult_count=" + state.filterBy.adultCount;
      query += "child_count=" + state.filterBy.childCount;
      if (state.filterBy.roomTypesSelected) {
        query +=
          "&room_types=" +
          encodeURIComponent(JSON.stringify(state.filterBy.roomTypesSelected));
      }
      if (state.filterBy.priceRange) {
        query +=
          "&prices=" +
          encodeURIComponent(JSON.stringify(state.filterBy.priceRange));
      } else {
        query += "&prices=" + encodeURIComponent(JSON.stringify([0, 1000]));
      }
      return query;
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    setRoomTypes(state, { buildings }) {
      state.roomTypes = getRoomTypes(buildings);
    },
    setFilterBy(state, { type, value }) {
      if (!type) return;
      state.filterBy[type] = value;
      Cookies.set("filterBy", JSON.stringify(state.filterBy), {
        path: "/",
        expires: 7,
      });
    },
    initFilterBy(state, payload) {
      let filterBy = Cookies.get("filterBy");
      if (filterBy) state.filterBy = JSON.parse(filterBy);
    },
    clearFilterBy(state, payload = false) {
      state.filterBy = {
        date: { startDate: null, endDate: null },
        priceRange: null,
        citySelected: payload ? state.filterBy.citySelected : null,
        roomTypesSelected: null,
        adultCount: 1,
        childCount: 0,
        code: null,
        selectedBuilding: null,
        buildingCode: null,
      };
      state.availabilityByMews = null;
      Cookies.set("filterBy", JSON.stringify(state.filterBy), {
        path: "/",
        expires: 7,
      });
    },
    setAvailability(state, payload) {
      state.availabilityByMews = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async setFilterBy({ state, commit, dispatch, rootGetters }, payload) {
      if (!payload.setFilterBy.type) return;
      const path =
        typeof window !== "undefined" ? window.location.pathname : "";
      if (
        path.includes("/city/") &&
        !payload.isInit &&
        state.filterBy[payload.setFilterBy.type] !== payload.setFilterBy.value
      ) {
        if (payload.setFilterBy.type === "date") {
          let prevStrDate = null;
          if (
            state.filterBy[payload.setFilterBy.type].startDate &&
            state.filterBy[payload.setFilterBy.type].endDate
          ) {
            prevStrDate =
              dayjs(state.filterBy[payload.setFilterBy.type].startDate).format(
                "DD/MM/YY"
              ) +
              " - " +
              dayjs(state.filterBy[payload.setFilterBy.type].endDate).format(
                "DD/MM/YY"
              );
          }
          const strDate =
            dayjs(payload.setFilterBy.value.startDate).format("DD/MM/YY") +
            " - " +
            dayjs(payload.setFilterBy.value.endDate).format("DD/MM/YY");
          dispatch("tagManagerEvent", {
            type: "FilterClicked",
            value: {
              filter: payload.setFilterBy.type,
              previousValue: prevStrDate,
              value: strDate,
            },
          });
        } else {
          dispatch("tagManagerEvent", {
            type: "FilterClicked",
            value: {
              filter: payload.setFilterBy.type,
              previousValue: state.filterBy[payload.setFilterBy.type],
              value: payload.setFilterBy.value,
            },
          });
        }
      } else if (
        payload.type &&
        payload.type === "checkoutDate" &&
        state.filterBy[payload.setFilterBy.type].startDate !==
          payload.setFilterBy.value.startDate &&
        state.filterBy[payload.setFilterBy.type].endDate !==
          payload.setFilterBy.value.endDate
      ) {
        let prevStrDate = null;
        if (
          state.filterBy[payload.setFilterBy.type].startDate &&
          state.filterBy[payload.setFilterBy.type].endDate
        ) {
          prevStrDate =
            dayjs(state.filterBy[payload.setFilterBy.type].startDate).format(
              "DD/MM/YY"
            ) +
            " - " +
            dayjs(state.filterBy[payload.setFilterBy.type].endDate).format(
              "DD/MM/YY"
            );
        }
        const strDate =
          dayjs(payload.setFilterBy.value.startDate).format("DD/MM/YY") +
          " - " +
          dayjs(payload.setFilterBy.value.endDate).format("DD/MM/YY");
        dispatch("tagManagerEvent", {
          type: "CheckoutUpdated",
          value: {
            context: payload.setFilterBy.type,
            previousValue: prevStrDate,
            value: strDate,
          },
        });
      } else if (
        payload.type &&
        payload.type === "checkoutGuest" &&
        state.filterBy[payload.setFilterBy.type] !== payload.setFilterBy.value
      ) {
        dispatch("tagManagerEvent", {
          type: "CheckoutUpdated",
          value: {
            context: payload.setFilterBy.type,
            previousValue: state.filterBy[payload.setFilterBy.type],
            value: payload.setFilterBy.value,
          },
        });
      }
      await commit("setFilterBy", payload.setFilterBy);
      if (
        payload.setFilterBy.type !== "priceRange" &&
        payload.setFilterBy.type !== "roomTypesSelected" &&
        payload.setFilterBy.type !== "code" &&
        state.filterBy.date.startDate &&
        state.filterBy.date.endDate
      ) {
        await commit("setFilterBy", {
          type: "code",
          value: null,
        });
      }
      if (
        !payload.isBtn &&
        payload.setFilterBy.type !== "priceRange" &&
        payload.setFilterBy.type !== "roomTypesSelected" &&
        state.filterBy.date.startDate &&
        state.filterBy.date.endDate
      ) {
        dispatch("getAvailability");
      }
    },
    async getAvailability({ state, commit, rootState, dispatch }, payload) {
      if (!state.filterBy.date.startDate || !state.filterBy.date.endDate)
        return;
      await commit("setIsLoading", true);
      const StartUtc = state.filterBy.date.startDate
        ? new Date(state.filterBy.date.startDate).toISOString()
        : null;
      const EndUtc = state.filterBy.date.endDate
        ? new Date(state.filterBy.date.endDate).toISOString()
        : null;
      const AdultCount = state.filterBy.adultCount;
      const ChildCount = state.filterBy.childCount;
      let buildings = state.filterBy.selectedBuilding
        ? [{ mewsId: state.filterBy.selectedBuilding }]
        : state.filterBy.citySelected.buildings;

      let availabilityBy = {
        buildings,
        HotelId: state.filterBy.citySelected.mewsId,
        StartUtc,
        EndUtc,
        AdultCount,
        ChildCount,
      };

      if (state.filterBy.code) {
        availabilityBy.VoucherCode = state.filterBy.code;
      } else if (state.filterBy.buildingCode) {
        availabilityBy.VoucherCode = state.filterBy.buildingCode;
      }
      if (rootState.optionsStore.currency.currencyType)
        availabilityBy.CurrencyCode =
          rootState.optionsStore.currency.currencyType;

      try {
        const response = await axios.post(`/.netlify/functions/server/filter`, {
          availabilityBy,
        });
        // console.log("res filter mews", response.data);
        await commit("setAvailability", response.data);
        const path =
          typeof window !== "undefined" ? window.location.pathname : "";
        if (path.includes("/city/")) {
          let num = 0;
          response.data.forEach(
            (b) => (num += b.apartments.RoomCategoryAvailabilities.length)
          );
          dispatch("tagManagerEvent", {
            type: "SearchFinished",
            value: {
              numberOfResults: num,
              Result: "success",
            },
          });
        }
      } catch (err) {
        console.log(err);
        const path =
          typeof window !== "undefined" ? window.location.pathname : "";
        if (path.includes("/city/")) {
          dispatch("tagManagerEvent", {
            type: "SearchFinished",
            value: {
              numberOfResults: 0,
              Result: "error",
            },
          });
        }
      } finally {
        commit("setIsLoading", false);
      }
    },
  },
};
