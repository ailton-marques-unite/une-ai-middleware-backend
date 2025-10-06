import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketService } from '../websocket.service';
import { WebsocketRepository } from '../../../infrastructure/repositories/websocket.repository';

describe('WebsocketService', () => {
  let service: WebsocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebsocketService, 
        {
          provide: WebsocketRepository,
          useValue: {
            findByName: jest.fn(),
            setWebsocket: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WebsocketService>(WebsocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
