import "reflect-metadata";
import express from "express";
import { plainToClass } from "class-transformer";
import { getCantCitasRechaFecha } from "../controller/getCantCitasRechaFecha.js";

const ProxyCantCitasRechaFecha = express();

ProxyCantCitasRechaFecha.use((req, res, next) => {
  try {
    let data = plainToClass(getCantCitasRechaFecha, req.query, {
      excludeExtraneousValues: true,
    });
    console.log(req.query);
    req.params = JSON.parse(JSON.stringify(data));
    next();
  } catch (error) {
    res.status(error.status).send(error);
  }
});

export default ProxyCantCitasRechaFecha;



