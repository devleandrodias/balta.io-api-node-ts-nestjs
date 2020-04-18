import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { OrderItem } from './entities/orderItem.entity';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { OrderItemService } from './services/orderItem.service';
import { OrderController } from './controllers/order.controler';
import { ProductController } from './controllers/product.controller';
import { AuthService } from 'src/shared/services/authService';
import { JwtStrategy } from 'src/shared/strategies/jwtStrategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secretOrPrivateKey: 'tokenMuitoLouco1234312Desemcriptogrfiar',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([Product, Order, OrderItem]),
  ],
  providers: [
    ProductService,
    OrderService,
    OrderItemService,
    AuthService,
    JwtStrategy,
  ],
  controllers: [ProductController, OrderController],
})
export class StoreModule {}
