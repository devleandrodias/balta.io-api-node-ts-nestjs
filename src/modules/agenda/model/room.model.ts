import { AggregateRoot } from '@nestjs/cqrs';
import { RoomBookedEvent } from '../events/roomBooked.event';

export class Room extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  book(customerId: string, date: Date) {
    // Regras de negócio
    // Ele va disparar o evento toda vez que passar por aqui
    this.apply(new RoomBookedEvent(customerId, this.id));
  }
}
