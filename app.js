import express from 'express';
import cors from 'cors';
import { configs } from './src/configs/configs.js';
import router from './src/routes/index.js';


const app = express();


app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST'],
    }
));
app.use(express.json());
app.use(router)


export default app;