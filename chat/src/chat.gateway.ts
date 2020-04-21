import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  handleConnection(client: any, ...args: any[]) {
    console.log(`${client.id} conectado...`);

    client.broadcast.emit('users', {
      user: client.id,
      action: 'connected',
      message: 'Successfully connected to server',
    });
  }

  handleDisconnect(client: any) {
    console.log(`${client.id} desconectado...`);

    client.broadcast.emit('users', {
      user: client.id,
      action: 'disconnected',
      message: 'Successfully disconnected to server',
    });
  }

  @SubscribeMessage('chat')
  chat(client: any, data: any) {
    console.log(data);
    client.broadcast.emit('chat', data);
    return data;
  }

  @SubscribeMessage('users')
  users(_: any, data: any) {
    console.log(data);
    return data;
  }
}
