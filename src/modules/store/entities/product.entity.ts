import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80, type: 'varchar' })
  title: string;

  @Column({ length: 4000, type: 'text' })
  desccription: string;
}
