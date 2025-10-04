import { IsString, 
    IsNotEmpty, 
    IsBoolean, 
    ValidateNested,
    IsOptional,
    IsArray
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class Instance {
  @IsString()
  @IsNotEmpty()
  instanceName: string;

  @IsString()
  @IsNotEmpty()
  instanceType: string;
}

export class HeadersConfig {
  @ApiProperty({ description: 'The authorization of the header' })
  @IsString()
  @IsOptional()
  'Authorization'?: string;
  
  @ApiProperty({ description: 'The Content-Type of the header' })
  @IsString()
  @IsOptional()
  'Content-Type'?: string;
 }

export class WebhookConfig {
    @ApiProperty({ description: 'The url of the webhook' })
    @IsString()
    @IsNotEmpty()
    url: string;
  
    @ApiProperty({ description: 'The byEvents of the webhook' })
    @IsBoolean()
    @IsNotEmpty()
    byEvents: boolean;
  
    @ApiProperty({ description: 'The base64 of the webhook' })
    @IsBoolean()
    @IsOptional()
    base64?: boolean;
  
    @ApiProperty({ description: 'The events of the webhook' })
    @IsArray()
    @IsOptional()
    events?: string[];
  
    @ApiProperty({ description: 'The headers of the webhook' })
    @IsOptional()
    @ValidateNested()
    @Type(() => HeadersConfig)
    Headers?: HeadersConfig;
   }
  
   export class RabbitmqConfig {
    @ApiProperty({ description: 'The enabled of the rabbitmq' })
    @IsBoolean()
    @IsOptional()
    enabled?: boolean;
  
    @ApiProperty({ description: 'The events of the rabbitmq' })
    @IsString()
    @IsOptional()
    events?: string[];
   }
  
   export class SqsConfig {
    @ApiProperty({ description: 'The enabled of the sqs' })
    @IsBoolean()
    @IsOptional()
    enabled?: boolean;
  
    @ApiProperty({ description: 'The events of the sqs' })
    @IsString()
    @IsOptional()
    events?: string[];
   }