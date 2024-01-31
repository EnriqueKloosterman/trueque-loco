const database = require("../database/models");
const { v4: uuidv4 } = require('uuid');

const productController = {

    createProducts: async (req, res) => {
        try {
            const productId = uuidv4();
            // const userId = req.user.user_id;
            const {product_name, price, id_stock} = req.body;
            const { description } = req.body;
            const product = await database.Products.create({
                product_id: productId,
                product_name,
                price,
                id_stock,
                // id_user: userId
                id_user: "c0c9d63e-b65c-4597-8321-2a2c9b019d22"
            })
            // let descriptionText = [];
            // for (let i = 0; i < req.body.description; i++) {
            //     descriptionText.push(req.body.description[i])
            // };
            // for (let i = 0; i < descriptionText.length; i++) {
            //     await product.createDescription({ description: descriptionText[i], description_id: uuidv4()})
            // };
            await product.createDescription({ description: description, description_id: uuidv4() });

            let image = [];
            for (let i = 0; i < req.files.length; i++) {
                image.push(req.files[i].filename)
            };
            for (let i = 0; i < image.length; i++) {
                await product.createProductimage({ image: image[i], image_id: uuidv4() })
            };
            return res.status(201).json({ message: "product created" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await database.Products.findAll({
                include: [
                    {
                        model: database.Description,
                        as: "description"
                    },
                    {
                        model: database.ProductImage,
                        as: "productimage"
                    }
                ]
            });
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await database.Products.findOne({
                where: { product_id: id },
                include: [
                    {
                        model: database.Description,
                        as: "description"
                    },
                    {
                        model: database.ProductImage,
                        as: "productimage"
                    }
                ]
            });
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

module.exports = productController;