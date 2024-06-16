const { Product, Category } = require("../db.js");
//const { Category } = require("../Models/Categories");

//detail
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).send("Ingrese un producto");
    }
    const producto = await Product.findOne({ 
      where: { id }, 
      include: [
      {
        model: Category,
        attributes: ["name"]
      }
    ]

     });
    if (!producto) {
      return res.status(400).send("producto no existe");
    }
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// *********************CREATE************************
const createProduct = async (req, res) => {
  try {
    const { Nombre, Precio, Descripcion,Stock, Imagen_URL, onOffer, Brand, name} = req.body;
    //console.log(req.body)
    // Verifica si todos los campos obligatorios están presentes
    if (!Nombre || !Precio || !Descripcion || !Imagen_URL) {
      return res.status(400).send("Completar los campos obligatorios");
    }
    // Verifica si el producto ya existe
    const producto = await Product.findOne({ where: { Nombre } });
    if (producto) {
      return res.status(400).send("Producto ya existe");
    }
    //console.log(" por aca si")
    // Crea un nuevo producto
    const newProduct = await Product.create({
      Nombre,
      Precio,
      Descripcion,
      Stock,
      Imagen_URL,
      onOffer,
      Brand
    });
    //console.log(" por aca tambien")
    // Asocia las categorías al producto
    const categories = await Category.findAll({ where: {name: name } });
   
    newProduct.addCategory(categories);
    //
    return res.status(200).json(newProduct);
  } catch (error) {
    console.error("Error al crear el producto:",error.message);
    return res.status(500).send("Error interno del servidor");
  }
};

/*const createProduct = async (req, res) => {
  const { Nombre, Precio, Descripcion, Categorie_id, Imagen_URL } = req.body;
  //const product = await validarProcuct(Nombre);//validar si el producto ya existe y
  console.log(req.body); //si vienen todos los datos
  /*!Nombre
    ? res.json({ message: "El producto ya existe" })
    : await Product.create({
        Nombre,
        Precio,
        Descripcion,
        Categorie_id,
        Imagen_URL,
      });

  const categories = await Category.findAll({ where: { name: category } });
  newProduct.addCategory(categories);

  res.send("Createado exitosamente!!!");
      if(!Nombre || !Precio || !Descripcion || !Categorie_id || Imagen_URL){
          res.status(400).send("Completar los campos obligatorios")
      }
  console.log(Nombre)

      const producto = await Product.findOne({where: {Nombre}})
          if(producto){return res.status(400).send("producto ya existe")}

      const newProduct = await Product.create({ Nombre, Precio,  Descripcion, Categorie_id, Imagen_URL })
      const categories = await Category.findAll({ where: { name: Category } });
      newProduct.addCategory(categories);
      return res.status(200).send("Producto creado exitosamente")
};*/

//Delete
const deleteProduct = async (req, res) => {
  // try {
  //     req.params? await Product.findByIdAndDelete(req.params.id)
  //     .then((product) => {res.json(product)})
  //     .catch((err) => {res.json(err)}):
  //     res.json({message: "No product found"})
  //     } catch (error) {
  //         res.json({message: "No product found"})
  //         return res.status(404).json({ message: "Producto no encontrado" });
  //     }
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "producto no encontrado" });
    }

    await product.destroy();

    res.status(200).send("Acción eliminada exitosamente");
  } catch (error) {
    console.error("Error al eliminar la acción:", error);
    res.status(500).json({ error: "Error al eliminar la acción" });
  }
  //   const { id } = req.params;
  //   Product.destroy({ where: { id } });
  //   res.send('Done');
  // } catch (error) {
  //   return res.status(404).send("Error")
  // } 
};
//update

const updateProduct = async (req, res) => {
  const {id, Nombre, Precio, Descripcion,Stock, Imagen_URL, onOffer, Brand, name} = req.body;

  try {
    // Primero, verifica si el producto existe
    //const existingProduct = await Product.findByPk(id);

    const existingProduct = await Product.findOne({ 
      where: { id }, 
      include: [
      {
        model: Category,
        attributes: ["name"]
      }
    ]

     });
    if (!existingProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    // Actualiza los campos del producto
    existingProduct.Nombre = Nombre;
    existingProduct.Precio = Precio;
    existingProduct.Descripcion = Descripcion;
    existingProduct.Stock = Stock;
    existingProduct.Imagen_URL = Imagen_URL;
    existingProduct.onOffer = onOffer;
    existingProduct.Brand = Brand;
    existingProduct.Categories.map((category)=> category.name = name)
    // Guarda los cambios en la base de datos
    console.log(existingProduct)
    await existingProduct.save();

    return res
      .status(200)
      .json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { getProduct, createProduct, deleteProduct, updateProduct };
