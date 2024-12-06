import { Prisma } from "@prisma/client";

export class CreateCongeDto implements Prisma.CongeCreateInput  {
    adressConge: string;
    dateCreated: string | Date;
    dateDebut: string | Date;
    etatConge: string;
    nbreJour: number;
    user: Prisma.UserCreateNestedOneWithoutCongeInput;
    
}
