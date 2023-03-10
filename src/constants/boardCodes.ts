const BOARD_CODES: {
   [key: number]: {
      READ: string;
      SET: string;
      OPEN: string;
   };
} = {
   1: {
      READ: '0x01',
      SET: '0x01',
      OPEN: '0x01',
   },
   2: {
      READ: '0x02',
      SET: '0x02',
      OPEN: '0x02',
   },
   3: {
      READ: '0x03',
      SET: '0x03',
      OPEN: '0x03',
   },

}

export default BOARD_CODES