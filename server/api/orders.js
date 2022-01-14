const router = require('express').Router();
const {
	models: { Order },
} = require('../db');
//const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

router.get('/', async (req, res, next) => {
	try {
		const orders = await Order.findAll();
		res.json(orders);
	} catch (err) {
		next(err);
	}
});

router.get('/:orderId', async (req, res, next) => {
	try {
		const currentOrder = await Order.findOne({
      where: { id: req.params.orderId }
    });
		res.json(currentOrder);
	} catch (err) {
		next(err);
	}
});

router.get('/user/:userId', async (req, res, next) => {
	try {
		const orders = await Order.findAll({
      where: { userId: req.params.userId }
    });
		res.json(orders);
	} catch (err) {
		next(err);
	}
});

