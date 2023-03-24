import express from 'express';
import cors from 'cors';
import { SerialInterface } from '../classes/SerialInterface/serialInterface';
import { all, lockerNumber as readLockerNumber } from '../services/Status/status';
import { powerOn, powerOff } from '../services/Power/power';
import { all as unlockAll, lockerNumber } from '../services/Unlock/unlock';

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

const serialInterface = SerialInterface.getInstance();
serialInterface.readData();

app.get('/readAllStatus', (req, res) => {
  try {
    const board = req.query.board as string;
    if (!board) return res.send('Invalid board');
    const statuses = all(parseInt(board));
    return res.status(200).send(statuses);
  } catch (error: any) {
    return res.status(500).send({ error: error.message })
  }
});

app.get('/readStatus', (req, res) => {
  try {
    const board = req.query.board as string;
    const locker = req.query.locker as string;
    if (!board) return res.send('Invalid board');
    if (!locker) return res.send('Invalid locker');
    const statuses = readLockerNumber(parseInt(board), parseInt(locker));
    return res.status(200).send(statuses);
  } catch (error: any) {
    return res.status(500).send({ error: error.message })
  }
});

app.post('/unlock', async (req, res) => {
  const body = req.body;
  const { board, locker } = body;
  
  try {
    await lockerNumber(parseInt(board), parseInt(locker));
    res.send(`Unlock locker ${locker} in board ${board}`);
  } catch (error) {
    res.send('Invalid channel');
  }
});

app.post('/unlockAll', async (req, res) => {
  const body = req.body;
  const { board } = body;

  try {
    await unlockAll(parseInt(board));
    res.send(`Unlock all locks of board ${board}`);
  } catch (error) {
    res.send('Invalid channel');
  }
});

app.post('/powerOn', async (req, res) => {
  const body = req.body;
  const { board, pin } = body;

  try {
    await powerOn(parseInt(board));
    res.send(`Powering pin ${pin} of board ${board}`);
  } catch (error) {
    res.send('Invalid channel');
  }
})

app.post('/powerOff', async (req, res) => {
  const body = req.body;
  const { board, pin } = body;

  try {
    await powerOff(parseInt(board));
    res.send(`Powering off pin ${pin} of board ${board}`);
  } catch (error) {
    res.send('Invalid channel');
  }
})

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});

// Before stop the server, close serial port
process.on('SIGINT', () => {
  serialInterface.close();
  process.exit();
});
