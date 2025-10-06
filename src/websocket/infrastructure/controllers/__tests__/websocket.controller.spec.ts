import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketController } from '../websocket.controller';
import { WebsocketService } from '../../../application/services/websocket.service';

describe('WebsocketController', () => {
  let controller: WebsocketController;
  let service: WebsocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebsocketController],
      providers: [{
        provide: WebsocketService,
        useValue: {
          findByName: jest.fn().mockResolvedValue('found'),
          setWebsocket: jest.fn().mockResolvedValue('set'),
        },
      }],
    }).compile();

    controller = module.get<WebsocketController>(WebsocketController);
    service = module.get<WebsocketService>(WebsocketService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delegate findByName to service', async () => {
    const result = await controller.findByName('instance-1');
    expect(service.findByName).toHaveBeenCalledWith('instance-1');
    expect(result).toBe('found');
  });

  it('should delegate setWebsocket to service', async () => {
    const dto: any = { enabled: true };
    const result = await controller.setWebsocket('instance-2', dto);
    expect(service.setWebsocket).toHaveBeenCalledWith('instance-2', dto);
    expect(result).toBe('set');
  });
});
