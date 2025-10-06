import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { InstanceService } from '../../application/services/instance.service';
import {
  ApiTags,
  ApiExcludeEndpoint,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { CreateInstanceDto } from '../../application/dtos/create-instance.dto';
import { UpdateInstanceDto } from '../../application/dtos/update-instance.dto';
import { CreateInstanceResponse } from '../../application/dtos/responses/create-instance.response';
import postInstanceResponse from '../../docs/responses/post-instance.response.json';
import { SetPresenceDto } from '../../application/dtos/set-presence.dto';

@ApiTags('EvolutionApi')
@Controller('instance')
export class InstanceController {
  constructor(private readonly instanceService: InstanceService) {}

  @Post()
  @ApiOperation({ summary: 'Create an instance' })
  @ApiResponse({ 
    status: 201,
    description: 'The instance has been successfully created.',
    schema: { example: postInstanceResponse },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data'
  })
  create(@Body() createInstanceDto: CreateInstanceDto): Promise<CreateInstanceResponse> {
    return this.instanceService.create(createInstanceDto);
  }

  
  @Get('/fetchInstances')
  @ApiOperation({ summary: 'Name of instance to fetch' })
  @ApiResponse({ description: 'The instance to be fetched.' })
  @ApiQuery({ name: 'instanceName', description: 'The name of the instance', required: true })
  @ApiQuery({ name: 'instanceId', description: 'The ID of the instance', required: false })
  fetchByName(
    @Query('instanceName') instanceName: string,
    @Query('instanceId') instanceId?: string
  ) {
    return this.instanceService.fetchByName(instanceName, instanceId || null);
  }
  
  @Get(':instanceName')
  @ApiOperation({ summary: 'Name of instance to connect' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiQuery({ name: 'number', description: 'The number of the instance to connect', required: false })
  @ApiResponse({ description: 'The instance has been successfully retrieved.' })
  findByName(
    @Param('instanceName') instanceName: string, 
    @Query('number') number?: string
  ) {
    return this.instanceService.findByName(instanceName, number || null);
  }

  @Get('/connectionState/:instanceName')
  @ApiOperation({ summary: 'Name of the instance to get status connect' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiResponse({ description: 'The instance has been retrieved with status connect.' })
  findStatusConnect(
    @Param('instanceName') instanceName: string
  ) {
    return this.instanceService.findStatusConnect(instanceName);
  }
  
  @Patch('/restart/:instanceName')
  @ApiOperation({ summary: 'Name of the instance to restart' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiResponse({ description: 'The instance has been successfully restarted.' })
  update(
    @Param('instanceName') instanceName: string
  ) {
    return this.instanceService.update(instanceName);
  }

  @Post('/setPresence/:instanceName')
  @ApiOperation({ summary: 'Name of the instance to connect' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ description: 'The presence of the instance', type: SetPresenceDto })
  @ApiResponse({ description: 'The instance has been successfully connected.' })
  setPresence(@Param('instanceName') instanceName: string, @Body() setPresenceDto: SetPresenceDto) {
    return this.instanceService.setPresence(instanceName, setPresenceDto);
  }

  @Delete('/logout/:instanceName')
  @ApiOperation({ summary: 'Name of the instance to logout' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiResponse({ description: 'The instance has been successfully deleted.' })
  logout(@Param('instanceName') instanceName: string) {
    return this.instanceService.logout(instanceName);
  }

  @Delete('/delete/:instanceName')
  @ApiOperation({ summary: 'Name of the instance to delete' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiResponse({ description: 'The instance has been successfully deleted.' })
  delete(@Param('instanceName') instanceName: string) {
    return this.instanceService.delete(instanceName);
  }
}
