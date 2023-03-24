import { Generator } from "../../classes/CommandFactory/commandFactory";
import { SerialInterface } from "../../classes/SerialInterface/serialInterface";
import { COMMAND_HEADER, FUNCTION_CODES } from "../../types";

const all = (board: number) => {
   const generator = new Generator(COMMAND_HEADER.READ, board, 0, FUNCTION_CODES.QUERY_ALL);
   const command = generator.getCommand();
   generator.printFormated();

   const serialInterface = SerialInterface.getInstance();
   serialInterface.writeData(command);

   return command;
}

const lockerNumber = (board: number, lockerNumber: number) => {
   const generator = new Generator(COMMAND_HEADER.OPEN, board, lockerNumber, FUNCTION_CODES.QUERY_ALL);
   const command = generator.getCommand();
   generator.printFormated();

   const serialInterface = SerialInterface.getInstance();
   serialInterface.writeData(command);
   return command;
}

export { all, lockerNumber }