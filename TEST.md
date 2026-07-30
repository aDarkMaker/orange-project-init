# Manual Test Guide

## Test 1: Frontend Only (Vue)

```bash
cd /tmp
orange-project-init test-vue
```

**Selections:**
- Project type: `Frontend only`
- Frontend framework: `Vue`
- Add-ons: `Prettier`, `ESLint` (space to toggle, enter to confirm)
- Initialize git: `Yes`

**Verify:**
```bash
ls test-vue/                    # Should have src/, package.json, vite.config.ts, etc.
cat test-vue/package.json       # name should be "test-vue"
ls test-vue/.prettierrc.cjs     # Should exist
ls test-vue/eslint.config.js    # Should exist
ls test-vue/.gitignore          # Should exist
cd test-vue && git log --oneline  # Should have initial commit
```

---

## Test 2: Backend Only (Koa)

```bash
cd /tmp
orange-project-init test-koa
```

**Selections:**
- Project type: `Backend only`
- Backend framework: `Koa (Node + TS)`
- Add-ons: `Prettier`, `ESLint`, `cspell`
- Initialize git: `Yes`

**Verify:**
```bash
ls test-koa/                    # Should have src/, package.json, tsconfig.json
cat test-koa/package.json       # name should be "test-koa"
ls test-koa/cspell.json         # Should exist
```

---

## Test 3: Full-stack (React + Go)

```bash
cd /tmp
orange-project-init test-fullstack
```

**Selections:**
- Project type: `Full-stack (separated frontend & backend)`
- Frontend framework: `React`
- Backend framework: `Go`
- Add-ons: `Prettier`, `ESLint`
- Initialize git: `Yes`

**Verify:**
```bash
ls test-fullstack/              # Should have frontend/ and server/
ls test-fullstack/frontend/     # React template
ls test-fullstack/server/       # Go template
cat test-fullstack/frontend/package.json  # name should be "test-fullstack"
```

---

## Cleanup

```bash
rm -rf /tmp/test-vue /tmp/test-koa /tmp/test-fullstack
```
