const pool = require('./../utils/bd');
const t_referencias = 'referencia_asociada';

const getAll = async() => {
    const query = "SELECT * FROM ??";
    const params = [t_referencias];
    const rows = await pool.query(query, params);
    return rows;
}

const filterByPrueba = async(id) => {
    const query = "SELECT * FROM ?? WHERE prueba = ? AND deleted = 0 ORDER BY ref_completa ASC";
    const params = [t_referencias, id];
    const rows = await pool.query(query, params);
    return rows;
}

const filterByJournal = async(journal) => {
    const query = "SELECT * FROM ?? WHERE journal = ? AND deleted = 0 ORDER BY ref_completa ASC";
    const params = [t_referencias, journal];
    const rows = await pool.query(query, params);
    return rows;
}

const getSingle = async(id) => {
    const query = "SELECT * FROM ?? WHERE id=? AND deleted = 0";
    const params = [t_referencias, id];
    const rows = await pool.query(query,params);
    return rows;
}

module.exports = {getAll,getSingle,filterByPrueba,filterByJournal}