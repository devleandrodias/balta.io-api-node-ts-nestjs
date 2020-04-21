import { Min, Max } from 'class-validator';
import { Field, Int, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class ProductArgs {
  @Field(() => Int)
  @Min(0)
  skip: number = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take: number = 25;
}
