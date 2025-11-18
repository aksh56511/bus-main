const Bus = require('../models/Bus');

exports.listBuses = (req, res) => {
	try {
		const buses = Bus.getAllBuses();
		return res.json({ buses });
	} catch (err) {
		return res.status(500).json({ error: 'Failed to list buses' });
	}
};

exports.createBus = (req, res) => {
	try {
		const payload = req.body || {};
		const bus = Bus.addBus(payload);
		return res.status(201).json({ bus });
	} catch (err) {
		return res.status(500).json({ error: 'Failed to create bus' });
	}
};