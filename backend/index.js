const express = require("express");
const cors = require("cors");
const connectDB = require("./config/DBConnect.js");

const {
  auth,
  transportManagement,
} = require("./middlewares/auth.roles.js");

require("dotenv").config();

const loginRoute = require("./routes/login.routes.js");

const incomesRoutes = require("./routes/incomes.routes.js");
const inspectorsRoutes = require("./routes/inspectors.routes.js");
const schedulesRoutes = require("./routes/schedules.routes.js");
const routeRoutes = require("./routes/routes.routes.js");

const app = express();

// static folder
app.use(express.static("public"));

// Middleware
app.use(cors());
app.use(express.json());

// login Routes
app.use("/admin-portal/login", loginRoute);

app.use("/admin-portal/transport-management/routes", routeRoutes);
app.use("/admin-portal/transport-management/schedules", schedulesRoutes);
app.use("/admin-portal/transport-management/inspectors", inspectorsRoutes);
app.use("/admin-portal/transport-management", incomesRoutes);


connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => {
    console.log(`Failed to start the server: ${error.message}`);
    process.exit(1);
  });
