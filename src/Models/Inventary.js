const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Inv', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            allowNull: false
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
        Cantidad_disponible:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Fecha_de_actualizacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, { timestamps: false });
}



