const express = require('express');
const router = express.Router();
const model = require('./../../models/dominios');

const getDominios = async(req,res) => {
    const registros = await model.getAll();
    res.render('adminDominios' , {registros});
}
const showDominio = async(req,res) => {
    const {id} = req.params;
    const [registro] = await model.getSingle(id);
    res.render('updateDominio' , {registro});
}

const showCreateDominio = async(req,res) => {
    res.render('createDominio');
}

const createDominio = async(req,res) => {
    const dominio = req.body;
    const {insertId} = await model.createDominio(dominio);
    res.redirect('/admin/dominios');
}

const updateDominio = async(req,res) => {
    const {id} = req.params;
    const dominio = req.body;
    const {insertId} = await model.updateDominio(id,dominio);
    res.redirect('/admin/dominios');
}
const deleteDominio = async(req,res) => {
    const {id} = req.params;
    const {insertId} = await model.delDominio(id);
    res.redirect('/admin/dominios');
}


router.get('/', getDominios);
router.get('/update/:id', showDominio);
router.post('/update/:id', updateDominio);
router.get('/create', showCreateDominio);
router.post('/create', createDominio);
router.get('/delete/:id', deleteDominio);
module.exports = router;