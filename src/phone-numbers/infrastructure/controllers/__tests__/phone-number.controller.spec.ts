import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumberController } from '../phone-number.controller';
import { PhoneNumberService } from '../../../application/services/phone-number.service';
import { CreatePhoneNumberRequestDto } from '../../../application/dtos/phone-number-request.dto';
import { PhoneNumberResponseDto } from '../../../application/dtos/phone-number-response.dto';
import { NotFoundException } from '@nestjs/common';
import { PhoneNumberStatus, PhoneNumberType } from '../../../domain/entities/phone-number.entity';

describe('PhoneNumberController', () => {
  let controller: PhoneNumberController;
  let service: jest.Mocked<PhoneNumberService>;

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
      fax: false
    },
    cost: {
      monthly: 1.00,
      setup: 0.00,
      perMinute: 0.01,
      currency: 'USD'
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
      location: 'office'
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
    statusCallbackUrl: 'https://api.example.com/status'
  };

  beforeEach(async () => {
    const mockService = {
      findById: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneNumberController],
      providers: [
        {
          provide: PhoneNumberService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PhoneNumberController>(PhoneNumberController);
    service = module.get(PhoneNumberService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new phone number', async () => {
      const createDto: CreatePhoneNumberRequestDto = {
        credentialId: 'credential_123',
        provider: 'byo-phone-number',
        number: '+1234567890',
        name: 'Test Phone Number',
        assistantId: 'assistant_123'
      };

      service.create.mockResolvedValue(mockPhoneNumberResponse);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
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
        assistantId: 'assistant_123'
      };

      const expectedResponse = {
        ...mockPhoneNumberResponse,
        provider: 'twilio-phone-number'
      };

      service.create.mockResolvedValue(expectedResponse);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result.provider).toBe('twilio-phone-number');
    });

    it('should create a Vapi phone number', async () => {
      const createDto: CreatePhoneNumberRequestDto = {
        credentialId: 'credential_vapi_123',
        provider: 'vapi-phone-number',
        number: '+1234567890',
        name: 'Vapi Phone Number',
        assistantId: 'assistant_123'
      };

      const expectedResponse = {
        ...mockPhoneNumberResponse,
        provider: 'vapi-phone-number'
      };

      service.create.mockResolvedValue(expectedResponse);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result.provider).toBe('vapi-phone-number');
    });

    it('should create a Vonage phone number', async () => {
      const createDto: CreatePhoneNumberRequestDto = {
        credentialId: 'credential_vonage_123',
        provider: 'vonage-phone-number',
        number: '+1234567890',
        name: 'Vonage Phone Number',
        assistantId: 'assistant_123'
      };

      const expectedResponse = {
        ...mockPhoneNumberResponse,
        provider: 'vonage-phone-number'
      };

      service.create.mockResolvedValue(expectedResponse);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result.provider).toBe('vonage-phone-number');
    });

    it('should create a Telnyx phone number', async () => {
      const createDto: CreatePhoneNumberRequestDto = {
        credentialId: 'credential_telnyx_123',
        provider: 'telnyx-phone-number',
        number: '+1234567890',
        name: 'Telnyx Phone Number',
        assistantId: 'assistant_123'
      };

      const expectedResponse = {
        ...mockPhoneNumberResponse,
        provider: 'telnyx-phone-number'
      };

      service.create.mockResolvedValue(expectedResponse);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result.provider).toBe('telnyx-phone-number');
    });

    it('should handle service errors during creation', async () => {
      const createDto: CreatePhoneNumberRequestDto = {
        credentialId: 'credential_123',
        provider: 'byo-phone-number',
        number: '+1234567890'
      };

      const error = new Error('Phone number service error');
      service.create.mockRejectedValue(error);

      await expect(controller.create(createDto)).rejects.toThrow(
        'Phone number service error'
      );
      expect(service.create).toHaveBeenCalledWith(createDto);
    });

    it('should create phone number with complex configuration', async () => {
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
            'Content-Type': 'application/json'
          }
        },
        fallbackDestination: {
          type: 'assistant',
          assistantId: 'fallback_assistant_123',
          message: 'Transferring to fallback assistant'
        }
      };

      const expectedResponse = {
        ...mockPhoneNumberResponse,
        description: 'Complex configuration phone number',
        friendlyName: 'Complex Phone Number'
      };

      service.create.mockResolvedValue(expectedResponse);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result.description).toBe('Complex configuration phone number');
      expect(result.friendlyName).toBe('Complex Phone Number');
    });

    it('should handle validation errors', async () => {
      const createDto: CreatePhoneNumberRequestDto = {
        credentialId: '',
        provider: 'invalid-provider' as any,
        number: 'invalid-number'
      };

      const error = new Error('Validation failed');
      service.create.mockRejectedValue(error);

      await expect(controller.create(createDto)).rejects.toThrow(
        'Validation failed'
      );
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findOne', () => {
    it('should return a phone number by ID', async () => {
      const id = 'ph_1';
      service.findById.mockResolvedValue(mockPhoneNumberResponse);

      const result = await controller.findOne(id);

      expect(service.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockPhoneNumberResponse);
      expect(result.id).toBe('ph_1');
      expect(result.number).toBe('+1234567890');
    });

    it('should throw NotFoundException when phone number is not found', async () => {
      const id = 'non_existent_id';
      service.findById.mockRejectedValue(new NotFoundException(`Phone number with ID ${id} not found`));

      await expect(controller.findOne(id)).rejects.toThrow(
        NotFoundException
      );
      expect(service.findById).toHaveBeenCalledWith(id);
    });

    it('should handle service errors during retrieval', async () => {
      const id = 'ph_1';
      const error = new Error('Phone number service error');
      service.findById.mockRejectedValue(error);

      await expect(controller.findOne(id)).rejects.toThrow(
        'Phone number service error'
      );
      expect(service.findById).toHaveBeenCalledWith(id);
    });

    it('should return phone number with different status', async () => {
      const id = 'ph_inactive';
      const inactivePhoneNumber = {
        ...mockPhoneNumberResponse,
        id: 'ph_inactive',
        status: PhoneNumberStatus.INACTIVE
      };

      service.findById.mockResolvedValue(inactivePhoneNumber);

      const result = await controller.findOne(id);

      expect(service.findById).toHaveBeenCalledWith(id);
      expect(result.status).toBe(PhoneNumberStatus.INACTIVE);
    });

    it('should return phone number with different type', async () => {
      const id = 'ph_toll_free';
      const tollFreePhoneNumber = {
        ...mockPhoneNumberResponse,
        id: 'ph_toll_free',
        type: PhoneNumberType.TOLL_FREE,
        number: '+1800123456'
      };

      service.findById.mockResolvedValue(tollFreePhoneNumber);

      const result = await controller.findOne(id);

      expect(service.findById).toHaveBeenCalledWith(id);
      expect(result.type).toBe(PhoneNumberType.TOLL_FREE);
      expect(result.number).toBe('+1800123456');
    });

    it('should handle phone number with minimal data', async () => {
      const id = 'ph_minimal';
      const minimalPhoneNumber = {
        ...mockPhoneNumberResponse,
        id: 'ph_minimal',
        number: '+1555123456',
        description: undefined,
        friendlyName: undefined,
        tags: undefined,
        metadata: undefined
      };

      service.findById.mockResolvedValue(minimalPhoneNumber);

      const result = await controller.findOne(id);

      expect(service.findById).toHaveBeenCalledWith(id);
      expect(result.id).toBe('ph_minimal');
      expect(result.number).toBe('+1555123456');
      expect(result.description).toBeUndefined();
    });
  });

  describe('general error handling', () => {
    it('should handle unexpected errors in create method', async () => {
      const createDto: CreatePhoneNumberRequestDto = {
        credentialId: 'credential_123',
        provider: 'byo-phone-number',
        number: '+1234567890'
      };

      const error = new Error('Unexpected error');
      service.create.mockRejectedValue(error);

      await expect(controller.create(createDto)).rejects.toThrow(
        'Unexpected error'
      );
    });

    it('should handle unexpected errors in findOne method', async () => {
      const id = 'ph_1';
      const error = new Error('Unexpected error');
      service.findById.mockRejectedValue(error);

      await expect(controller.findOne(id)).rejects.toThrow(
        'Unexpected error'
      );
    });
  });
});
