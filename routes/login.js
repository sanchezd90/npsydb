const express = require('express');
const router = express.Router();
const {auth} = require('./../models/usuarios')
const sha1 = require('sha1');
const {validateLogin} = require('./../middlewares/usuarios');

const showLogin = (req, res) => res.render('login', {message : ''});

const login = async (req, res) => {
    let {username, pass} = req.body;
    pass = sha1(pass);
    const logged = await auth(username, pass);
    if (logged.length === 0) {
        console.log("Estoy aca")
        res.render('login', {message: 'Usuario o pass incorrectos'});
    }
    else {
        const [{id, contributor,admin}] = logged;
        req.session.user = id;
        req.session.contributor = contributor;
        req.session.admin = admin;
        res.redirect('/users');

    }
}

router.get('/', showLogin);
router.post('/', validateLogin, login);
module.exports = router;