import { CommandFactory } from "../../classes/CommandFactory/commandFactory";
import { SerialInterface } from "../../classes/SerialInterface/serialInterface";
import { COMMAND_HEADER, FUNCTION_CODES } from "../../types";

const powerOn = (board: number, pin: number) => {
   //Create the command
   const generator = new CommandFactory(COMMAND_HEADER.LONG_POWER_ON, board, pin, FUNCTION_CODES.OPEN);
   const command = generator.getCommand();
   generator.printFormated();

   //Send the command
   const serialInterface = SerialInterface.getInstance();
   serialInterface.writeData(command);
   return command;
}

const powerOff = (board: number, pin: number) => {
   //Create the command
   const generator = new CommandFactory(COMMAND_HEADER.LONG_POWER_OFF, board, pin, FUNCTION_CODES.OPEN);
   const command = generator.getCommand();
   generator.printFormated();

   //Send the command
   const serialInterface = SerialInterface.getInstance();
   serialInterface.writeData(command);



   return command;
}



export { powerOn, powerOff }