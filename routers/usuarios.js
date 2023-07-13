import { Router } from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import proxyUser from "../middleware/proxyUsuarios.js";
import proxyGeneroCitaEstado from "../middleware/ProxyGeneroCitasestado.js";
import proxyEstadoCitaPaciente from "../middleware/proxyEstaCitaPaciente.js";
import ProxyConsutoPaciente from "../middleware/ProxyConsutoPaciente.js";
import proxygetMatriculaMedico from "../middleware/proxygetMatriculaMedico.js";
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


appClientes.get("/cantidad/medico/", //?matricula=98123
proxygetMatriculaMedico//retorna todas las citas de un medico en especifico
 , 
(req, res) => [ 
  con.query(
    /*sql*/ `SELECT * FROM cita WHERE cit_medico = ?`,
    [req.query.matricula],
    (err, data, fils) => {
      res.send(data);
    }
  ),
]);

appClientes.get("/cantidad/consultoria/", //?cedula=1102391340
ProxyConsutoPaciente, //todas las consultorias por paciente
 (req, res) => [
  con.query(
    /*sql*/ `SELECT usu_id,usu_nombre,med_nombreCompleto,cit_fecha,cons_nombre FROM usuario INNER JOIN cita ON usuario.usu_id=cita.cit_datosUsuario INNER JOIN medico ON cita.cit_medico = medico.med_nroMatriculaProsional INNER JOIN consultorio ON medico.med_consultorio=consultorio.cons_codigo WHERE cit_datosUsuario = ?`,
    [req.query.cedula],
    (err, data, fils) => {
      res.send(data);
    }
  ),
]);

appClientes.get("/cantidad/info/", //?cedula=1
proxyEstadoCitaPaciente, (req, res) => {   //conocer el estado de las citas programadas, el consultorio y el nombre del paciente
  con.query(
    /*sql*/ `SELECT usu_id,usu_nombre,cit_estadoCita,cons_codigo,cons_nombre,estcita_nombre FROM usuario INNER JOIN cita ON usuario.usu_id = cita.cit_datosUsuario JOIN medico ON cita.cit_estadoCita = medico.med_consultorio INNER JOIN consultorio ON medico.med_consultorio = consultorio.cons_codigo INNER JOIN estado_cita ON cita.cit_estadoCita = estado_cita.estcita_id WHERE usu_id = ?`,
    [req.query.cedula],
    (err, data, fils) => {
      res.send(data);
    }
  );
});

appClientes.get(
  "/cantidad/genero/",//?estado=1&genero=1
  proxyGeneroCitaEstado,
  (req, res) => {
    // muestra los generos y el estado de sus citas
    con.query(
      /*sql*/ `SELECT usu_nombre,cit_estadoCita,usu_genero FROM usuario INNER JOIN cita  ON usuario.usu_id=cita.cit_datosUsuario WHERE cit_estadoCita = ? AND usu_genero = ?`,
      [req.query.estado,req.query.genero],
      (err, data, fils) => {
        if (err) {
          res.send(err);
        }
        res.send(data);
      }
    );
  }
);

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
