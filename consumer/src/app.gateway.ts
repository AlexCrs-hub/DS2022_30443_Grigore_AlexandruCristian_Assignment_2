import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AppController } from './app.controller';

@WebSocketGateway({
  cors: {
    origin:['http://localhost']
  },
})
export class AppGateway {

  @WebSocketServer()
  server: Server

  onModuleInit(){
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    })
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() body: any) {
    if(AppController.exceededMax){
      this.server.emit('onMessage', {
        msg:'exceeded max consumption',
        content: body,
      })
      AppController.exceededMax = false;
    }
  }
}
