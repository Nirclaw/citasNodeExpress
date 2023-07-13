import express from "express";
import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { user } from "../controller/user.js";

const proxyUser = express();

proxyUser.use((req, res, next) => {
  try {
    let data = plainToClass(user, req.body, { excludeExtraneousValues: true });

    req.body = JSON.parse(JSON.stringify(data));

    next();
  } catch (err) {
    res.status(err.status).send(err);
  }
});

export default proxyUser;
