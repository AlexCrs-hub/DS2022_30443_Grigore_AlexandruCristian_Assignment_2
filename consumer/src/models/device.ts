import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { EnergyConsumption } from "./energyconsumption";
import { User } from "./user";

@Entity()
export class Device {

    @PrimaryGeneratedColumn('uuid')
    id: uuidv4;

    @Column()
    description: string;

    @Column()
    address: string;

    @Column()
    maxHrEnergyConsumption: number;

    @Column({ nullable: true })
    userId: typeof uuidv4;

    @ManyToOne(() => User, user => user.devices, {cascade: true, onDelete: "SET NULL", eager: true})
    @JoinColumn({name: "userId"})
    user: User;

    @OneToMany(() => EnergyConsumption, hourlyConsumption => hourlyConsumption.id, {cascade: true})
    hourlyConsumption?: EnergyConsumption;

}