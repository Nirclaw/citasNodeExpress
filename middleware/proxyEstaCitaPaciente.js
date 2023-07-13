import "reflect-metadata";
import express from "express";
import { plainToClass } from "class-transformer";
import { getEstaCitaPaciente } from "../controller/getEstaCitaPaciente.js";

const proxyEstadoCitaPaciente = express();

proxyEstadoCitaPaciente.use((req, res, next) => {
  try {
    let data = plainToClass(getEstaCitaPaciente, req.query, {
      excludeExtraneousValues: true,
    });
    req.params = JSON.parse(JSON.stringify(data));
    next();
  } catch (error) {
    res.status(error.status).send(error);
  }
});

export default proxyEstadoCitaPaciente