import express from 'express';
import cors from 'cors';
import { SerialInterface } from '../classes/SerialInterface/serialInterface';
import boardCodes from '../constants/boardCodes';

const app = express();
app.use(cors());

const port = 3000;

const serialInterface = SerialInterface.getInstance();

app.get('/readAllStatus', (req, res) => {
  res.send('Hello World!');
});

app.post('/open', (req, res) => {
  const body = req.body;
  const { board, channel } = body;
  const channelNumber = parseInt(channel);

  try {
    const operationCode = boardCodes[channelNumber].OPEN;
    res.send(`Opening channel ${channelNumber} with code ${operationCode}`);
  } catch (error) {
    res.send('Invalid channel');
  }
});

app.post('/close', (req, res) => {
  const body = req.body;
  const { channel } = body;
  const channelNumber = parseInt(channel);

  try {
    const operationCode = boardCodes[channelNumber].OPEN;
    res.send(`Clo channel ${channelNumber} with code ${operationCode}`);
  } catch (error) {
    res.send('Invalid channel');
  }
});

app.get('/readAllStatus', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});