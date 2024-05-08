const cityService = require("./cityService");

async function getCity(req, res) {
  try {
    const city = await cityService.getBySlug(req.params.slug);
    res.send(city);
  } catch (err) {
    res.status(500).send({ err: "Failed to get city" });
  }
}

async function getCities(req, res) {
  try {
    const cities = await cityService.query();
    res.send(cities);
  } catch (err) {
    res.status(500).send({ err: "Failed to get cities" });
  }
}

module.exports = {
  getCity,
  getCities,
};
