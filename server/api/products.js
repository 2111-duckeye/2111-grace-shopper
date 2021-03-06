const router = require('express').Router();
const Product = require('../db/models/Product');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');

module.exports = router;

router.get('/', async (req, res, next) => {
	try {
		const products = await Product.findAll({
			attributes: ['id', 'name', 'imageURL', 'description', 'price'],
		});
		res.json(products);
	} catch (err) {
		next(err);
	}
});

router.post('/', requireToken, isAdmin, async (req, res, next) => {
	try {
		const { name, description, price } = req.body;
		res.status(201).send(await Product.create({ name, description, price }));
	} catch (err) {
		next(err);
	}
});

router.get('/:productId', async (req, res, next) => {
	try {
		const singleProduct = await Product.findByPk(req.params.productId, {
			attributes: ['id', 'name', 'imageURL', 'description', 'price'],
		});
		res.json(singleProduct);
	} catch (err) {
		next(err);
	}
});

router.put('/:productId', requireToken, isAdmin, async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.productId);
		res.send(await product.update(req.body));
	} catch (err) {
		next(err);
	}
});

router.delete('/:productId', requireToken, isAdmin, async (req, res, next) => {
	try {
		const findProduct = await Product.findByPk(req.params.productId);
		if (findProduct) {
			await findProduct.destroy();
			res.send(findProduct).sendStatus(204);
		} else {
			res.sendStatus(404);
		}
	} catch (err) {
		next(err);
	}
});
