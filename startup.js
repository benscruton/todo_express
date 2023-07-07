require("dotenv").config();

const {sequelize} = require("./server/config");
sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully.");
    require("./server/models");
    sequelize.sync({force: true})
      .then(rsp => console.log(rsp));
  })
  .catch(e => console.log("Error connecting database:", e));