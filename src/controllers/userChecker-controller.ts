import initKnex from "knex";
import configuration from "configurations/knexfile";
import "dotenv/config";
import { Request, Response } from "express";

const knex = initKnex(configuration);

const userChecker = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    try {
        const tablesToCheck = ["hero", "featured", "about", "connect", "gallery"];
        
        let hasFiles = false;
        for (const table of tablesToCheck) {
            const records = await knex(table).where("user_id", user_id);
            if (records.length > 0) {
                hasFiles = true;
                break;
            }
        }
        res.json(hasFiles);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Error retrieving information",
            error: "400"
        });
    }
};

export { userChecker };