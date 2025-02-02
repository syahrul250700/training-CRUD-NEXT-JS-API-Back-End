import express from "express";
import bodyParser from "body-parser";
import routers from "../routers/index.js";
import { ErrorMiddleware } from "../middlewares/ErrorMiddleware.js";
import cookieParser from "cookie-parser";

export const api = express();
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());
api.use(cookieParser());
api.use("/", routers);
api.use(ErrorMiddleware);
