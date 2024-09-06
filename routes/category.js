import Express from 'express';
import { addNewCategory } from "../controllers/category.js";
import upload from '../middlewares/uploadImage.js';


const router = Express.Router();

router.post('/new', upload.single('image'), addNewCategory);

export default router;