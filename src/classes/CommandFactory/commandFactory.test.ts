import { Generator } from './commandFactory';
import { COMMAND_HEADER, FUNCTION_CODES } from '../../types';

describe('Generator', () => {
   let generator: Generator;

   beforeEach(() => {
      generator = new Generator(COMMAND_HEADER.OPEN, 0x01, 0x01, FUNCTION_CODES.OPEN);
   });

   describe('getCommand', () => {
      it('should return a Uint8Array with the correct command frame and CRC', () => {
         const command = generator.getCommand();
         const expectedCommand = [0x8a, 0x01, 0x01, 0x11, 0x9b];

         expect(command).toEqual(expectedCommand);
      });
   });

   // describe('validateCRC', () => {
   //    it('should return true for a buffer with a valid CRC', () => {
   //       const buffer = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xa9]);

   //       const result = generator.validateCRC(buffer);

   //       expect(result).toBe(true);
   //    });

   //    it('should return false for a buffer with an invalid CRC', () => {
   //       const buffer = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xb9]);

   //       const result = generator.validateCRC(buffer);

   //       expect(result).toBe(false);
   //    });
   // });

   // describe('printFormated', () => {
   //    it('should log the correct formatted string', () => {
   //       const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

   //       generator.printFormated();

   //       expect(consoleSpy).toHaveBeenCalledWith(['01', '02', '03', '04', 'a9']);

   //       consoleSpy.mockRestore();
   //    });
   // });
});