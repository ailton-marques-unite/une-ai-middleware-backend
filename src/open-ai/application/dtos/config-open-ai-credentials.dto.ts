import { IsString, IsNotEmpty } from 'class-validator';

export class ConfigOpenAiCredentialsDto {
  @IsString()
  @IsNotEmpty()
  apiKey: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
