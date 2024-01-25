module.exports = (sequelize, DataTypes) => {
    const alias = "Users";
    const cols = {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        user_password: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        user_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_avatar: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        createdAt: {
            type: DataTypes.DATE, // Agrega este campo para manejar createdAt
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE, // Agrega este campo para manejar updatedAt
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    };

    const config = { 
        tableName: "users", 
        timestamps: true, 
    };
    
    const Users = sequelize.define(alias, cols, config);

    Users.associate = models => {
        Users.hasMany(models.Products, {
            as: "products",
            foreignKey: "id_user",
        });
        Users.hasMany(models.Coments, {
            as: "coments",
            foreignKey: "id_user",
        });
    };

    return Users;

}