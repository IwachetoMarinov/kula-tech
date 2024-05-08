const contentfulService = require("./contentfulService");

async function updateContentful(req, res) {
  try {
    const page = await contentfulService.updateContentful();
    res.send(page);
  } catch (err) {
    res.status(500).send({ err: "Failed to update contentful" });
  }
}

module.exports = {
  updateContentful,
};
