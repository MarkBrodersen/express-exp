import createUser from "./createUser.js";

export default function users(app) {
  app.route("/api/v1/users/:id?").post(createUser);
}
