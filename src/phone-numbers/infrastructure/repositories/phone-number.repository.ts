import { Injectable } from '@nestjs/common';
import { PhoneNumberRepositoryInterface } from '../../domain/repositories/phone-number.repository.interface';
import { PhoneNumber, PhoneNumberStatus, PhoneNumberType } from '../../domain/entities/phone-number.entity';

@Injectable()
export class PhoneNumberRepository implements PhoneNumberRepositoryInterface {
  private phoneNumbers: PhoneNumber[] = [
    {
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
    },
    {
      id: 'ph_2',
      orgId: 'org_1',
      number: '+1987654321',
      countryCode: 'US',
      areaCode: '987',
      type: PhoneNumberType.TOLL_FREE,
      status: PhoneNumberStatus.ACTIVE,
      provider: 'twilio',
      providerId: 'PN0987654321',
      capabilities: {
        voice: true,
        sms: true,
        mms: true,
        fax: false,
      },
      cost: {
        monthly: 2.00,
        setup: 0.00,
        perMinute: 0.03,
        currency: 'USD',
      },
      description: 'Toll-free customer service line',
      friendlyName: 'Customer Service',
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
      isActive: true,
      region: 'us-west-1',
      locality: 'San Francisco',
    },
  ];

  async findAll(query?: any): Promise<PhoneNumber[]> {
    let filteredPhoneNumbers = [...this.phoneNumbers];

    if (query) {
      if (query.status) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.status === query.status
        );
      }

      if (query.type) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.type === query.type
        );
      }

      if (query.provider) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.provider === query.provider
        );
      }

      if (query.countryCode) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.countryCode === query.countryCode
        );
      }

      if (query.areaCode) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.areaCode === query.areaCode
        );
      }

      if (query.number) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.number.includes(query.number)
        );
      }

      if (query.friendlyName) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.friendlyName?.toLowerCase().includes(query.friendlyName.toLowerCase())
        );
      }

      if (query.description) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.description?.toLowerCase().includes(query.description.toLowerCase())
        );
      }

      if (query.region) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.region === query.region
        );
      }

      if (query.locality) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.locality?.toLowerCase().includes(query.locality.toLowerCase())
        );
      }

      if (query.isActive !== undefined) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.isActive === query.isActive
        );
      }

      if (query.beta !== undefined) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.beta === query.beta
        );
      }

      if (query.emergencyStatus) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.emergencyStatus === query.emergencyStatus
        );
      }

      if (query.origin) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.origin === query.origin
        );
      }

      if (query.voiceReceiveMode) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.voiceReceiveMode === query.voiceReceiveMode
        );
      }

      if (query.addressRequirements) {
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => pn.addressRequirements === query.addressRequirements
        );
      }

      // Date filtering
      if (query.createdAtGt) {
        const date = new Date(query.createdAtGt);
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => new Date(pn.createdAt) > date
        );
      }

      if (query.createdAtLt) {
        const date = new Date(query.createdAtLt);
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => new Date(pn.createdAt) < date
        );
      }

      if (query.createdAtGe) {
        const date = new Date(query.createdAtGe);
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => new Date(pn.createdAt) >= date
        );
      }

      if (query.createdAtLe) {
        const date = new Date(query.createdAtLe);
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => new Date(pn.createdAt) <= date
        );
      }

      if (query.updatedAtGt) {
        const date = new Date(query.updatedAtGt);
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => new Date(pn.updatedAt) > date
        );
      }

      if (query.updatedAtLt) {
        const date = new Date(query.updatedAtLt);
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => new Date(pn.updatedAt) < date
        );
      }

      if (query.updatedAtGe) {
        const date = new Date(query.updatedAtGe);
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => new Date(pn.updatedAt) >= date
        );
      }

      if (query.updatedAtLe) {
        const date = new Date(query.updatedAtLe);
        filteredPhoneNumbers = filteredPhoneNumbers.filter(
          pn => new Date(pn.updatedAt) <= date
        );
      }

      // Pagination
      if (query.limit) {
        filteredPhoneNumbers = filteredPhoneNumbers.slice(0, query.limit);
      }
    }

    return filteredPhoneNumbers;
  }

  async findById(id: string): Promise<PhoneNumber | null> {
    return this.phoneNumbers.find(pn => pn.id === id) || null;
  }

  async create(phoneNumber: PhoneNumber): Promise<PhoneNumber> {
    this.phoneNumbers.push(phoneNumber);
    return phoneNumber;
  }

  async update(id: string, phoneNumber: Partial<PhoneNumber>): Promise<PhoneNumber> {
    const index = this.phoneNumbers.findIndex(pn => pn.id === id);
    if (index === -1) {
      throw new Error(`Phone number with ID ${id} not found`);
    }

    this.phoneNumbers[index] = { ...this.phoneNumbers[index], ...phoneNumber };
    return this.phoneNumbers[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.phoneNumbers.findIndex(pn => pn.id === id);
    if (index === -1) {
      throw new Error(`Phone number with ID ${id} not found`);
    }

    this.phoneNumbers.splice(index, 1);
  }
}
