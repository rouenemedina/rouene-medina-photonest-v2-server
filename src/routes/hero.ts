import initKnex from "knex";
import configuration from "../configurations/knexfile.ts";
import "dotenv/config";
import { Request, Response } from "express";

const knex = initKnex(configuration);

interface HeroBody {
    hero_description: string;
    user_id: number;
}

//POST /upload
const uploadImg = async (req: Request<{}, {}>, res: Response) => {

};