import Products from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Products.findAll();
        res.json(products);
    } catch (error) {
        res.json({message: error.messae});
    }
    // res.send('welcome express syadoooooo')  
}

export const getProductById = async (req, res) => {
    try {
        const product = await Products.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(product[0]);
    } catch (error) {
        res.json({message: error.messae});
    }
}

export const createProduct = async (req, res) => {
    try {
        await Products.create(req.body);
        res.json({
            "message": "tambah produk baru oke"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}

export const updateProduct = async (req, res) => {
    try {
        await Products.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "edit produk oke cok"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await Products.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "hapus produk oke cok, ati2 ngapus tu"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}