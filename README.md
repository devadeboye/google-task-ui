This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Code Quality and Formatting

This project is configured with comprehensive code quality tools that automatically format and lint your code on save.

### Available Scripts

- `pnpm lint` - Check for linting errors and warnings
- `pnpm lint:fix` - Automatically fix ESLint issues where possible
- `pnpm format` - Format all code files using Prettier
- `pnpm format:check` - Check if all files are properly formatted
- `pnpm dev:format` - Format code and fix linting issues (useful before commits)

### Automatic Formatting

The project is configured with:

- **Prettier** for consistent code formatting
- **ESLint** with Next.js and TypeScript rules for code quality
- **Format on Save** in VS Code (requires Prettier extension)
- **Auto-fix on Save** for ESLint issues

### VS Code Setup

For the best development experience, install these VS Code extensions:

- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- TypeScript Importer

The workspace settings are already configured to:

- Format code on save
- Fix ESLint issues on save
- Organize imports on save
- Use Prettier as the default formatter

### Configuration Files

- `.prettierrc` - Prettier formatting rules
- `.prettierignore` - Files to exclude from formatting
- `eslint.config.mjs` - ESLint rules and configuration
- `.vscode/settings.json` - Workspace-specific VS Code settings
- `.vscode/extensions.json` - Recommended extensions

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
