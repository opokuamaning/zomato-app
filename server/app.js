const express = require("express");
const AppRouter = require("./Routes/AppRoutes");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

// enable cors
app.use(cors());

// enable post data
app.use(express.json()); // allow raw data to be saved ie json data
app.use(express.urlencoded({ extended: false })); // enable for data to be saved

app.use("/api", AppRouter);

const PORT = 3070;
const MONGO_DB_URI = "mongodb://127.0.0.1:27017/zomatodb";
mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log("DB connection successfull");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
