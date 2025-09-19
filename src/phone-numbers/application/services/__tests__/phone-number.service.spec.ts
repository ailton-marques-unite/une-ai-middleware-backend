import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PhoneNumberService } from '../phone-number.service';
import { PhoneNumberRepository } from '../../../infrastructure/repositories/phone-number.repository';
import { CreatePhoneNumberDto } from '../../dtos/create-phone-number.dto';
import { UpdatePhoneNumberDto } from '../../dtos/update-phone-number.dto';
import { ListPhoneNumbersQueryDto } from '../../dtos/list-phone-numbers-query.dto';
import { PhoneNumber, PhoneNumberStatus, PhoneNumberType } from '../../../domain/entities/phone-number.entity';

describe('PhoneNumberService', () => {
  let service: PhoneNumberService;
  let repository: jest.Mocked<PhoneNumberRepository>;

  const mockPhoneNumber: PhoneNumber = {
    id: 'ph_1',
    orgId: 'org_1',
    number: '+1234567890',
    countryCode: 'US',
    areaCode: '234',
    type: PhoneNumberType.LOCAL,
    status: PhoneNumberStatus.ACTIVE,
    provider: 'twilio',
    providerId: 'PN1234567890',
    capabilities: {
      voice: true,
      sms: true,
      mms: false,
      fax: false,
    },
    cost: {
      monthly: 1.00,
      setup: 0.00,
      perMinute: 0.02,
      currency: 'USD',
    },
    description: 'Main business line',
    friendlyName: 'Business Line',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isActive: true,
    region: 'us-east-1',
    locality: 'New York',
  };

  const mockRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhoneNumberService,
        {
          provide: PhoneNumberRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PhoneNumberService>(PhoneNumberService);
    repository = module.get(PhoneNumberRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all phone numbers', async () => {
      const query: ListPhoneNumbersQueryDto = { limit: 10 };
      repository.findAll.mockResolvedValue([mockPhoneNumber]);

      const result = await service.findAll(query);

      expect(repository.findAll).toHaveBeenCalledWith(query);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: mockPhoneNumber.id,
        orgId: mockPhoneNumber.orgId,
        number: mockPhoneNumber.number,
        countryCode: mockPhoneNumber.countryCode,
        areaCode: mockPhoneNumber.areaCode,
        type: mockPhoneNumber.type,
        status: mockPhoneNumber.status,
        provider: mockPhoneNumber.provider,
        providerId: mockPhoneNumber.providerId,
        capabilities: mockPhoneNumber.capabilities,
        cost: mockPhoneNumber.cost,
        description: mockPhoneNumber.description,
        friendlyName: mockPhoneNumber.friendlyName,
        voiceUrl: mockPhoneNumber.voiceUrl,
        smsUrl: mockPhoneNumber.smsUrl,
        statusCallback: mockPhoneNumber.statusCallback,
        statusCallbackMethod: mockPhoneNumber.statusCallbackMethod,
        tags: mockPhoneNumber.tags,
        metadata: mockPhoneNumber.metadata,
        createdAt: mockPhoneNumber.createdAt,
        updatedAt: mockPhoneNumber.updatedAt,
        purchasedAt: mockPhoneNumber.purchasedAt,
        expiresAt: mockPhoneNumber.expiresAt,
        isActive: mockPhoneNumber.isActive,
        region: mockPhoneNumber.region,
        locality: mockPhoneNumber.locality,
        addressRequirements: mockPhoneNumber.addressRequirements,
        beta: mockPhoneNumber.beta,
        emergencyAddressSid: mockPhoneNumber.emergencyAddressSid,
        emergencyStatus: mockPhoneNumber.emergencyStatus,
        identitySid: mockPhoneNumber.identitySid,
        origin: mockPhoneNumber.origin,
        phoneNumberSid: mockPhoneNumber.phoneNumberSid,
        trunkSid: mockPhoneNumber.trunkSid,
        uri: mockPhoneNumber.uri,
        voiceApplicationSid: mockPhoneNumber.voiceApplicationSid,
        voiceCallerIdLookup: mockPhoneNumber.voiceCallerIdLookup,
        voiceFallbackMethod: mockPhoneNumber.voiceFallbackMethod,
        voiceFallbackUrl: mockPhoneNumber.voiceFallbackUrl,
        voiceMethod: mockPhoneNumber.voiceMethod,
        voiceReceiveMode: mockPhoneNumber.voiceReceiveMode,
        smsApplicationSid: mockPhoneNumber.smsApplicationSid,
        smsFallbackMethod: mockPhoneNumber.smsFallbackMethod,
        smsFallbackUrl: mockPhoneNumber.smsFallbackUrl,
        smsMethod: mockPhoneNumber.smsMethod,
        statusCallbackEvent: mockPhoneNumber.statusCallbackEvent,
        statusCallbackUrl: mockPhoneNumber.statusCallbackUrl,
      });
    });
  });

  describe('findById', () => {
    it('should return a phone number by id', async () => {
      repository.findById.mockResolvedValue(mockPhoneNumber);

      const result = await service.findById('ph_1');

      expect(repository.findById).toHaveBeenCalledWith('ph_1');
      expect(result.id).toBe('ph_1');
    });

    it('should throw NotFoundException when phone number not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findById('nonexistent')).rejects.toThrow(
        'Phone number with ID nonexistent not found',
      );
    });
  });

  describe('create', () => {
    it('should create a new phone number', async () => {
      const createDto: CreatePhoneNumberDto = {
        number: '+1234567890',
        countryCode: 'US',
        areaCode: '234',
        type: PhoneNumberType.LOCAL,
        provider: 'twilio',
        providerId: 'PN1234567890',
        description: 'Main business line',
        friendlyName: 'Business Line',
      };

      const createdPhoneNumber = {
        ...mockPhoneNumber,
        id: 'ph_new',
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      };

      repository.create.mockResolvedValue(createdPhoneNumber);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          orgId: 'default-org',
          number: createDto.number,
          countryCode: createDto.countryCode,
          areaCode: createDto.areaCode,
          type: createDto.type,
          provider: createDto.provider,
          providerId: createDto.providerId,
          description: createDto.description,
          friendlyName: createDto.friendlyName,
          status: PhoneNumberStatus.ACTIVE,
          isActive: true,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
      expect(result.id).toBe('ph_new');
    });
  });

  describe('update', () => {
    it('should update a phone number', async () => {
      const updateDto: UpdatePhoneNumberDto = {
        description: 'Updated description',
        friendlyName: 'Updated name',
      };

      const updatedPhoneNumber = {
        ...mockPhoneNumber,
        description: 'Updated description',
        friendlyName: 'Updated name',
        updatedAt: '2024-01-02T00:00:00Z',
      };

      repository.findById.mockResolvedValue(mockPhoneNumber);
      repository.update.mockResolvedValue(updatedPhoneNumber);

      const result = await service.update('ph_1', updateDto);

      expect(repository.findById).toHaveBeenCalledWith('ph_1');
      expect(repository.update).toHaveBeenCalledWith('ph_1', {
        ...updateDto,
        updatedAt: expect.any(String),
      });
      expect(result.description).toBe('Updated description');
      expect(result.friendlyName).toBe('Updated name');
    });

    it('should throw NotFoundException when phone number not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update('nonexistent', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a phone number', async () => {
      repository.findById.mockResolvedValue(mockPhoneNumber);
      repository.delete.mockResolvedValue(undefined);

      await service.delete('ph_1');

      expect(repository.findById).toHaveBeenCalledWith('ph_1');
      expect(repository.delete).toHaveBeenCalledWith('ph_1');
    });

    it('should throw NotFoundException when phone number not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.delete('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
