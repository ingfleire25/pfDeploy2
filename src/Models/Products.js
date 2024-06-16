const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true,
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        
        },
        Precio: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        Stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        Imagen_URL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        onOffer: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false 
        },
        Brand: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, { timestamps: false });
}