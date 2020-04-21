import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BookRoomCommand } from '../commands/bookRoom.command';

@Injectable()
export class RoomBookService {
  constructor(private readonly commandBus: CommandBus) {} // Barramento de Comandos

  async Book(customerId: string, roomId: string) {
    console.log('RoomBookService:book - Executando o serviço...');

    return await this.commandBus.execute(
      new BookRoomCommand(customerId, roomId),
    );
  }
}
