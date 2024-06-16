//const { Category} = require("../Models/Categories");
const { Category} = require("../db");
//, , updateCategory, 

const getCategories = async (req , res) =>{
    try {   
        const categories = await Category.findAll();    
        return res.status(200).json(categories);
        } catch (error) {
            return res.status(400).send(error.message)
        }
}

const createCategory = async(req , res) => {
    try {
        const { name } = req.body;
        const existingCategory = await Category.findAll({
            where: { name }
        })
        if(!existingCategory.length){
        const category = await Category.create({ name });
        return res.status(200).json(category);
        }
        return res.status(400).send("Categoria Existente")
        } catch (error) {
            return res.status(500).send(error.message)
        }
}

const deleteCategory = async(req , res) => {
    try {
        const { id } = req.query;       
        const category = await Category.destroy({ where: { id } });
        res.status(200).json(category);

        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la categoría de ropa' });
        }
}

module.exports = {getCategories , createCategory, deleteCategory}