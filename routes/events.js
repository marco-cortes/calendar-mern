/**
 * Event Routes
 * /api/events
 */

const { Router } = require("express");
const { check } = require("express-validator");

const { getEvents, newEvent, updateEvent, deleteEvent } = require("../controllers/events");
const isDate = require("../helpers/isDate");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validation } = require("../middlewares/validation");



//Todas deben pasar por la validacion del JWT
const router = Router();
router.use(validateJWT);

//Obtener todos los eventos
router.get("/", getEvents);

//Crear un nuevo evento
router.post("/create", [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Date start is required").custom(isDate),
    check("end", "Date end is required").custom(isDate),
    validation
], newEvent);

//Actualizar un evento
router.put("/update/:id", [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Date start is required").custom(isDate),
    check("end", "Date end is required").custom(isDate),
    validation
], updateEvent);

//Eliminar un evento
router.delete("/delete/:id", deleteEvent);


module.exports = router;