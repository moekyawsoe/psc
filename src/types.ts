import { PrismaClient } from "@prisma/client";

export interface SeedData {
  [model: string]: Array<Record<string, any>>;
}

export interface SeedFile {
  data: Array<Record<string, any>>;
  reset?: boolean;
  override?: boolean;
  join: Record<string, any>;
  map?: string;
}

export interface SeederOptions {
  prisma: PrismaClient;
  seedFolder?: string;
}

export interface Config {
  seedFolder: string;
  prismaSchemaPath?: string;
}
