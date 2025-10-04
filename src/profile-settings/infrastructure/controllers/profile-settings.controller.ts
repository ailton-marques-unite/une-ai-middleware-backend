import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete,
  HttpStatus } from '@nestjs/common';
import { ProfileSettingsService } from '../../application/services/profile-settings.service';
import { CreateFetchBusinessProfileSettingDto } from '../../application/dtos/create-fetch-business-profile-setting.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateFetchProfileSettingDto } from '../../application/dtos/create-fetch-profile-setting.dto';
import { CreateUpdateNameProfileSettingDto } from '../../application/dtos/create-update-name-profile-setting.dto';
import { CreateUpdatePictureProfileSettingDto } from '../../application/dtos/create-update-picture-profile-setting.dto';
import { CreateUpdateStatusProfileSettingDto } from '../../application/dtos/create-update-status-profile-setting.dto';
import { CreateFetchPrivacySettingsProfileSettingDto } from '../../application/dtos/create-fetch-privacy-settings-profile-setting.dto';
import { CreateUpdatePrivacyProfileSettingDto } from '../../application/dtos/create-update-privacy-profile-setting.dto';

@ApiTags('Profile Settings')
@Controller('chat')
export class ProfileSettingsController {
  constructor(private readonly profileSettingsService: ProfileSettingsService) {}

  @Post('/fetchBusinessProfile/:instanceName')
  @ApiOperation({ summary: 'Fetch business profile' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateFetchBusinessProfileSettingDto,
    description: 'The business profile to fetch',
    examples: {
      'default-config': {
        summary: 'Default configuration',
        description: 'Complete configuration with all options',
        value: {
          "number": "1234567890"
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateFetchBusinessProfileSettingDto, 
    description: 'The business profile was fetched successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The business profile was not fetched for instance name' })
  fetchBusinessProfile(@Param('instanceName') instanceName: string, @ Body() createFetchBusinessProfileSettingDto: CreateFetchBusinessProfileSettingDto) {
    return this.profileSettingsService.fetchBusinessProfile(instanceName, createFetchBusinessProfileSettingDto);
  }

  @Post('/fetchProfile/:instanceName')
  @ApiOperation({ summary: 'Fetch profile' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateFetchProfileSettingDto,
    description: 'The profile to fetch',
    examples: {
      'default-config': {
        summary: 'Default configuration',
        description: 'Complete configuration with all options',
        value: {
          "number": "1234567890"
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateFetchProfileSettingDto, 
    description: 'The profile was fetched successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The profile was not fetched for instance name' })
  fetchProfile(@Param('instanceName') instanceName: string, @ Body() createFetchProfileSettingDto: CreateFetchProfileSettingDto) {
    return this.profileSettingsService.fetchProfile(instanceName, createFetchProfileSettingDto);
  }

  @Post('/updateProfileName/:instanceName')
  @ApiOperation({ summary: 'Update profile name' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateUpdateNameProfileSettingDto,
    description: 'The profile name to update',
    examples: {
      'default-config': {
        summary: 'Default configuration',
        description: 'Complete configuration with all options',
        value: {
          "name": "John Doe"
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateUpdateNameProfileSettingDto, 
    description: 'The profile name was updated successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The profile name was not updated for instance name' })
  updateProfileName(@Param('instanceName') instanceName: string, @ Body() createUpdateNameProfileSettingDto: CreateUpdateNameProfileSettingDto) {
    return this.profileSettingsService.updateProfileName(instanceName, createUpdateNameProfileSettingDto);
  }

  @Post('/updateProfilePicture/:instanceName')
  @ApiOperation({ summary: 'Update profile picture' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateUpdatePictureProfileSettingDto,
    description: 'The profile picture to update',
    examples: {
      'default-config': {
        summary: 'Default configuration',
        description: 'Complete configuration with all options',
        value: {
          "picture": "https://example.com/picture.jpg"
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateUpdatePictureProfileSettingDto, 
    description: 'The profile picture was updated successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The profile picture was not updated for instance name' })
  updateProfilePicture(@Param('instanceName') instanceName: string, @ Body() createUpdatePictureProfileSettingDto: CreateUpdatePictureProfileSettingDto) {
    return this.profileSettingsService.updateProfilePicture(instanceName, createUpdatePictureProfileSettingDto);
  }

  @Post('/updateProfileStatus/:instanceName')
  @ApiOperation({ summary: 'Update profile status' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateUpdateStatusProfileSettingDto,
    description: 'The profile status to update',
    examples: {
      'default-config': {
        summary: 'Default configuration',
        description: 'Complete configuration with all options',
        value: {
          "status": "active"
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateUpdateStatusProfileSettingDto, 
    description: 'The profile status was updated successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The profile status was not updated for instance name' })
  updateProfileStatus(@Param('instanceName') instanceName: string, @ Body() createUpdateStatusProfileSettingDto: CreateUpdateStatusProfileSettingDto) {
    return this.profileSettingsService.updateProfileStatus(instanceName, createUpdateStatusProfileSettingDto);
  }

  @Get('/fetchPrivacySettings/:instanceName')
  @ApiOperation({ summary: 'Fetch privacy settings' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiResponse({ 
    status: 200, 
    description: 'The privacy settings have been successfully fetched',
    type: CreateFetchPrivacySettingsProfileSettingDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'The privacy settings were not fetched for instance name' })
  fetchPrivacySettings(@Param('instanceName') instanceName: string) {
    return this.profileSettingsService.fetchPrivacySettings(instanceName);
  }

  @Delete('/delete/:instanceName')
  @ApiOperation({ summary: 'Delete profile settings' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiResponse({ 
    status: 200, 
    description: 'The profile settings have been successfully deleted' })
  @ApiResponse({ 
    status: 404, 
    description: 'The profile settings were not deleted for instance name' })
  delete(@Param('instanceName') instanceName: string) {
    return this.profileSettingsService.delete(instanceName);
  }

  @Post('/updatePrivacySettings/:instanceName')
  @ApiOperation({ summary: 'Update privacy settings' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateUpdatePrivacyProfileSettingDto,
    description: 'The privacy settings to update',
    examples: {
      'default-config': {
        summary: 'Default configuration',
        description: 'Complete configuration with all privacy options',
        value: {
          "readreceipts": "all",
          "profile": "all",
          "status": "all",
          "online": "all",
          "last": "all",
          "groupadd": "all"
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: CreateUpdatePrivacyProfileSettingDto, 
    description: 'The privacy settings were updated successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The privacy settings were not updated for instance name' })
  updatePrivacySettings(@Param('instanceName') instanceName: string, @ Body() createUpdatePrivacyProfileSettingDto: CreateUpdatePrivacyProfileSettingDto) {
    return this.profileSettingsService.updatePrivacySettings(instanceName, createUpdatePrivacyProfileSettingDto);
  }
}
