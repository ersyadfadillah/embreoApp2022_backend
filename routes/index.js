import express from "express";
import { 
    createProduct,
    getAllProducts, 
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/Products.js";
import { getUsers, getUserLevels, Login, Logout } from "../controllers/User.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/user_levels', verifyToken, getUserLevels);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

router.get('/products', getAllProducts);
router.get('/products/:id', verifyToken, getProductById);
router.post('/products', verifyToken, createProduct);
router.patch('/products/:id', verifyToken, updateProduct);
router.delete('/products/:id', verifyToken, deleteProduct);

export default router;