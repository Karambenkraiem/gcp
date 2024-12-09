import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCongeDto } from './dto/create-conge.dto';
import { UpdateCongeDto } from './dto/update-conge.dto';

@Injectable()
export class CongeService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCongeDto: CreateCongeDto & { userId: number }) {
    return this.prisma.conge.create({
      data: {
        ...createCongeDto,
        dateCreated: new Date(), // Assign current timestamp
        etatConge: 'Pending',   // Default state
      },
    });
  }
  
  findAllByUser(userId: number) {
    return this.prisma.conge.findMany({
      where: {
        userUserId: userId, // Correct field name
      },
    });
  }
  

  findOne(id: number) {
    return this.prisma.conge.findUnique({
      where: { id },
    });
  }

  update(id: number, updateCongeDto: UpdateCongeDto) {
    return this.prisma.conge.update({
      data: updateCongeDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.conge.delete({
      where: { id },
    });
  }
}
