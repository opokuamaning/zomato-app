const LocationModel = require("../Models/LocationModel");

const LocatinoController = {
    getLocationList: async (request, response)=>{
       let result = await LocationModel.find()
       response.send({
        call: true,
        result,
       })
    },
}

module.exports = LocatinoController;