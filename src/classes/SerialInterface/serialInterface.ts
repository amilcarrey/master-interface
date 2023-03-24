
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline'
import { config } from 'dotenv'

config({ path: '.env.local' })

export class SerialInterface {
   private static instances: Map<string, SerialInterface> = new Map<string, SerialInterface>();;
   private port: SerialPort;
   private parser: ReadlineParser;

   private readonly BAUD_RATE = 9600;

   private constructor(portName: string) {
      this.port = new SerialPort({ path: portName, baudRate: this.BAUD_RATE });
      this.parser = this.port.pipe(new ReadlineParser());
   }

   public static getInstance(portName: string = process.env.SERIAL_PORT_NAME || 'COM2') {
      if (!SerialInterface.instances.has(portName) || SerialInterface.instances.get(portName) === undefined) {
         SerialInterface.instances.set(portName, new SerialInterface(portName));
      }
      return SerialInterface.instances.get(portName)!;
   }

   public readData() {
      console.log("Reading data...");
      this.port.pipe(this.parser)
      this.parser.on("data", (data) => {
         console.log(data);
      });
   }

   public writeData(data: number[] | Uint8Array) {
      this.port.write(data, (err) => {
         if (err) {
            return console.log("Error on write: ", err.message);
         }
         console.log(`Message written: ${data}`);
      });
   }

   public close() {
      this.port.close();
   }
}



