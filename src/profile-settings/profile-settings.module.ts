import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProfileSettingsService } from './application/services/profile-settings.service';
import { ProfileSettingsController } from './infrastructure/controllers/profile-settings.controller';
import { ProfileSettingsRepository } from './infrastructure/repositories/profile-settings.repository';

@Module({
  imports: [HttpModule],
  controllers: [ProfileSettingsController],
  providers: [
    ProfileSettingsService, 
    ProfileSettingsRepository,
  ],
})
export class ProfileSettingsModule {}
