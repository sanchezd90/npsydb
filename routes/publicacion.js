const express = require('express');
const router = express.Router();
const modelReferencias = require('./../models/referencias');
const modelAutores = require('./../models/autores');

const publicacion = async(req,res) =>{
    const {id} = req.params;
    const [publicacion] = await modelReferencias.getSingle(id);
    const autores = await modelAutores.filterByPublicacion(id);
    res.render('publicacion',{publicacion,autores})
  }
const publicacionesByAutor = async(req,res) =>{
    const {name} = req.params;    
    const publicaciones = await modelAutores.getByName(name);    
    res.render('publicaciones',{publicaciones})
  }
const publicacionesByJournal = async(req,res) =>{
    const {journal} = req.params;    
    const publicaciones = await modelReferencias.filterByJournal(journal);    
    res.render('publicaciones',{publicaciones})
  }

router.get('/:id',publicacion);
router.get('/autor/:name',publicacionesByAutor);
router.get('/journal/:journal',publicacionesByJournal);

module.exports = router;