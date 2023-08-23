const MenuItemsModel = require("../Models/MenuItemsModel")

const MenuItemsController = {
   
    getMenuItems: async(request, response)=>{
        let {r_id} = request.params;
        let result = await MenuItemsModel.find({
            restaurantId: r_id
        })
        response.send({
            call: true,
            result
        })
    }
}

module.exports = MenuItemsController;