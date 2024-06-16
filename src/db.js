require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path'); 
const axios = require('axios');
const Users = require('./Models/Users.js')
const Categories = require('./Models/Categories.js')
const Products = require('./Models/Products.js')
const Orders = require('./Models/Orders.js')
const Inventary = require('./Models/Inventary.js')
const Detalles_pedidos = require('./Models/Detalles_pedidos.js')
//const Product_Categories = require('./Models/Products_Categories.js')
//const { v4: uuidv4 } = require('uuid');



const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DEPLOY} = process.env;

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false,
  dialectOptions:{
    ssl:{
      require:true,
    }
  } // lets Sequelize know we can use pg-native for ~30% more speed
});
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/tienda_de_ropa`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

// const sequelize = new Sequelize(DB_DEPLOY,
//   {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// }); 

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

Users(sequelize);
Categories(sequelize);
Products(sequelize);
Orders(sequelize);
Inventary(sequelize);
Detalles_pedidos(sequelize);


//const { User, Category, Product, Order, Inv, Detalle_pedido,} = sequelize.models;
const {Category, Product, User} = sequelize.models;

//Product.belosToMany(Category, { through: Product_Category, foreignKey: 'Product_id', otherKey: 'Category_id' });
//Category.belongsToMany(Product, { through: Product_Category, foreignKey: 'Category_id', otherKey: 'Product_id' });
Product.belongsToMany(Category, { through: 'Product_Category'},{ timestamps: false });
Category.belongsToMany(Product, { through: 'Product_Category'},{ timestamps: false });


// Order.belongsToMany(Product, { through: Detalle_pedido, foreignKey: 'Order_id', otherKey: 'Product_id' });
// Product.belongsToMany(Order, { through: Detalle_pedido, foreignKey: 'Product_id', otherKey: 'Order_id' });

// Product.hasOne(Inv, { foreignKey: 'Product_id' });
// Inv.belongsTo(Product, { foreignKey: 'Product_id' });

// User.hasMany(Order, { foreignKey: 'User_id' });
// Order.belongsTo(User, { foreignKey: 'User_id' });



const categories = [
 
  { name: 'Casual' },
  { name: 'Elegante' },
  
  { name: 'Deportivo' },
 
  { name: 'Conjuntos' }, 
  
  { name: 'Formal' }
];

// const cargarCategorias = async () => {

//   try {
//     await Category.bulkCreate(categories);
//     console.log('Categorias cargadas');
//     } catch (error) {
//       console.log(error);
//       } 
//       };
// cargarCategorias()
//     await sequelize.sync();

//     await Category.bulkCreate(categories);
//     console.log('Categorías creadas exitosamente.');

//   } catch (error) {
//     console.error('Error al crear las categorías:', error);
//   }
// };
//
const products = [
  {
    Nombre: "Blusa Blanca",
    Descripcion: "Blusa blanca.",
    Precio: "29.99",
    Stock: "22",
    name: "Elegante", 
    Imagen_URL: "https://i.pinimg.com/564x/54/6b/41/546b410f8cfcdc4fde7f2facf5644ea2.jpg",
    onOffer: "true",
    Brand: "Elegancia"

  },
  {
    Nombre: 'Falda Negra',
    Descripcion: 'Falda negra corta, perfecta para una noche de fiesta.',
    Precio: 34.99,
    Stock: 60,
    name: 'Elegante',
    Imagen_URL: 'https://i.pinimg.com/736x/92/14/d7/9214d740ef344a3f1cbd62bd5e8ce8ae.jpg',
    onOffer: false,
    Brand: 'Nocturna'
  },
  {
    Nombre: 'Shorts de Mezclilla',
    Descripcion: 'Shorts de mezclilla, perfectos para el verano.',
    Precio: 24.99,
    Stock: 120,
    name: 'Casual', 
    Imagen_URL: 'https://i.pinimg.com/564x/97/02/cb/9702cbf2cb64ad7d4bd740ede025578d.jpg',
    onOffer: true,
    Brand: 'Verano'
  },
  {
    Nombre: 'Conjunto Deportivo',
    Descripcion: 'Conjunto deportivo cómodo y moderno.',
    Precio: 59.99,
    Stock: 70,
    name: 'Deportivo', 
    Imagen_URL: 'https://i.pinimg.com/564x/bb/97/ac/bb97ac9f15bdf53a880aba6fd5fcd10d.jpg',
    onOffer: false,
    Brand: 'Fitness'
  },
  {
    Nombre: 'Vestido Floral',
    Descripcion: 'Vestido floral ideal para primavera.',
    Precio: 44.99,
    Stock: 40,
    name: 'Formal', 
    Imagen_URL: 'https://i.pinimg.com/564x/c3/7f/94/c37f9473f416a01c1d758682d48865df.jpg',
    onOffer: true,
    Brand: 'Primavera'
  },
  {
    Nombre: 'Blusa de Seda',
    Descripcion: 'Blusa de seda suave y elegante.',
    Precio: 49.99,
    Stock: 60,
    name: 'Elegante', 
    Imagen_URL: 'https://i.pinimg.com/736x/2d/f7/72/2df772084cf07852f33f1944f2d0b8a2.jpg',
    onOffer: false,
    Brand: 'Elegancia'
  },
  {
    Nombre: 'Jeans Negros',
    Descripcion: 'Jeans negros ajustados para un look moderno.',
    Precio: 39.99,
    Stock: 90,
    name: 'Casual', 
    Imagen_URL: 'https://i.pinimg.com/736x/00/0d/08/000d0831f3baea89b7dd6284abbd3095.jpg',
    onOffer: true,
    Brand: 'Urban'
  },
  {
    Nombre: 'Falda de Cuero',
    Descripcion: 'Falda de cuero para un look atrevido.',
    Precio: 54.99,
    Stock: 50,
    name: 'Elegante',
    Imagen_URL: 'https://i.pinimg.com/564x/bf/f4/2c/bff42cbd9be59d3b421d1798af7e78c3.jpg',
    onOffer: false,
    Brand: 'Atrevida'
  },
  {
    Nombre: 'Shorts Blancos',
    Descripcion: 'Shorts blancos frescos para el verano.',
    Precio: 22.99,
    Stock: 100,
    name: 'Casual', 
    Imagen_URL: 'https://i.pinimg.com/564x/ae/20/74/ae2074cd7db542cf9d871ee84ee88c9f.jpg',
    onOffer: true,
    Brand: 'Verano'
  },
  {
    Nombre: 'Conjunto Casual',
    Descripcion: 'Conjunto casual para un día relajado.',
    Precio: 39.99,
    Stock: 80,
    name: 'Casual', 
    Imagen_URL: 'https://i.pinimg.com/564x/be/a3/47/bea3479a622bd2b5b9572f8652bc46fa.jpg',
    onOffer: false,
    Brand: 'Casual'
  },
  {
    Nombre: 'Vestido de Noche',
    Descripcion: 'Vestido de noche largo y elegante.',
    Precio: 89.99,
    Stock: 30,
    name: 'Elegante', 
    Imagen_URL: 'https://i.pinimg.com/564x/36/0c/ea/360ceae18f6218c6332b1e267b738a65.jpg',
    onOffer: true,
    Brand: 'Glamour'
  },
  {
    Nombre: 'Blusa Estampada',
    Descripcion: 'Blusa estampada colorida y alegre.',
    Precio: 29.99,
    Stock: 70,
    name: 'Casual',
    Imagen_URL: 'https://i.pinimg.com/736x/31/01/06/3101063d2027e012d4feb1c09c353f7e.jpg',
    onOffer: false,
    Brand: 'Alegre'
  },
  {
    Nombre: 'Jeans Rasgados',
    Descripcion: 'Jeans rasgados para un estilo desenfadado.',
    Precio: 44.99,
    Stock: 60,
    name: 'Casual',
    Imagen_URL: 'https://i.pinimg.com/564x/05/9f/3f/059f3fd9a42946757afc646c0132cac1.jpg',
    onOffer: true,
    Brand: 'Desenfadado'
  }
];

// const cargarProductos = async () => {
//   try {
//     await cargarCategorias(); 
//     const categorias = await Category.findAll();
//     console.log('categorias',categorias)
//     const mapearCategorias = categorias.reduce((map, tategory) => {
//       map[tategory.category] = tategory.id;
//       return map;
//     }, {});
//     const descripcion = new Set();
//     const validarCategoriasYproductos = products.map(product => {
//       const categoriaId = mapearCategorias[product.CategoriaNombre];
//     console.log('categoriaId',categoriaId)
//       if (!categoriaId) {
//         throw new Error(`Categoría no encontrada para el producto: ${product.Nombre}`);
//       }

//       if (descripcion.has(product.Descripcion)) {
//         throw new Error(`Descripción duplicada para el producto: ${product.Nombre}`);
//       }
//       descripcion.add(product.Descripcion);

//       console.log('descripcion',descripcion)

//       return {
//         id: uuidv4(),
//         ...product,
//         Categorie_id: categoriaId
//       };
//     });

//     console.log('validarCategoriasYproductos',validarCategoriasYproductos)

//     await Product.bulkCreate(validarCategoriasYproductos);
//     console.log('Productos creados exitosamente.');

//   } catch (error) {
//     console.error('Error al crear los productos:', error);

//   } finally {
//     await sequelize.close();
//   }
// };

 //cargarProductos();


const cargarUsers = async () => {

  try {
    await User.bulkCreate(user);
    console.log('Usuarios cargados');
    } catch (error) {
      console.log(error);
      } 
      };



 const user = [
  { Nombre: "Leonardo",
    Email: "ingfleire25@gmail.com",
    Contraseña:"papa..22",
    Direccion:"la casa de las conejitas",
    Telefono: "04121049760"
  },
  {
      Nombre: "carla",
  Email: "Carla@gmail.com",
  Contraseña:"papa..33",
  Direccion:"la casa de las conejitas",
  Telefono: "04121049760"
  },
  {
      Nombre: "Gabriel",
  Email: "gabriel@gmail.com",
  Contraseña:"papa..44",
  Direccion:"la casa de las conejitas",
  Telefono: "04121049760"
}
]
// cargarUsers()
module.exports = {

...sequelize.models, 
conn: sequelize,   
};
