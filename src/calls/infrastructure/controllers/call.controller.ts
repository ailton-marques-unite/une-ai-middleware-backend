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
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CallService } from '../../application/services/call.service';
import { CreateCallDto } from '../../application/dtos/create-call.dto';
import { UpdateCallDto } from '../../application/dtos/update-call.dto';
import { ListCallsQueryDto } from '../../application/dtos/list-calls-query.dto';
import { CallResponseDto } from '../../application/dtos/call-response.dto';

@ApiTags('Calls')
@Controller('calls')
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Post()
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Create a new call' })
  @ApiResponse({
    status: 201,
    description: 'Call created successfully',
    type: CallResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async create(@Body() createCallDto: CreateCallDto): Promise<CallResponseDto> {
    return this.callService.create(createCallDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all calls' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'createdAtGt', required: false, type: String })
  @ApiQuery({ name: 'createdAtLt', required: false, type: String })
  @ApiQuery({ name: 'createdAtGe', required: false, type: String })
  @ApiQuery({ name: 'createdAtLe', required: false, type: String })
  @ApiQuery({ name: 'updatedAtGt', required: false, type: String })
  @ApiQuery({ name: 'updatedAtLt', required: false, type: String })
  @ApiQuery({ name: 'updatedAtGe', required: false, type: String })
  @ApiQuery({ name: 'updatedAtLe', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiQuery({ name: 'assistantId', required: false, type: String })
  @ApiQuery({ name: 'customerId', required: false, type: String })
  @ApiQuery({ name: 'customerPhoneNumber', required: false, type: String })
  @ApiQuery({ name: 'campaignId', required: false, type: String })
  @ApiQuery({ name: 'sessionId', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'List of calls retrieved successfully',
    //type: [any],
  })
  async findAll(@Query() query: ListCallsQueryDto): Promise<any[]> {
    return this.callService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get call by ID' })
  @ApiParam({ name: 'id', description: 'Call ID' })
  @ApiResponse({
    status: 200,
    description: 'Call retrieved successfully',
    type: CallResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Call not found',
  })
  async findOne(@Param('id') id: string): Promise<CallResponseDto> {
    return this.callService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update call by ID' })
  @ApiParam({ name: 'id', description: 'Call ID' })
  @ApiResponse({
    status: 200,
    description: 'Call updated successfully',
    type: CallResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Call not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async update(
    @Param('id') id: string,
    @Body() updateCallDto: UpdateCallDto,
  ): Promise<CallResponseDto> {
    return this.callService.update(id, updateCallDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete call by ID' })
  @ApiParam({ name: 'id', description: 'Call ID' })
  @ApiResponse({
    status: 204,
    description: 'Call deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Call not found',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.callService.delete(id);
  }
}
