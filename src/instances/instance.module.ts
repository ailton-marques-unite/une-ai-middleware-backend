import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { InstanceService } from './application/services/instance.service';
import { InstanceController } from './infrastructure/controllers/instance.controller';
import { InstanceRepository } from './infrastructure/repositories/instance.repository';

@Module({
  imports: [HttpModule],
  controllers: [InstanceController],
  providers: [InstanceService, InstanceRepository],
})
export class InstanceModule {}
