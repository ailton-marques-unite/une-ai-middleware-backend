import { Test, TestingModule } from '@nestjs/testing';
import { ProfileSettingsController } from '../profile-settings.controller';
import { ProfileSettingsService } from '../../../application/services/profile-settings.service';
import { ProfileSettingsRepository } from '../../../infrastructure/repositories/profile-settings.repository';

describe('ProfileSettingsController', () => {
  let controller: ProfileSettingsController;
  let service: ProfileSettingsService;
  let repository: ProfileSettingsRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileSettingsController],
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

    controller = module.get<ProfileSettingsController>(ProfileSettingsController);
    service = module.get<ProfileSettingsService>(ProfileSettingsService);
    repository = module.get<ProfileSettingsRepository>(ProfileSettingsRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
