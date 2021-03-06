import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Order,
    ord => ord.items,
  )
  order: Order;

  @ManyToOne(
    () => Product,
    pro => pro,
  )
  product: Product;

  @Column()
  price: number;

  @Column()
  quantity: number;
}
