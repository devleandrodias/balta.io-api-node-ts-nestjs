import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RoomBookService } from '../services/roomBook.service';
import { BookRoomDto } from '../dto/bookRoom.dto';
import { JwtAuthGuard } from 'src/shared/guards/authGuard';
import { BookRoomCommand } from '../commands/bookRoom.command';
import { GenericResult } from 'src/shared/result.model';

@Controller('v1/rooms')
export class AgendaController {
  constructor(private readonly service: RoomBookService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async book(@Req() req, @Body() model: BookRoomDto) {
    try {
      var command = new BookRoomCommand(
        req.user.document,
        model.roomId,
        model.date,
      );
      await this.service.Book(command);
    } catch (error) {
      throw new HttpException(
        new GenericResult(
          'Não foi possível agendar sua sala',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
