import bcrypt from "bcrypt";
import useDB from "../../database.js";

export default async function createUser(request, response) {
  if (!request.body.username || !request.body.password) {
    response.status(400);
    response.end();
    return;
  }

  const { collection, client } = await useDB("users");

  const check = await collection.findOne({ username: request.body.username });

  if (check) {
    response.status(403);
    response.end();
    return;
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(request.body.password, saltRounds);

  try {
    const result = await collection.findOneAndUpdate(
      { createdAt: Date.now() },
      {
        $set: {
          username: request.body.username,
          password: hash,
        },
      },
      { upsert: true, returnDocument: "after" }
    );
    client.close();

    response.status(201);
    response.json(result.value);
    response.end();
  } catch (error) {
    console.log("create user error", error);
    response.status(500);
    response.end();
  }
}
