const router = require('express').Router();
const { Order, Product } = require('../db');
//const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

router.get('/', async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			include: Product
		});
		res.json(orders);
	} catch (err) {
		next(err);
	}
});

router.get('/:orderId', async (req, res, next) => {
	try {
		const currentOrder = await Order.findOne({
			include: Product,
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
			include: Product,
      where: { userId: req.params.userId }
    });
		res.json(orders);
	} catch (err) {
		next(err);
	}
});

router.get('/user/:userId/open/', async (req, res, next) => {
	try {
		const order = await Order.findOne({
			include: Product,
      where: {
				userId: req.params.userId,
				completed: false
			}
    });
		res.json(order);
	} catch (err) {
		next(err);
	}
});


