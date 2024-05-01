const express = require("express");
const app = express();
const database = require("./config/database");
require("dotenv").config();
const routerApiVer1 = require("./api/v1/routes/index.route");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
database.connect();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// Router V1
routerApiVer1(app);

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});
