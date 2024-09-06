import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/connectDB.js';
import admin from './routes/admin.js';
import category from './routes/category.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true

}))

app.get('/', (req, res) => {
    res.send("Welcome to LaundryBinApp API");
});

connectDB();

app.use('/api/admin', admin);
app.use('/api/category', category);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});