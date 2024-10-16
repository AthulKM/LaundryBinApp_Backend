import Admin from '../models/admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
// Controller to register a new admin
export const registerAdmin = async (req, res) => {
    const { email, username, password } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
        return res.status(400).json({
            message: 'Admin with this email already exists',
            status: "Failed",
            error:true
        });
    }

    // Hash the password before saving into the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin
    const admin = await Admin.create({
        email,
        username,
        password: hashedPassword,
    });

    if (admin) {
        res.status(201).json({
            message:"New admin added successfully",
            _id: admin._id,
            email: admin.email,
            username: admin.username,
            password:hashedPassword,
            status:"Success",
            error:false
        });
    } else {
        res.status(400).json({ message: 'Invalid admin data' });
    }
};


// Controller to login an admin
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message:"Login successful",
            _id: admin._id,
            email: admin.email,
            username: admin.username,
            status: "Success",
            token:token,
            error:false
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};
