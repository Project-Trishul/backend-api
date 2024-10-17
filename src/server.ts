import routes from "./routes/index";
import bodyParser from 'body-parser';
import cors from 'cors';

const express = require('express');
const app = express();
app.use(bodyParser.json());
const port = 3000 || process.env.PORT;

app.get('/', (req:any, res:any) => {
  res.send('Hello World!');
});

app.use(cors());
app.use(routes)

app.listen(port, async () => {
    console.log(`Server listening on port ${port}`);
    });
