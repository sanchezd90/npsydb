const pool = require('./../utils/bd');
const t_usuarios='usuarios';

const create = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [t_usuarios, obj];
    return await pool.query(query, params);
}
const verify = async(uid) => {
    const query = "UPDATE ?? SET habilitado = 1 WHERE confirmacionCorreo = ?"
    const params = [t_usuarios, uid];
    return await pool.query(query, params);
}
const auth = async(username, pass) => {
    const query = "SELECT id, contributor, admin FROM ?? WHERE username = ? AND pass = ? AND habilitado = 1 AND deleted = 0";
    const params = [t_usuarios, username, pass];
    return await pool.query(query, params);
}
const single = async(id) => {
    const query = "SELECT * FROM ?? WHERE id = ? AND deleted = 0";
    const params = [t_usuarios, id];
    return await pool.query(query, params);
}
const update = async(id, obj) => {
    const query = "UPDATE ?? SET ? WHERE id = ?";
    const params = [t_usuarios, obj, id];
    return await pool.query(query, params);
}
const del = async(id) => {
    const query = "UPDATE ?? SET deleted = 1 WHERE id = ?";
    const params = [t_usuarios, id];
    return await pool.query(query, params);
}
const all = async() => {
    const query = "SELECT * FROM ??";
    const params = [t_usuarios];
    return await pool.query(query, params);
}

module.exports = {create, verify, auth, single, update, del, all}