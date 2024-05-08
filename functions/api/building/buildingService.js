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

async function query() {
  try {
    const contentfulRes = await axios.get(
      `${GRIDSOME_CONTENTFUL_HOST}/spaces/${GRIDSOME_CONTENTFUL_SPACE_ID}/entries?access_token=${GRIDSOME_CONTENTFUL_DELIVERY_ACCESS_TOKEN}&content_type=building&include=10`
    );
    let contentful = contentfulMiddleware(contentfulRes.data);
    let res = [];
    for (let i = 0; i < contentful.length; i++) {
      const mewsReq = {
        Client: GRIDSOME_MEWS_CLIENT,
        HotelId: contentful[i].mewsId,
      };
      let mewsRes = await axios.post(
        `${GRIDSOME_MEWS_HOST}/api/distributor/v1/hotels/get`,
        mewsReq
      );
      res.push({ ...contentful[i], ...mewsRes.data });
    }
    return res;
  } catch (err) {
    throw err;
  }
}

async function getById(buildingId) {
  try {
    const mewsReq = {
      Client: "Kula Website",
      Ids: [buildingId],
      PrimaryId: buildingId,
    };
    let mewsRes = await axios.post(
      `${GRIDSOME_MEWS_HOST}/api/distributor/v1/configuration/get`,
      mewsReq
    );
    const apartments = mewsRes.data.Configurations.Enterprise.Categories.map(
      (apartment) => {
        return {
          mewsId: apartment.Id,
          normalBedCount: apartment.NormalBedCount,
          extraBedCount: apartment.ExtraBedCount,
        };
      }
    );
    return {
      mewsId: buildingId,
      apartments: apartments,
      products: mewsRes.data.Configurations.Enterprise.Products,
    };
  } catch (err) {
    throw err;
  }
}

async function getAvailability(availabilityBy) {
  const mewsReq = {
    Client: GRIDSOME_MEWS_CLIENT,
    ...availabilityBy,
  };
  const mewsRes = await axios.post(
    `${GRIDSOME_MEWS_HOST}/api/distributor/v1/hotels/getAvailability`,
    mewsReq
  );
  return mewsRes.data;
}

module.exports = {
  query,
  getById,
  getAvailability,
};
