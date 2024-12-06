import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCongeDto } from './dto/create-conge.dto';
import { UpdateCongeDto } from './dto/update-conge.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  create(createCongeDto: CreateCongeDto) {
    return this.prisma.conge.create({
      data:createCongeDto
    });
  }

  findAll() {
    return this.prisma.conge.findMany();
  }

  findOne(id: number) {
    return this.prisma.conge.findUnique({
      where: {id}
      
    });
  }

  update(id: number, updatecongeDto: UpdateCongeDto) {
    return this.prisma.conge.update({
      data:updatecongeDto,
      where:{id}
    });
  }

  remove(id: number) {
    this.prisma.conge.delete({
      where:{id}
    });
  }
}
