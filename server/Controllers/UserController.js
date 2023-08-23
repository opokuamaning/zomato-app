const UserModel = require("../Models/UserModel");

const UserController = {
  userHome: (request, response) => {
    response.send({
      call: true,
      message: "Welcome to home",
    });
  },
  getUserList: async (request, response) => {
    let { gender } = request.params;
    let result = await UserModel.find(
      { gender: { $regex: gender, $options: "i" } },
      { first_name: 1, last_name: 1, email: 1 }
    );
    response.send({
      call: true,
      list: result,
    });
  },
  saveUserData: async (request, response) => {
    let user = request.body;
    let saveData = {
      first_name: user.f_name,
      address: user.address,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
    };
    let result = await UserModel.findOne({ mobile: user.mobile });
    if (result) {
      response.send({
        call: false,
        message: "User already exists",
      });
    } else {
      let newUser = new UserModel(saveData);
      await newUser.save();
      response.send({
        call: true,
        //result,
      });
    }
  },
  userLogin: async (request, response) => {
    let { username, password } = request.body;
    let isUserValid = await UserModel.findOne(
      {
        mobile: username,
        password: password,
      },
      {
        password: 0,
      }
    );
    if (isUserValid) {
      response.send({
        call: true,
        message: "You are logged in",
        user: isUserValid,
      });
    } else {
      response.send({
        call: false,
        message: "Invalid username or passowrd",
      });
    }
  },
};

module.exports = UserController;
