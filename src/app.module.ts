import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { StoreModule } from 'src/modules/store/store.module';

const connectionString =
  'mongodb+srv://ldbdias:QakMH0qhuLEtqLjT@cluster0-78woq.azure.mongodb.net/petshop';

@Module({
  imports: [
    MongooseModule.forRoot(connectionString),
    BackofficeModule,
    StoreModule,
  ],
})
export class AppModule {}
