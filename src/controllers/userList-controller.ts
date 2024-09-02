import initKnex from "knex";
import configuration from "configurations/knexfile";
import "dotenv/config";
import { Request, Response } from "express";

const knex = initKnex(configuration);

const getPhotographerList = async (req: Request, res: Response) => {
  const { user_type } = req.params;

  try {
    if (user_type === "Photographer") {
      const records = await knex("user")
        .where("user_type", user_type)
        .select("user_id");

      res.status(200).json({
        message: "List of photographers retrieved successfully",
        data: records,
      });
    } else {
      res.status(400).json({
        message: "Failed to retrieve list.",
        data: [],
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error retrieving list.",
    });
  }
};

export { getPhotographerList };
