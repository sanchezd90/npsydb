const express = require('express');
const router = express.Router();
const model = require('./../models/usuarios');
const sha1 = require('sha1');
const {v4: uuid} = require('uuid');
const { send } = require('./../services/mail')
const {validateRegistro} = require('./../middlewares/usuarios');

const showRegistro = (req, res) => {
    res.render('registro');
}

const create = async (req, res) => {
    const usuario = req.body;
    let duplicado = false;
    const uid = uuid();
    const usuarioFinal = { 
        username: usuario.username,
        pass: sha1(usuario.pass),
        email: usuario.email,
        confirmacionCorreo: uid,
    }
    //verificación duplicados
    const usuariosExistentes = await model.all();
    usuariosExistentes.forEach(usuario => {
        if (usuario.username == usuarioFinal.username || usuario.email == usuarioFinal.email) duplicado = true;
    })
    
    if (!duplicado) {
        const agregado = await model.create(usuarioFinal);
        send({
            mail : usuarioFinal.email, 
            cuerpo:
            `<h1> Bienvenido ${usuarioFinal.username}</h1>
            <a href=${process.env.URL_SERVER}:${process.env.PORT}/registro/verify/${usuarioFinal.confirmacionCorreo}">Confirmación de correo</a>
            <p>${usuarioFinal.confirmacionCorreo}</p>`,
            });
        res.redirect('/users');
    }
    else {
        res.render('registro', {message : "el nombre de usuario y/o mail ingresado ya extisten"})
    }
}

const verify = async(req, res) => {
    const {uid} = req.params;
    console.log(uid);
    const messageId = await model.verify(uid);
    res.redirect('/contributors');
}

router.get('/', showRegistro);
router.post('/', validateRegistro, create);
router.get('/verify/:uid', verify);
module.exports = router;