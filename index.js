/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const express = require("express");
const dbConnection = require("./database/config");
const cors = require("cors");

require("dotenv").config();

console.log(process.env.PORT)

//Crear el servidor de express
const app = express();

//CORS
app.use(cors());

//Base de datos
dbConnection();

//Directorio publico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Rutas
// Auth // crear, login, renew

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// CRUD: Eventos

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log("Servidor iniciado en el puerto " + process.env.PORT);
});