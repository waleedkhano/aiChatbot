import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import notesRoutes from './routes/route'
import ErrorMiddleware from './middlewares/Error'
import cors from 'cors'


dotenv.config();

const app = express();
app.use(cors());
const PORT = 5000;
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI as string;
app.use("/api", notesRoutes)

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`The server and database are successfully running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });


    app.use(ErrorMiddleware)
