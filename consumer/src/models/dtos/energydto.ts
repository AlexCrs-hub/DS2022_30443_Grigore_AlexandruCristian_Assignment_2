import { v4 as uuidv4 } from 'uuid';
import { Device } from '../device';


export class EnergyConsumptionDTO {

    timestamp: Date;

    energyConsumption: number;
   
    device: Device;
}