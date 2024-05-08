const optionsService = require("./optionsService");

async function getFooter(req, res) {
  try {
    const footer = await optionsService.getFooter();
    res.send(footer);
  } catch (err) {
    res.status(500).send({ err: "Failed to get footer" });
  }
}

async function validateVoucher(req, res) {
  const { voucher } = req.body;
  try {
    const validate = await optionsService.validateVoucher(voucher);
    res.send(validate);
  } catch (err) {
    res.status(500).send({ err: "Failed to validate voucher" });
  }
}

module.exports = {
  getFooter,
  validateVoucher
};
