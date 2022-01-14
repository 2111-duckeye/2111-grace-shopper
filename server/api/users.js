const router = require('express').Router();
const User = require('../db/models/user')
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

router.get('/', requireToken, isAdmin, async (req, res, next) => {
	try {
		const users = await User.findAll({
			// explicitly select only the id and username fields - even though
			// users' passwords are encrypted, it won't help if we just
			// send everything to anyone who asks!
			attributes: ['id', 'username'],
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
});

router.get('/:userId', async (req, res, next) => {
	try {
		const singleUser = await User.findByPk(req.params.userId, {
			attributes: ['id', 'username'],
		});
		res.json(singleUser);
	} catch (err) {
		next(err);
	}
});
