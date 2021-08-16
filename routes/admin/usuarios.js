const express = require('express');
const router = express.Router();
const model = require('./../../models/usuarios');

const getUsuarios = async(req,res) => {
    const registros = await model.all();
    res.render('adminUsuarios' , {registros});
}
const getUsuario = async(req,res) => {
    const {id} = req.params;
    const [registro] = await model.single(id);
    res.render('updateUsuario' , {registro});
}
const updateUsuario = async(req,res) => {
    const {id} = req.params;
    const usuario = req.body;
    const {insertId} = await model.update(id,usuario);
    res.redirect('/admin/usuarios');
}
const deleteUsuario = async(req,res) => {
    const {id} = req.params;
    const {insertId} = await model.del(id);
    res.redirect('/admin/usuarios');
}


router.get('/', getUsuarios);
router.get('/update/:id', getUsuario);
router.post('/update/:id', updateUsuario);
router.get('/delete/:id', deleteUsuario);

module.exports = router;