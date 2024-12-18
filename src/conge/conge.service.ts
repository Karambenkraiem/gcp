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
      where: { userUserId: userId },
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

  
  async update(id: number, updateCongeDto: UpdateCongeDto) {
    // Find the existing Conge record
    const conge = await this.prisma.conge.findUnique({
      where: { id },
      include: { User: true }, // Include user details to access soldeConge
    });
  
    if (!conge) {
      throw new Error('Congé not found');
    }
  
    let updatedData = { ...updateCongeDto };
  
    // Handle soldeConge update based on state transitions
    if (conge.etatConge === 'Accepté' && updateCongeDto.etatConge !== 'Accepté') {
      // Etat changes from "Accepté" to something else
      const newSoldeConge = (conge.User?.soldeConge || 0) + conge.nbreJour;
  
      // Update the user's soldeConge in the database
      await this.prisma.user.update({
        where: { userId: conge.userUserId },
        data: { soldeConge: newSoldeConge },
      });
    } else if (updateCongeDto.etatConge === 'Accepté' && conge.etatConge !== 'Accepté') {
      // Etat changes to "Accepté"
      const newSoldeConge = (conge.User?.soldeConge || 0) - conge.nbreJour;
  
      // Update the user's soldeConge in the database
      await this.prisma.user.update({
        where: { userId: conge.userUserId },
        data: { soldeConge: newSoldeConge },
      });
    }
  
    // Update the Conge record
    return this.prisma.conge.update({
      where: { id },
      data: updatedData,
    });
  }
  

  // --------------ADDING 2 JOURS CHAQUE MOIS: 
  





  
//------------------------------------------------



  // async update(id: number, updateCongeDto: UpdateCongeDto) {
  //   return this.prisma.conge.update({
  //     where: { id },
  //     data: updateCongeDto,
  //   });
  // }

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
