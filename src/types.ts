enum COMMAND_HEADER {
   OPEN = 0x8A,
   READ = 0x80,
   MULTICHANNEL_OPEN = 0x90,
   LONG_POWER_ON = 0x9A,
   LONG_POWER_OFF = 0x9B,
}

enum FUNCTION_CODES {
   OPEN = 0x11,
   CLOSE = 0x00
}

type OperationCommand = number[] | Uint8Array;

export { COMMAND_HEADER, FUNCTION_CODES, OperationCommand }