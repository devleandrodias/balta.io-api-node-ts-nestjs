import { Module } from '@nestjs/common';
import { ReportService } from './services/reports.service';
import { ReportsResolver } from './resolvers/reports.resolver';

@Module({
  providers: [ReportService, ReportsResolver],
})
export class ReportsModule {}
