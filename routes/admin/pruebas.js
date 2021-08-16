const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = { dest: './public/tmp'};
const upload = multer(config);
const service  = require('./../../services/pruebas');
const model = require('./../../models/pruebas');
const {getAll, getSingle} = require('./../../models/dominios');

const getPruebas = async(req,res) => {
    const registros = await model.getAll();
    res.render('adminPruebas' , {registros});
}

const showCreatePrueba = async(req,res) => {
    const dominios = await getAll();
    res.render('createPrueba',{dominios})
} 

const createPrueba = async(req,res) => {
    const idImg = await service.createPrueba(req.body, req.file);
    res.redirect('/admin/pruebas');
} 

const showUpdatePrueba = async(req,res) => {
    const {id} = req.params;
    const [prueba] = await model.getPrueba(id);
    const dominios = await getAll();
    const [dominio] = await getSingle(prueba.dominio_principal);
    const [image] = await model.getImage(id);
    res.render('updatePrueba',{prueba,dominios,dominio,image})
} 

const updatePrueba = async(req,res) => {
    const {id} = req.params;
    const idImg = await service.updatePrueba(id, req.body, req.file);
    res.redirect('/admin/pruebas');
} 

const deletePrueba = async(req,res) => {
    const {id} = req.params;
    const {insertId} = await model.del(id);
    res.redirect('/admin/pruebas');
}

router.get('/', getPruebas);
router.get('/create', showCreatePrueba);
router.post('/create', upload.single("imagen"), createPrueba);
router.get('/update/:id', showUpdatePrueba);
router.post('/update/:id', updatePrueba);
router.get('/delete/:id', deletePrueba);

module.exports = router;