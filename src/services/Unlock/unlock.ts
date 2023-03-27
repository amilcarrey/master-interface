import { CommandFactory } from "../../classes/CommandFactory/commandFactory";
import { SerialInterface } from "../../classes/SerialInterface/serialInterface";
import { COMMAND_HEADER, FUNCTION_CODES } from "../../types";

const all = (board: number) => {
   const generator = new CommandFactory(COMMAND_HEADER.OPEN, board, 0, FUNCTION_CODES.OPEN);
   const command = generator.getCommand();
   generator.printFormated();

   const serialInterface = SerialInterface.getInstance();
   serialInterface.writeData(command);
   return command;
}

const lockerNumber = (board: number, lockerNumber: number) => {
   console.log('board', board);
   console.log('lockerNumber', lockerNumber);
   
   const generator = new CommandFactory(COMMAND_HEADER.OPEN, board, lockerNumber, FUNCTION_CODES.OPEN);
   const command = generator.getCommand();
   generator.printFormated();

   const serialInterface = SerialInterface.getInstance();
   serialInterface.writeData(command);
   return command;
}

export { all, lockerNumber }