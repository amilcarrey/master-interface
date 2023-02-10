import {SerialInterface} from '../serialInterface';


const serialInterface = SerialInterface.getInstance();
const data = [0x01, 0x02, 0x03, 0x04];
const uint8Array = new Uint8Array(data);
serialInterface?.writeData(uint8Array);