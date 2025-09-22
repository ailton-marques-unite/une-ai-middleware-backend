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
} from '@nestjs/swagger';
import { AssistantService } from '../../application/services/assistant.service';
import { CreateAssistantDto } from '../../application/dtos/create-assistant.dto';
import { UpdateAssistantDto } from '../../application/dtos/update-assistant.dto';
import { ListAssistantsQueryDto } from '../../application/dtos/list-assistants-query.dto';
import { AssistantResponseDto } from '../../application/dtos/assistant-response.dto';

@ApiTags('Assistants')
@Controller('assistants')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new assistant' })
  @ApiResponse({
    status: 201,
    description: 'Assistant created successfully',
    type: AssistantResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async create(
    @Body() createAssistantDto: CreateAssistantDto,
  ): Promise<AssistantResponseDto> {
    return this.assistantService.create(createAssistantDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all assistants' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'createdAtGt', required: false, type: String })
  @ApiQuery({ name: 'createdAtLt', required: false, type: String })
  @ApiQuery({ name: 'createdAtGe', required: false, type: String })
  @ApiQuery({ name: 'createdAtLe', required: false, type: String })
  @ApiQuery({ name: 'updatedAtGt', required: false, type: String })
  @ApiQuery({ name: 'updatedAtLt', required: false, type: String })
  @ApiQuery({ name: 'updatedAtGe', required: false, type: String })
  @ApiQuery({ name: 'updatedAtLe', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'List of assistants retrieved successfully',
    type: [AssistantResponseDto],
  })
  async findAll(
    @Query() query: ListAssistantsQueryDto,
  ): Promise<AssistantResponseDto[]> {
    return this.assistantService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get assistant by ID' })
  @ApiParam({ name: 'id', description: 'Assistant ID' })
  @ApiResponse({
    status: 200,
    description: 'Assistant retrieved successfully',
    type: AssistantResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Assistant not found',
  })
  async findOne(@Param('id') id: string): Promise<AssistantResponseDto> {
    return this.assistantService.findById(id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Update assistant by ID' })
  @ApiParam({ name: 'id', description: 'Assistant ID' })
  @ApiResponse({
    status: 200,
    description: 'Assistant updated successfully',
    type: AssistantResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Assistant not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async update(
    @Param('id') id: string,
    @Body() updateAssistantDto: UpdateAssistantDto,
  ): Promise<AssistantResponseDto> {
    return this.assistantService.update(id, updateAssistantDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Delete assistant by ID' })
  @ApiParam({ name: 'id', description: 'Assistant ID' })
  @ApiResponse({
    status: 204,
    description: 'Assistant deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Assistant not found',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.assistantService.delete(id);
  }
}
