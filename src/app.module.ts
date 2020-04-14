import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';

const connectionString =
  'mongodb+srv://ldbdias:QakMH0qhuLEtqLjT@cluster0-78woq.azure.mongodb.net/petshop';

@Module({
  imports: [MongooseModule.forRoot(connectionString), BackofficeModule],
})
export class AppModule {}
