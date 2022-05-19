import express from "express";
import { 
    getAllApproval, 
    getApprovalById,
    updateApproval
} from "../controllers/Approval.js";
import { 
    createProposal,
    deleteProposal,
    getAllProposal,
    getProposalById,
    updateProposal
} from "../controllers/Proposal.js";
import { 
    getUsers, 
    getUserLevels, 
    Login, 
    Logout 
} from "../controllers/User.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getAllMonitoring } from "../controllers/Monitoring.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/user_levels', verifyToken, getUserLevels);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

router.get('/proposals', verifyToken, getAllProposal);
router.get('/proposals/:id', verifyToken, getProposalById);
router.post('/proposals', verifyToken, createProposal);
router.patch('/proposals/:id', verifyToken, updateProposal);
router.delete('/proposals/:id', verifyToken, deleteProposal);

router.get('/approvals', verifyToken, getAllApproval);
router.get('/approvals/:id', verifyToken, getApprovalById);
router.patch('/approvals/:id', updateApproval);

router.get('/monitors', verifyToken, getAllMonitoring);

// router.get('/products', verifyToken, getAllProducts);
// router.get('/products/:id', verifyToken, getProductById);
// router.post('/products', verifyToken, createProduct);
// router.patch('/products/:id', verifyToken, updateProduct);
// router.delete('/products/:id', verifyToken, deleteProduct);

export default router;