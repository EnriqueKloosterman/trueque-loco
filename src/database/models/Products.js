module.exports = (sequelize, DataTypes) => {
    const alias = "Products";
    const cols = {
        product_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price:{
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    };
    
    const config = {
        tableName: "products",
    };
    
    const Products = sequelize.define(alias, cols, config);

    Products.associate = models => {
        Products.belongsTo(models.Users, {
            as: "users",
            foreignKey: "id_user",
        });
        Products.belongsTo(models.Stock, {
            as: "stock",
            foreignKey: "id_stock",
        });
        Products.hasMany(models.Category, {
            as: "category",
            foreignKey: "id_product",
        });
        Products.hasMany(models.Productimage, {
            as: "productimage",
            foreignKey: "id_product",
        });
        Products.hasMany(models.Description, {
            as: "description",  
            foreignKey: "id_product",
        });
        Products.hasMany(models.Coments, {
            as: "coments",
            foreignKey: "id_product",
        })
    }
    return Products;
}