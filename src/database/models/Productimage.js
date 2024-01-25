module.exports = (sequelize, DataTypes) => {
    const alias = "ProductImage";
    const cols ={
        image_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };

    const config = {
        tableName: "productimage",
    };

    const ProductImage = sequelize.define(alias, cols, config);

    ProductImage.associate = models =>{
        ProductImage.belongsTo(models.Products, {
            as: "product",
            foreignKey: "id_product",
        })
    }; 
    return ProductImage;
};