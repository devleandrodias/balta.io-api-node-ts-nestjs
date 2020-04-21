import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AgendaController } from './controllers/agenda.controller';
import { RoomBookService } from './services/roomBook.service';
import { RoomRepository } from './repositories/room.repository';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';

// Comando representa algo que vai necessáriamente refletir em uma ação
@Module({
  imports: [CqrsModule],
  controllers: [AgendaController],
  providers: [
    RoomBookService,
    RoomRepository,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class AgendaModule {}
