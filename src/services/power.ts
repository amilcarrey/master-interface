import { Generator } from "../commandFactory";
import { SerialInterface } from "../serialInterface";

const powerOn = (board: number) => {
   const generator = new Generator(COMMAND_HEADER.LONG_POWER_ON, board, 01, FUNCTION_CODES.OPEN);
   const command = generator.getCommand();
   generator.printFormated();

   const serialInterface = SerialInterface.getInstance();
   serialInterface.writeData(command);
   return command;
}

const powerOff = (board: number) => {
   const generator = new Generator(COMMAND_HEADER.LONG_POWER_ON, board, 01, FUNCTION_CODES.OPEN);
   const command = generator.getCommand();
   generator.printFormated();

   const serialInterface = SerialInterface.getInstance();
   serialInterface.writeData(command);
   return command;
}



export { powerOn, powerOff }