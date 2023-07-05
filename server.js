require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');

app.use(
  cors(),
  express.json(),
  express.urlencoded({"extended": true})
);    

const {sequelize} = require("./server/config");
sequelize.authenticate()
  .then(() => console.log("Database connected successfully."));
// sequelize.sync()
//   .then(d => console.log(d));

const routes = require("./server/routes");
// app.use(express.static('client/build'));
app.use(routes);

app.listen(port, () => console.log(`Listening on ${port}...`));