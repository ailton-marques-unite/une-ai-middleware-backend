import { ApiProperty } from '@nestjs/swagger';

export class GetBase64MediaResult {
  @ApiProperty({
    description: 'The unique identifier of the requested message',
    example: '3EB0C767D26A8B4A'
  })
  messageId: string;

  @ApiProperty({
    description: 'Base64-encoded media payload (without data URI prefix)',
    example: '<base64-string>'
  })
  base64: string;

  @ApiProperty({
    description: 'MIME type of the media',
    example: 'image/jpeg'
  })
  mimeType: string;

  @ApiProperty({
    description: 'Original file name when available',
    example: 'photo.jpg',
    required: false
  })
  fileName?: string;

  @ApiProperty({
    description: 'Size of the media in bytes when available',
    example: 204800,
    required: false
  })
  sizeBytes?: number;

  @ApiProperty({
    description: 'Indicates whether the media was converted to MP4',
    example: false,
    required: false
  })
  convertedToMp4?: boolean;
}

export class CreateGetBase64MessageControllerResponseDto {
  @ApiProperty({
    description: 'The result of the base64 media retrieval operation',
    type: GetBase64MediaResult,
    example: {
      messageId: '3EB0C767D26A8B4A',
      base64: '<base64-string>',
      mimeType: 'image/jpeg',
      fileName: 'photo.jpg',
      sizeBytes: 204800,
      convertedToMp4: false
    }
  })
  result: GetBase64MediaResult;
}


