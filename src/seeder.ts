import { PrismaClient } from '@prisma/client';
import { SeedFile } from './types';
import logger from './logger';

export class Seeder {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async seed(model: string, seedFile: SeedFile) {
    try {
      // Use map if provided, otherwise fall back to the filename-derived model
      const targetModel = seedFile.map || model;
      const prismaModel = (this.prisma as any)[targetModel];
      if (!prismaModel) {
        throw new Error(`Model "${targetModel}" not found in Prisma Client`);
      }

      // Handle reset
      if (seedFile.reset) {
        await prismaModel.deleteMany({});
        logger.info(`Reset table: ${targetModel}`);
      }

      // Handle override
      if (seedFile.override) {
        const ids = seedFile.data
          .filter((record) => record.id)
          .map((record) => record.id);
        if (ids.length > 0) {
          await prismaModel.deleteMany({ where: { id: { in: ids } } });
          logger.info(`Overrode ${ids.length} records in ${targetModel}`);
        }
      }

      // Handle join (relationships) and seeding
      const dataWithJoins = seedFile.join
        ? seedFile.data.map((record) => ({
            ...record,
            ...Object.fromEntries(
              Object.entries(seedFile.join).map(([key, value]) => [
                key,
                { connect: value },
              ])
            ),
          }))
        : seedFile.data;

      await prismaModel.createMany({
        data: dataWithJoins,
        skipDuplicates: true,
      });
      logger.info(`Seeded ${dataWithJoins.length} records into ${targetModel}`);
    } catch (error) {
      logger.error(`Seeding failed for ${model}:`, error);
      throw error;
    }
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}
