import getAllCheeses from "./getAllCheeses.js";
import createCheese from "./createCheese.js";
import authorization from "../../middlewares/auth.js";
import upload from "../../middlewares/upload.js";

export default function cheeses(app) {
  app
    .route("/api/v1/cheeses/:id?")
    .get(getAllCheeses)
    .all(authorization)
    .post(upload.single("image"), createCheese);
}
