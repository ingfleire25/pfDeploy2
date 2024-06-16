const { Router } = require("express");
const users = require ("./usersRouter.js")
const product = require ("./productRouter.js")
const products = require ("./productsRouter.js")
const categories = require ("./categoriesRouter.js")
//const sales = require ("./salesRouter.js")
//const stock = require ("./stockRouter.js")
//const record = require ("./recordRoutes.js")
const login = require ("./loginRouter.js")
//const report = require ("./reportRouter.js")

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/users', users);
router.use('/product', product)
router.use('/products', products)
router.use('/categories', categories);
//router.use('/sales', sales);//ventas
//router.use('/stock',stock);
//router.use('/record',record);// registro
router.use('/login', login);
//router.use('/report',report);// reportes

module.exports = router