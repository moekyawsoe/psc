#!/usr/bin/env node
import { program } from 'commander';
import * as path from 'path';
import { Seeder } from './seeder';
import { readConfig, getSeedFiles, promptSeedSelection } from './utils';
import logger from './logger';

program
  .command('seed')
  .description('Seed database tables based on .psrc configuration')
  .action(async () => {
    try {
      // Read .psrc config
      const config = await readConfig(process.cwd());
      const seedFolder = path.join(process.cwd(), config.seedFolder);

      // Determine Prisma schema path (default to prisma/schema.prisma if not specified)
      const prismaSchemaPath = config.prismaSchemaPath
        ? path.join(process.cwd(), config.prismaSchemaPath)
        : path.join(process.cwd(), 'prisma/schema.prisma');

      // Ensure the schema file exists
      const fs = await import('fs-extra');
      if (!(await fs.pathExists(prismaSchemaPath))) {
        throw new Error(`Prisma schema not found at ${prismaSchemaPath}. Please ensure it exists and run "prisma generate".`);
      }

      // Dynamically import the project’s PrismaClient
      const projectPrismaPath = path.join(process.cwd(), 'node_modules/@prisma/client');
      const { PrismaClient } = await import(projectPrismaPath);

      // Instantiate PrismaClient
      const prisma = new PrismaClient();
      const seeder = new Seeder(prisma);

      // Get seed files
      const seedFiles = await getSeedFiles(seedFolder);
      if (seedFiles.length === 0) {
        logger.info('No seed files found in', seedFolder);
        return;
      }

      // Prompt user to select files
      const selectedFiles = await promptSeedSelection(seedFiles);

      // Seed selected tables
      for (const file of selectedFiles) {
        const model = path.basename(file, path.extname(file)); // Default model name from filename
        const seedFile = require(path.join(seedFolder, file)).default;
        await seeder.seed(model, seedFile); // Seeder will use map if present
      }

      logger.info('Seeding completed!');
    } catch (error) {
      logger.error('Error during seeding:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);
