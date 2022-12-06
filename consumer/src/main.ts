import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const ap = await NestFactory.create(AppModule);
  ap.listen(3002);
  const app = await NestFactory.createMicroservice(AppModule, {
    name: 'MATH_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://yfbpspkz:4KFh-Dnz_EhmK1f_TnfJ_NfX1eNuQLRN@goose.rmq2.cloudamqp.com/yfbpspkz'],
      queue: 'sensor',
      queueOptions: {
        durable: false,
      },
    },
  });
  
  await app.listen();
}
bootstrap();
