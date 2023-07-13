import "reflect-metadata";
import express from "express";
import { plainToClass } from "class-transformer";
import { getMatriculaMedico } from "../controller/getMatriculaMedico.js";

const proxygetMatriculaMedico = express();

proxygetMatriculaMedico.use((req, res, next) => {
  try {
    let data = plainToClass(getMatriculaMedico, req.query, {excludeExtraneousValues: true})
    
    console.log(req.query);
    req.params=JSON.parse(JSON.stringify(data))
    next()
  } catch (error) {
    res.status(error.status).send(error);
  }
});

export default proxygetMatriculaMedico