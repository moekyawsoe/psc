import * as fs from 'fs-extra';
import * as path from 'path';
import inquirer from 'inquirer';
import { Config } from './types';

export async function readConfig(rootDir: string): Promise<Config> {
  const configPath = path.join(rootDir, '.psrc');
  if (!(await fs.pathExists(configPath))) {
    throw new Error('Configuration file .psrc not found in project root');
  }
  const config = await fs.readJson(configPath);
  return config as Config;
}

export async function getSeedFiles(seedFolder: string): Promise<string[]> {
  const files = await fs.readdir(seedFolder);
  return files.filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
}

export async function promptSeedSelection(files: string[]): Promise<string[]> {
  const choices = files.map((file) => ({
    name: path.basename(file, path.extname(file)),
    value: file,
  }));

  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedFiles',
      message: 'Select tables to seed:',
      choices,
    },
  ]);

  return answers.selectedFiles;
}