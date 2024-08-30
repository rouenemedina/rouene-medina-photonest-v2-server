import initKnex from "knex";
import configuration from "../configurations/knexfile.ts";
import "dotenv/config";
import { Request, Response } from "express";
import { uploadImgHandler } from "./uploadImg-controller.ts";

const knex = initKnex(configuration);

// interface HeroBody {
//     hero_description: string;
//     user_id: number;
// }

//POST /upload
const uploadHero = async (req: Request, res: Response) => {
    const table_name = "hero";
    return uploadImgHandler(table_name);
};

//GET /hero/:userId
const heroIndex = async (req: Request, res: Response) => {
    try {
        const { user_id } =req.params;
        const response = await knex("hero").where({ user_id }).first();
        res.status(200).json(response);
    } catch(err) {
        console.log(err);
        res.status(400).json({
            message: "Error retrieving information.",
            error: "400"
        });
    }
};

export { uploadHero, heroIndex };