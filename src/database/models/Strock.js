module.exports = (sequelize, DataTypes) => {
    const alias = "Stock";
    const cols = {
        stock_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        in_stock: {
            type: DataTypes.BOOLEAN,           
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    const config = {
        tableName: "stock",
    };

    const Stock = sequelize.define(alias, cols, config);

    Stock.associate = models => {
        Stock.hasMany(models.Products, { 
            as: "products",
            foreignKey: "id_stock",
        });
    };

    return Stock;
}