const express = require('express');
const router = express.Router();
const {getAll, getSingle} = require('../../models/dominios');
const {filterDominio,filterName,getPrueba} = require('../../models/pruebas');
const {single} = require('../../models/usuarios');

const displayIndex = async (req,res) =>{
  const dominios = await getAll();
  const [usuario] = await single(req.session.user);
  res.render('userIndex',{dominios,usuario});
} 
const showDominio = async(req,res) =>{
  const {id} = req.params;
  const [dominio] = await getSingle(id);
  const pruebas = await filterDominio(id);
  const [usuario] = await single(req.session.user);
  res.render('dominio',{dominio,pruebas,usuario})
}
const prueba = async(req,res) =>{
  const {id} = req.params;
  const [prueba] = await getPrueba(id);
  res.render('prueba',{prueba})
}

const buscador = async(req, res) => {
  let {aBuscar} = req.body;
  aBuscar = '%' + aBuscar + '%';
  const pruebas = await filterName(aBuscar);
  res.render('pruebas', {pruebas});
}

/* GET home page. */
router.get('/', displayIndex);
router.get('/dominio/:id', showDominio);
router.post('/busqueda', buscador);
router.get('/users/prueba/:id',prueba);


module.exports = router;
