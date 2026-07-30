#!/bin/bash
# Manual test script for orange-project-init
# Run each command and follow the prompts

echo "Test 1: Frontend only (Vue)"
echo "  orange-project-init test-vue"
echo "  -> Select: Frontend only -> Vue -> Prettier+ESLint -> Yes"
echo ""

echo "Test 2: Backend only (Koa)"
echo "  orange-project-init test-koa"
echo "  -> Select: Backend only -> Koa -> Prettier+ESLint+cspell -> Yes"
echo ""

echo "Test 3: Full-stack (React + Go)"
echo "  orange-project-init test-fullstack"
echo "  -> Select: Full-stack -> React -> Go -> Prettier+ESLint -> Yes"
echo ""

echo "After each test, verify:"
echo "  1. Directory structure is correct"
echo "  2. package.json has correct project name"
echo "  3. Selected add-ons files exist (.prettierrc.cjs, eslint.config.js, cspell.json)"
echo "  4. .gitignore exists"
echo "  5. git init was run (if selected)"
