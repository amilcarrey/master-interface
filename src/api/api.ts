import express from 'express';
import cors from 'cors';
import { SerialInterface } from '../serialInterface';
import boardCodes from '../boardCodes';

const app = express();
app.use(cors());

const port = 3000;

const serialInterface = SerialInterface.getInstance();

app.get('/readAllStatus', (req, res) => {
  res.send('Hello World!');
});

app.get('/post', (req, res) => {
   res.send('Hello World!');
 });

 app.get('/readAllStatus', (req, res) => {
   res.send('Hello World!');
 });

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});