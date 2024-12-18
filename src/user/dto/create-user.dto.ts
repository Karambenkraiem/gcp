import { Prisma } from "@prisma/client";

export class CreateUserDto implements Prisma.UserCreateInput{
    userId: number;
    password: string;
    role: string;
    email: string;
    name: string;
    posts?: string;
    Conge?: Prisma.CongeCreateNestedManyWithoutUserInput;
   
}
