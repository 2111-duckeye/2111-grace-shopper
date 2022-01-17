const User = require('../db/models/user');

const requireToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const user = await User.findByToken(token);
		req.user = user;
		next();
	} catch (e) {
		next(e);
	}
};

const isAdmin = (req, res, next) => {
	if (!req.user.isAdmin) {
		return res.status(403).send('You shall not pass!');
	} else {
		next();
	}
};

const canViewOrder = (req, res, next) => {
	if (!req.user.isAdmin && req.user.id !== req.userId) {
		return res.status(403).send('Cannot view other users orders')
	} else{
		next()
	}
}

module.exports = {
	requireToken,
	isAdmin,
	canViewOrder
};
