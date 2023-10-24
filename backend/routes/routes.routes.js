const express = require("express");

const router = express.Router();
const RoutesController = require("../controllers/routes.controllers");

router.get("/search/:scheduleBusId", RoutesController.searchRoute);
router.get("/", RoutesController.getRoutes);
router.post("/", RoutesController.storeRoute);
router.get("/:id", RoutesController.getRoute);
router.patch("/:id", RoutesController.updateRoute);
router.delete("/:id", RoutesController.deleteRoute);
// router.post("/createpdf", RoutesController.createPdf);
// router.get("/fetchpdf", RoutesController.fetchPdf);

module.exports = router;
