const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const fileupload = require("express-fileupload");

const user = require("./routes/user");
const card = require("./routes/card");
const usercard = require("./routes/user_card");
const team = require("./routes/team");
const transaction = require("./routes/transaction");
const dashboard = require("./routes/dashboard");

// Mongo DB Connections
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("MongoDB Connection Succeeded.");
  })
  .catch((error) => {
    console.log("Error in DB connection: " + error);
  });

// Middleware Connections
app.use(cors());
app.use(express.json());
app.use(fileupload());

// Routes
app.use("/api/user", user);
app.use("/api/card", card);
app.use("/api/user-card", usercard);
app.use("/api/transaction", transaction);
app.use("/api/team", team);
app.use("/api/dashboard", dashboard);

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
