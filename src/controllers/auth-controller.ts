import bcrypt from "bcryptjs";
import initKnex from "knex";
import configuration from "../knexfile.ts";
import { Request, Response } from "express";

const knex = initKnex(configuration);

//Create a new user(sign-up)
//POST /auth/register
interface UserRegistrationBody {
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  user_password: string;
  user_type: string;
}

const userRegistration = async (
  req: Request<{}, {}, UserRegistrationBody>,
  res: Response
) => {
  const {
    user_first_name,
    user_last_name,
    user_email,
    user_password,
    user_type,
  } = req.body;

  if (
    !user_first_name ||
    !user_last_name ||
    !user_email ||
    !user_password ||
    user_type
  ) {
    return res.status(400).json({
      message: "Please fill up the required fields",
      error: "400",
    });
  }

  const hashedPassword = bcrypt.hashSync(user_password);

  const newUser = {
    user_first_name,
    user_last_name,
    user_email,
    user_password: hashedPassword,
    user_type,
  };

  try {
    await knex("users").insert(newUser);
    res.status(201).json({
        message: "Registered successfully",
        error: "201"
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
        message: "Registration failed",
        error: "400",
    })
  }
};

export { userRegistration };
