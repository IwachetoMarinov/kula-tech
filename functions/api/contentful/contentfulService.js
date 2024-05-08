const axios = require("axios");

const {
  GRIDSOME_CONTENTFUL_HOST,
  GRIDSOME_CONTENTFUL_HOST_PREVIEW,
  GRIDSOME_CONTENTFUL_SPACE_ID,
  GRIDSOME_CONTENTFUL_DELIVERY_ACCESS_TOKEN,
  GRIDSOME_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  GRIDSOME_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  GRIDSOME_MEWS_HOST,
  GRIDSOME_MEWS_DEMO_HOST,
  GRIDSOME_MEWS_CLIENT,
  GRIDSOME_MEWS_CLIENT_TOKEN,
  GRIDSOME_MEWS_ACCESS_TOKEN,
} = process.env;

const contentful = require("contentful-management");
const client = contentful.createClient({
  accessToken: GRIDSOME_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
});

async function updateContentful() {
  client
    .getSpace(GRIDSOME_CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment("master"))
    .then((environment) => environment.getEntry("yqvIaVTPFaIRAdX8kOXzF"))
    .then((entry) => {
      entry.fields.pageTitle["en-US"] = "test";
      return entry.update();
    })
    .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
    .catch(console.error);
}

module.exports = {
  updateContentful,
};
