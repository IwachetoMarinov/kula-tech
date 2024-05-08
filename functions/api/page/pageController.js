const pageService = require("./pageService");

async function getPage(req, res) {
  try {
    const page = await pageService.getByType(req.params.type);
    res.send(page);
  } catch (err) {
    res.status(500).send({ err: "Failed to get page" });
  }
}

async function getPagePreview(req, res) {
  try {
    const page = await pageService.getByTypePreview(req.params.type);
    res.send(page);
  } catch (err) {
    res.status(500).send({ err: "Failed to get page preview" });
  }
}

module.exports = {
  getPage,
  getPagePreview,
};
