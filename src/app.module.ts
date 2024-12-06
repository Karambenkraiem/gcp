import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { CongeModule } from './conge/conge.module';

@Module({
  imports: [UserModule, PrismaModule, PostModule, CongeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
