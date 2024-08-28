interface DBConnectionConfig {
    host: string | undefined;
    user: string | undefined;
    password: string | undefined;
    database: string | undefined;
    port: number | undefined;
    charset: string;
}

interface Config {
  client: string;
  connection: DBConnectionConfig;
} 
  
const configuration: Config = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT!, 10),
    charset: "utf8",
  },
}

export default configuration;
