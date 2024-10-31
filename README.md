# Project overview

Detta projekt är en Node.js-applikation som tillhandahåller ett REST API med ett **/recipes**-endpoint för att hämta receptdata från databasen. Projektet använder Prisma för databashantering, och GitHub Actions för CI.

## Projektstruktur

project-root/
├── prisma/
│ └── schema.prisma
├── src/
│ ├── routes/
│ │ └── recipes.ts
│ └── index.ts
├── package.json
├── tsconfig.json
└── README.md

## API Endpoint

GET /recipes: Fetches all recipes from the database.

### Install dependencies

```bash
npm install
```

## Prisma

```bash
npx prisma migrate dev --name dev
npx prisma generate
npm run seed
```

### Run the app

```bash
npm run dev
```

## Prisma Studio

```bash
npx prisma studio
```

## Continuous Integration (CI) Workflow

ci.yml-filen konfigurerar en **CI-pipeline** för Node.js-applikationer med GitHub Actions. Genom att automatisera processer som kodformattering, linting, databasmigrering och testning, säkerställer denna pipeline att koden håller hög kvalitet innan den släpps eller slås ihop till huvudbranchen.

### Workflow Steg

#### 1. Workflow Trigger

Workflowen triggas vid pushar och pull requests till main-branchen. Detta innebär att varje ändring som görs i huvudbranchen eller förslag på ändringar (pull requests) automatiskt testas och verifieras, vilket förhindrar att felaktig kod släpps in.

```yaml
on:
  push:
    branches: ['main']
  pull_request:
    branches: ['main']


#### 2. Build Job
Detta jobb körs på ubuntu-latest-plattformen, vilket säkerställer en stabil och konsekvent Linux-miljö för alla automatiska steg.

jobs:
  build:
    runs-on: ubuntu-latest

#### 3. Matrix Strategy
En matrix-strategi används för att specificera Node.js-versionen som pipelinen körs på (här 20.x).
Detta är särskilt användbart för att testa kompatibilitet med olika versioner om fler versioner läggs till senare.

strategy:
  matrix:
    node-version: [20.x]

#### 4. Steg i Workflowen
Varje steg utför en specifik uppgift i utvecklingsflödet:

##### 4.1. Checka ut koden:
Detta steg laddar ner den senaste koden från repositoryn och gör den tillgänglig för efterföljande steg.

- uses: actions/checkout@v4

##### 4.2. Installera Node.js och hantera beroenden:
setup-node installerar den specifika Node-versionen och hanterar npm-cachen för snabbare byggtider. npm ci installerar alla beroenden enligt package-lock.json, vilket säkerställer en konsekvent miljö.

- uses: actions/setup-node@v4
  with:
    node-version: ${{ matrix.node-version }}
    cache: 'npm'
- name: Install dependencies
  run: npm ci

##### 4.3. Kodformattering och linting:
Dessa steg säkerställer att koden följer gemensamma kodstandarder. npm run format formaterar koden med Prettier, medan npm run lint kör ESLint för att identifiera eventuella kodstilfel. lint:fix korrigerar mindre fel automatiskt, vilket gör koden enhetlig och minskar manuellt arbete.

- name: Run prettier
  run: npm run format
- name: Run ESLint
  run: npm run lint
- name: Format code
  run: npm run lint:fix

##### 4.4. Bygga projektet:
Här byggs projektet, om ett byggkommando är definierat. Detta steg säkerställer att koden kan byggas utan fel innan distribution.

- name: Build the project
  run: npm run build --if-present

##### 4.5. Databasmigrering och Prisma-generate:
Dessa steg hanterar databasen genom att köra Prisma-migreringar och generera Prisma-klienter. prisma:migrate migrerar databasen till den senaste strukturen, och postinstall kör prisma generate för att skapa klientkod. Detta säkerställer att databasstrukturen och Prisma-klienterna är uppdaterade.

- name: Run tests
  run: npm run test

```
