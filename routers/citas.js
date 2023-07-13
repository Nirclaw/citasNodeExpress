import { Router } from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import ProxycitasMedicosFecha from "../middleware/proxycitasMedicosFecha.js";
import proxygetMatriculaMedico from "../middleware/proxygetMatriculaMedico.js";
import ProxyCantCitasUsuario from "../middleware/proxyCantCitasUsuario.js";
import ProxyCantCitasRechaFecha from "../middleware/proxyCantCitasRechaFecha.js";
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
appCitas.get("/cantidad/fecha/",ProxycitasMedicosFecha , //??matricula=789012&fecha=2023-07-20
(req, res) => { // cantidad de citas que tiene un medico en un fecha  la fecha debe ser (anio-mes-dia)
  con.query(                  
    /*sql*/ `SELECT * FROM cita WHERE cit_medico = ? AND  cit_fecha = ?`,
    [req.query.matricula, req.query.fecha],
    (err, data, fils) => {

      res.send(data);
    }
  );
});
appCitas.get("/cantidad/citas/medico/",
proxygetMatriculaMedico , //?matricula=123456
(req, res) => { //cantidad de citas que tiene un medico
  con.query(
    /*sql*/ `SELECT * FROM cita WHERE cit_medico = ? `,
    [req.query.matricula],
    (err, data, fils) => {
      res.send(data);
    }
  );
});

appCitas.get("/cantidad/citas/", 
ProxyCantCitasUsuario, //?cedula=1102391340
(req, res) => { //cantidad de citas de usuario
  con.query(    
    /*sql*/ `SELECT * FROM cita WHERE cit_datosUsuario = ? ORDER BY cita . cit_fecha ASC `,
    [req.query.cedula],
    (err, data, fils) => {
      res.send(data);
    }
  );
});

appCitas.get("/cantidad/rechazada/",
 ProxyCantCitasRechaFecha, 
(req, res) => { //?fecha=2023-07-13
  con.query( //cantidad de citas rechazadas en ese dia 
    /*sql*/ `SELECT usu_nombre,med_nombreCompleto FROM usuario INNER JOIN cita ON usuario.usu_id=cita.cit_datosUsuario INNER JOIN medico ON cita.cit_medico=medico.med_nroMatriculaProsional WHERE cit_estadoCita = 3 AND cit_fecha = ? `,
    [req.query.fecha],
    (err, data, fils) => {
      
      res.send(data);
    }
  );
});



export default appCitas;
