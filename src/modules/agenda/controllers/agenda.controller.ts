import { Controller, Post, Body } from '@nestjs/common';
import { RoomBookService } from '../services/roomBook.service';

@Controller('v1/rooms')
export class AgendaController {
  constructor(private readonly service: RoomBookService) {}

  @Post()
  async book(@Body() body: any) {
    console.log('AppController:book - Iniciando a aplicação');
    await this.service.Book(body.customer, body.room);
  }
}
