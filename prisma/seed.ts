import { PrismaClient } from '@prisma/client';
import { users } from './user';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // Define your seed data
  const usersList = users

  // Insert seed data into the User table
  for (const user of usersList) {
    await prisma.user.create({
      data: user,
    });
    console.log(`User ${user.email} seeded.`);
  }

  console.log('Data seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
