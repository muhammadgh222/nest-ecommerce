# Copilot instructions — ecommerce-nest

Purpose: concise, actionable guidance for Copilot sessions working on this NestJS + Mongoose starter.

Build / run / test / lint
- Install: npm install
- Build: npm run build
- Start (dev): npm run start:dev
- Start (prod): npm run start:prod
- Lint (auto-fix): npm run lint
- Unit tests: npm run test
- Run a single unit spec file: npx jest src/path/to/file.spec.ts
  - or: npm run test -- src/user/user.service.spec.ts
- Run tests matching a name: npm run test -- -t "<test name regex>"
- E2E tests (separate config): npm run test:e2e
  - Run a single e2e file: npm run test:e2e -- test/app.e2e-spec.ts
- Coverage: npm run test:cov
- Debug single test run: npm run test:debug

High-level architecture
- Framework: NestJS (src/) with layered modules. Application entry: src/main.ts boots AppModule.
- AppModule: imports MongooseModule.forRoot(...) and feature modules (currently src/user).
  - Note: a MongoDB connection string is hardcoded in src/app.module.ts. Expect Mongoose models to be available at runtime.
- Modules: each feature lives under src/<feature> with a Module, Controller, Service, DTOs, Mongoose schema ("*.schema.ts"), and tests ("*.spec.ts").
- Persistence: @nestjs/mongoose + mongoose. Schemas use @Schema + SchemaFactory.createForClass.
- Tests: Jest configured in package.json (rootDir: src). E2E uses test/jest-e2e.json (rootDir: repo root).
- Tooling: TypeScript (target ES2023, module nodenext), ESLint + Prettier via eslint.config.mjs.

Key conventions & repo-specific notes
- Mongoose schemas: placed in *.schema.ts and registered in modules with MongooseModule.forFeature([{ name: X.name, schema: XSchema }]).
- DTOs live in dto/; entity stubs (entities/) may be present but main persistence layer is the Mongoose schema.
- Tests colocated with implementation files under src/ and use the ".spec.ts" suffix; e2e tests live in test/ and use ".e2e-spec.ts".
- Jest rootDir for unit tests is src — when passing file paths to jest from repo root, include the src/ prefix (or run npx jest with a path).
- ESLint config is in eslint.config.mjs and integrates Prettier; lint script uses glob "{src,apps,libs,test}/**/*.ts".
- Expect async Mongoose operations; services often accept and return Mongoose Document-based types.
- Watch scripts: start:dev (Nest watch) and test:watch for iterative development.

Files to check when editing runtime behavior
- src/app.module.ts — database connection string + global module wiring
- src/main.ts — server bootstrap (port via process.env.PORT)
- tsconfig.json / nest-cli.json — compiler & sourceRoot settings
- eslint.config.mjs — linting rules and Prettier integration

If content should include more module-level conventions (naming, error handling, DTO validation patterns), point to the feature(s) to inspect and Copilot can extract those rules.
