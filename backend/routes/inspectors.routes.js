const express = require("express");

const router = express.Router();
const InspectorsController = require("../controllers/inspectors.controllers");

router.get("/search/:inspectorId", InspectorsController.searchInspector);
router.get("/", InspectorsController.getInspectors);
router.post("/", InspectorsController.storeInspector);
router.get("/:id", InspectorsController.getInspector);
router.patch("/:id", InspectorsController.updateInspector);
router.delete("/:id", InspectorsController.deleteInspector);
// router.post("/createpdf", InspectorsController.createPdf);
// router.get("/fetchpdf", InspectorsController.fetchPdf);

module.exports = router;
