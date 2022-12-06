import { v4 as uuidv4 } from 'uuid';

export class DeviceDTO {

    description: string;

    address: string;

    maxHrEnergyConsumption: number;

    userId: uuidv4;
}