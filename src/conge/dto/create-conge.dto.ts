import { Prisma } from '@prisma/client';
import { IsString, IsNotEmpty, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateCongeDto implements Prisma.CongeCreateInput{
  dateCreated?: string | Date;
  dateDebut: string | Date;
  dateFin: string | Date;
  nbreJour: number;
  etatConge: string;
  adressConge: string;
  soldeConge: number;
  User?: Prisma.UserCreateNestedOneWithoutCongeInput;
  }
  