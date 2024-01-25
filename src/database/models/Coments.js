module.exports = (seqeulize, DataTypes) => {
    const alias = "Coments";
    const cols = {
        comment_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        coment: {
            type: DataTypes.STRING,
        }
    };

    const config = {
        tableName: "comments",
    };

    const Coments = seqeulize.define(alias, cols, config);

    Coments.associate = models => {
        Coments.belongsTo(models.Products, {
            as: "products",
            foreignKey: "id_product"
        });
        Coments.belongsTo(models.Users, {
            as: "users",
            foreignKey: "id_user"
        });
    };

    return Coments;
}