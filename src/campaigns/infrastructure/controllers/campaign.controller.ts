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
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CampaignService } from '../../application/services/campaign.service';
import { CreateCampaignDto } from '../../application/dtos/create-campaign.dto';
import { UpdateCampaignDto } from '../../application/dtos/update-campaign.dto';
import { ListCampaignsQueryDto } from '../../application/dtos/list-campaigns-query.dto';
import { CampaignResponseDto } from '../../application/dtos/campaign-response.dto';

@ApiTags('Campaigns')
@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new campaign' })
  @ApiResponse({
    status: 201,
    description: 'Campaign created successfully',
    type: CampaignResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async create(
    @Body() createCampaignDto: CreateCampaignDto,
  ): Promise<CampaignResponseDto> {
    return this.campaignService.create(createCampaignDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all campaigns' })
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
  @ApiQuery({ name: 'createdBy', required: false, type: String })
  @ApiQuery({ name: 'campaignGroupId', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'List of campaigns retrieved successfully',
    type: [CampaignResponseDto],
  })
  async findAll(
    @Query() query: ListCampaignsQueryDto,
  ): Promise<CampaignResponseDto[]> {
    return this.campaignService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get campaign by ID' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({
    status: 200,
    description: 'Campaign retrieved successfully',
    type: CampaignResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Campaign not found',
  })
  async findOne(@Param('id') id: string): Promise<CampaignResponseDto> {
    return this.campaignService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update campaign by ID' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({
    status: 200,
    description: 'Campaign updated successfully',
    type: CampaignResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Campaign not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ): Promise<CampaignResponseDto> {
    return this.campaignService.update(id, updateCampaignDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete campaign by ID' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({
    status: 204,
    description: 'Campaign deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Campaign not found',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.campaignService.delete(id);
  }
}
