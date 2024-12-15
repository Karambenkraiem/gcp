import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data:createUserDto
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async getUserConges(userId: number) {
    // Fetch the congés for the specified userId from the database
    return this.prisma.conge.findMany({
      where: {
        userUserId: userId, // Ensure the conge is associated with the correct userId
      },
      include: {
        User: { 
          select: {
            name: true, // Replace 'name' with the actual field for the user's name
          },
        },
      },
    });
  }




  findOne(userId: number) {
    return this.prisma.user.findUnique({
      where: {userId}
      
    });
  }
  

  update(userId: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      data:updateUserDto,
      where:{userId}
    });
  }

  remove(userId: number) {
    this.prisma.user.delete({
      where:{userId}
    });
  }
}
