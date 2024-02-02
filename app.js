const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { Driver, Mission } = require("./models/model");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const driverRoutes = require("./routes/driver");
const missionRoutes = require("./routes/mission");
//const uri = "mongodb://localhost:27017/bbb";
const uri =
  "mongodb+srv://bouha:bouha100@cluster0.hvbczja.mongodb.net/bbb?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion Ã  MongoDB reussi !"))
  .catch(() => console.log("Connexion Ã  MongoDB Echouée!"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/api/driver", driverRoutes);
app.use("/api/mission", missionRoutes);
app.get("/", (req, res) => {
  res.send("carwash-backend");
});

module.exports = app;
