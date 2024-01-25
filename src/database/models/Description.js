module.exports = (sequelize, DataTypes) => {
    const alias = "Description";
    const cols = {
        description_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };

    const config = {
        tableName: "description",
    };

    const Description = sequelize.define(alias, cols, config);

    Description.associate = models => {
        Description.belongTo(models.Products, {
            as: "product",
            foreignKey: "id_product"
        });
    };
    return Description;  
};