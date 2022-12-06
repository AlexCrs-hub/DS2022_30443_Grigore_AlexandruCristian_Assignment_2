import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { DevicesService } from './services/device.service';
import { EnergyConsumptionDTO } from './models/dtos/energydto';

@Controller()
export class AppController {
  currentConsumption: number;
  currentHour: Date;
  static exceededMax: boolean;
  constructor(private readonly appService: AppService, private readonly deviceService: DevicesService) {
    this.currentConsumption = 0;
    this.currentHour = new Date();
    AppController.exceededMax = false;
  }
  

  @MessagePattern('message_printed')
  public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    const hour = new Date(data.timestamp).getMinutes();
    const device = await this.deviceService.findById(data.id);
    if(this.currentHour.getMinutes() === hour){
      this.currentConsumption += parseFloat(data.consumption);
      if(this.currentConsumption > device.maxHrEnergyConsumption){
        AppController.exceededMax = true;
      }
    }
    else{
      const energy: EnergyConsumptionDTO = {timestamp: this.currentHour, energyConsumption: this.currentConsumption, device: device};
      console.log(this.currentConsumption);
      this.deviceService.create(energy);
      this.currentConsumption = 0;
      this.currentHour = new Date();
    }
  }
}
