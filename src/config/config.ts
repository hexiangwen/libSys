import development from "./env/development";
import dotenv from "dotenv";

dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST || development.HOST;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || development.MYSQL_DATABASE;
const MYSQL_USER = process.env.MYSQL_USER || development.MYSQL_USER;
const MYSQL_PASS = process.env.MYSQL_PASS || development.MYSQL_PASS;

const MONGO_USERNAME = process.env.MONGO_USERNAME || development.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || development.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_URL || development.MONGO_URL;

const MYSQL = {
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  pass: MYSQL_PASS,
};

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

const MONGO = {
  host: MONGO_HOST,
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  options: MONGO_OPTIONS,
  url: development.MONGO_URL,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || development.HOST;
const SERVER_PORT = process.env.SERVER_PORT || development.POST;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  mysql: MYSQL,
  mongo: MONGO,
  server: SERVER,
};

export default config;
