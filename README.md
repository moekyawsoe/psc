# psc - Prisma Seeder CLI

## Project Overview

psc is a command-line tool for seeding your Prisma database with initial data. It supports resetting tables, overriding existing records, and handling relationships.

## Installation

To install psc, you need to have Node.js and npm installed. Then, you can install psc using npm:

From GitHub Packages:

```bash
npm install @moekyawsoe/psc --registry https://npm.pkg.github.com/
```

From npmjs.com:

```bash
npm install @moekyawsoe/psc
```

## Configuration

Create a `.psrc` configuration file in the root of your project with the following structure:

```ts
{
  "seedFolder": "src/prisma/seeds",
  "prismaSchemaPath": "src/prisma/schema.prisma"
}
```

- `seedFolder`: The directory containing your seed files.
- `prismaSchemaPath`: The path to your Prisma schema file.

## Usage

To use psc, run the following command:

```bash
npx psc seed
```

Select tables and seed

## Seeding Process

The seeder supports the following options:

- **reset**: Deletes all records in the target model.
- **override**: Deletes records with matching IDs before creating new records.
- **join**: Handles relationships by connecting related records.
- **map**: Optional with map for model. (if filename use balarbalar.json can use optional as map for model)

## Example

### Seed File

Create a seed file in the `seedFolder` directory. For example, `src/prisma/seeds/admin.ts`:

```ts
import md5 from 'md5';

export default {
  map: 'admin',
  data: [
    {
      fullName: 'Greg Crooks',
      username: 'Marcos.Kunze@gmail.com',
      email: 'Milan.OConnell@gmail.com',
      password: md5('asdfasdf'),
      roleId: 1,
      createdBy: 'system',
      updatedBy: null,
    },
  ],
  reset: false,
  override: true,
};

```

```bash
npx psc seed
```