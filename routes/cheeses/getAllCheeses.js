import { ObjectId } from "mongodb";
import useDB from "../../database.js";
import dotenv from "dotenv";
dotenv.config();

function URLBuilder(id, resource) {
  return process.env.HOST_ADDRESS + `/api/v1/${resource}/${id}`;
}

export default async function getAllCheeses(request, response) {
  const { collection, client } = await useDB("cheeses");

  const id = request.params.id;
  const limit = parseInt(request.query.limit || 20);
  const skip = parseInt(request.query.skip || 0);

  const query = id ? { _id: ObjectId(id) } : {};
  const result = await collection.find(query).limit(limit).skip(skip).toArray();
  const length = await collection.countDocuments();
  client.close();

  const nextLink =
    skip + limit >= length
      ? null
      : process.env.HOST_ADDRESS +
        `/api/v1/cheeses?limit=${limit}&skip=${skip + limit}`;
  const previousLink =
    skip === 0
      ? null
      : process.env.HOST_ADDRESS +
        `/api/v1/cheeses?limit=${limit}&skip=${
          skip - limit < 0 ? 0 : skip - limit
        }`;

  const presentation = {
    count: length,
    next: nextLink,
    previous: previousLink,
    results: result.map((item) => ({
      ...item,
      url: URLBuilder(item._id, "cheese"),
    })),
  };

  response.json(
    id
      ? { ...result[0], url: URLBuilder(result[0]._id, "cheese") }
      : presentation
  );
  response.end();
}
