export default function createCheese(request, response) {
  console.log(request.file);
  console.log(request.body);
  response.json({ message: "make all da cheese" });
  response.end();
}
