const express = require("express");

const router = express.Router();
const IncomeController = require("../controllers/incomes.controllers");

router.post("/createpdf", IncomeController.createPdf);
router.get("/fetchpdf", IncomeController.fetchPdf);
router.get("/search/:incomeRouteID", IncomeController.searchIncome);
router.get("/", IncomeController.getIncomes);
router.post("/", IncomeController.storeIncome);
router.get("/:id", IncomeController.getIncome);
router.patch("/:id", IncomeController.updateIncome);
router.delete("/:id", IncomeController.deleteIncome);

module.exports = router;
