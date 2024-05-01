const express = require("express");
const app = express();
const database = require("./config/database");
require("dotenv").config();
const routerApiVer1 = require("./api/v1/routes/index.route");

database.connect();
const port = process.env.PORT;

// Router V1
routerApiVer1(app)


app.listen(port, () => {
  console.log(`App listening at ${port}`);
});