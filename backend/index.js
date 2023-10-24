const express = require("express");
const cors = require("cors");
const connectDB = require("./config/DBConnect.js");

const {
  auth,
  staffManagement,
  vehicleManagement,
  salaryManagement,
  technicalManagement,
  stockManagement,
  productManagement,
  salesManagement,
} = require("./middlewares/auth.roles.js");

require("dotenv").config();

const loginRoute = require("./routes/login.routes.js");
const staffManagerRoutes = require("./routes/staffManager.routes");
const salesManagerRouters = require("./routes/salesManager.routes");
const vehicleRoutes = require("./routes/vehicleOfficer.routes");
const vehicleCategoryRoutes = require("./routes/vehicleCategory.routes");
const machineRoutes = require("./routes/machineManager.routes.js");
const generatorRoutes = require("./routes/generatorManager.routes.js");
const stockManagerRoutes = require("./routes/stockManager.routes");
const salaryRoutes = require("./routes/payrollManager.routes");
const salaryIncrementRoutes = require("./routes/salaryIncrement.routes");
const productManagerRoutes = require("./routes/productManager.routes.js");
const inspectorsRoutes = require("./routes/inspectors.routes.js");
const productReportRoutes = require("./routes/productRecords.routes.js");

// crops
const cropsRoutes = require("./routes/crops.models");
// suppliers
const supplierRoutes = require("./routes/posts");

const app = express();

// static folder
app.use(express.static("public"));

// Middleware
app.use(cors());
app.use(express.json());

// login Routes
app.use("/admin-portal/login", loginRoute);

// // Staff Management Route
// app.use(
//   "/admin-portal/staff-management",
//   auth,
//   staffManagement,
//   staffManagerRoutes
// );

// // Product Management Route
app.use("/admin-portal/product-management", productManagerRoutes);
app.use("/admin-portal/transport-management", inspectorsRoutes);
// app.use("/admin-portal/production-management", productReportRoutes);

// // Sales Management Route
// app.use(
//   "/admin-portal/sales-management",
//   auth,
//   salesManagement,
//   salesManagerRouters
// );

// // Stock Management Route

// app.use(
//   "/admin-portal/stock-management",
//   auth,
//   stockManagement,
//   stockManagerRoutes
// );

// // Vehicle Management Route
// app.use(
//   "/admin-portal/vehicle-management/categories",
//   auth,
//   vehicleManagement,
//   vehicleCategoryRoutes
// );
// app.use(
//   "/admin-portal/vehicle-management",
//   auth,
//   vehicleManagement,
//   vehicleRoutes
// );

// // Machine Management Route

// app.use(
//   "/admin-portal/machine-management/machines",
//   auth,
//   technicalManagement,
//   machineRoutes
// );
// app.use(
//   "/admin-portal/machine-management/generators",
//   auth,
//   technicalManagement,
//   generatorRoutes
// );

// // Supplier Management Route
// app.use("/admin-portal/supplierc", supplierRoutes);

// // Crops Management Route
// app.use("/admin-portal/crops", cropsRoutes);

// // Salary Management Routes
// app.use(
//   "/admin-portal/salary-management/increments",
//   auth,
//   salaryManagement,
//   salaryIncrementRoutes
// );
// app.use(
//   "/admin-portal/salary-management",
//   auth,
//   salaryManagement,
//   salaryRoutes
// );

// // DB connection and starting server

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => {
    console.log(`Failed to start the server: ${error.message}`);
    process.exit(1);
  });
