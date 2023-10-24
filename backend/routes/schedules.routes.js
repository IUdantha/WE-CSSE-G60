const express = require("express");

const router = express.Router();
const SchedulesController = require("../controllers/schedules.controllers");

router.get("/search/:scheduleBusId", SchedulesController.searchSchedule);
router.get("/", SchedulesController.getSchedules);
router.post("/", SchedulesController.storeSchedule);
router.get("/:id", SchedulesController.getSchedule);
router.patch("/:id", SchedulesController.updateSchedule);
router.delete("/:id", SchedulesController.deleteSchedule);
// router.post("/createpdf", SchedulesController.createPdf);
// router.get("/fetchpdf", SchedulesController.fetchPdf);

module.exports = router;
