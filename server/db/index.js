//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order')
const Cart_Item = require('./models/Cart')
//associations could go here!

// const Cart = db.define('Cart', {
// 	total: {
// 		type: Sequelize.DECIMAL(10,2),
// 		defaultValue: 0
// 	},
// 	quantity: {
// 		type: Sequelize.INTEGER,
// 		defaultValue: 0
// 	}
// });

//Many to Many Relationship

//Order and User relationships
User.hasMany(Order)
Order.belongsTo(User)

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
		Order
	},
};
