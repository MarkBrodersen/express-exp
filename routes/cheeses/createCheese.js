export default function createCheese(request, response) {
  console.log(request.file);
  console.log(request.body);
  response.status(201);
  response.end();
}
