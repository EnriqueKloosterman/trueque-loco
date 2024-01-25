module.exports = (sequielize, DataTypes) => {
    const alias = "Category";
    const cols = {
        category_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };

    const config = {
        tableName: "category",
    };

    const Category = sequielize.define(alias, cols, config);

    Category.associate = models => {
        Category.belongsTo(models.Products, {
            as: "products",
            foreignKey: "id_product"
        });
    };

};