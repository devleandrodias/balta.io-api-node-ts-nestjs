import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BookRoomCommand } from '../commands/bookRoom.command';

@Injectable()
export class RoomBookService {
  constructor(private readonly commandBus: CommandBus) {} // Barramento de Comandos

  // Vários comandos sendo executados em sequência
  async Book(command: BookRoomCommand) {
    return await this.commandBus.execute(command);
  }
}
