const axios = require("axios");
const {
  contentfulMiddleware,
} = require("../../services/contentfulMiddleware.js");

const {
  GRIDSOME_CONTENTFUL_HOST,
  GRIDSOME_CONTENTFUL_HOST_PREVIEW,
  GRIDSOME_CONTENTFUL_SPACE_ID,
  GRIDSOME_CONTENTFUL_DELIVERY_ACCESS_TOKEN,
  GRIDSOME_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  GRIDSOME_MEWS_HOST,
  GRIDSOME_MEWS_DEMO_HOST,
  GRIDSOME_MEWS_CLIENT,
  GRIDSOME_MEWS_CLIENT_TOKEN,
  GRIDSOME_MEWS_ACCESS_TOKEN,
} = process.env;

async function getAvailability(availabilityBy) {
  const {
    buildings,
    HotelId,
    StartUtc,
    EndUtc,
    AdultCount,
    ChildCount,
  } = availabilityBy;
  if (availabilityBy.StartUtc && availabilityBy.EndUtc) {
    let res = [];
    for (let i = 0; i < buildings.length; i++) {
      try {
        const mewsReq = {
          Client: GRIDSOME_MEWS_CLIENT,
          ConfigurationId: buildings[i].mewsId,
          HotelId,
          StartUtc,
          EndUtc,
          AdultCount,
          ChildCount,
        };
        if(availabilityBy.VoucherCode) mewsReq.VoucherCode = availabilityBy.VoucherCode;
        if(availabilityBy.CurrencyCode) mewsReq.CurrencyCode = availabilityBy.CurrencyCode;
        const mewsRes = await axios.post(
          `${GRIDSOME_MEWS_HOST}/api/distributor/v1/hotels/getAvailability`,
          mewsReq
        );
        res.push({
          buildingMewsId: buildings[i].mewsId,
          apartments: mewsRes.data,
        });
      } catch (err) {
        continue;
      }
    }
    return res;
  }
}

module.exports = {
  getAvailability,
};
