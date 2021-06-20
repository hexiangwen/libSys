import express from "./config/express";
import mongoose from "./config/mongoose";
mongoose();
const app = express();
export default app;
