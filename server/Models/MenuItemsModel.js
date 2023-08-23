const mongoose = require("mongoose");

const MenuItemsSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  ingridients: { type: Array },
  restaurantId: { type: mongoose.Schema.Types.ObjectId },
  image: { type: String },
  qty: { type: Number },
  price: { type: Number },
});

const MenuItemsModel = mongoose.model(
  "menuitem",
  MenuItemsSchema,
  "menuitems"
);

module.exports = MenuItemsModel;
