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
import { CreatePhoneNumberDto } from '../../application/dtos/create-phone-number.dto';
import { UpdatePhoneNumberDto } from '../../application/dtos/update-phone-number.dto';
import { ListPhoneNumbersQueryDto } from '../../application/dtos/list-phone-numbers-query.dto';
import { PhoneNumberResponseDto } from '../../application/dtos/phone-number-response.dto';

@ApiTags('Phone Numbers')
@Controller('phone-numbers')
export class PhoneNumberController {
  constructor(private readonly phoneNumberService: PhoneNumberService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new phone number' })
  @ApiBody({ type: CreatePhoneNumberDto })
  @ApiResponse({
    status: 201,
    description: 'Phone number created successfully',
    type: PhoneNumberResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async create(@Body() createPhoneNumberDto: CreatePhoneNumberDto): Promise<PhoneNumberResponseDto> {
    return this.phoneNumberService.create(createPhoneNumberDto);
  }

  @Get()
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'List all phone numbers with filtering and pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Maximum number of results (default: 100, max: 1000)' })
  @ApiQuery({ name: 'status', required: false, enum: ['active', 'inactive', 'pending', 'suspended', 'cancelled'] })
  @ApiQuery({ name: 'type', required: false, enum: ['local', 'toll-free', 'mobile', 'international'] })
  @ApiQuery({ name: 'provider', required: false, type: String })
  @ApiQuery({ name: 'countryCode', required: false, type: String })
  @ApiQuery({ name: 'areaCode', required: false, type: String })
  @ApiQuery({ name: 'number', required: false, type: String })
  @ApiQuery({ name: 'friendlyName', required: false, type: String })
  @ApiQuery({ name: 'description', required: false, type: String })
  @ApiQuery({ name: 'region', required: false, type: String })
  @ApiQuery({ name: 'locality', required: false, type: String })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiQuery({ name: 'beta', required: false, type: Boolean })
  @ApiQuery({ name: 'emergencyStatus', required: false, type: String })
  @ApiQuery({ name: 'origin', required: false, type: String })
  @ApiQuery({ name: 'voiceReceiveMode', required: false, type: String })
  @ApiQuery({ name: 'addressRequirements', required: false, type: String })
  @ApiQuery({ name: 'createdAtGt', required: false, type: String, description: 'Created after this date (ISO 8601)' })
  @ApiQuery({ name: 'createdAtLt', required: false, type: String, description: 'Created before this date (ISO 8601)' })
  @ApiQuery({ name: 'createdAtGe', required: false, type: String, description: 'Created on or after this date (ISO 8601)' })
  @ApiQuery({ name: 'createdAtLe', required: false, type: String, description: 'Created on or before this date (ISO 8601)' })
  @ApiQuery({ name: 'updatedAtGt', required: false, type: String, description: 'Updated after this date (ISO 8601)' })
  @ApiQuery({ name: 'updatedAtLt', required: false, type: String, description: 'Updated before this date (ISO 8601)' })
  @ApiQuery({ name: 'updatedAtGe', required: false, type: String, description: 'Updated on or after this date (ISO 8601)' })
  @ApiQuery({ name: 'updatedAtLe', required: false, type: String, description: 'Updated on or before this date (ISO 8601)' })
  @ApiResponse({
    status: 200,
    description: 'Phone numbers retrieved successfully',
    type: [PhoneNumberResponseDto],
  })
  async findAll(@Query() query: ListPhoneNumbersQueryDto): Promise<PhoneNumberResponseDto[]> {
    return this.phoneNumberService.findAll(query);
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

  @Patch(':id')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Update phone number' })
  @ApiParam({ name: 'id', description: 'Phone number ID' })
  @ApiBody({ type: UpdatePhoneNumberDto })
  @ApiResponse({
    status: 200,
    description: 'Phone number updated successfully',
    type: PhoneNumberResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Phone number not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async update(
    @Param('id') id: string,
    @Body() updatePhoneNumberDto: UpdatePhoneNumberDto,
  ): Promise<PhoneNumberResponseDto> {
    return this.phoneNumberService.update(id, updatePhoneNumberDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete phone number' })
  @ApiParam({ name: 'id', description: 'Phone number ID' })
  @ApiResponse({
    status: 204,
    description: 'Phone number deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Phone number not found',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.phoneNumberService.delete(id);
  }
}
