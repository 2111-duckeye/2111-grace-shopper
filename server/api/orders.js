const router = require('express').Router();
const { models: { Order, Product, Cart_Item } } = require('../db');
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

		const itemsInCart = await Cart_Item.findAll({
			where: {
				orderId: order.id
			}
		})

		const total = itemsInCart.reduce((acc, product) => {
			return acc += product.dataValues.price * product.dataValues.quantity
		}, 0)

		await order.update({ total })

		res.json(order);
	} catch (err) {
		next(err);
	}
});

router.post('/user/:userId/open/add/:productId', async (req, res, next) => {
	try {
		const order = await Order.findOne({
			include: Product,
			where: {
				userId: req.params.userId,
				completed: false
			}
		});

		const productToAdd = await Product.findOne({
			where: {
				id: req.params.productId
			}
		})

		const itemsInCart = await Cart_Item.findAll({
			where: {
				orderId: order.id
			}
		})

		const itemIds = itemsInCart.map(product => product.dataValues.productId)

		if (itemIds.includes(productToAdd.id)) {
			console.log("already has item")
			const productInCart = await Cart_Item.findOne({
				where: {
					productId: productToAdd.id,
					orderId: order.id
				}
			})

			productInCart.update({
				quantity: productInCart.quantity + 1,
				total: productInCart.total + productToAdd.price
			})
		} else {
			order.addProduct(productToAdd, {
				through: {
					quantity: 1,
					price: productToAdd.dataValues.price,
					total: productToAdd.dataValues.price,
				}
			})
		}

		const updatedOrder = await Order.findOne({
			include: Product,
			where: {
				userId: req.params.userId,
				completed: false
			}
		});

		res.send(updatedOrder)
	} catch (err) {
		next(err);
	}
})
router.put('/:orderId', requireToken, async (req, res, next) => {
	try {
		console.log("USER>>>>>>", req.user)

		//const orderToCheckout = await Order.findByPk(req.params.orderId);
		/*const updatedOrder = await orderToCheckout.update({
			completed: true
		})
		const newOrder = await Order.create({})
		*/
		//user.addOrder(newOrder)
		res.send()
	} catch (err) {
		next(err);
	}
})

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

		await order.update({ total })

		const updatedOrder = await Order.findOne({
			include: Product,
			where: {
				userId: req.params.userId,
				completed: false
			}
		});

		res.send(updatedOrder)
	} catch (error) {
		next(error)
	}
})


