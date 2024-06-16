
const { Product , Category } = require('../../db'); 
// orden por precio
const getProductsSortedByPrice = async (req, res) => {
    try {     
        const products = await Product.findAll();//obtengo todos los productos de la db
        const sortedProducts = 0
        if (req.query.orden) { //valido si hay query "asc o des"
            if (req.query.orden === 'asc') {
                //ASC
                sortedProducts= products.sort((a, b) => a.price.localeCompare(b.price));
            } else {
                //DES
                sortedProducts = products.sort((a, b) => a.price.localeCompare(a.price));
            }
            res.status(200).json(sortedProducts);
        } else {
            throw new Error(`Debe proporcionar un ORDEN`);;
        }
    } catch (error) {
        console.error('Error al ordenar los productos:', error);
        res.status(500).json({ message: 'Error al ordenar los productos' });
    }
}
// orden por categorias
const getProductsSortedByCategory = async(req ,res) =>{  
        try {
            // primero buscamos la ctegoria en el models Categories
            const category = await Category.findOne({
                where: { Nombre: req.query.category },
            });
            if (!category) {
                // si no lo encuentra lanzamos un Error
                throw new Error(`Debe proporcionar una categoría`);
            } 
            // busco en el Model Product comparando el id 
            const products = await Product.findAll({
                where: { Categorie_id: category.id },
            });
    
            return products;
        } catch (error) {
            console.error('Error al obtener productos por categoría:', error.message);
            throw error;
        }
}
 //ordenamiento y filtrado
async function getProductsSortedAndFiltered(req, res) {
    try {
        const { orden, category } = req.query;
        if (!category) {// hay categoria?
            throw new Error('Debe proporcionar una categoría');
        }
        const categoryInstance = await Category.findOne({
            where: { Nombre: category }, //buscamos categoria por su nombre en el model Category
        });
        if (!categoryInstance) { // manejo el error si pidio cualquier verdura
            throw new Error(`Categoría "${category}" no encontrada`);
        }
        // ahora filtro los productos segun la categoria 
        const products = await Product.findAll({
            where: { Categorie_id: categoryInstance.id },
        });
        // Ordenamos los productos según la consulta (asc o des)
        let sortedProducts;
        if (orden === 'asc') {
            sortedProducts = products.sort((a, b) => a.price.localeCompare(b.price));
        } else if (orden === 'des') {
            sortedProducts = products.sort((a, b) => b.price.localeCompare(a.price));
        } else {
            throw new Error(`Orden "${orden}" no válida`);
        }

        res.status(200).json(sortedProducts);
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
}

module.exports = { };


module.exports = { getProductsSortedByPrice ,getProductsSortedByCategory ,  getProductsSortedAndFiltered };


