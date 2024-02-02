const { Driver } = require("../models/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sign_up = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const driver = new Driver({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
        city: req.body.city,
        vehicleType: req.body.vehicleType,
        vehicleModel: req.body.vehicleModel,
        manufactureYear: req.body.manufactureYear,
        registrationNumber: req.body.registrationNumber,
      });
      driver
        .save()
        .then(() => res.status(201).json({ message: "register success" }))
        .catch((error) => {
          if (error.code === 11000) {
            res.status(400).json({ message: "Email was found!" });
          } else {
            res.status(400).json({ message: error });
          }
        });
    })
    .catch((error) => res.status(500).json({ error }));
};
const sign_in = (req, res, next) => {
  Driver.findOne({ email: req.body.email })
    .then((driver) => {
      if (!driver) {
        return res.status(401).json({ message: "email or password is wrong!" });
      }
      //

      bcrypt
        .compare(req.body.password, driver.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "email or password is wrong!" });
          }
          res.status(200).json({
            driverId: driver._id,
            token: jwt.sign({ driverId: driver._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));

      //
    })
    .catch(() => {
      return res.status(500).json({ message: "login failed" });
    });
};
module.exports = {
  sign_up,
  sign_in,
};
