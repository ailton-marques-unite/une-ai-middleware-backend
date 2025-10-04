import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileSettingsRepository } from '../../infrastructure/repositories/profile-settings.repository';
import { CreateFetchBusinessProfileSettingDto } from '../dtos/create-fetch-business-profile-setting.dto';
import { CreateFetchProfileSettingDto } from '../dtos/create-fetch-profile-setting.dto';
import { CreateUpdateNameProfileSettingDto } from '../dtos/create-update-name-profile-setting.dto';
import { CreateUpdatePictureProfileSettingDto } from '../dtos/create-update-picture-profile-setting.dto';
import { CreateUpdateStatusProfileSettingDto } from '../dtos/create-update-status-profile-setting.dto';
import { CreateUpdatePrivacyProfileSettingDto } from '../dtos/create-update-privacy-profile-setting.dto';

@Injectable()
export class ProfileSettingsService {
  constructor(private readonly profileSettingsRepository: ProfileSettingsRepository) {}

  async fetchBusinessProfile(instanceName: string, createFetchBusinessProfileSettingDto: CreateFetchBusinessProfileSettingDto) {
    const profileSettings = await this.profileSettingsRepository.fetchBusinessProfile(instanceName, createFetchBusinessProfileSettingDto);
    if (!profileSettings) {
      throw new NotFoundException('Profile settings not found');
    }
    return profileSettings;
  }

  async fetchProfile(instanceName: string, createFetchProfileSettingDto: CreateFetchProfileSettingDto) {
    const profileSettings = await this.profileSettingsRepository.fetchProfile(instanceName, createFetchProfileSettingDto);
    if (!profileSettings) {
      throw new NotFoundException('Profile settings not found');
    }
    return profileSettings;
  }

  async updateProfileName(instanceName: string, createUpdateNameProfileSettingDto: CreateUpdateNameProfileSettingDto) {
    const profileSettings = await this.profileSettingsRepository.updateProfileName(instanceName, createUpdateNameProfileSettingDto);
    if (!profileSettings) {
      throw new NotFoundException('Profile settings not found');
    }
    return profileSettings;
  }

  async updateProfilePicture(instanceName: string, createUpdatePictureProfileSettingDto: CreateUpdatePictureProfileSettingDto) {
    const profileSettings = await this.profileSettingsRepository.updateProfilePicture(instanceName, createUpdatePictureProfileSettingDto);
    if (!profileSettings) {
      throw new NotFoundException('Profile settings not found');
    }
    return profileSettings;
  }

  async updateProfileStatus(instanceName: string, createUpdateStatusProfileSettingDto: CreateUpdateStatusProfileSettingDto) {
    const profileSettings = await this.profileSettingsRepository.updateProfileStatus(instanceName, createUpdateStatusProfileSettingDto);
    if (!profileSettings) {
      throw new NotFoundException('Profile settings not found');
    }
    return profileSettings;
  }

  async fetchPrivacySettings(instanceName: string) {
    const profileSettings = await this.profileSettingsRepository.fetchPrivacySettings(instanceName);
    if (!profileSettings) {
      throw new NotFoundException('Profile settings not found');
    }
    return profileSettings;
  }

  async delete(instanceName: string) {
    const profileSettings = await this.profileSettingsRepository.delete(instanceName);
    if (!profileSettings) {
      throw new NotFoundException('Profile settings not found');
    }
    return profileSettings;
  }

  async updatePrivacySettings(instanceName: string, createUpdatePrivacyProfileSettingDto: CreateUpdatePrivacyProfileSettingDto) {
    const profileSettings = await this.profileSettingsRepository.updatePrivacySettings(instanceName, createUpdatePrivacyProfileSettingDto);
    if (!profileSettings) {
      throw new NotFoundException('Profile settings not found');
    }
    return profileSettings;
  }
}
