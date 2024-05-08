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

async function getFooter() {
  try {
    const contentfulRes = await axios.get(
      `${GRIDSOME_CONTENTFUL_HOST}/spaces/${GRIDSOME_CONTENTFUL_SPACE_ID}/entries?access_token=${GRIDSOME_CONTENTFUL_DELIVERY_ACCESS_TOKEN}&content_type=footer&include=10`
    );
    return contentfulMiddleware(contentfulRes.data);
  } catch (err) {
    throw err;
  }
}

async function validateVoucher(voucher) {
  const mewsReq = {
    Client: GRIDSOME_MEWS_CLIENT,
    "HotelId": voucher.hotelId,
    "VoucherCode": voucher.code
  };
  const mewsRes = await axios.post(
    `${GRIDSOME_MEWS_HOST}/api/distributor/v1/vouchers/validate`,
    mewsReq
  );
  return mewsRes.data;
}

module.exports = {
  getFooter,
  validateVoucher
};