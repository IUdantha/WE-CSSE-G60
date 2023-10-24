const Route = require("../models/routes.models");
const pdfTemplate = require("../models/routereport.models");
const pdf = require("html-pdf");
const path = require("path");

// function to get all routes
async function getRoutes(req, res) {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// function to get a single route
async function getRoute(req, res) {
  try {
    const route = await Route.findById(req.params.id);
    res.json(route);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// function to store route
async function storeRoute(req, res) {
  const {
    routeId,
    routeBusId,
    routeInspector,
    routeDepart,
    routeArrive,
    routeDistance,
    routeTime,
  } = req.body;

  // validate the request
  if (
    !routeId ||
    routeId === "" ||
    !routeBusId ||
    routeBusId === "" ||
    !routeInspector ||
    routeInspector === "" ||
    !routeDepart ||
    routeDepart === "" ||
    !routeArrive ||
    routeArrive === "" ||
    !routeDistance ||
    routeDistance === "" ||
    !routeTime ||
    routeTime === ""
  ) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  const route = new Route({
    routeId,
    routeBusId,
    routeInspector,
    routeDepart,
    routeArrive,
    routeDistance,
    routeTime,
  });

  try {
    const newRoute = await route.save();
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
}

// function to delete a route
async function deleteRoute(req, res) {
  try {
    const route = await Route.findById(req.params.id);
    if (route) {
      await route.remove();
      res.json({message: "route removed"});
    } else {
      res.status(404).json({message: "route not found"});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// search product by route ID
async function searchRoute(req, res) {
  try {
    const {routeId} = req.params;
    //remove
    console.log(routeId);
    const route = await Route.find({
      routeId: {$regex: routeId, $options: "i"},
    });
    res.json(route);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// generate report
const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("route-report.pdf", (err) => {
    if (err) {
      console.log(err);
    }
    res.send("PDF generated");
  });
};

const fetchPdf = (req, res) => {
  res.sendFile(path.join(__dirname, "../route-report.pdf"));
};

// function to update a route
async function updateRoute(req, res) {
  try {
    const route = await Route.findById(req.params.id);
    if (route) {
      // validate the request
      const {
        routeId,
        routeBusId,
        routeInspector,
        routeDepart,
        routeArrive,
        routeDistance,
        routeTime,
      } = req.body;

      // validate the request
      if (
        !routeId ||
        routeId === "" ||
        !routeBusId ||
        routeBusId === "" ||
        !routeInspector ||
        routeInspector === "" ||
        !routeDepart ||
        routeDepart === "" ||
        !routeArrive ||
        routeArrive === "" ||
        !routeDistance ||
        routeDistance === "" ||
        !routeTime ||
        routeTime === ""
      ) {
        return res.status(400).send({
          message: "All fields are required",
        });
      }

      route.routeId = routeId;
      route.routeBusId = routeBusId;
      route.routeInspector = routeInspector;
      route.routeDepart = routeDepart;
      route.routeArrive = routeArrive;
      route.routeDistance = routeDistance;
      route.routeTime = routeTime;

      const updatedroute = await route.save();
      res.json(updatedroute);
    } else {
      res.status(404).json({message: "Route not found"});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

module.exports = {
  getRoutes,
  storeRoute,
  deleteRoute,
  searchRoute,
  updateRoute,
  getRoute,
  createPdf,
  fetchPdf,
};
