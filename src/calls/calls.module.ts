import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CallController } from './infrastructure/controllers/call.controller';
import { CallService } from './application/services/call.service';
import { CallRepository } from './infrastructure/repositories/call.repository';

@Module({
  imports: [HttpModule],
  controllers: [CallController],
  providers: [
    CallRepository,
    CallService,
  ],
  exports: [CallService, CallRepository],
})
export class CallsModule {}
