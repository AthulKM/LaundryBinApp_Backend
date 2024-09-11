import cloudinary from '../utils/cloudinary.js'; // Cloudinary utility
import Category from '../models/category.js';  // Your category model

// Add New Category
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

        let imageUrl = '';
        if (req.file) {
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'categories',  // Optional: organize images in folders
                resource_type: 'image'
            });
            imageUrl = result.secure_url;  // Get the secure URL for the image
        }

        const newCategory = new Category({
            name: req.body.name,
            image: imageUrl
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

// Get All Categories
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
        });
    }
};

// Get Category by ID
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
            data: category
        });

    } catch (error) {
        res.status(500).json({
            Message: "Failed to retrieve",
            status: "Failed",
            error: true
        });
    }
};

// Update Category
export const updateCategory = async (req, res) => {
    const { name } = req.body;
    const categoryId = req.params.id;

    const updatedData = { name };

    if (req.file) {
        // Upload new image to Cloudinary (if file exists)
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'categories',
            resource_type: 'image'
        });
        updatedData.image = result.secure_url;  // Store the new image URL
    }

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            updatedData,
            { new: true }  // Returns the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({
                Message: "Category not found",
                status: "Failed",
                error: true
            });
        }

        res.status(200).json({
            Message: "Category updated successfully",
            status: "Success",
            data: updatedCategory
        });

    } catch (error) {
        res.status(500).json({
            Message: "Failed to update",
            status: "Failed",
            error: true
        });
    }
};

// Delete Category
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
            error: true
        });
    }
};