import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AnalyticsController } from './infrastructure/controllers/analytics.controller';
import { AnalyticsService } from './application/services/analytics.service';
import { AnalyticsRepository } from './infrastructure/repositories/analytics.repository';

@Module({
  imports: [HttpModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsRepository, AnalyticsService],
  exports: [AnalyticsService, AnalyticsRepository],
})
export class AnalyticsModule {}
