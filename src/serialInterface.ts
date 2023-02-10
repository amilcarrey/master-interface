
import {SerialPort} from 'serialport';
import { ByteLengthParser } from '@serialport/parser-byte-length'
import { generateDataFrame } from './generator';

export class SerialInterface {
   private static instances: Map<string, SerialInterface> = new Map<string, SerialInterface>();;
   private port: SerialPort;
   private parser: ByteLengthParser;

   private readonly BAUD_RATE = 9600;

   private constructor(portName: string) {
      this.port = new SerialPort({path:portName, baudRate: this.BAUD_RATE });
      this.parser = this.port.pipe(new ByteLengthParser({ length: 5 }));
   }

   public static getInstance(portName: string = "COM2") {
      if (!SerialInterface.instances.has(portName) || SerialInterface.instances.get(portName) === undefined) {
         SerialInterface.instances.set(portName, new SerialInterface(portName));
      }
      return SerialInterface.instances.get(portName);
   }

   public readData() {
      this.parser.on("data", (data) => {
         console.log(data);
      });
   }

   public writeData(data: number[] | Uint8Array) {
      const newData = generateDataFrame(data);
      this.port.write(newData, (err) => {
         if (err) {
            return console.log("Error on write: ", err.message);
         }
         console.log(`Message written: ${newData}`);
      });
   }
}



