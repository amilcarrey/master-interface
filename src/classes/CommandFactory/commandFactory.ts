import { COMMAND_HEADER, FUNCTION_CODES, OperationCommand } from "../../types";

export class Generator {
   private _command: COMMAND_HEADER
   private _board: number
   private _lockAddress: number
   private _functionCode: FUNCTION_CODES

   constructor(command: COMMAND_HEADER, board: number, lockAddress: number, functionCode: FUNCTION_CODES) {
      this._command = command;
      this._board = board;
      this._lockAddress = lockAddress;
      this._functionCode = functionCode;
   }

   public getCommand(): OperationCommand {
      const commandFrame = [this._command, this._board, this._lockAddress, this._functionCode];
      const crc = this.getCRC(commandFrame, 4);
      const resultDataFrame = [...commandFrame, crc];

      return resultDataFrame
   }

   private getCRC(buff: number[] | Uint8Array, len: number): number {
      let temp = 0;
      for (let i = 0; i < len; i++) {
         temp ^= buff[i];
      }
      return temp;
   }

   public validateCRC(buff: number[] | Uint8Array): boolean {
      // buff without crc (last byte)
      const buffWithoutCRC = buff.slice(0, buff.length - 1);
      //actual crc
      const crc = buff[buff.length - 1];

      const checkedCRC = this.getCRC(buffWithoutCRC, buffWithoutCRC.length);

      return checkedCRC === crc;
   }

   public printFormated() {
      const data = Array.from(this.getCommand()); // convert Uint8Array to number[]
      const result = data.map((value: number) => {
         return value.toString(16).padStart(2, "0");
      });
      console.log(result);

   }
}