const OneSignal = require("@onesignal/node-onesignal");
const { Mission } = require("../models/model");
const {
  ONESIGNAL_APP_ID,
  BASE_URL_ONESIGNAL,
  ONESIGNAL_CONFIG,
} = require("../configs/config");
const getDriverId = require("../utils/utils");
const create = async (req, res, next) => {
  // create mission into db moongoose
  const mission = new Mission({
    type: req.body.type,
    date: req.body.date,
    startCity: req.body.startCity,
    startAddress: req.body.startAddress,
    arrivalAddress: req.body.arrivalAddress,
    distance: req.body.distance,
    cost: req.body.cost,
    status: req.body.status,
    acceptedBy: req.body.acceptedBy,
    comment: req.body.comment,
    customerName: req.body.customerName,
    commission: req.body.commission,
    createdAt: req.body.createdAt,
  });
  mission
    .save()
    .then(async () => {
      const client = new OneSignal.DefaultApi(ONESIGNAL_CONFIG);
      const notification = new OneSignal.Notification();
      notification.app_id = ONESIGNAL_APP_ID;
      notification.included_segments = ["Subscribed Users"];
      notification.data = req.body;
      notification.contents = {
        en: "Sample Push Message",
      };
      const { id } = await client.createNotification(notification);
      if (id)
        return res.status(201).json({
          message: "Notification was sent successfully",
          data: { id, ...req.body },
        });
      else return res.status(400).json({ message: "Notification failed" });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};
const selectAll = (req, res, next) => {
  Mission.find()
    .then((data) => {
      res.status(200).json({ message: "success", data: data });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

const search = (req, res, next) => {
  Mission.findById(req.body.id)
    .then((mission) => {
      if (mission === null) {
        res.status(400).json({ message: "missed data" });
      } else {
        res.status(200).json({ message: "success", data: mission });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};
const accept = (req, res, next) => {
  let driverId = getDriverId(req.headers.authorization.split(" ")[1]);
  console.log("driverId:" + driverId);
  Mission.updateOne(
    { _id: req.body.id },
    {
      status: req.body.status == "true" ? "accepted" : "rejected",
      acceptedBy: driverId,
    }
  )
    .then((data) => {
      if (req.body.id === undefined || req.body.status === undefined)
        res.status(400).json({ message: "failed accept-ignore" });
      else {
        res.status(200).json({ message: " success accept-ignore" });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: "failed accept-ignore" });
    });
};

const start = (req, res, next) => {
  console.log(req.body.id);
  Mission.updateOne({ _id: req.body.id }, { status: "started" })
    .then((data) => {
      if (req.body.id === undefined)
        res.status(400).json({ message: "failed start" });
      else res.status(200).json({ message: "success start" });
    })
    .catch((error) => {
      res.status(400).json({ message: "failed start" });
    });
};

const finish = (req, res, next) => {
  console.log(req.body.id);
  Mission.updateOne({ _id: req.body.id }, { status: "finished" })
    .then((data) => {
      if (req.body.id === undefined)
        res.status(400).json({ message: "failed finished" });
      else res.status(200).json({ message: "success finished" });
    })
    .catch((error) => {
      res.status(400).json({ message: "failed finish" });
    });
};
const clear = (req, res, next) => {
  console.log(req.body.id);
  Mission.deleteOne({ _id: req.body.id })
    .then((data) => {
      if (req.body.id === undefined)
        res.status(400).json({ message: "failed remove" });
      else {
        if (data.deletedCount === 0) {
          res.status(400).json({ message: "no mission to remove" });
        } else {
          res.status(200).json({ message: "success remove" });
        }
      }
    })
    .catch((error) => {
      res.status(400).json({ message: "failed remove" });
    });
};

const accepted_missions = (req, res, next) => {
  let driverId = getDriverId(req.headers.authorization.split(" ")[1]);
  Mission.find({ status: "accepted", acceptedBy: driverId })
    .then((data) => {
      res.status(200).json({ message: "success", data: data });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};
const started_missions = (req, res, next) => {
  let driverId = getDriverId(req.headers.authorization.split(" ")[1]);

  Mission.find({ status: "started", acceptedBy: driverId })
    .then((data) => {
      res.status(200).json({ message: "success", data: data });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};
const finished_missions = (req, res, next) => {
  let driverId = getDriverId(req.headers.authorization.split(" ")[1]);

  Mission.find({ status: "finished", acceptedBy: driverId })
    .then((data) => {
      res.status(200).json({ message: "success", data: data });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};
module.exports = {
  selectAll,
  search,
  create,
  accept,
  start,
  finish,
  clear,
  accepted_missions,
  started_missions,
  finished_missions,
};
