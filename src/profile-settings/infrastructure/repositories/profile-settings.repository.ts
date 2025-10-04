import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateFetchBusinessProfileSettingDto } from '@/profile-settings/application/dtos/create-fetch-business-profile-setting.dto';
import { CreateFetchProfileSettingDto } from '@/profile-settings/application/dtos/create-fetch-profile-setting.dto';
import { CreateUpdateNameProfileSettingDto } from '@/profile-settings/application/dtos/create-update-name-profile-setting.dto';
import { CreateUpdatePictureProfileSettingDto } from '@/profile-settings/application/dtos/create-update-picture-profile-setting.dto';
import { CreateUpdateStatusProfileSettingDto } from '@/profile-settings/application/dtos/create-update-status-profile-setting.dto';
import { CreateUpdatePrivacyProfileSettingDto } from '@/profile-settings/application/dtos/create-update-privacy-profile-setting.dto';

@Injectable()
export class ProfileSettingsRepository {
  private readonly baseUrl = `${process.env.EVOLUTION_URL}/chat`;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getAuthHeader(): { apikey: string } {
    const apikey = this.configService.get<string>('EVOLUTION_API_KEY');
    return { apikey: `${apikey}` };
  }

  async fetchBusinessProfile(instanceName: string, createFetchBusinessProfileSettingDto: CreateFetchBusinessProfileSettingDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/fetchBusinessProfile/${instanceName}`, createFetchBusinessProfileSettingDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async fetchProfile(instanceName: string, createFetchProfileSettingDto: CreateFetchProfileSettingDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/fetchProfile/${instanceName}`, createFetchProfileSettingDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async updateProfileName(instanceName: string, createUpdateNameProfileSettingDto: CreateUpdateNameProfileSettingDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/updateProfileName/${instanceName}`, createUpdateNameProfileSettingDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async updateProfilePicture(instanceName: string, createUpdatePictureProfileSettingDto: CreateUpdatePictureProfileSettingDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/updateProfilePicture/${instanceName}`, createUpdatePictureProfileSettingDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async updateProfileStatus(instanceName: string, createUpdateStatusProfileSettingDto: CreateUpdateStatusProfileSettingDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/updateProfileStatus/${instanceName}`, createUpdateStatusProfileSettingDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async delete(instanceName: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.baseUrl}/removeProfilePicture/${instanceName}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async fetchPrivacySettings(instanceName: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/fetchPrivacySettings/${instanceName}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async updatePrivacySettings(instanceName: string, createUpdatePrivacyProfileSettingDto: CreateUpdatePrivacyProfileSettingDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/updatePrivacySettings/${instanceName}`, createUpdatePrivacyProfileSettingDto, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }
}