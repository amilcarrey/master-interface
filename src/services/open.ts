import { Generator } from "../commandFactory";
import { SerialInterface } from "../serialInterface";

const all = (board: number) => {
   const generator = new Generator(COMMAND_HEADER.OPEN, board, 0, FUNCTION_CODES.OPEN);
   const command = generator.getCommand();
   generator.printFormated();

   const serialInterface = SerialInterface.getInstance();
   serialInterface.writeData(command);
   return command;
}



export { all, lockNumber }