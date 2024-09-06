import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/admin.js';

const router = express.Router();

// Register a new admin
router.post('/register', registerAdmin);

// Login admin
router.post('/login', loginAdmin);

export default router;