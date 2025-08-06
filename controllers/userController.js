const User = require("../models/User");
const asyncMiddleware = require("../middleware/async");
const _ = require("lodash");

//@desc Registering a new user
//@route POST /api/user/register
//@access public
exports.registerUser = asyncMiddleware(async (req, res) => {
  //check is user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(409).json({
      success: false,
      message: "User already Exists",
    });

  user = new User(_.pick(req.body, ["email", "password", "username", "role"]));
  await user.save();

  const token = user.genAuthToken();
  res
    .header("Authorization", `Bearer ${token}`)
    .status(201)
    .json({
      success: true,
      message: "User Registered Successfully",
      data: _.pick(user, ["_id", "email", "username", "createdAt", "role"]),
    });
});

//@desc Login a User
//@route POST /api/users/login
//@access public
exports.loginUser = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists
  const user = await User.findOne({ email });
  if (!user || (await !user.isPasswordValid(password)))
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });

  const token = user.genAuthToken();
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: token,
  });
});

//@desc Authenticates User's details
//@route GET /api/users/me
//@access private
exports.me = asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "id email username createdAt"
  );
  if (!user)
    return res.status(404).json({
      success: false,
      message: "User not found",
    });

  res.status(200).json({
    success: true,
    data: user,
  });
});
