import initKnex from "knex";
import configuration from "../knexfile.ts";
import "dotenv/config";
import { Request, Response } from "express";

const knex = initKnex(configuration);

interface ContactBody {
  contact_name: string;
  contact_email: string;
  contact_message: string;
}

//POST /contact
const addCommentMsg = async (
  req: Request<{}, {}, ContactBody>,
  res: Response
) => {
  const { contact_name, contact_email, contact_message } = req.body;

  if (!contact_name || !contact_email || !contact_message) {
    return res.status(400).json({
      message: "Please fill up the required fields",
      error: "400",
    });
  }

  const newContactMsg = {
    contact_name,
    contact_email,
    contact_message,
  };

  try {
    await knex("contact").insert(newContactMsg);
    res.status(201).json({
      message: "Message successfully created.",
      error: "201",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "An error occurred. Please try again.",
      error: "400",
    });
  }
};

export { addCommentMsg };
