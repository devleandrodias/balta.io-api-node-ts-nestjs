import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookRoomCommand } from '../bookRoom.command';
import { RoomRepository } from '../../repositories/room.repository';

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
  constructor(private readonly repository: RoomRepository) {}

  async execute(command: BookRoomCommand) {
    console.log('BookRoomHandler:execute - Executando o comando...');

    const room = await this.repository.findOneById(command.roomId);

    room.book(command.customerId);
    // commit()
  }
}
