import express from "express";
import cheeses from "./routes/cheeses/index.js";
import users from "./routes/users/index.js";
import auth from "./routes/auth/index.js";
import "./database.js";

const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
cheeses(app);
users(app);
auth(app);

app.listen(1337, function () {
  console.log("The App is listening on port 1337");
});
