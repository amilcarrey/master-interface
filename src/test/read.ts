import {SerialInterface} from '../serialInterface';


const serialInterface2 = SerialInterface.getInstance("COM3")


serialInterface2?.readData();
