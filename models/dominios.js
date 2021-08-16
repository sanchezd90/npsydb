const pool = require('./../utils/bd');
const t_dominios = 'denominacion_dominios'

const getAll = async() => {
    const query = "SELECT id,es,en FROM ?? WHERE deleted = 0";
    const params = [t_dominios]
    const rows = await pool.query(query,params);
    return rows;
}
const getSingle = async(id) => {
    const query = "SELECT id,es,en FROM ?? WHERE id=? AND deleted = 0";
    const params = [t_dominios,id];
    const rows = await pool.query(query,params);
    return rows;
}
const createDominio = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [t_dominios, obj];
    return await pool.query(query, params);
}
const updateDominio = async(id, obj) => {
    const query = "UPDATE ?? SET ? WHERE id = ?";
    const params = [t_dominios, obj, id];
    return await pool.query(query, params);
}
const delDominio = async(id) => {
    const query = "UPDATE ?? SET deleted = 1 WHERE id = ?";
    const params = [t_dominios, id];
    return await pool.query(query, params);
}

module.exports = {getAll,getSingle,createDominio,updateDominio,delDominio}