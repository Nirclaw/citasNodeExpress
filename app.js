import express from "express";
import dotenv from "dotenv";
import appClientes from "./routers/usuarios.js";
import appCitas from "./routers/citas.js";
import appMedicos from "./routers/medicos.js";
dotenv.config();

const appExpress = express();
const config = JSON.parse(process.env.MY_CONFIG);

appExpress.use(express.json());

appExpress.use("/usuarios", appClientes);
appExpress.use("/citas", appCitas);
appExpress.use("/medicos",appMedicos)

appExpress.listen(config, () => {
  console.log(`http://${config.hostname}:${config.port}`);
});
