
import Category from '../models/category.js';

export const addNewCategory = async (req, res) => {
    try {
        const { name } = req.body;

    const existingCategory = await Category.findOne({name});

    if (existingCategory) {
        return res.status(400).json({
            Message: "Category already exists",
            status: "Failed",
            error: true
        });
    }

    let imagePath = '';
    if (req.file) {
        imagePath = req.file.path;
    }

    const newCategory = new Category({
        name,
        image: imagePath
    });
    await newCategory.save();

    return res.status(201).json({
        Message: "New category added successfully",
        status: "Success",
        error: false,
        category: newCategory
    });
    } catch (error) {
        console.error("Error adding category:", error);
        return res.status(500).json({
            Message: "Server error, Could not add category",
            status: "Error",
            error: true
        });
    }
    
    

};

// const editCategory = async (req, res) => {
//     const category = req.body.category;
//     const checkIfExists = Category.findOne(category)

//     if (!checkIfExists) {
//         res.status(404).
//     }
// }