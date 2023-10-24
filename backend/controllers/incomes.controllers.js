const Income = require("../models/income.models");
const pdfTemplate = require("../models/salesreport.models");
const pdf = require("html-pdf");
const path = require("path");

// function to get all incomes
async function getIncomes(req, res) {
  try {
    const incomes = await Income.find();
    res.json(incomes);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// function to store products
async function storeIncome(req, res) {
  const {
    incomeRouteID,
    incomeBusID,
    incomeLoad,
    incomeDate,
    incomeIncome,
    incomeExpenses,
    incomeProfit,
  } = req.body;

  // validate the request
  if (
    !incomeRouteID ||
    incomeRouteID === "" ||
    !incomeBusID ||
    incomeBusID === "" ||
    !incomeLoad ||
    incomeLoad === "" ||
    !incomeDate ||
    incomeDate === "" ||
    !incomeIncome ||
    incomeIncome === "" ||
    !incomeExpenses ||
    incomeExpenses === "" ||
    !incomeProfit ||
    incomeProfit === ""
  ) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  const income = new Income({
    incomeRouteID,
    incomeBusID,
    incomeLoad,
    incomeDate,
    incomeIncome,
    incomeExpenses,
    incomeProfit,
  });

  try {
    const newIncome = await income.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
}

// function to delete a income
async function deleteIncome(req, res) {
  try {
    const income = await Income.findById(req.params.id);
    if (income) {
      await income.remove();
      res.json({message: "Income removed"});
    } else {
      res.status(404).json({message: "Income not found"});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// search product by Income Name
async function searchIncome(req, res) {
  try {
    const {incomeRouteID} = req.params;
    //remove
    console.log(incomeRouteID);
    const income = await Income.find({
      incomeRouteID: {$regex: incomeRouteID, $options: "i"},
    });
    res.json(income);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// generate report
const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("incomeReport.pdf", (err) => {
    if (err) {
      console.log(err);
    }
    res.send("PDF generated");
  });
};

const fetchPdf = (req, res) => {
  res.sendFile(path.join(__dirname, "../salesreport.pdf"));
};

// function to update a income
async function updateIncome(req, res) {
  try {
    const income = await Income.findById(req.params.id);
    if (income) {
      // validate the request
      const {
        incomeRouteID,
        incomeBusID,
        incomeLoad,
        incomeDate,
        incomeIncome,
        incomeExpenses,
        incomeProfit,
      } = req.body;

      // validate the request
      if (
        !incomeRouteID ||
        incomeRouteID === "" ||
        !incomeBusID ||
        incomeBusID === "" ||
        !incomeLoad ||
        incomeLoad === "" ||
        !incomeDate ||
        incomeDate === "" ||
        !incomeIncome ||
        incomeIncome === "" ||
        !incomeExpenses ||
        incomeExpenses === "" ||
        !incomeProfit ||
        incomeProfit === ""
      ) {
        return res.status(400).send({
          message: "All fields are required",
        });
      }

      income.incomeRouteID = incomeRouteID;
      income.incomeBusID = incomeBusID;
      income.incomeLoad = incomeLoad;
      income.incomeDate = incomeDate;
      income.incomeIncome = incomeIncome;
      income.incomeExpenses = incomeExpenses;
      income.incomeProfit = incomeProfit;

      const updatedincome = await income.save();
      res.json(updatedincome);
    } else {
      res.status(404).json({message: "Income not found"});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

module.exports = {
  getIncomes,
  storeIncome,
  deleteIncome,
  searchIncome,
  updateIncome,
  createPdf,
  fetchPdf,
};
