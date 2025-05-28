import express from 'express';
import cors from 'cors';
import { configs } from './src/configs/configs.js';

const app = express();

app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST'],
    }
));
app.use(express.json());

export default app;