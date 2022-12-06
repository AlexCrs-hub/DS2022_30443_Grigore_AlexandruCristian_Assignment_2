import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Device } from './models/device';
import { EnergyConsumption } from './models/energyconsumption';
import { User } from './models/user';
import { DevicesService } from './services/device.service';
import { AppGateway } from './app.gateway';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'RasenganSage12',
    database: 'project',
    entities:[User, Device, EnergyConsumption],
    synchronize: true,
  }), TypeOrmModule.forFeature([Device]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([EnergyConsumption])],
  controllers: [AppController],
  providers: [AppService, DevicesService, AppGateway],
})
export class AppModule {}
