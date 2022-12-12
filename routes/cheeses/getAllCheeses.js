export default function getAllCheeses(request, response) {
  const id = request.params.id;
  if (id) {
    // hent en enkelt ost
  } else {
    // hent alle ostene
  }

  response.json({ message: "get all da cheesus" });
  response.end();
}
