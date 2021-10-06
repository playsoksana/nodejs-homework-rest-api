const app = require("../app.js");
require("dotenv").config();

const { connectMongo } = require("../db/connection.js");
const PORT = process.env.PORT || 8082;

const start = async () => {
  await connectMongo();
  app.listen(PORT, (err) => {
    if (err) {
      console.log("Error at a server launch");
      return;
    }
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};

start();
