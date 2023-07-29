require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
const cookieParser = require("cookie-parser");

app.use(
  cookieParser(),
  cors(),
  express.json(),
  express.urlencoded({"extended": true})
);    

require("./server/config");

const routes = require("./server/routes");
// app.use(express.static('client/build'));
app.use(routes);

app.listen(port, () => console.log(`Listening on ${port}...`));