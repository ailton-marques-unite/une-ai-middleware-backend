import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiExcludeEndpoint,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { PhoneNumberService } from '../../application/services/phone-number.service';
import { CreatePhoneNumberRequestDto } from '../../application/dtos/phone-number-request.dto';
import { UpdatePhoneNumberDto } from '../../application/dtos/update-phone-number.dto';
import { ListPhoneNumbersQueryDto } from '../../application/dtos/list-phone-numbers-query.dto';
import { PhoneNumberResponseDto } from '../../application/dtos/phone-number-response.dto';

@ApiTags('Phone Numbers')
@Controller('phone-numbers')
export class PhoneNumberController {
  constructor(private readonly phoneNumberService: PhoneNumberService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new phone number' })
  @ApiBody({ type: CreatePhoneNumberRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Phone number created successfully',
    type: PhoneNumberResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async create(
    @Body() createPhoneNumberDto: CreatePhoneNumberRequestDto,
  ): Promise<PhoneNumberResponseDto> {
    return this.phoneNumberService.create(createPhoneNumberDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get phone number by ID' })
  @ApiParam({ name: 'id', description: 'Phone number ID' })
  @ApiResponse({
    status: 200,
    description: 'Phone number retrieved successfully',
    type: PhoneNumberResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Phone number not found',
  })
  async findOne(@Param('id') id: string): Promise<PhoneNumberResponseDto> {
    return this.phoneNumberService.findById(id);
  }
}
