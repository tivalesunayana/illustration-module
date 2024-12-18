import User from "../model/user.js";
import { errorHandler } from "../utlis/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "Email already in use"));
    }

    const hashPassword = bcryptjs.hashSync(password, 10);
    const user = new User({ name, email, password: hashPassword });

    await user.save();
    res.status(201).json({ success: true, message: "Sign Up successful" });
  } catch (error) {
    next(error);
  }
};

export const Signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "please fill all the filed"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "invalid email"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "invalid password"));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("accsess token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
