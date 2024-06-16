const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Detalle_pedido', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        User_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            foreignKey: true,
        },
        Product_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id',
            },
            foreignKey: true,
        },
        Cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Cantidad: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },


    }, { timestamps: false });
}