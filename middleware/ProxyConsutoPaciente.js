import "reflect-metadata";
import express from "express";
import { plainToClass } from "class-transformer";
import { getConsultoPaciente } from "../controller/getConsultoPaciente.js";

const ProxyConsutoPaciente = express();

ProxyConsutoPaciente.use((req, res, next) => {
  try {
    let data = plainToClass(getConsultoPaciente, req.query, {
      excludeExtraneousValues: true,
    });
    req.params = JSON.parse(JSON.stringify(data));
    next();
  } catch (error) {
    res.status(error.status).send(error);
  }
});

export default ProxyConsutoPaciente