import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCongeDto } from './dto/create-conge.dto';
import { UpdateCongeDto } from './dto/update-conge.dto';

@Injectable()
export class CongeService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new Conge
   * @param createCongeDto Data transfer object for creating a Conge
   */
  async create(createCongeDto: CreateCongeDto) {
    return this.prisma.conge.create({
      data:{...createCongeDto,
        dateCreated:new Date().toISOString(),
        dateDebut:new Date().toISOString(),
        etatConge:"En Attente"
      }
    });
  }

  /**
   * Find all Conges for a specific user
   * @param userId ID of the user
   */
  async findAllByUser(userId: number) {
    return this.prisma.conge.findMany({
      where: { userUserId: userId }, // Ensure the correct field name is used
    });
  }

  async getAllConges() {
    return this.prisma.conge.findMany({
      include: {
        User: true, // Include User details
      },
    });
  }
  /**
   * Find a specific Conge by ID
   * @param id ID of the Conge
   */
  async findOne(id: number) {
    return this.prisma.conge.findUnique({
      where: { id },
    });
  }

  /**
   * Update a Conge by ID
   * @param id ID of the Conge
   * @param updateCongeDto Data transfer object for updating a Conge
   */
  async update(id: number, updateCongeDto: UpdateCongeDto) {
    return this.prisma.conge.update({
      where: { id },
      data: updateCongeDto,
    });
  }

  /**
   * Delete a Conge by ID
   * @param id ID of the Conge
   */
  async remove(id: number) {
    return this.prisma.conge.delete({
      where: { id },
    });
  }
}
