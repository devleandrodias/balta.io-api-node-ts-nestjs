import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AgendaController } from './controllers/agenda.controller';
import { RoomBookService } from './services/roomBook.service';
import { RoomRepository } from './repositories/room.repository';
import { CommandHandlers } from './handlers';

@Module({
  imports: [CqrsModule],
  controllers: [AgendaController],
  providers: [RoomBookService, RoomRepository, ...CommandHandlers],
})
export class AgendaModule {}
