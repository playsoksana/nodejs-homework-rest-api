const app = require("../app.js");

const PORT = process.env.PORT || 8081;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error at a server launch");
    return;
  }
  console.log(`Server running. Use our API on port: ${PORT}`);
});
