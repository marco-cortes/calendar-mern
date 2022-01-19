const { Router } = require("express");
const { check } = require("express-validator")

const { createUser, login, renew } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validation } = require("../middlewares/validation");

const router = Router();

router.post(
    "/new", 
    [ //middlewares
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({min:6}),
        validation
    ], 
    createUser);

router.get("/renew", validateJWT, renew);

router.post(
    "/", 
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({min:6}),
        validation
    ],
    login);

module.exports = router;