import { InjectRepository } from "@nestjs/typeorm";
import { Device } from "src/models/device";
import { DeviceDTO } from "src/models/dtos/devicedto";
import { EnergyConsumptionDTO } from "src/models/dtos/energydto";
import { EnergyConsumption } from "src/models/energyconsumption";
import { User } from "src/models/user";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

export class DevicesService {
    constructor(
        @InjectRepository(Device)
        private devicesRepository: Repository<Device>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(EnergyConsumption)
        private energyRepository: Repository<EnergyConsumption>
    ) {}

    async update(id: uuidv4, device: Partial<DeviceDTO>): Promise<Device> {
        const deviceToUpdate = await this.devicesRepository.findOneBy({id:id});
        let user = null;
        if(device.userId){
            user = await this.userRepository.findOneBy({id:device.userId});
        }
        console.log(user);
        deviceToUpdate.user = user;
        const updatedDevice : Device = {id:id, description: device.description, address: device.address, maxHrEnergyConsumption: device.maxHrEnergyConsumption,userId: user.id, user: user};
        return await this.devicesRepository.save(updatedDevice);
    }

    async findById(id: uuidv4): Promise<Device> {
        return await this.devicesRepository.findOneBy({id:id});
    }

    async findAll(): Promise<Device[]> {
        return await this.devicesRepository.find({relations: {user: true}});
    }

    async create(energy: EnergyConsumptionDTO): Promise<EnergyConsumption> {
        const createdEnergy = this.energyRepository.create(energy);
        return await this.energyRepository.save(createdEnergy);
    }
}
