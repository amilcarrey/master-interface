const testData = [0x8A, 0x01, 0x01, 0x11, 0x00];

//crcXor function is used to calculate the CRC value of the data frame
function generateCRC(buff: number[] | Uint8Array, len: number): number {
   let temp = 0;
   for (let i = 0; i < len; i++) {
      temp ^= buff[i];
   }
   return temp;
}

export function generateDataFrame(txBuff: number[] | Uint8Array) {
   
   const crc = generateCRC(txBuff, 4);

   //Add crc at the end of txBuff but without modifying the original array
   const resultDataFrame = [...txBuff, crc];

   for (const data of resultDataFrame) {
      console.log(data.toString(16).padStart(2, "0"));
   }
}



generateDataFrame(testData);
