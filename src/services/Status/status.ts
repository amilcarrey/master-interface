import { CommandFactory } from "../../classes/CommandFactory/commandFactory";
import { SerialInterface } from "../../classes/SerialInterface/serialInterface";
import { COMMAND_HEADER, FUNCTION_CODES } from "../../types";

const all = (board: number) => {
   const generator = new CommandFactory(COMMAND_HEADER.READ, board, 0, FUNCTION_CODES.QUERY_ALL);
   const command = generator.getCommand();
   generator.printFormated();

   const serialInterface = SerialInterface.getInstance();
   serialInterface.writeData(command);

   return command;
}

const decodeStatusSingle = (data: number[] | Uint8Array) => {
   //SINGLE QUERY AND SINGLE OPEN
   //Tomar el primer byte como comando
   const command = data[0];

   //Tomar el segundo byte como el numero de board
   const board = data[1];

   //Tomar el tercer byte como el numero de locker
   const locker = data[2];

   //Tomar el cuarto byte como el estado del locker
   const status = data[3];

   //Tomar el ultimo byte como el checksum CRC
   const checksum = data[4];


}

const decodeStatusMultiple = (data: number[] | Uint8Array) => {
   //Multiple
   //Tomar el primer byte como comando
   const command = data[0];

   //Tomar el segundo byte como el numero de board
   const board = data[1];

   //Tomar el anteultimo byte como function code
   const functionCode = data[data.length - 2];

   //El ultimo byte es el checksum CRC
   const checksum = data[data.length - 1];

   //Tomar los bytes entre el segundo y el anteultimo como los lockers
   const lockers = data.slice(2, data.length - 2);

   //Convertir a binario cada byte dentro de lockers
   const lockersBinary = lockers.map((lock) => parseInt(lock.toString(2)))

   

}

const lockerNumber = (board: number, lockerNumber: number) => {
   const generator = new CommandFactory(COMMAND_HEADER.READ, board, lockerNumber, FUNCTION_CODES.QUERY_ALL);
   const command = generator.getCommand();
   generator.printFormated();

   const serialInterface = SerialInterface.getInstance();
   serialInterface.writeData(command);
   return command;
}

export { all, lockerNumber }