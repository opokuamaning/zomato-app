const MealTypeModel = require("../Models/MealTypeModel");
const MenuItemsModel = require("../Models/MenuItemsModel");
const RestaurantModel = require("../Models/RestaurantModel");

const RestaurantController = {
  getRestaurantByLocationId: async (request, response) => {
    let { loc_id } = request.params;
    let result = await RestaurantModel.find(
      {
        location_id: loc_id,
      },
      { name: 1, locality: 1, city: 1, image: 1 }
    );
    response.send({
      call: true,
      result,
    });
  },
  getSingleRestaurantDetails: async (request, response) => {
    let { rest_id } = request.params;
    let result = await RestaurantModel.findOne({
      _id: rest_id,
    });
    //console.log(rest_id);
    response.send({
      call: true,
      result,
    });
  },
  filter: async (request, response) => {
    let { meal_type, sort, location, cuisine } = request.body;
    // console.log(request.body, "request")
    let filterData = {};
    //location
    //cuisine
    //cost for two
    //sort(default ascending)
    //pagination
    if (meal_type !== undefined) filterData["mealtype_id"] = meal_type;
    if (location !== undefined) filterData["location_id"] = location;
    if(cuisine.length !== 0) filterData["cuisine_id"] = {$in: cuisine}
    //console.log(filterData, 30);
    let result = await RestaurantModel.find().sort({
      min_price: sort,
    });
    //console.log(result, 90);
    response.send({
      call: true,
      result,
      
    });
  },
};

module.exports = RestaurantController;
