const router = require('express').Router();
const { models: {Order, Product, Cart_Item} } = require('../db');
const { requireToken, isAdmin, canViewOrder } = require('./gatekeepingMiddleware');
module.exports = router;

router.get('/', requireToken, isAdmin, async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			include: Product
		});
		res.json(orders);
	} catch (err) {
		next(err);
	}
});

router.get('/:orderId', requireToken, isAdmin, async (req, res, next) => {
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

router.get('/user/:userId', requireToken, canViewOrder, async (req, res, next) => {
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

router.get('/user/:userId/open/', requireToken, canViewOrder, async (req, res, next) => {
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

router.delete('/user/:userId/open/delete/:productId', async (req, res, next) => {
  try {
		const order = await Order.findOne({
			include: Product,
      where: {
				userId: req.params.userId,
				completed: false
			}
    });

		const products = order.products.filter(product => `${product.dataValues.id}` !== req.params.productId)

		await order.setProducts(products)

		const itemsInCart = await Cart_Item.findAll({
			where: {
				orderId: order.id
			}
		})

		const total = itemsInCart.reduce((acc, product) => {
			return acc += product.dataValues.price * product.dataValues.quantity
		}, 0)

		await order.update({total})

		const updatedOrder = await Order.findOne({
			include: Product,
      where: {
				userId: req.params.userId,
				completed: false
			}
    });

    res.send(updatedOrder)
  } catch (error) {
    next (error)
  }
})


