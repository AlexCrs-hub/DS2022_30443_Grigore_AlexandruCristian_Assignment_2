import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Device } from "./device";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class EnergyConsumption {
    
    @PrimaryGeneratedColumn('uuid')
    id: uuidv4;

    @Column()
    timestamp: Date;

    @Column()
    energyConsumption: number;

    @ManyToOne(() => Device, device => device.id)
    device: Device;
}