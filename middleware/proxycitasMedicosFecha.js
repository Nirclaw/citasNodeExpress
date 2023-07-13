import "reflect-metadata";
import express from "express";
import { plainToClass } from "class-transformer";
import { getcitasMedicosFecha } from "../controller/getcitasMedicosFecha.js";

const ProxycitasMedicosFecha = express();

ProxycitasMedicosFecha.use((req, res, next) => {
  try {
    let data = plainToClass(getcitasMedicosFecha, req.query, {
      excludeExtraneousValues: true,
    });
   
    req.params = JSON.parse(JSON.stringify(data));
    next();
  } catch (error) {
    res.status(error.status).send(error);
  }
});

export default ProxycitasMedicosFecha