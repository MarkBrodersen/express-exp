import useDB from "../../database.js";

export default async function createCheese(request, response) {
  const { collection, client } = await useDB("cheeses");

  try {
    const document = {
      ...request.body,
      image: { ...request.file },
    };

    const result = await collection.findOneAndUpdate(
      { createdAt: Date.now() },
      { $set: { ...document } },
      { upsert: true, returnDocument: "after" }
    );
    client.close();

    response.status(201);
    response.json(result.value);
    response.end();
  } catch (error) {
    console.log("create cheese error", error);
    response.status(500);
    response.end();
  }
}
