
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline'
import { config } from 'dotenv'

config({ path: '.env.local' })

export class SerialInterface {
   private static instances: Map<string, SerialInterface> = new Map<string, SerialInterface>();;
   public port: SerialPort;
   public parser: ReadlineParser;

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

   public setBufferSizeToRead(size: number = 5, once: boolean = false) {
      this.port.removeAllListeners('readable');
      if (once) {
         this.port.prependOnceListener('readable', (data:any) => {
            console.log(data);
            
            if (this.port.readableLength >= size) this.port.read()
            console.log(`_____________________________________\n`);
         })
         return;
      }
      this.port.on('readable', () => {
         if (this.port.readableLength >= size) this.port.read()
         console.log(`_____________________________________\n`);
      })
   }

   public readData(size: number = 5) {
      this.setBufferSizeToRead(size);
      this.port.on("data", (data) => {
         const buffer = Buffer.from(data, 'hex');
         const hexArray = Array.from(buffer.toJSON().data);
         const formatedData = hexArray.map((byte: number) => byte.toString(16)).join(' ')

         //Emit event to the main process with the data received


         // const binaryStatus = decodeStatusMultiple(hexArray);

         console.log(`DataLength: ${data.length}`);
         console.log(`DataType: ${typeof (data)}`);
         console.log(`Raw: ${data}`);
         // console.log(`Valid: ${commandFactory.validateCRC(hexArray)}`);
         console.log(`Readable: ${formatedData}`);
         // console.log(`Binary: ${binaryStatus}`);


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



