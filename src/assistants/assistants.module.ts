import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AssistantController } from './infrastructure/controllers/assistant.controller';
import { AssistantService } from './application/services/assistant.service';
import { AssistantRepository } from './infrastructure/repositories/assistant.repository';

@Module({
  imports: [HttpModule],
  controllers: [AssistantController],
  providers: [AssistantRepository, AssistantService],
  exports: [AssistantService, AssistantRepository],
})
export class AssistantsModule {}
