import bcrypt from "bcrypt";
import User from "../../modals/user.model.js";
export default async function createUser(request, response) {
  if (!request.body.username || !request.body.password) {
    response.status(400);
    response.end();
    return;
  }

  const check = await User.findOne({ username: request.body.username });

  if (check) {
    response.status(403);
    response.end();
    return;
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(request.body.password, saltRounds);

  try {
    const user = new User({
      username: request.body.username,
      password: hash,
    });

    await user.save();

    response.status(201);
    response.json(user);
    response.end();
  } catch (error) {
    if (error._message) {
      response.status(400);
      response.end();
      return;
    }
    console.log("create user error", error);
    response.status(500);
    response.end();
  }
}
