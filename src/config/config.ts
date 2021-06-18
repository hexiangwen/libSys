import development from "./env/development";
import dotenv from "dotenv";

dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST || development.HOST;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || development.MYSQL_DATABASE;
const MYSQL_USER = process.env.MYSQL_USER || development.MYSQL_USER;
const MYSQL_PASS = process.env.MYSQL_PASS || development.MYSQL_PASS;

const MYSQL = {
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  pass: MYSQL_PASS,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || development.HOST;
const SERVER_PORT = process.env.SERVER_PORT || development.POST;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  mysql: MYSQL,
  server: SERVER,
};

export default config;
