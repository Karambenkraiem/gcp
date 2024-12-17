import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      userId: 1,
      email: 'john.doe@example.com',
      password: 'password123', // Use hashed passwords in production
      name: 'John Doe',
      posts: 'First post',
      soldeConge: 12,

    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane.doe@example.com' },
    update: {},
    create: {
      userId: 2,
      email: 'jane.doe@example.com',
      password: 'securepassword', // Use hashed passwords in production
      name: 'Jane Doe',
      soldeConge: 14,
      posts: 'Another post',
    },
  });

  // Seed Conges
  await prisma.conge.createMany({
    data: [
      {
        dateCreated: new Date(),
        dateDebut: new Date('2024-12-15'),
        nbreJour: 5,
        etatConge: 'En Attente',
        adressConge: '123 Vacation Lane',
        userUserId: user1.userId,
      },
      {
        dateCreated: new Date(),
        dateDebut: new Date('2024-12-20'),
        nbreJour: 3,
        etatConge: 'Accepté',
        adressConge: '456 Retreat Blvd',
        userUserId: user2.userId,
      },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
