import { Config } from './config/config';
import express from "express";
import dotEnv from "dotenv";
import bodyParser from 'body-parser';

dotEnv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api', require("./routes/routes"));

const port = Config.PORT || 3000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


export default app;

