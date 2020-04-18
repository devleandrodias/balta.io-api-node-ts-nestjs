import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/orderItem.service';
import { OrderController } from './controllers/order.controler';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Order])],
  providers: [ProductService, OrderService, OrderItemService],
  controllers: [ProductController, OrderController],
})
export class StoreModule {}
