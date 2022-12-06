import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';

@Module({
    imports:[ClientsModule.register([
        {
          name: 'MATH_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqps://yfbpspkz:4KFh-Dnz_EhmK1f_TnfJ_NfX1eNuQLRN@goose.rmq2.cloudamqp.com/yfbpspkz'],
            queue: 'sensor',
            queueOptions: {
              durable: false
            },
          },
        },
      ]),
      ConfigModule.forRoot({
        envFilePath: '.config.env',
      })
      ],
    providers:[ProducerService],
    exports:[ProducerService],
    controllers:[ProducerController]
})
export class ProducerModule {}
