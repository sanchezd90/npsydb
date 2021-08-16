const express = require('express');
const router = express.Router();
const model = require('./../../models/propositos');

const getPropositos = async(req,res) => {
    const registros = await model.getAll();
    res.render('adminPropositos' , {registros});
}

const showCreateProposito = async(req,res) => {
    const [row] = await model.getMaxId();
    const maxId = row['MAX(id)'];
    const id = parseInt(maxId)+1;
    res.render('createProposito',{id});
}

const createProposito = async(req,res) => {
    const dominio = req.body;
    const {insertId} = await model.createProposito(dominio);
    res.redirect('/admin/propositos');
}

const showProposito = async(req,res) => {
    const {id} = req.params;
    const [registro] = await model.getProposito(id);
    res.render('updateProposito' , {registro});
}

const updateProposito = async(req,res) => {
    const {id} = req.params;
    const dominio = req.body;
    const {insertId} = await model.updateProposito(id,dominio);
    res.redirect('/admin/propositos');
}
const deleteProposito = async(req,res) => {
    const {id} = req.params;
    const {insertId} = await model.delProposito(id);
    res.redirect('/admin/propositos');
}


router.get('/', getPropositos);
router.get('/update/:id', showProposito);
router.post('/update/:id', updateProposito);
router.get('/create', showCreateProposito);
router.post('/create', createProposito);
router.get('/delete/:id', deleteProposito);
module.exports = router;