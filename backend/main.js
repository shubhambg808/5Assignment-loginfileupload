require("dotenv").config();
const app = require("./app");
const connectUser = require("./db/mongodb");
const port = process.env.PORT;

// my cloud mongodb url--->
const URL =
  "mongodb+srv://shubham:6TR1fMSZ5qXgDt7d@cluster0.93huxba.mongodb.net/?retryWrites=true&w=majority";

connectUser(URL)
  .then((result) => {
    app.listen(port, () => {
      console.log("Database Connected , Server Running On Port", port);
    });
  })
  .catch((err) => {
    console.log("Unable to connect Database");
  });
