const express = require('express');
const router = express.Router();
const {getAll, getSingle} = require('./../models/dominios');
const {filterDominio,filterName,getPrueba,getAll:allTests} = require('./../models/pruebas');
const {verifyUser, verifyAdmin} = require('./../middlewares/auth');
const {filterPropositos,filterByPrueba} = require('./../models/propositos');
const modelReferencias = require('./../models/referencias');
const pmc = require('./../utils/pmc');

const getDominios = async (req,res) =>{
  dominios = await getAll();
  res.render('index',{dominios});
} 
const showDominio = async(req,res) =>{
  const {id} = req.params;
  const [dominio] = await getSingle(id);
  const pruebas = await filterDominio(id);
  const dominios = await getAll();
  res.render('dominio',{dominio,pruebas,dominios})
}

const prueba = async(req,res) =>{
  const {id} = req.params;
  const [prueba] = await getPrueba(id);
  const dominios = await getAll();
  const propositos = await filterByPrueba(id);
  const referencias = await modelReferencias.filterByPrueba(id);
  res.render('prueba',{id,prueba,dominios,propositos,referencias})
}

const showRecent = async(req,res) => {
  const {id} = req.params;
  const [prueba] = await getPrueba(id);
  console.log(prueba);
  console.log(prueba.nombre_principal);
  const results = await pmc.searchInTitle(prueba.nombre_principal);
  const articleList = [];
  for (let i=0;i<10;i++){
    try{
      const document = await pmc.getDocumentTitleByID(results[i]);
      articleList.push(document);
    }catch(e){
      console.log("");
    }
  };
  res.render('recent',{prueba,articleList});
}

const buscador = async(req, res) => {
  let {aBuscar} = req.body;
  aBuscar = '%' + aBuscar + '%';
  const pruebas = await filterName(aBuscar);
  res.render('pruebas', {pruebas});
}

const showProposito = async(req, res) => {
  const {id} = req.params;
  const pruebas = await filterPropositos(id);
  pruebas.forEach(addAcronym);
  res.render('pruebas', {pruebas});
}

const showAll = async(req, res) => {
  const pruebas = await allTests();
  res.render('pruebas', {pruebas});
}

const addAcronym = async(prueba) =>{
  const [row] = await getPrueba(prueba.id);
  prueba['acronimo'] = row.acronimo;
}


/* GET home page. */
router.get('/', getDominios);
router.get('/dominio/:id', showDominio);
router.post('/busqueda', buscador);
router.get('/recent/:id', showRecent);
router.get('/prueba/:id',prueba);
router.get('/proposito/:id',showProposito);
router.get('/all',showAll);


module.exports = router;
