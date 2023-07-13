import { Router } from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import proxyUser from "../middleware/proxyUsuarios.js";
dotenv.config();

const appClientes = Router();
const connet = JSON.parse(process.env.MY_CONNECT);
let con = undefined;

appClientes.use((req, res, next) => {
  con = mysql.createPool(connet);
  next();
});

appClientes.get("/cantidad", (req, res) => [
  con.query(
    /*sql*/ `SELECT * FROM usuario ORDER BY usu_nombre ASC `,
    (err, data, fils) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    }
  ),
]);

appClientes.get("/cantidad/medico/:cit_medico", (req, res) => [
  con.query(
    /*sql*/ `SELECT * FROM cita WHERE cit_medico = ?`,
    [req.params.cit_medico],
    (err, data, fils) => {
      res.send(data);
    }
  ),
]);

appClientes.get("/cantidad/consultoria/:cit_datosUsuario", (req, res) => [
  con.query(
    /*sql*/ `SELECT usu_id,usu_nombre,med_nombreCompleto,cit_fecha,cons_nombre FROM usuario INNER JOIN cita ON usuario.usu_id=cita.cit_datosUsuario INNER JOIN medico ON cita.cit_medico = medico.med_nroMatriculaProsional INNER JOIN consultorio ON medico.med_consultorio=consultorio.cons_codigo WHERE cit_datosUsuario = ?`,
    [req.params.cit_datosUsuario],
    (err, data, fils) => {
      res.send(data);
    }
  ),
]);

appClientes.get("/cantidad/info/:id_uso", (req, res) => {
  con.query(
    /*sql*/ `SELECT usu_id,usu_nombre,cit_estadoCita,cons_codigo,cons_nombre,estcita_nombre FROM usuario INNER JOIN cita ON usuario.usu_id = cita.cit_datosUsuario JOIN medico ON cita.cit_estadoCita = medico.med_consultorio INNER JOIN consultorio ON medico.med_consultorio = consultorio.cons_codigo INNER JOIN estado_cita ON cita.cit_estadoCita = estado_cita.estcita_id WHERE usu_id = ?`,
    [req.params.id_uso],
    (err, data, fils) => {
      res.send(data);
    }
  );
});

appClientes.get("/cantidad/genero/:cit_estadoCita/:usu_genero", (req, res) => {
  con.query(
    /*sql*/ `SELECT usu_nombre,cit_estadoCita,usu_genero FROM usuario INNER JOIN cita  ON usuario.usu_id=cita.cit_datosUsuario WHERE cit_estadoCita = ? AND usu_genero = ?`,
    [req.params.cit_estadoCita, req.params.usu_genero],
    (err, data, fils) => {
      res.send(data);
    }
  );
});

appClientes.post("/cantidad/create", proxyUser, (req, res) => {
  con.query(
    /*SQL*/ `INSERT INTO usuario SET ?`,
    req.body,
    (err, data, fils) => {
      if (err) {
        res.send(err.sqlMessage);
      }
      res.send(data);
    }
  );
});

export default appClientes;
