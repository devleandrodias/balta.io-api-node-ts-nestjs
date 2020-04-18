import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { GenericResult } from 'src/shared/result.model';
import { GenericMessage } from 'src/shared/genericMessages.enum';
import { Product } from '../entities/product.entity';

@Controller('v1/products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async get() {
    try {
      return new GenericResult(null, true, await this.service.get(), null);
    } catch (error) {
      throw new HttpException(
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

  @Get(':id')
  async getById(@Param('id') id: number) {
    try {
      return new GenericResult(
        GenericMessage.SuccessExecutableAction,
        true,
        await this.getById(id),
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
  async post(@Body() model: Product) {
    try {
      return new GenericResult(
        GenericMessage.SuccessExecutableAction,
        true,
        await this.service.post(model),
        null,
      );
    } catch (error) {
      return new GenericResult(
        GenericMessage.NotExecutableAction,
        false,
        null,
        error,
      );
    }
  }

  @Put(':id')
  async put(@Param('id') id: number, @Body() model: Product) {
    try {
      return new GenericResult(
        GenericMessage.SuccessExecutableAction,
        true,
        await this.service.put(id, model),
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

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return new GenericResult(
        GenericMessage.SuccessExecutableAction,
        true,
        await this.service.delete(id),
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
