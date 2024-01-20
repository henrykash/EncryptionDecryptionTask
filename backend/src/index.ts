import { Config } from './config/config';
import express from "express";
import dotEnv from "dotenv";


dotEnv.config();

const app = express();

app.use(express.json());

app.use('/api', require("./routes/routes"));

app.listen(Config.PORT || 3000, () => {
    console.log(`Server is running on port ${Config.PORT}`);
});
