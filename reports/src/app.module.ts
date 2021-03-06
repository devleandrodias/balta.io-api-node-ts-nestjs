import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    ReportsModule,
  ],
})
export class AppModule {}
