import { IsString, IsNotEmpty, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateCongeDto {
    @IsDateString()
    @IsNotEmpty()
    dateDebut: string;
  
    @IsDateString()
    @IsNotEmpty()
    dateFin: string;
  
    @IsNumber()
    @IsNotEmpty()
    nbreJour: number;
  
    @IsString()
    @IsNotEmpty()
    reason: string;
  
    @IsString()
    @IsNotEmpty()
    adressConge: string;
  
    @IsString()
    @IsNotEmpty()
    etatConge: string; // Adding etatConge
  
    @IsDateString()
    @IsOptional() // Allow auto-generated date
    dateCreated?: string;
  }
  