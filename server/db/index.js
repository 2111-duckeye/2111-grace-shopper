//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
//associations could go here!

//Many to Many Relationship
User.belongsToMany(Product, { through: 'Cart' });
Product.belongsToMany(User, { through: 'Cart' });

/*
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.hasMany(Product);
Product.belongsTo(Cart);
*/

module.exports = {
	db,
	models: {
		User,
		Product,
		Cart,
	},
};
