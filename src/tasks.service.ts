import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from './user/user.service';

@Injectable()
export class TasksService {
  constructor(private readonly userService: UserService) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT) // S'exécute le 1er de chaque mois à minuit
  async handleMonthlySoldeCongeUpdate() {
    console.log('Updating soldeConge for all users...');
    await this.userService.updateSoldeCongeMonthly();
    console.log('soldeConge updated successfully!');
  }
}
