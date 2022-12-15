import useDB from "../../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default async function token(request, response) {
  if (!request.body.username || !request.body.password) {
    response.status(400);
    response.end();
    return;
  }

  const { collection, client } = await useDB("users");

  try {
    const user = await collection.findOne({ username: request.body.username });
    client.close();
    if (!user) {
      response.status(403);
      response.end();
      return;
    }

    if (!(await bcrypt.compare(request.body.password, user.password))) {
      response.status(403);
      response.end();
      return;
    }

    const newToken = jwt.sign(
      { username: user.username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    response.status(201);
    response.send(newToken);
    response.end();
  } catch (error) {
    console.log("authentication token error", error);
    response.status(500);
    response.end();
  }
}
