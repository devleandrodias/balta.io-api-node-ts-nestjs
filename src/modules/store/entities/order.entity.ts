import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from './orderItem.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 8 })
  number: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ length: 11 })
  customer: string;

  @OneToMany(
    () => OrderItem,
    ordIte => ordIte.order,
  )
  items: OrderItem[];

  @Column()
  price: number;

  @Column()
  quantity: number;
}
