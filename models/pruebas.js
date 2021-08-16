const pool = require('./../utils/bd');
const t_pruebas = 'pruebas';
const t_pruebas_imagenes = 'pruebas_imagenes';
const t_dominios = 'denominacion_dominios';
const t_denominaciones = 'denominaciones';
const t_es_proposito = 'es_proposito';
const t_referencias = 'referencia_asociada';

const getAll = async() => {
    const query = "SELECT p.id, p.nombre_principal, p.dominio_principal, p.ref_publicacion, d.es, denom.acronimo FROM ?? AS p JOIN ?? AS d ON p.dominio_principal = d.id JOIN ?? AS denom ON p.id = denom.prueba WHERE p.deleted = 0 ORDER BY p.nombre_principal ASC";
    const params = [t_pruebas, t_dominios, t_denominaciones];
    const rows = await pool.query(query, params);
    return rows;
}
const getPrueba = async(id) => {
    const query = "SELECT p.id, p.nombre_principal, p.dominio_principal, p.ref_publicacion, d.es, denom.acronimo FROM ?? AS p JOIN ?? AS d ON p.dominio_principal = d.id JOIN ?? AS denom ON p.id = denom.prueba WHERE p.id = ? AND p.deleted = 0";
    const params = [t_pruebas, t_dominios,t_denominaciones, id];
    const rows = await pool.query(query, params);
    return rows;
}
const filterDominio = async(id_dominio) => {
    const query = "SELECT p.id, p.nombre_principal, p.dominio_principal, d.es, denom.acronimo FROM ?? AS p JOIN ?? AS d ON p.dominio_principal = d.id JOIN ?? as denom ON p.id = denom.prueba WHERE p.dominio_principal = ? AND p.deleted = 0";
    const params = [t_pruebas, t_dominios, t_denominaciones, id_dominio];
    const rows = await pool.query(query, params);
    return rows;
}
const filterName = async(name) => {
    const query = "SELECT p.id, p.nombre_principal, p.dominio_principal, d.es, denom.acronimo FROM ?? AS p JOIN ?? AS d ON p.dominio_principal = d.id JOIN ?? as denom ON p.id = denom.prueba WHERE p.nombre_principal LIKE ? AND p.deleted = 0";
    const params = [t_pruebas, t_dominios,t_denominaciones, name];
    const rows = await pool.query(query, params);
    return rows;
}
const create = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [t_pruebas, obj];
    return await pool.query(query, params);
}
const update = async(id, obj) => {
    const query = "UPDATE ?? SET ? WHERE id = ?";
    const params = [t_pruebas, obj, id];
    return await pool.query(query, params);
}
const getImage = async(id) => {
    const query = "SELECT id, uuid FROM ?? WHERE id = ? AND deleted = 0";
    const params = [t_pruebas_imagenes, id];
    const rows = await pool.query(query, params);
    return rows;
}
const createImages = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [t_pruebas_imagenes, obj];
    return await pool.query(query, params);
}
const updateImages = async(id, obj) => {
    const query = "UPDATE ?? SET ? WHERE id = ?";
    const params = [t_pruebas_imagenes, obj, id];
    return await pool.query(query, params);
}
const del = async(id) => {
    const query = "UPDATE ?? SET deleted = 1 WHERE id = ?";
    const params = [t_pruebas, id];
    return await pool.query(query, params);
}
const delImages = async(id) => {
    const query = "UPDATE ?? SET deleted = 1 WHERE id = ?";
    const params = [t_pruebas_imagenes, id];
    return await pool.query(query, params);
}

module.exports = {getAll, getPrueba, filterDominio, filterName, create, update, del, getImage, createImages, updateImages, delImages}