import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CallService } from '../call.service';
import { CallRepository } from '../../../infrastructure/repositories/call.repository';
import {
  Call,
  CallStatus,
  CallType,
} from '../../../domain/entities/call.entity';
import { CreateCallDto } from '../../dtos/create-call.dto';
import { UpdateCallDto } from '../../dtos/update-call.dto';
import { ListCallsQueryDto } from '../../dtos/list-calls-query.dto';

describe('CallService', () => {
  let service: CallService;
  let repository: jest.Mocked<CallRepository>;

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
    const mockRepository = {
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
      providers: [
        CallService,
        {
          provide: CallRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CallService>(CallService);
    repository = module.get(CallRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all calls', async () => {
      const query: ListCallsQueryDto = { limit: 10 };
      const expectedCalls = [mockCall];

      repository.findAll.mockResolvedValue(expectedCalls);

      const result = await service.findAll(query);

      expect(repository.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedCalls);
    });
  });

  describe('findById', () => {
    it('should return call when found', async () => {
      repository.findById.mockResolvedValue(mockCall);

      const result = await service.findById('1');

      expect(repository.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockCall);
    });

    it('should throw NotFoundException when call not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('1')).rejects.toThrow(NotFoundException);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create and return new call', async () => {
      const createDto: CreateCallDto = {
        assistantId: 'assistant-1',
        customerPhoneNumber: '+1234567890',
      };
      repository.create.mockResolvedValue(mockCall);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockCall);
    });
  });

  describe('update', () => {
    it('should update and return call when found', async () => {
      const updateDto: UpdateCallDto = { status: CallStatus.IN_PROGRESS };
      const updatedCall = { ...mockCall, ...updateDto };

      repository.findById.mockResolvedValue(mockCall);
      repository.update.mockResolvedValue(updatedCall);

      const result = await service.update('1', updateDto);

      expect(repository.findById).toHaveBeenCalledWith('1');
      expect(repository.update).toHaveBeenCalledWith('1', updateDto);
      expect(result).toEqual(updatedCall);
    });

    it('should throw NotFoundException when call not found', async () => {
      const updateDto: UpdateCallDto = { status: CallStatus.IN_PROGRESS };
      repository.findById.mockResolvedValue(null);

      await expect(service.update('1', updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('delete', () => {
    it('should delete call when found', async () => {
      repository.findById.mockResolvedValue(mockCall);
      repository.delete.mockResolvedValue();

      await service.delete('1');

      expect(repository.findById).toHaveBeenCalledWith('1');
      expect(repository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when call not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.delete('1')).rejects.toThrow(NotFoundException);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });
  });
});
