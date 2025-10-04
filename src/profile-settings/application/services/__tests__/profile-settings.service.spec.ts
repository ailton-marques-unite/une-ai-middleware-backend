import { Test, TestingModule } from '@nestjs/testing';
import { ProfileSettingsService } from '../profile-settings.service';
import { ProfileSettingsRepository } from '../../../infrastructure/repositories/profile-settings.repository';

describe('ProfileSettingsService', () => {
  let service: ProfileSettingsService;
  let repository: ProfileSettingsRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileSettingsService, { provide: ProfileSettingsRepository, useValue: {
        fetchBusinessProfile: jest.fn(),
        fetchProfile: jest.fn(),
        updateProfileName: jest.fn(),
        updateProfilePicture: jest.fn(),
        updateProfileStatus: jest.fn(),
        fetchPrivacySettings: jest.fn(),
        delete: jest.fn(),
        updatePrivacySettings: jest.fn(),
      }}],
    }).compile();
    service = module.get<ProfileSettingsService>(ProfileSettingsService);
    repository = module.get<ProfileSettingsRepository>(ProfileSettingsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
