import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/connectDB.js';
import admin from './routes/admin.js';
import category from './routes/category.js';
import cors from 'cors';
import offer from './routes/offerRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Allow specific origins
const allowedOrigins = ['https://laundrybinapp.netlify.app/','http://localhost:5173', 'http://localhost:5174'];

// Allow CORS from Netlify frontend
const corsOptions = {
  origin: 'https://laundrybin.netlify.app', // Allow only frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Include cookies or authentication headers
};

app.use(cors(corsOptions));

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Enable cookies/sessions if required
}));



app.get('/', (req, res) => {
    res.send("Welcome to LaundryBinApp");
});

connectDB();

app.use('/api/admin', admin);
app.use('/api/category', category);
app.use('/api/offer',offer)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});