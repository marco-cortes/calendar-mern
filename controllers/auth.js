const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/User");

const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {

    try {
        let usuario = await Usuario.findOne({ email: req.body.email });
        if (usuario) {
            console.log(usuario);
            return res.status(400).json({
                ok: false,
                message: "User already exists"
            });
        }
        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(usuario.password, salt);

        await usuario.save();
        const token = await generateJWT(usuario._id, usuario.name);
        return res.status(201).json({
            ok: true,
            message: "register",
            user: {
                name: usuario.name,
                uid: usuario._id,
            }
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error in the server",
        });
    }
}

const login = async (req, res = response) => {

    try {
        const usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                message: "User not found"
            });
        }
        // Validar contraseña
        const validPassword = bcrypt.compareSync(req.body.password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: "Password incorrect"
            });
        }

        // Crear token
        const token = await generateJWT(usuario._id, usuario.name);

        return res.json({
            ok: true,
            message: "login",
            user: {
                name: usuario.name,
                uid: usuario._id,
                token

            }
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error in the server",
        });
    }
}

const renew = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        message: "renew",
        user: {
            uid,
            name,
            token
        }
    })
}

module.exports = {
    createUser,
    login,
    renew
}