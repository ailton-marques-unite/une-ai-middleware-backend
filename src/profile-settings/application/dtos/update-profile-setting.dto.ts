import { PartialType } from '@nestjs/swagger';
import { CreateProfileSettingDto } from './create-profile-setting.dto';

export class UpdateProfileSettingDto extends PartialType(CreateProfileSettingDto) {}
