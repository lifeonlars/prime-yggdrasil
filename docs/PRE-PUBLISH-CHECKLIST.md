# Pre-Publish Checklist

Before publishing to npm, complete these tasks:

## ✅ Completed

- [x] Created LICENSE file (MIT license)
- [x] Enhanced package.json with metadata
- [x] Build process works (`npm run build`)
- [x] Created comprehensive documentation
- [x] Package tarball tested (`npm pack`)
- [x] CSS theme files export correctly

## 📝 Required Updates

### 1. Update Author Information

Edit [package.json](../package.json) line 25:
```json
"author": "Your Name <your.email@example.com>",
```

Replace with your actual name and email.

### 2. Update LICENSE Copyright

Edit [LICENSE](../LICENSE) line 3:
```
Copyright (c) 2025 [Your Name]
```

Replace `[Your Name]` with your actual name or organization.

### 3. Update README Placeholders

Edit [README.md](../README.md):

**Line 7**: Storybook badge URL
```markdown
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)](https://your-storybook-url.com)
```

**Line 258**: Author credit
```markdown
MIT © [Your Name]
```

### 4. Optional: Remove vite.svg from dist

The build is copying vite.svg to dist. To remove it, edit [vite.config.lib.ts](../vite.config.lib.ts) and exclude it from the build output, or add it to .npmignore.

## 🔍 Verification Steps

Before `npm publish`, run these commands:

```bash
# 1. Clean build
rm -rf dist
npm run build

# 2. Check dist contents
ls -lh dist/

# Expected files:
# - theme.css (main theme)
 (dark theme)
# - foundations.css (foundation colors)
# - index.js (ES module)
# - index.cjs (CommonJS)
# - index.d.ts (TypeScript definitions)

# 3. Test package
npm pack

# 4. Verify package contents
tar -tzf prime-yggdrasil-0.1.0.tgz

# 5. Check package size (should be ~35-40 kB)
ls -lh prime-yggdrasil-0.1.0.tgz
```

## 📊 Current Package Stats

From `npm pack` output:
- **Package size**: 35.4 kB (compressed)
- **Unpacked size**: 104.7 kB
- **Total files**: 23
- **Main files**:
  - Theme CSS: theme.css
  - Documentation: 12 markdown files
  - TypeScript: index.d.ts

## 🚀 Publishing Commands

Once the above updates are complete:

```bash
# 1. Login to npm
npm login

# 2. Dry run to test
npm publish --dry-run

# 3. Actually publish
npm publish --access public

# 4. Tag the release
git tag v0.1.0
git push origin v0.1.0
```

## 📚 After Publishing

1. Test installation in a new project:
```bash
npm install prime-yggdrasil primereact primeicons
```

2. Create GitHub release at:
https://github.com/lifeonlars/prime-yggdrasil/releases

3. Update README with npm badges:
```markdown
[![npm version](https://badge.fury.io/js/prime-yggdrasil.svg)](https://www.npmjs.com/package/prime-yggdrasil)
[![npm downloads](https://img.shields.io/npm/dm/prime-yggdrasil.svg)](https://www.npmjs.com/package/prime-yggdrasil)
```

## 🔗 Related Documentation

- [NPM Publishing Guide](./NPM-PUBLISHING-GUIDE.md) - Comprehensive publishing guide
- [Packaging Checklist](./PACKAGING-CHECKLIST.md) - Overall readiness checklist
- [Consumption Guide](./CONSUMPTION-GUIDE.md) - How users will consume the package

---

**Current Status**: Ready to publish after updating author information and LICENSE copyright.
