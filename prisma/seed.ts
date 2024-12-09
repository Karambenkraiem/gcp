import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.upsert({
    where: { email: 'johndoe@example.com' },
    update: {},
    create: {
      userId: 1,
      password: 'securepassword123',
      email: 'johndoe@example.com',
      name: 'John Doe',
      posts: 'Sample post content for John Doe.',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'janedoe@example.com' },
    update: {},
    create: {
      userId: 2,
      password: 'securepassword456',
      email: 'janedoe@example.com',
      name: 'Jane Doe',
      posts: 'Sample post content for Jane Doe.',
    },
  });

  // Create Conges for the Users
  await prisma.conge.createMany({
    data: [
      {
        dateDebut: new Date('2024-12-15'),
        dateFin: new Date('2024-12-20'),
        nbreJour: 5,
        etatConge: 'Pending',
        adressConge: '123 Holiday Lane',
        userUserId: user1.userId,
      },
      {
        dateDebut: new Date('2024-12-25'),
        dateFin: new Date('2024-12-30'),
        nbreJour: 5,
        etatConge: 'Approved',
        adressConge: '456 Winter Street',
        userUserId: user2.userId,
      },
    ],
  });

  console.log('Seeding completed successfully!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('Seeding failed:', e);
    prisma.$disconnect();
    process.exit(1);
  });
