#!/bin/bash
# Comprehensive verification script for both packages

set -e  # Exit on error

echo "═══════════════════════════════════════════════════════"
echo "  Prime Yggdrasil Verification"
echo "═══════════════════════════════════════════════════════"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Must run from repository root"
  exit 1
fi

echo "🔍 Verifying @lifeonlars/prime-yggdrasil..."
echo "───────────────────────────────────────────────────────"

# Build main package
echo "→ Building package..."
npm run build -w @lifeonlars/prime-yggdrasil
if [ $? -eq 0 ]; then
  echo "✓ Build successful"
else
  echo "❌ Build failed"
  exit 1
fi

# Lint main package
echo "→ Linting JavaScript/TypeScript..."
npm run lint -w @lifeonlars/prime-yggdrasil
if [ $? -eq 0 ]; then
  echo "✓ Lint successful"
else
  echo "❌ Lint failed"
  exit 1
fi

echo ""
echo "🔍 Verifying @lifeonlars/prime-yggdrasil-charts..."
echo "───────────────────────────────────────────────────────"

# Build charts package
echo "→ Building package..."
npm run build -w @lifeonlars/prime-yggdrasil-charts
if [ $? -eq 0 ]; then
  echo "✓ Build successful"
else
  echo "❌ Build failed"
  exit 1
fi

# Lint charts package
echo "→ Linting JavaScript/TypeScript..."
npm run lint -w @lifeonlars/prime-yggdrasil-charts
if [ $? -eq 0 ]; then
  echo "✓ Lint successful"
else
  echo "❌ Lint failed"
  exit 1
fi

echo ""
echo "🔍 Building Storybook..."
echo "───────────────────────────────────────────────────────"

# Build Storybook
echo "→ Building Storybook static site..."
npm run build-storybook
if [ $? -eq 0 ]; then
  echo "✓ Storybook build successful"
else
  echo "❌ Storybook build failed"
  exit 1
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  ✅ All verifications passed!"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Summary:"
echo "  ✓ @lifeonlars/prime-yggdrasil build & lint"
echo "  ✓ @lifeonlars/prime-yggdrasil-charts build & lint"
echo "  ✓ Storybook build"
echo ""
