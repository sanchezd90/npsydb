const pool = require('./../utils/bd');
const t_propositos = 'propositos';
const t_es_proposito = "es_proposito";
const t_pruebas = "pruebas";

const getAll = async() => {
    const query = "SELECT id, es FROM ?? WHERE deleted = 0";
    const params = [t_propositos];
    const rows = await pool.query(query, params);
    return rows;
}

const getProposito = async(id) => {
    const query = "SELECT id,es,en FROM ?? WHERE id = ? AND deleted = 0";
    const params = [t_propositos, id];
    const rows = await pool.query(query, params);
    return rows;
}
const filterPropositos = async(id) => {
    const query = "SELECT prop.es, pruebas.id, pruebas.nombre_principal FROM ?? AS esp JOIN ?? AS prop ON esp.proposito = prop.id JOIN ?? as pruebas ON esp.prueba = pruebas.id WHERE esp.proposito = ? AND esp.active = 1 AND pruebas.deleted = 0";
    const params = [t_es_proposito,t_propositos,t_pruebas, id];
    const rows = await pool.query(query, params);
    return rows;
}
const filterByPrueba = async(id) => {
    const query = "SELECT esp.proposito, esp.prueba, p.es, p.id FROM ?? AS esp JOIN ?? AS p ON esp.proposito = p.id WHERE esp.prueba = ? AND esp.active = 1";
    const params = [t_es_proposito,t_propositos, id];
    const rows = await pool.query(query, params);
    return rows;
}
const createProposito = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [t_propositos, obj];
    return await pool.query(query, params);
}
const updateProposito = async(id, obj) => {
    const query = "UPDATE ?? SET ? WHERE id = ?";
    const params = [t_propositos, obj, id];
    return await pool.query(query, params);
}
const delProposito = async(id) => {
    const query = "UPDATE ?? SET deleted = 1 WHERE id = ?";
    const params = [t_propositos, id];
    return await pool.query(query, params);
}

const getMaxId = async() => {
    const query = "SELECT MAX(id) FROM ??";
    const params = [t_propositos];
    const rows = await pool.query(query, params);
    return rows;
}

module.exports = {getAll,getProposito,createProposito,updateProposito,delProposito,getMaxId,filterPropositos,filterByPrueba}