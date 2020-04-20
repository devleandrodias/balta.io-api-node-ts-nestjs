import { Injectable } from '@nestjs/common';
import { Room } from '../model/room.model';

@Injectable()
export class RoomRepository {
  async findOneById(id: string): Promise<Room> {
    console.log('RoomRepository:findOneById - Recuperando sala...');

    return new Room('123456789');
  }
}
