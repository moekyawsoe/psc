# psc - Prisma Seeder CLI

## Project Overview

psc is a command-line tool for seeding your Prisma database with initial data. It supports resetting tables, overriding existing records, and handling relationships.

## Installation

To install psc, you need to have Node.js and npm installed. Then, you can install psc using npm:

```bash
npm install @moekyawsoe/psc
```

## Configuration

Create a `.psrc` configuration file in the root of your project with the following structure:

```json
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

Create a seed file in the `seedFolder` directory. For example, `src/prisma/seeds/user.json`:

```json
{
  "reset": true,
  "override": true,
  "join": {
    "profile": "profileId"
  },
  "map": "user",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "profileId": 1
    },
    {
      "id": 2,
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "profileId": 2
    }
  ]
}
```