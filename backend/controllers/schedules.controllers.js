const Schedule = require("../models/schedules.models");
const pdfTemplate = require("../models/schedulereport.models");
const pdf = require("html-pdf");
const path = require("path");

// function to get all schedules
async function getSchedules(req, res) {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// function to get a single schedule
async function getSchedule(req, res) {
  try {
    const schedule = await Schedule.findById(req.params.id);
    res.json(schedules);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// function to store schedules
async function storeSchedule(req, res) {
  const {
    scheduleBusId,
    scheduleRouteId,
    scheduleDriver,
    scheduleInspector,
    scheduleDepart,
    scheduleArrive,
    scheduleLoad,
  } = req.body;

  // validate the request
  if (
    !scheduleBusId ||
    scheduleBusId === "" ||
    !scheduleRouteId ||
    scheduleRouteId === "" ||
    !scheduleDriver ||
    scheduleDriver === "" ||
    !scheduleInspector ||
    scheduleInspector === "" ||
    !scheduleDepart ||
    scheduleDepart === "" ||
    !scheduleArrive ||
    scheduleArrive === "" ||
    !scheduleLoad ||
    scheduleLoad === ""
  ) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  const schedule = new Schedule({
    scheduleBusId,
    scheduleRouteId,
    scheduleDriver,
    scheduleInspector,
    scheduleDepart,
    scheduleArrive,
    scheduleLoad,
  });

  try {
    const newSchedule = await schedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
}

// function to delete a schedule
async function deleteSchedule(req, res) {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (schedule) {
      await schedule.remove();
      res.json({message: "schedule removed"});
    } else {
      res.status(404).json({message: "schedule not found"});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// search product by schedule ID
async function searchSchedule(req, res) {
  try {
    const {scheduleBusId} = req.params;
    //remove
    console.log(scheduleBusId);
    const schedule = await Schedule.find({
      scheduleBusId: {$regex: scheduleBusId, $options: "i"},
    });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// generate report
const createPdf = (req, res) => {
  const {
    scheduleBusId,
    scheduleRouteId,
    scheduleDriver,
    scheduleInspector,
    scheduleDepart,
    scheduleArrive,
    scheduleLoad,
  } = req.body;

  console.log(scheduleBusId);

  pdf
    .create(pdfTemplate(req.body), {})
    .toFile("schedule-report.pdf", (err) => {
      if (err) {
        console.log(err);
      }
      res.send("PDF generated");
    });
};

const fetchPdf = (req, res) => {
  res.sendFile(path.join(__dirname, "../schedule-report.pdf"));
};

// function to update a schedule
async function updateSchedule(req, res) {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (schedule) {
      // validate the request
      const {
        scheduleBusId,
        scheduleRouteId,
        scheduleDriver,
        scheduleInspector,
        scheduleDepart,
        scheduleArrive,
        scheduleLoad,
      } = req.body;

      // validate the request
      if (
        !scheduleBusId ||
        scheduleBusId === "" ||
        !scheduleRouteId ||
        scheduleRouteId === "" ||
        !scheduleDriver ||
        scheduleDriver === "" ||
        !scheduleInspector ||
        scheduleInspector === "" ||
        !scheduleDepart ||
        scheduleDepart === "" ||
        !scheduleArrive ||
        scheduleArrive === "" ||
        !scheduleLoad ||
        scheduleLoad === ""
      ) {
        return res.status(400).send({
          message: "All fields are required",
        });
      }

      schedule.scheduleBusId = scheduleBusId;
      schedule.scheduleRouteId = scheduleRouteId;
      schedule.scheduleDriver = scheduleDriver;
      schedule.scheduleInspector = scheduleInspector;
      schedule.scheduleDepart = scheduleDepart;
      schedule.scheduleArrive = scheduleArrive;
      schedule.scheduleLoad = scheduleLoad;

      const updatedschedule = await schedule.save();
      res.json(updatedschedule);
    } else {
      res.status(404).json({message: "Schedule not found"});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

module.exports = {
  getSchedules,
  storeSchedule,
  deleteSchedule,
  searchSchedule,
  updateSchedule,
  getSchedule,
  createPdf,
  fetchPdf,
};
