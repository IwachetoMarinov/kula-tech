const filterService = require('./filterService')

async function getAvailability(req, res) {
    const { availabilityBy } = req.body;
    try {
        const availability = await filterService.getAvailability(availabilityBy)
        res.send(availability)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get availability' })
    }
}

module.exports = {
    getAvailability,
}
