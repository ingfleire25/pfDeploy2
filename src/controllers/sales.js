
const { Order } = require('../db'); 

// Obtener todas las ventas
const getSales = async (req, res)=> {
    try {
        const sales = await Order.findAll();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
}

// Obtener una venta específica
const getSale = async(req, res)=> {
    const { id } = req.params;
    try {
        const sale = await Order.findByPk(id);
        if (!sale) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la venta' });
    }
}

// Crear una nueva venta
const createSales = async(req, res)=> {
    const { User_id, Fecha_de_pedido, Estado, Total } = req.body;
    try {
        const newSale = await Order.create({
            User_id,
            Fecha_de_pedido,
            Estado,
            Total,
        });
        res.status(201).json(newSale);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la venta' });
    }
}

// Actualizar una venta existente
const updateSales = async(req, res)=> {
    const { id } = req.params;
    const { User_id, Fecha_de_pedido, Estado, Total } = req.body;
    try {
        const sale = await Order.findByPk(id);
        if (!sale) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        await sale.update({
            User_id,
            Fecha_de_pedido,
            Estado,
            Total,
        });
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la venta' });
    }
}

// Eliminar una venta
const deleteSales =async (req, res)=> {
    const { id } = req.params;
    try {
        const sale = await Order.findByPk(id);
        if (!sale) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        await sale.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la venta' });
    }
}

module.exports = {
    getSales,
    getSale,
    createSales,
    updateSales,
    deleteSales,
};
