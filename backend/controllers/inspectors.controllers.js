const Inspector = require("../models/inspectors.models");
const pdfTemplate = require("../models/inspectorreport.models");
const pdf = require("html-pdf");
const path = require("path");

// function to get all inspectors
async function getInspectors(req, res) {
  try {
    const inspectors = await Inspector.find();
    res.json(inspectors);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// function to get a single inspector
async function getInspector(req, res) {
  try {
    const inspector = await Inspector.findById(req.params.id);
    res.json(inspector);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// function to store Inspector
async function storeInspector(req, res) {
  const {
    inspectorId,
    inspectorName,
    inspectorContact,
    busID,
    busRoute,
    inspectorSalary,
    inspectorStatus,
  } = req.body;

  // validate the request
  if (
    !inspectorId ||
    inspectorId === "" ||
    !inspectorName ||
    inspectorName === "" ||
    !inspectorContact ||
    inspectorContact === "" ||
    !busID ||
    busID === "" ||
    !busRoute ||
    busRoute === "" ||
    !inspectorSalary ||
    inspectorSalary === "" ||
    !inspectorStatus ||
    inspectorStatus === ""
  ) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  const inspector = new Inspector({
    inspectorId,
    inspectorName,
    inspectorContact,
    busID,
    busRoute,
    inspectorSalary,
    inspectorStatus,
  });

  try {
    const newInspector = await inspector.save();
    res.status(201).json(newInspector);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
}

// function to delete a inspector
async function deleteInspector(req, res) {
  try {
    const inspector = await Inspector.findById(req.params.id);
    if (inspector) {
      await inspector.remove();
      res.json({message: "Inspector removed"});
    } else {
      res.status(404).json({message: "Inspector not found"});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// search product by Inspector ID
async function searchInspector(req, res) {
  try {
    const {inspectorId} = req.params;
    //remove
    console.log(inspectorId);
    const inspector = await Inspector.find({
      inspectorId: {$regex: inspectorId, $options: "i"},
    });
    res.json(inspector);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// generate report
const createPdf = (req, res) => {
  pdf
    .create(pdfTemplate(req.body), {})
    .toFile("inspector-report.pdf", (err) => {
      if (err) {
        console.log(err);
      }
      res.send("PDF generated");
    });
};

const fetchPdf = (req, res) => {
  res.sendFile(path.join(__dirname, "../inspector-report.pdf"));
};

// function to update a inspector
async function updateInspector(req, res) {
  try {
    const inspector = await Inspector.findById(req.params.id);
    if (inspector) {
      // validate the request
      const {
        inspectorId,
        inspectorName,
        inspectorContact,
        busID,
        busRoute,
        inspectorSalary,
        inspectorStatus,
      } = req.body;

      // validate the request
      if (
        !inspectorId ||
        inspectorId === "" ||
        !inspectorName ||
        inspectorName === "" ||
        !inspectorContact ||
        inspectorContact === "" ||
        !busID ||
        busID === "" ||
        !busRoute ||
        busRoute === "" ||
        !inspectorSalary ||
        inspectorSalary === "" ||
        !inspectorStatus ||
        inspectorStatus === ""
      ) {
        return res.status(400).send({
          message: "All fields are required",
        });
      }

      inspector.inspectorId = inspectorId;
      inspector.inspectorName = inspectorName;
      inspector.inspectorContact = inspectorContact;
      inspector.busID = busID;
      inspector.busRoute = busRoute;
      inspector.inspectorSalary = inspectorSalary;
      inspector.inspectorStatus = inspectorStatus;

      const updatedinspector = await inspector.save();
      res.json(updatedinspector);
    } else {
      res.status(404).json({message: "Inspector not found"});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

module.exports = {
  getInspectors,
  storeInspector,
  deleteInspector,
  searchInspector,
  updateInspector,
  getInspector,
  createPdf,
  fetchPdf,
};
