//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order')
const Cart_Item = require('./models/Cart_Item')
//associations could go here!

//Many to Many Relationship

//Order and User relationships
User.hasMany(Order)
Order.belongsTo(User)


// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.hasMany(Product);
// Product.belongsTo(Cart);

module.exports = {
	db,
	models: {
		User,
		Product,
		Order,
		Cart_Item
	},
};
