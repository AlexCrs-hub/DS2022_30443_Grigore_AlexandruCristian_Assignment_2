import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { schedule } from "node-cron";
import { ProducerService } from "./producer.service";
import '../../.config.env'
import { ConfigService } from "@nestjs/config";

@Controller('producer')
export class ProducerController {
    constructor(@Inject('MATH_SERVICE') private readonly client: ClientProxy, private readonly producerService: ProducerService, private readonly configService: ConfigService) {}

    async onApplicationBootstrap(){
        await this.client.connect().catch((e)=>console.log(e));
    }

    @Get()
    async getHello() {
        const data:string[] = await this.producerService.readEnergyCSV();
        let i = 0;
        schedule('*/10 * * * *', () => {this.client.emit<any>('message_printed', {id: this.configService.get<string>('DEVICE_ID'), consumption: data[i], timestamp: new Date()}); i+=1;});
    }
}