import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChatwootService } from './application/services/chatwoot.service';
import { ChatwootController } from './infrastructure/controllers/chatwoot.controller';
import { ChatwootRepository } from './infrastructure/repositories/chatwoot.repository';

@Module({
  imports: [HttpModule],
  controllers: [ChatwootController],
  providers: [ChatwootService, ChatwootRepository],
})
export class ChatwootModule {}
