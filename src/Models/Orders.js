const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Order', {
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
        Fecha_de_pedido: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        Estado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Total: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        }
    }, { timestamps: false });
}

