import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { OrderItemService } from '../services/orderItem.service';
import { GenericResult } from 'src/shared/result.model';
import { GenericMessage } from 'src/shared/genericMessages.enum';
import { OrderItemDto } from '../dtos/OrderItem.dto';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/orderItem.entity';

@Controller('v1/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemService,
    private readonly productService: ProductService,
  ) {}

  @Get(':order')
  async getByOrder(@Param('order') order: string) {
    try {
      return new GenericResult(
        GenericMessage.SuccessExecutableAction,
        true,
        await this.orderService.getByNumber(order),
        null,
      );
    } catch (error) {
      return new HttpException(
        new GenericResult(
          GenericMessage.NotExecutableAction,
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':customer')
  async getByCustomer(@Param('customer') customer: string) {
    try {
      return new GenericResult(
        GenericMessage.SuccessExecutableAction,
        true,
        await this.orderService.getByCustomer(customer),
        null,
      );
    } catch (error) {
      return new HttpException(
        new GenericResult(
          GenericMessage.NotExecutableAction,
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async post(@Body() model: OrderItemDto[]) {
    try {
      const order = new Order('12345678911', new Date(), '12F12THD24', []);
      await this.orderService.post(order);

      for (const item of model) {
        const product = await this.productService.getById(item.product);
        const orderItem = new OrderItem();

        orderItem.order = order;
        orderItem.product = product;
        orderItem.price = product.price;
        orderItem.quantity = item.quantity;

        await this.orderItemService.post(orderItem);
      }

      return new GenericResult(
        GenericMessage.SuccessExecutableAction,
        true,
        order,
        null,
      );
    } catch (error) {
      return new HttpException(
        new GenericResult(
          GenericMessage.NotExecutableAction,
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
