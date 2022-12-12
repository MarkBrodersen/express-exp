import express from "express";
import cheeses from "./routes/cheeses/index.js";

const app = express();

app.use(express.static("./public"));
cheeses(app);

app.listen(1337, function () {
  console.log("The App is listening on port 1337");
});
