import Cheese from "../../modals/cheese.modal.js";
export default async function createCheese(request, response) {
  try {
    const document = {
      ...request.body,
      image: { ...request.file },
    };

    const cheese = new Cheese(document);

    await cheese.save();

    response.status(201);
    response.json(cheese);
    response.end();
  } catch (error) {
    if (error._message) {
      response.status(400);
      response.end();
      return;
    }
    console.log("create cheese error", error);
    response.status(500);
    response.end();
  }
}
