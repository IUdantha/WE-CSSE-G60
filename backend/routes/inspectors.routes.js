const express = require("express");

const router = express.Router();
const IncomeController = require("../controllers/incomes.controllers");

router.get("/search/:incomeRouteID", IncomeController.searchIncome);
router.get("/", IncomeController.getIncomes);
router.post("/", IncomeController.storeIncome);
// router.get("/:id", ProductController.getProduct);
router.patch("/:id", IncomeController.updateIncome);
router.delete("/:id", IncomeController.deleteIncome);
router.post("/createpdf", IncomeController.createPdf);
router.get("/fetchpdf", IncomeController.fetchPdf);

module.exports = router;
