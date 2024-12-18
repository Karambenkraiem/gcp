import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CongeModule } from './conge/conge.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [UserModule,
    ScheduleModule.forRoot(),
     PrismaModule, 
     CongeModule,
         
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
