const axios = require("axios");
const { contentfulMiddleware } = require("../../services/contentfulMiddleware.js");

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
      `${GRIDSOME_CONTENTFUL_HOST}/spaces/${GRIDSOME_CONTENTFUL_SPACE_ID}/entries?access_token=${GRIDSOME_CONTENTFUL_DELIVERY_ACCESS_TOKEN}&content_type=city&include=10`
    );
    return contentfulMiddleware(contentfulRes.data);
  } catch (err) {
    throw err;
  }
}

async function getBySlug(citySlug) {
  try {
    const contentfulRes = await axios.get(
      `${GRIDSOME_CONTENTFUL_HOST}/spaces/${GRIDSOME_CONTENTFUL_SPACE_ID}/entries?access_token=${GRIDSOME_CONTENTFUL_DELIVERY_ACCESS_TOKEN}&content_type=city&fields.slug=${citySlug}&include=10`
    );
    let contentful = contentfulMiddleware(contentfulRes.data);
    let res = [];
    for (let i = 0; i < contentful[0].buildings.length; i++) {
      const mewsReq = {
        Client: GRIDSOME_MEWS_CLIENT,
        HotelId: contentful[0].buildings[i].mewsId,
      };
      let mewsRes = await axios.post(
        `${GRIDSOME_MEWS_HOST}/api/distributor/v1/hotels/get`,
        mewsReq
      );
      contentful[0].buildings[i] = {...contentful[0].buildings[i], ...mewsRes.data};
      return contentful[0];
    }
    return res;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  query,
  getBySlug,
};
