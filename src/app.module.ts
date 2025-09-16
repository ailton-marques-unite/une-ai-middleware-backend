import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssistantsModule } from './assistants/assistants.module';

@Module({
  imports: [AssistantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
