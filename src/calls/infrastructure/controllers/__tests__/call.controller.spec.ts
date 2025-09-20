import { Test, TestingModule } from '@nestjs/testing';
import { CallController } from '../call.controller';
import { CallService } from '../../../application/services/call.service';
import {
  Call,
  CallStatus,
  CallType,
} from '../../../domain/entities/call.entity';
import { CreateCallDto } from '../../../application/dtos/create-call.dto';
import { UpdateCallDto } from '../../../application/dtos/update-call.dto';
import { ListCallsQueryDto } from '../../../application/dtos/list-calls-query.dto';

describe('CallController', () => {
  let controller: CallController;
  let service: jest.Mocked<CallService>;

  const mockCall: Call = {
    id: '1',
    orgId: 'org-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    status: CallStatus.QUEUED,
    type: CallType.OUTBOUND,
    assistantId: 'assistant-1',
    customerId: 'customer-1',
    customerPhoneNumber: '+1234567890',
  };

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByAssistantId: jest.fn(),
      findByCustomerId: jest.fn(),
      findByStatus: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallController],
      providers: [
        {
          provide: CallService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CallController>(CallController);
    service = module.get(CallService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new call', async () => {
      const createDto: CreateCallDto = {
        assistantId: 'assistant-1',
        customerPhoneNumber: '+1234567890',
      };
      service.create.mockResolvedValue(mockCall);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockCall);
    });
  });

  describe('findAll', () => {
    it('should return all calls', async () => {
      const query: ListCallsQueryDto = { limit: 10 };
      const expectedCalls = [mockCall];

      service.findAll.mockResolvedValue(expectedCalls);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedCalls);
    });
  });

  describe('findOne', () => {
    it('should return call by id', async () => {
      service.findById.mockResolvedValue(mockCall);

      const result = await controller.findOne('1');

      expect(service.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockCall);
    });
  });

  describe('update', () => {
    it('should update call by id', async () => {
      const updateDto: UpdateCallDto = { status: CallStatus.IN_PROGRESS };
      const updatedCall = { ...mockCall, ...updateDto };

      service.update.mockResolvedValue(updatedCall);

      const result = await controller.update('1', updateDto);

      expect(service.update).toHaveBeenCalledWith('1', updateDto);
      expect(result).toEqual(updatedCall);
    });
  });

  describe('remove', () => {
    it('should delete call by id', async () => {
      service.delete.mockResolvedValue();

      await controller.remove('1');

      expect(service.delete).toHaveBeenCalledWith('1');
    });
  });
});
