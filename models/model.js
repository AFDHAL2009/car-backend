// Requiring module
const mongoose = require("mongoose");
// Driver Modal Schema
const driverSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  manufactureYear: { type: String, required: true },
  registrationNumber: { type: String, required: true },
});

// mission Modal Schema
const missionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  date: { type: Date, required: true },
  startCity: { type: String, required: true },
  startAddress: { type: String, required: true },
  arrivalAddress: { type: String, required: true },
  distance: { type: String, required: true },
  cost: { type: String, required: true },
  status: { type: String, required: true },
  acceptedBy: { type: String, required: true },
  comment: { type: String, required: true },
  customerName: { type: String, required: true },
  commission: { type: String, required: true },
  createdAt: { type: String, required: true },
});

// Creating model objects
const Driver = mongoose.model("driver", driverSchema);
const Mission = mongoose.model("mission", missionSchema);

// Exporting our model objects
module.exports = {
  Driver,
  Mission,
};
