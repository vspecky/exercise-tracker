import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import UserRouter from './routes/user.route';
import ExerciseRouter from './routes/exercises.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.DB_URI || "mongodb://localhost/exercise-tracker-app";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.once("open", () => console.log("Connected to the database."));

app.get('/', (_, res) => {
    res.send("Hello World");
});

app.use('/users', UserRouter);
app.use('/exercises', ExerciseRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));