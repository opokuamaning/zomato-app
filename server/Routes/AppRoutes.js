const AppRouter = require("express").Router();
const LocatinoController = require("../Controllers/LocationController");
const MealTypeController = require("../Controllers/MealTypeController");
const MenuItemsController = require("../Controllers/MenuItemsController");
const PaymentController = require("../Controllers/PaymentCOntroller");
const RestaurantController = require("../Controllers/RestaurantController");
const UserController = require("../Controllers/UserController");

AppRouter.get("/", UserController.userHome);
AppRouter.get("/get-user-list/:gender", UserController.getUserList)
AppRouter.get("/get-location-list", LocatinoController.getLocationList)
AppRouter.get("/get-restaurant-by-location-id/:loc_id", RestaurantController.getRestaurantByLocationId)
AppRouter.get("/get-restaurant-details/:rest_id", RestaurantController.getSingleRestaurantDetails)
AppRouter.get("/get-meal-type", MealTypeController.getMealTypeList)
AppRouter.get("/get-menu-items/:r_id", MenuItemsController.getMenuItems)

// save user data
AppRouter.post("/save-user-data", UserController.saveUserData)
AppRouter.post("/login", UserController.userLogin);
AppRouter.post("/filter", RestaurantController.filter)
AppRouter.post("/create-order", PaymentController.createOrder);
AppRouter.post("/verify-payment", PaymentController.verifyPayment)

module.exports = AppRouter;