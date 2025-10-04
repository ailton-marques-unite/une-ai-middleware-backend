import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PhoneNumberService } from '../phone-number.service';
import { PhoneNumberRepository } from '../../../infrastructure/repositories/phone-number.repository';
import { CreatePhoneNumberRequestDto } from '../../dtos/phone-number-request.dto';
import { PhoneNumberResponseDto } from '../../dtos/phone-number-response.dto';
import {
  PhoneNumber,
  PhoneNumberStatus,
  PhoneNumberType,
} from '../../../domain/entities/phone-number.entity';

describe('PhoneNumberService', () => {
  let service: PhoneNumberService;
  let repository: jest.Mocked<PhoneNumberRepository>;

  const mockPhoneNumber: PhoneNumber = {
    id: 'ph_1',
    orgId: 'org-1',
    number: '+1234567890',
    countryCode: 'US',
    areaCode: '555',
    type: PhoneNumberType.LOCAL,
    status: PhoneNumberStatus.ACTIVE,
    provider: 'byo-phone-number',
    providerId: 'prov_1',
    capabilities: {
      voice: true,
      sms: true,
      mms: false,
      fax: false,
    },
    cost: {
      monthly: 1.0,
      setup: 0.0,
      perMinute: 0.01,
      currency: 'USD',
    },
    description: 'Main business line',
    friendlyName: 'Business Phone',
    voiceUrl: 'https://api.example.com/voice',
    smsUrl: 'https://api.example.com/sms',
    statusCallback: 'https://api.example.com/status',
    statusCallbackMethod: 'POST',
    tags: ['business', 'main'],
    metadata: {
      department: 'sales',
      location: 'office',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    purchasedAt: '2024-01-01T00:00:00Z',
    expiresAt: '2025-01-01T00:00:00Z',
    isActive: true,
    region: 'US-CA',
    locality: 'San Francisco',
    addressRequirements: 'none',
    beta: false,
    emergencyAddressSid: null,
    emergencyStatus: 'inactive',
    identitySid: null,
    origin: 'purchase',
    phoneNumberSid: 'PN123456789',
    trunkSid: null,
    uri: '/v1/phone-numbers/ph_1',
    voiceApplicationSid: null,
    voiceCallerIdLookup: 'false',
    voiceFallbackMethod: 'POST',
    voiceFallbackUrl: null,
    voiceMethod: 'POST',
    voiceReceiveMode: 'voice',
    smsApplicationSid: null,
    smsFallbackMethod: 'POST',
    smsFallbackUrl: null,
    smsMethod: 'POST',
    statusCallbackEvent: 'initiated,answered,completed',
    statusCallbackUrl: 'https://api.example.com/status',
  };

  const mockPhoneNumberResponse: PhoneNumberResponseDto = {
    id: 'ph_1',
    orgId: 'org-1',
    number: '+1234567890',
    countryCode: 'US',
    areaCode: '555',
    type: PhoneNumberType.LOCAL,
    status: PhoneNumberStatus.ACTIVE,
    provider: 'byo-phone-number',
    providerId: 'prov_1',
    capabilities: {
      voice: true,
      sms: true,
      mms: false,
      fax: false,
    },
    cost: {
      monthly: 1.0,
      setup: 0.0,
      perMinute: 0.01,
      currency: 'USD',
    },
    description: 'Main business line',
    friendlyName: 'Business Phone',
    voiceUrl: 'https://api.example.com/voice',
    smsUrl: 'https://api.example.com/sms',
    statusCallback: 'https://api.example.com/status',
    statusCallbackMethod: 'POST',
    tags: ['business', 'main'],
    metadata: {
      department: 'sales',
      location: 'office',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    purchasedAt: '2024-01-01T00:00:00Z',
    expiresAt: '2025-01-01T00:00:00Z',
    isActive: true,
    region: 'US-CA',
    locality: 'San Francisco',
    addressRequirements: 'none',
    beta: false,
    emergencyAddressSid: null,
    emergencyStatus: 'inactive',
    identitySid: null,
    origin: 'purchase',
    phoneNumberSid: 'PN123456789',
    trunkSid: null,
    uri: '/v1/phone-numbers/ph_1',
    voiceApplicationSid: null,
    voiceCallerIdLookup: 'false',
    voiceFallbackMethod: 'POST',
    voiceFallbackUrl: null,
    voiceMethod: 'POST',
    voiceReceiveMode: 'voice',
    smsApplicationSid: null,
    smsFallbackMethod: 'POST',
    smsFallbackUrl: null,
    smsMethod: 'POST',
    statusCallbackEvent: 'initiated,answered,completed',
    statusCallbackUrl: 'https://api.example.com/status',
  };

  const mockRepository = {
    findById: jest.fn(),
    create: jest.fn(),
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

  describe('findById', () => {
    it('should return a phone number by ID', async () => {
      const id = 'ph_1';
      repository.findById.mockResolvedValue(mockPhoneNumber);

      const result = await service.findById(id);

      expect(repository.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockPhoneNumberResponse);
      expect(result.id).toBe('ph_1');
      expect(result.number).toBe('+1234567890');
    });

    it('should throw NotFoundException when phone number is not found', async () => {
      const id = 'non_existent_id';
      repository.findById.mockResolvedValue(null);

      await expect(service.findById(id)).rejects.toThrow(NotFoundException);
      await expect(service.findById(id)).rejects.toThrow(
        `Phone number with ID ${id} not found`,
      );
      expect(repository.findById).toHaveBeenCalledWith(id);
    });

    it('should propagate repository errors', async () => {
      const id = 'ph_1';
      const error = new Error('Repository error');
      repository.findById.mockRejectedValue(error);

      await expect(service.findById(id)).rejects.toThrow('Repository error');
      expect(repository.findById).toHaveBeenCalledWith(id);
    });

    it('should handle phone number with minimal data', async () => {
      const id = 'ph_minimal';
      const minimalPhoneNumber: PhoneNumber = {
        ...mockPhoneNumber,
        id: 'ph_minimal',
        number: '+1555123456',
        description: undefined,
        friendlyName: undefined,
        tags: undefined,
        metadata: undefined,
      };

      repository.findById.mockResolvedValue(minimalPhoneNumber);

      const result = await service.findById(id);

      expect(repository.findById).toHaveBeenCalledWith(id);
      expect(result.id).toBe('ph_minimal');
      expect(result.number).toBe('+1555123456');
      expect(result.description).toBeUndefined();
      expect(result.tags).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should create a new phone number', async () => {
      const createDto: CreatePhoneNumberRequestDto = {
        credentialId: 'credential_123',
        provider: 'byo-phone-number',
        number: '+1234567890',
        name: 'Test Phone Number',
        assistantId: 'assistant_123',
      };

      repository.create.mockResolvedValue(mockPhoneNumber);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockPhoneNumberResponse);
      expect(result.id).toBe('ph_1');
      expect(result.provider).toBe('byo-phone-number');
    });

    it('should create a Twilio phone number', async () => {
      const createDto: CreatePhoneNumberRequestDto = {
        credentialId: 'credential_twilio_123',
        provider: 'twilio-phone-number',
        number: '+1234567890',
        name: 'Twilio Phone Number',
        assistantId: 'assistant_123',
      };

      const twilioPhoneNumber: PhoneNumber = {
        ...mockPhoneNumber,
        provider: 'twilio-phone-number',
        providerId: 'twilio_prov_1',
      };

      const expectedResponse: PhoneNumberResponseDto = {
        ...mockPhoneNumberResponse,
        provider: 'twilio-phone-number',
        providerId: 'twilio_prov_1',
      };

      repository.create.mockResolvedValue(twilioPhoneNumber);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedResponse);
      expect(result.provider).toBe('twilio-phone-number');
    });

    it('should create a Vapi phone number', async () => {
      const createDto: CreatePhoneNumberRequestDto = {
        credentialId: 'credential_vapi_123',
        provider: 'vapi-phone-number',
        number: '+1234567890',
        name: 'Vapi Phone Number',
        assistantId: 'assistant_123',
      };

      const vapiPhoneNumber: PhoneNumber = {
        ...mockPhoneNumber,
        provider: 'vapi-phone-number',
        providerId: 'vapi_prov_1',
      };

      const expectedResponse: PhoneNumberResponseDto = {
        ...mockPhoneNumberResponse,
        provider: 'vapi-phone-number',
        providerId: 'vapi_prov_1',
      };

      repository.create.mockResolvedValue(vapiPhoneNumber);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedResponse);
      expect(result.provider).toBe('vapi-phone-number');
    });

    it('should create a Vonage phone number', async () => {
      const createDto: CreatePhoneNumberRequestDto = {
        credentialId: 'credential_vonage_123',
        provider: 'vonage-phone-number',
        number: '+1234567890',
        name: 'Vonage Phone Number',
        assistantId: 'assistant_123',
      };

      const vonagePhoneNumber: PhoneNumber = {
        ...mockPhoneNumber,
        provider: 'vonage-phone-number',
        providerId: 'vonage_prov_1',
      };

      const expectedResponse: PhoneNumberResponseDto = {
        ...mockPhoneNumberResponse,
        provider: 'vonage-phone-number',
        providerId: 'vonage_prov_1',
      };

      repository.create.mockResolvedValue(vonagePhoneNumber);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedResponse);
      expect(result.provider).toBe('vonage-phone-number');
    });

    it('should create a Telnyx phone number', async () => {
      const createDto: CreatePhoneNumberRequestDto = {
        credentialId: 'credential_telnyx_123',
        provider: 'telnyx-phone-number',
        number: '+1234567890',
        name: 'Telnyx Phone Number',
        assistantId: 'assistant_123',
      };

      const telnyxPhoneNumber: PhoneNumber = {
        ...mockPhoneNumber,
        provider: 'telnyx-phone-number',
        providerId: 'telnyx_prov_1',
      };

      const expectedResponse: PhoneNumberResponseDto = {
        ...mockPhoneNumberResponse,
        provider: 'telnyx-phone-number',
        providerId: 'telnyx_prov_1',
      };

      repository.create.mockResolvedValue(telnyxPhoneNumber);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedResponse);
      expect(result.provider).toBe('telnyx-phone-number');
    });

    it('should propagate repository errors during creation', async () => {
      const createDto: CreatePhoneNumberRequestDto = {
        credentialId: 'credential_123',
        provider: 'byo-phone-number',
        number: '+1234567890',
      };

      const error = new Error('Repository creation error');
      repository.create.mockRejectedValue(error);

      await expect(service.create(createDto)).rejects.toThrow(
        'Repository creation error',
      );
      expect(repository.create).toHaveBeenCalledWith(createDto);
    });

    it('should handle phone number creation with complex configuration', async () => {
      const createDto: CreatePhoneNumberRequestDto = {
        credentialId: 'credential_123',
        provider: 'byo-phone-number',
        number: '+1234567890',
        name: 'Complex Phone Number',
        description: 'Complex configuration phone number',
        assistantId: 'assistant_123',
        server: {
          url: 'https://api.example.com/webhook',
          credentialId: 'webhook_cred_123',
          timeoutSeconds: 30,
          headers: {
            'Content-Type': 'application/json',
          },
        },
        fallbackDestination: {
          type: 'assistant',
          assistantId: 'fallback_assistant_123',
          message: 'Transferring to fallback assistant',
        },
      };

      const complexPhoneNumber: PhoneNumber = {
        ...mockPhoneNumber,
        description: 'Complex configuration phone number',
        friendlyName: 'Complex Phone Number',
      };

      repository.create.mockResolvedValue(complexPhoneNumber);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(result.description).toBe('Complex configuration phone number');
      expect(result.friendlyName).toBe('Complex Phone Number');
    });
  });

  describe('mapToResponseDto', () => {
    it('should correctly map all phone number properties', () => {
      const result = service['mapToResponseDto'](mockPhoneNumber);

      expect(result).toEqual(mockPhoneNumberResponse);
      expect(result.id).toBe(mockPhoneNumber.id);
      expect(result.orgId).toBe(mockPhoneNumber.orgId);
      expect(result.number).toBe(mockPhoneNumber.number);
      expect(result.countryCode).toBe(mockPhoneNumber.countryCode);
      expect(result.type).toBe(mockPhoneNumber.type);
      expect(result.status).toBe(mockPhoneNumber.status);
      expect(result.provider).toBe(mockPhoneNumber.provider);
      expect(result.capabilities).toEqual(mockPhoneNumber.capabilities);
      expect(result.cost).toEqual(mockPhoneNumber.cost);
      expect(result.createdAt).toBe(mockPhoneNumber.createdAt);
      expect(result.updatedAt).toBe(mockPhoneNumber.updatedAt);
    });

    it('should handle phone number with undefined optional fields', () => {
      const phoneNumberWithUndefined: PhoneNumber = {
        ...mockPhoneNumber,
        description: undefined,
        friendlyName: undefined,
        tags: undefined,
        metadata: undefined,
      };

      const result = service['mapToResponseDto'](phoneNumberWithUndefined);

      expect(result.description).toBeUndefined();
      expect(result.friendlyName).toBeUndefined();
      expect(result.tags).toBeUndefined();
      expect(result.metadata).toBeUndefined();
      expect(result.id).toBe(phoneNumberWithUndefined.id);
      expect(result.number).toBe(phoneNumberWithUndefined.number);
    });
  });
});
