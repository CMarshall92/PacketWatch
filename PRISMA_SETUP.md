# Prisma Setup in Turbo Repo

## Fixed Issues

1. **Prisma Client Generation**: Added proper `prisma:generate` scripts
2. **Turbo Dependencies**: Updated turbo.json to ensure Prisma generates before dev/build  
3. **Import Path**: Fixed import from `@prisma/client` to use the generated client
4. **Postinstall Hook**: Added postinstall scripts to generate client after npm install
5. **Dev Command**: Root `npm run dev` now ALWAYS runs `prisma:generate` first

## Commands

```bash
# Generate Prisma client manually
npm run prisma:generate

# Run development (ALWAYS generates Prisma client first)
npm run dev

# Run from specific service
cd apps/services/api
npm run prisma:generate
npm run dev
```

## Important Files

- `apps/services/api/prisma/schema.prisma` - Prisma schema
- `apps/services/api/src/generated/prisma/` - Generated Prisma client
- `apps/services/api/src/data/prisma.ts` - Prisma client instance
- `turbo.json` - Turbo task dependencies

## Environment Variables

Create a `.env` file in `apps/services/api/` with:
```
DATABASE_URL="postgresql://username:password@localhost:5432/packetwatch?schema=public"
```
