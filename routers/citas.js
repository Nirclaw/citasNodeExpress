import { Router } from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const appCitas = Router();

const connect = JSON.parse(process.env.MY_CONNECT);

let con = undefined;

appCitas.use((req, res, next) => {
  con = mysql.createPool(connect);
  next();
});

appCitas.get("/cantidad", (req, res) => {
  con.query(
    /*sql*/ `SELECT * FROM cita ORDER BY cita . cit_fecha ASC `,
    (err, data, fils) => {
      res.send(data);
    }
  );
});
appCitas.get("/cantidad/:cit_medico/:cit_fecha", (req, res) => {
  con.query(
    /*sql*/ `SELECT * FROM cita WHERE cit_medico = ? AND  cit_fecha = ?`,
    [req.params.cit_medico, req.params.cit_fecha],
    (err, data, fils) => {
      res.send(data);
    }
  );
});
appCitas.get("/cantidad/:cit_medico", (req, res) => {
  con.query(
    /*sql*/ `SELECT * FROM cita WHERE cit_medico = ? `,
    [req.params.cit_medico],
    (err, data, fils) => {
      res.send(data);
    }
  );
});

appCitas.get("/cantidad/citas/:cit_datosUsuario", (req, res) => {
  con.query(
    /*sql*/ `SELECT * FROM cita WHERE cit_datosUsuario = ? ORDER BY cita . cit_fecha ASC `,
    [req.params.cit_datosUsuario],
    (err, data, fils) => {
      res.send(data);
    }
  );
});

appCitas.get("/cantidad/rechazada/:cit_fecha", (req, res) => {
  con.query(
    /*sql*/ `SELECT usu_nombre,med_nombreCompleto FROM usuario INNER JOIN cita ON usuario.usu_id=cita.cit_datosUsuario INNER JOIN medico ON cita.cit_medico=medico.med_nroMatriculaProsional WHERE cit_estadoCita = 3 AND cit_fecha = ? `,
    [req.params.cit_fecha],
    (err, data, fils) => {
      res.send(data);
    }
  );
});



export default appCitas;
