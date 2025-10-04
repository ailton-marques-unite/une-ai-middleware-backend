import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SendMessageService } from './application/services/send-message.service';
import { SendMessageController } from './infrastructure/controllers/send-message.controller';
import { SendMessageRepository } from './infrastructure/repositories/send-message.repository';

@Module({
  imports: [HttpModule],
  controllers: [SendMessageController],
  providers: [SendMessageService, SendMessageRepository],
})
export class SendMessageModule {}
