import "reflect-metadata";
import express from "express";
import { plainToClass } from "class-transformer";
import { getCantEspecialidades } from "../controller/getCantEspecialidades.js";

const ProxyCantEspecialidades = express();

ProxyCantEspecialidades.use((req, res, next) => {
  try {
    let data = plainToClass(getCantEspecialidades, req.query, {
      excludeExtraneousValues: true,
    });
    req.params = JSON.parse(JSON.stringify(data));
    next();
  } catch (error) {
    res.status(error.status).send(error);
  }
});

export default ProxyCantEspecialidades;
