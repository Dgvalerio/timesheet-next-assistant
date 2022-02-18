import { UserPreferencesRepository } from '@/services/firestore/UserPreferences/Repository';
import { UserPreferencesDocument } from '@/types/firestore';

interface TimesheetLoginDTO {
  user: UserPreferencesDocument['userId'];
  email: UserPreferencesDocument['lubyMail'];
  password: UserPreferencesDocument['lubyPass'];
}

interface IUserPreferences {
  timesheetLogin(timesheetLoginDTO: TimesheetLoginDTO): Promise<void>;
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
        lubyMail: dto.user,
        lubyPass: dto.password,
      });
    else
      await this.repository.update({
        id: existentPreferences.id,
        userId: dto.user,
        lubyMail: dto.user,
        lubyPass: dto.password,
      });
  }
}

export const UserPreferences = new UserPreferencesController();
