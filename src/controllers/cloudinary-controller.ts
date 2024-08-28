import initKnex from "knex";
import configuration from "../configurations/knexfile.ts";
import "dotenv/config";

const knex = initKnex(configuration);