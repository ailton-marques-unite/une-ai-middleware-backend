import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumberController } from '../phone-number.controller';
import { PhoneNumberService } from '../../../application/services/phone-number.service';
import { CreatePhoneNumberDto } from '../../../application/dtos/create-phone-number.dto';
import { UpdatePhoneNumberDto } from '../../../application/dtos/update-phone-number.dto';
import { ListPhoneNumbersQueryDto } from '../../../application/dtos/list-phone-numbers-query.dto';
import { PhoneNumberResponseDto } from '../../../application/dtos/phone-number-response.dto';
import { PhoneNumberType, PhoneNumberStatus } from '../../../domain/entities/phone-number.entity';

describe('PhoneNumberController', () => {
  let controller: PhoneNumberController;
  let service: jest.Mocked<PhoneNumberService>;

  const mockPhoneNumberResponse: PhoneNumberResponseDto = {
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

  const mockService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      service.create.mockResolvedValue(mockPhoneNumberResponse);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockPhoneNumberResponse);
    });
  });

  describe('findAll', () => {
    it('should return all phone numbers', async () => {
      const query: ListPhoneNumbersQueryDto = { limit: 10 };
      service.findAll.mockResolvedValue([mockPhoneNumberResponse]);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual([mockPhoneNumberResponse]);
    });

    it('should return filtered phone numbers', async () => {
      const query: ListPhoneNumbersQueryDto = {
        status: PhoneNumberStatus.ACTIVE,
        type: PhoneNumberType.LOCAL,
        limit: 5,
      };
      service.findAll.mockResolvedValue([mockPhoneNumberResponse]);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual([mockPhoneNumberResponse]);
    });
  });

  describe('findOne', () => {
    it('should return a phone number by id', async () => {
      service.findById.mockResolvedValue(mockPhoneNumberResponse);

      const result = await controller.findOne('ph_1');

      expect(service.findById).toHaveBeenCalledWith('ph_1');
      expect(result).toEqual(mockPhoneNumberResponse);
    });
  });

  describe('update', () => {
    it('should update a phone number', async () => {
      const updateDto: UpdatePhoneNumberDto = {
        description: 'Updated description',
        friendlyName: 'Updated name',
      };

      const updatedResponse = {
        ...mockPhoneNumberResponse,
        description: 'Updated description',
        friendlyName: 'Updated name',
      };

      service.update.mockResolvedValue(updatedResponse);

      const result = await controller.update('ph_1', updateDto);

      expect(service.update).toHaveBeenCalledWith('ph_1', updateDto);
      expect(result).toEqual(updatedResponse);
    });
  });

  describe('remove', () => {
    it('should delete a phone number', async () => {
      service.delete.mockResolvedValue(undefined);

      await controller.remove('ph_1');

      expect(service.delete).toHaveBeenCalledWith('ph_1');
    });
  });
});
