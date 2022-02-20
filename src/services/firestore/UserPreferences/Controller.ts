import { UserPreferencesRepository } from '@/services/firestore/UserPreferences/Repository';
import { UserPreferencesDocument } from '@/types/firestore';
import { decrypt, encrypt } from '@/utils/crypto';

interface TimesheetLoginDTO {
  user: UserPreferencesDocument['userId'];
  email: UserPreferencesDocument['lubyMail'];
  password: string;
}

interface IUserPreferences {
  timesheetLogin(timesheetLoginDTO: TimesheetLoginDTO): Promise<void>;
  getTimesheetLogin(
    userId: UserPreferencesDocument['userId']
  ): Promise<TimesheetLoginDTO | void>;
}

/**
 * @controller UserPreferencesController
 * */
class UserPreferencesController implements IUserPreferences {
  repository: UserPreferencesRepository;

  /** Init repository */
  constructor() {
    this.repository = new UserPreferencesRepository();
  }

  /**
   * Login on Azure Timesheet
   * @param {TimesheetLoginDTO} dto
   * */
  async timesheetLogin(dto: TimesheetLoginDTO): Promise<void> {
    const existentPreferences = await this.repository.show({
      field: 'userId',
      value: dto.user,
    });

    if (!existentPreferences)
      await this.repository.create({
        userId: dto.user,
        lubyMail: dto.email,
        lubyPass: encrypt(dto.password),
      });
    else
      await this.repository.update({
        id: existentPreferences.id,
        userId: dto.user,
        lubyMail: dto.email,
        lubyPass: encrypt(dto.password),
      });
  }

  /**
   * Get data to login on Azure Timesheet
   * @param {string} userId
   * @return {TimesheetLoginDTO}
   * */
  async getTimesheetLogin(
    userId: UserPreferencesDocument['userId']
  ): Promise<TimesheetLoginDTO | void> {
    const preferences = await this.repository.show({
      field: 'userId',
      value: userId,
    });

    if (!preferences) return;

    const password = decrypt(preferences.lubyPass);

    return { user: preferences.userId, email: preferences.lubyMail, password };
  }
}

export const UserPreferences = new UserPreferencesController();
