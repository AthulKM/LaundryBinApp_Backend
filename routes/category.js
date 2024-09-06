import Express from 'express';
import { addNewCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/category.js";
import upload from '../middlewares/uploadImage.js';


const router = Express.Router();

router.post('/new', upload.single('image'), addNewCategory);

router.get('/all', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;