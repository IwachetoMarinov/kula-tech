const buildingService = require('./buildingService')

async function getBuilding(req, res) {
    try {
        const building = await buildingService.getById(req.params.id)
        res.send(building)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get building' })
    }
}

async function getBuildings(req, res) {
    try {
        const buildings = await buildingService.query()
        res.send(buildings)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get buildings' })
    }
}

async function getAvailability(req, res) {
    const { availabilityBy } = req.body;
    try {
        const availability = await buildingService.getAvailability(availabilityBy)
        res.send(availability)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get availability' })
    }
}

module.exports = {
    getBuilding,
    getBuildings,
    getAvailability
}