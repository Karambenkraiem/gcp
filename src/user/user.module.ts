import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TasksService } from 'src/tasks.service';

@Module({
  imports:[PrismaModule],
  controllers: [UserController],
  providers: [UserService,TasksService],
})
export class UserModule {}
