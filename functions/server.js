const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require('body-parser');
const compression = require('compression');

const { getPage, getPagePreview } = require('./api/page/pageController');
const { getFooter, validateVoucher } = require('./api/options/optionsController');
const { getCity, getCities } = require('./api/city/cityController');
const { getBuilding, getBuildings } = require('./api/building/buildingController');
const { updateContentful } = require('./api/contentful/contentfulController');
const { getAvailability } = require('./api/filter/filterController');

// const { cacheMiddleware } = require("./services/cacheMiddleware");

const app = express();
const router = express.Router();

// Contentful update
router.get('/contentful', updateContentful);

// Page
router.get('/page/:type', getPage);
router.get('/page/preview/:type', getPagePreview);

// Options
router.get('/options/footer', getFooter);
router.post('/options/voucher', validateVoucher);

// City
router.get('/city', getCities);
router.get('/city/:slug', getCity);

// Building
router.get('/building', getBuildings);
router.get('/building/:id', getBuilding);

// Filter
router.post('/filter', getAvailability);

app.use(compression());
app.use(bodyParser.json());
app.use("/.netlify/functions/server", router);

module.exports = app;
module.exports.handler = serverless(app);
