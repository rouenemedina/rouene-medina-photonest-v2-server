import initKnex from "knex";
import configuration from "configurations/knexfile";
import "dotenv/config";
import { Request, Response } from "express";
import { uploadImgHandler } from "./uploadImg-controller";

const knex = initKnex(configuration);

//POST /upload
const uploadConnect = async (req: Request, res: Response) => {
    const table_name = "connect";
    await uploadImgHandler(table_name)(req, res);
};

//GET /:userId
const connectIndex = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const response = await knex("connect").where({ user_id }).first();
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Error retrieving information",
            error: "400"
        });
    }
};

export { uploadConnect, connectIndex };