import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerModule } from './producer/producer.module';
import { ProducerService } from './producer/producer.service';


@Module({
  imports: [ProducerModule],
  controllers: [AppController],
  providers: [AppService,ProducerService],
})
export class AppModule {}
