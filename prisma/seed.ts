import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create a User with associated Conges
    const user = await prisma.user.create({
        data: {
            email: 'johndoe@example.com',
            name: 'John Doe',
            posts: 'Sample Post Content',
            Conge: {
                create: [
                    {
                        dateCreated: new Date(),
                        dateDebut: new Date('2024-12-10'),
                        nbreJour: 10,
                        etatConge: 'Pending',
                        adressConge: '123 Main Street',
                    },
                    {
                        dateCreated: new Date(),
                        dateDebut: new Date('2025-01-15'),
                        nbreJour: 5,
                        etatConge: 'Approved',
                        adressConge: '456 Elm Street',
                    },
                ],
            },
        },
    });

    console.log('Seeded user:', user);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
