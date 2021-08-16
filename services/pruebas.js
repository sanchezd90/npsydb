const {create, update, createImages,updateImages} = require('./../models/pruebas');
const {imgFile} = require('./../utils/fileHandler');

const createPrueba = async(body, file) => {
    try {
        const {insertId : id} = await create(body);
        const uuid = imgFile(file);
        const obj = {id, uuid};
        const {insertId : idImg} = await createImages(obj);
        return idImg;
    } catch (error) {
        console.error(error);
    }
}
const updatePrueba = async(id, body, file) => {
    try {
        const id_prueba = await update(id,body);
        console.log(id_prueba)
        if (file){
            const uuid = imgFile(file);
            const obj = {uuid};
            const idImg = await updateImages(id, obj);
            return idImg;
        }
        else{
            return id_prueba;
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {createPrueba, updatePrueba};