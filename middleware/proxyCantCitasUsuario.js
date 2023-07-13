import "reflect-metadata";
import express from "express";
import { plainToClass } from "class-transformer";
import { getCantCitasUsuario } from "../controller/getCantCitasUsuario.js";

const ProxyCantCitasUsuario = express();

ProxyCantCitasUsuario.use((req, res, next) => {
  try {
    let data = plainToClass(getCantCitasUsuario, req.query, {
      excludeExtraneousValues: true,
    });
    req.params = JSON.parse(JSON.stringify(data));
    next();
  } catch (error) {
    res.status(error.status).send(error);
  }
});

export default ProxyCantCitasUsuario;
