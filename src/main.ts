import { SerialInterface } from "./classes/SerialInterface/serialInterface";
import { CommandFactory } from "./classes/CommandFactory/commandFactory";
import { COMMAND_HEADER, FUNCTION_CODES } from "./types";
import { all, decodeStatusMultiple } from "./services/Status/status";

const serial = SerialInterface.getInstance();
const commandFactory = new CommandFactory(COMMAND_HEADER.READ, 0x01, 0x01, FUNCTION_CODES.QUERY_ALL);

serial.port.setEncoding('hex')

serial.port.on('open', function () {
   console.log("Port opened");
})


serial.port.on("data", (data) => {
   const buffer = Buffer.from(data, 'hex');
   const hexArray = Array.from(buffer.toJSON().data);
   const formatedData = hexArray.map((byte: number) => byte.toString(16)).join(' ')

   const binaryStatus = decodeStatusMultiple(hexArray);

   console.log(`DataLength: ${data.length}`);
   console.log(`DataType: ${typeof (data)}`);
   console.log(`Raw: ${data?.toString()}`);
   console.log(`Valid: ${commandFactory.validateCRC(hexArray)}`);
   console.log(`Readable: ${formatedData}`);
   console.log(`Binary: ${binaryStatus}`);
   

});

serial.port.on('readable', () => {

   if (serial.port.readableLength >= 10) serial.port.read()
   console.log(`_____________________________________\n`);

})

setInterval(() => {
   // serial.writeData(commandFactory.getCommand())
   all(0x01)
}, 2000)