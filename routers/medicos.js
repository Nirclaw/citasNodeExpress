import { Router } from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const appMedicos = Router();
const connet = JSON.parse(process.env.MY_CONNECT);
let con = undefined;

appMedicos.use((req, res, next) => {
  con = mysql.createPool(connet);
  next();
});

appMedicos.get("/cantidad", (req, res) => [
  con.query(/*sql*/ `SELECT * FROM medico`, (err, data, fils) => {
    res.send(data);
  }),
]);

appMedicos.get("/cantidad/especialidad/:med_especialidad", (req, res) => [
  con.query(
    /*sql*/ `SELECT * FROM medico WHERE med_especialidad = ?`,
    [req.params.med_especialidad],
    (err, data, fils) => {
      res.send(data);
    }
  ),
]);
appMedicos.get("/cantidad/informacion", (req, res) => [
  con.query(
    /*sql*/ `SELECT med_nombreCompleto,cons_nombre FROM medico INNER JOIN consultorio ON  medico.med_consultorio= consultorio.cons_codigo`,
    (err, data, fils) => {
      res.send(data);
    }
  ),
]);
export default appMedicos;
