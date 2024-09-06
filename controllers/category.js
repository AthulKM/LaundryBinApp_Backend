
import upload from '../middlewares/uploadImage.js';
import Category from '../models/category.js';

export const addNewCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const existingCategory = await Category.findOne({ name });

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
        name:req.body.name,
        image: imagePath
    });
    await newCategory.save();

    return res.status(201).json({
        Message: "New category added successfully",
        status: "Success",
        error: false,
        data: newCategory
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

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            Message: "Categories have been fetched successfully",
            data: categories,
            status: "Success",
            error: false
        });

    } catch (error) {
        res.status(500).json({
            Message: "Failed to retrieve data",
            status: "Failed",
            error: true
        })
    }
};

export const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({
                Message: "Category not found",
                status: "Failed",
                error: true
            });

        }
        res.status(200).json({
            Message: "Category retrieved successfully",
            status: "Success",
            error: false,
            data:category
        });

    } catch (error) {
        res.status(500).json({
            Message: "Failed to retrieve",
            status: "Failed",
            error: true
        });
    }
};

export const updateCategory = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                Message: "Error uploading file",
                status: "Failed",
                error: true
            });
        }
        const { name } = req.body;
        const categoryId = req.params.id;
        const updatedData = {
            name: name
        };
        if (req.file) {
            updatedData.image = req.file.path;
        }
        try {
            const updatedCategory = await Category.findByIdAndUpdate(
                categoryId,
                updatedData,
                { new: true }
            );
            if (!updatedCategory) {
                return res.status(404).json({
                    Message: "Category not found",
                    status: "Failed",
                    error: true
                });
            }
            res.status(200).json({
                message: "Category updated successfully",
                status:"Success",
                data: updatedCategory
            });
        } catch (error) {
            res.status(500).json({
                Message: "Failed to update",
                status: "Failed",
                error: true
            });
        }
    });
};

export const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({
                Message: "Category not found",
                status: "Failed",
                error: true
            });
        }
        res.status(200).json({
            Message: "Category deleted successfully",
            status: "Success",
            error: false,
            data: deletedCategory
        });
    } catch (error) {
        res.status(500).json({
            Message: "Failed to delete category",
            status: "Failed",
            error: True
        });
    }
};