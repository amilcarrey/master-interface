import { CommandFactory } from "../../classes/CommandFactory/commandFactory";
import { SerialInterface } from "../../classes/SerialInterface/serialInterface";
import { COMMAND_HEADER, FUNCTION_CODES } from "../../types";

const powerOn = (board: number) => {
   //Create the command
   const generator = new CommandFactory(COMMAND_HEADER.LONG_POWER_ON, board, 0x01, FUNCTION_CODES.OPEN);
   const command = generator.getCommand();
   generator.printFormated();

   //Send the command
   const serialInterface = SerialInterface.getInstance();
   serialInterface.writeData(command);
   return command;
}

const powerOff = (board: number) => {
   //Create the command
   const generator = new CommandFactory(COMMAND_HEADER.LONG_POWER_OFF, board, 0x01, FUNCTION_CODES.OPEN);
   const command = generator.getCommand();
   generator.printFormated();

   //Send the command
   const serialInterface = SerialInterface.getInstance();
   serialInterface.writeData(command);



   return command;
}



export { powerOn, powerOff }