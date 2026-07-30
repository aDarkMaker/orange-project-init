# orange-project-init

A CLI to scaffold projects with Vue/Astro/React frontend and Koa/Go backend templates.

## Features

- **Multiple frontend frameworks**: Vue 3, Astro, React (TypeScript by default)
- **Multiple backend frameworks**: Koa (Node + TS), Go
- **Flexible project types**: Full-stack, Frontend only, Backend only
- **Customizable add-ons**: ESLint, Prettier, cspell
- **Package manager support**: npm, pnpm, bun, yarn
- **Git initialization**: Optional automatic git init
- **Blank templates**: Clean starting point without boilerplate code

## Usage

```bash
npm create orange-project-init@latest
# or
pnpm create orange-project-init
# or
bun create orange-project-init
# or
yarn create orange-project-init
# or
npx orange-project-init
```

Or with a project name directly:

```bash
npx orange-project-init my-app
```

## Interactive Prompts

The CLI guides you through the following options:

1. **Project name**: Your project directory name
2. **Project type**:
   - Full-stack (separated frontend & backend)
   - Frontend only
   - Backend only
3. **Frontend framework** (if applicable): Vue, Astro, React
4. **Backend framework** (if applicable): Koa (Node + TS), Go
5. **Add-ons** (multi-select): ESLint, Prettier, cspell
6. **Git initialization**: Yes/No
7. **Package manager**: npm, pnpm, bun, yarn

## Project Structure

### Frontend Only
```
my-app/
├── src/
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### Backend Only
```
my-app/
├── src/
├── package.json
└── tsconfig.json
```

### Full-stack
```
my-app/
├── frontend/     # Selected frontend framework
├── server/       # Selected backend framework
├── .gitignore
└── (add-on configs)
```

## Templates

Templates are hosted as separate GitHub repositories:

| Template | Repository | Description |
|----------|-----------|-------------|
| Vue | [template-vue](https://github.com/aDarkMaker/template-vue) | Vue 3 + Vite + TS + Pinia + Vue Router |
| React | [template-react](https://github.com/aDarkMaker/template-react) | React + Vite + TS |
| Astro | [template-astro](https://github.com/aDarkMaker/template-astro) | Astro + TS |
| Koa | [template-koa](https://github.com/aDarkMaker/template-koa) | Koa + TS backend |
| Go | [template-go](https://github.com/aDarkMaker/template-go) | Go backend |

Templates are developed in the [orange-templates](https://github.com/aDarkMaker/orange-templates) monorepo.

## Add-ons

### ESLint
Generates `eslint.config.js` with framework-specific rules:
- Vue: `eslint-plugin-vue`
- Astro: `eslint-plugin-astro`
- React: `@eslint-react/eslint-plugin`
- Backend: `typescript-eslint` recommended

### Prettier
Generates `.prettierrc.cjs` with opinionated defaults:
- Print width: 150
- Tabs: 2 spaces
- Single quotes
- Trailing commas: ES5
- End of line: LF

### cspell
Generates `cspell.json` for spell checking with customizable dictionary.

### Package Structure

This project maintains two npm packages:

| Package | Purpose |
|---------|---------|
| `orange-project-init` | Main package for `npx` usage |
| `create-orange-project-init` | Alias for `npm/pnpm/yarn/bun create` commands |

Both packages share the same source code. When updating, publish both:

```bash
# Update main package
cd orange-project-init
npm version patch
npm publish

# Update alias package
cd ../create-orange-project-init
npm version patch
npm publish
```

## Development

### Prerequisites

- Node.js >= 18
- npm / pnpm / bun / yarn

### Setup

```bash
git clone https://github.com/aDarkMaker/orange-project-init.git
cd orange-project-init
npm install
```

### Build

```bash
npm run build
```

### Local Testing

```bash
npm link
orange-project-init test-project
```

### Project Structure

```
orange-project-init/
├── src/
│   ├── index.ts        # CLI entry
│   ├── prompts.ts      # Interactive prompts
│   ├── generate.ts     # Template download & generation
│   ├── configs/        # Config file generators
│   │   ├── prettier.ts
│   │   ├── eslint.ts
│   │   ├── cspell.ts
│   │   └── gitignore.ts
│   └── utils.ts        # Utilities
├── dist/               # Build output
└── package.json
```

## Roadmap

Planned features for future releases:

- [ ] More frontend frameworks (Svelte, Solid, Qwik)
- [ ] More backend frameworks (Express, Fastify, NestJS, Gin)
- [ ] Database templates (PostgreSQL, MongoDB, SQLite)
- [ ] Docker support
- [ ] CI/CD templates (GitHub Actions, GitLab CI)
- [ ] Monorepo support (Turborepo, Nx)
- [ ] Custom template support (user-defined templates)
- [ ] Plugin system for extensibility

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### Adding New Templates

1. Fork the [orange-templates](https://github.com/aDarkMaker/orange-templates) repository
2. Add your template in `templates/<name>/`
3. Submit a pull request
4. Update this README and CLI to register the new template

### Template Requirements

- Must be a blank/starting template (no business logic)
- Must include `package.json` with `__PROJECT_NAME__` placeholder
- Must include basic build configuration
- Should follow existing code style

## License

MIT

## Author

[aDarkMaker](https://github.com/aDarkMaker)
