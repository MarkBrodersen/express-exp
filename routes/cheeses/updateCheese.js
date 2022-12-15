import { ObjectId } from "mongodb";
import useDB from "../../database.js";
import { unlink } from "node:fs/promises";

export default async function updateCheese(request, response) {
  const { collection, client } = await useDB("cheeses");

  try {
    let document = {};

    if (!request.file) {
      document = { ...request.body };
    } else {
      document = {
        ...request.body,
        image: { ...request.file },
      };
      const oldResult = await collection.findOne({
        _id: ObjectId(request.params.id),
      });
      await unlink(oldResult.image.path);
    }

    const result = await collection.findOneAndUpdate(
      { _id: ObjectId(request.params.id) },
      { $set: { ...document } },
      { returnDocument: "after" }
    );
    client.close();

    response.status(201);
    response.json(result.value);
    response.end();
  } catch (error) {
    console.log("update cheese error", error);
    response.status(500);
    response.end();
  }
}
