const pool = require('./../utils/bd');
const t_autores = 'es_autor';
const t_referencias = 'referencia_asociada';

const getAll = async() => {
    const query = "SELECT * FROM ??";
    const params = [t_autores];
    const rows = await pool.query(query, params);
    return rows;
}

const filterByPublicacion = async(ref) => {
    const query = "SELECT * FROM ?? WHERE id_referencia = ?";
    const params = [t_autores, ref];
    const rows = await pool.query(query, params);
    return rows;
}

const getByName = async(name) => {
    const query = "SELECT * FROM ?? as a JOIN ?? as r ON a.id_referencia = r.id WHERE autor = ?";
    const params = [t_autores, t_referencias,name];
    const rows = await pool.query(query, params);
    return rows;
}

module.exports = {getAll,filterByPublicacion,getByName}