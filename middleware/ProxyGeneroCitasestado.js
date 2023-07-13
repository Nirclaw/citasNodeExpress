import "reflect-metadata";
import express from "express";
import { plainToClass } from "class-transformer";
import { getGeneroyEstadoCita } from "../controller/getGeneroCita.js";

const proxyGeneroCitaEstado = express();

proxyGeneroCitaEstado.use((req, res, next) => {
  try {
    let data = plainToClass(getGeneroyEstadoCita, req.query, {excludeExtraneousValues: true})
    
    console.log(req.query);
    req.params=JSON.parse(JSON.stringify(data))
    next()
  } catch (error) {
    res.status(error.status).send(error);
  }
});

export default proxyGeneroCitaEstado