import "reflect-metadata";
import express from 'express';
import { AppDataSource } from './data-source';
import accountRoutes from './routes/account';

const app = express();
app.use(express.json());

// Initialize TypeORM
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        // Set up routes
        app.use('/accounts', accountRoutes);
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.log("Error during Data Source initialization:", error));