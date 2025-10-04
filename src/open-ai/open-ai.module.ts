import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenAiService } from './application/services/open-ai.service';
import { OpenAiController } from './infrastructure/controllers/open-ai.controller';
import { OpenAiRepository } from './infrastructure/repositories/open-ai.repository';

@Module({
  imports: [HttpModule],
  controllers: [OpenAiController],
  providers: [OpenAiService, OpenAiRepository],
})
export class OpenAiModule {}
