# Publishing Yggdrasil to NPM

This guide walks through the process of publishing the Yggdrasil design system to the npm registry.

## Prerequisites

### 1. NPM Account
- Create account at https://www.npmjs.com/signup
- Verify your email address
- Enable 2FA (recommended for security)

### 2. Check Package Name Availability
```bash
npm search prime-yggdrasil
```

If the name is taken, consider:
- `@your-org/prime-yggdrasil` (scoped package)
- Alternative names: `yggdrasil-theme`, `primereact-yggdrasil`, etc.

## Pre-Publish Checklist

### 1. Update Author Information
Edit [package.json](../package.json):
```json
{
  "author": "Your Name <your.email@example.com>",
  "license": "MIT"
}
```

### 2. Create LICENSE File
The project needs a LICENSE file. We'll create this in the next step.

### 3. Verify Build Output
```bash
# Clean and rebuild
rm -rf dist
npm run build

# Check dist/ contents
ls -la dist/

# Expected files:
# - theme.css

# - index.js
# - index.cjs
# - index.d.ts
```

### 4. Test Package Locally
```bash
# Create tarball
npm pack

# This creates: prime-yggdrasil-0.1.0.tgz

# Test in another project
cd /path/to/test-project
npm install /path/to/prime-yggdrasil/prime-yggdrasil-0.1.0.tgz

# Verify imports work
import 'prime-yggdrasil/theme.css';
```

### 5. Update README Links
Before publishing, update any placeholder URLs:
- Storybook URL (line 7 in README.md)
- Author name/email

### 6. Create .npmignore (Optional)
Create `.npmignore` to exclude unnecessary files:
```
# Development files
.storybook/
src/
scripts/
tests/
*.test.ts
*.test.tsx

# Config files
vite.config.ts
vite.config.lib.ts
tsconfig.json
tsconfig.lib.json
.eslintrc.js
stylelint.config.js

# Git files
.git/
.gitignore

# Documentation (keep only what's in docs/)
YGGDRASIL_THEME.md
agentic_policy.md

# Misc
node_modules/
.DS_Store
```

Note: Files in `package.json` "files" array are already allowlisted, so .npmignore is optional.

## Publishing Steps

### 1. Login to NPM
```bash
npm login

# You'll be prompted for:
# - Username
# - Password
# - Email
# - OTP (if 2FA enabled)
```

### 2. Dry Run (Test Without Publishing)
```bash
npm publish --dry-run

# Review the output:
# - Package name and version
# - File list that will be published
# - Package size
```

### 3. Publish to NPM
```bash
# For public package
npm publish --access public

# For scoped package (@your-org/prime-yggdrasil)
npm publish --access public
```

### 4. Verify Publication
```bash
# Check on NPM registry
npm view prime-yggdrasil

# Test installation
npm install prime-yggdrasil
```

## Post-Publish Steps

### 1. Tag the Release in Git
```bash
git tag v0.1.0
git push origin v0.1.0
```

### 2. Create GitHub Release
1. Go to https://github.com/lifeonlars/prime-yggdrasil/releases
2. Click "Create a new release"
3. Select tag v0.1.0
4. Add release notes:

```markdown
## Yggdrasil v0.1.0 - Initial Release

AI-agent-friendly PrimeReact design system for component-driven development.

### Features
- 727 semantic tokens (96% coverage)
- Dark mode support with optimized shadows
- 10 modular component CSS files
- 4px grid system
- WCAG 3.0 (APCA) compliant
- Comprehensive AI agent documentation

### Installation
npm install prime-yggdrasil primereact primeicons

### Documentation
- [AI Agent Guide](./docs/AI-AGENT-GUIDE.md)
- [Consumption Guide](./docs/CONSUMPTION-GUIDE.md)
- [README](./README.md)
```

### 3. Update README Badges
Add npm badges to README.md:
```markdown
[![npm version](https://badge.fury.io/js/prime-yggdrasil.svg)](https://www.npmjs.com/package/prime-yggdrasil)
[![npm downloads](https://img.shields.io/npm/dm/prime-yggdrasil.svg)](https://www.npmjs.com/package/prime-yggdrasil)
```

## Updating the Package

### Version Bumping
```bash
# Patch release (0.1.0 → 0.1.1) - Bug fixes
npm version patch

# Minor release (0.1.0 → 0.2.0) - New features
npm version minor

# Major release (0.1.0 → 1.0.0) - Breaking changes
npm version major
```

This automatically:
- Updates version in package.json
- Creates a git commit
- Creates a git tag

### Publishing Updates
```bash
# After version bump
npm publish

# Push changes and tags
git push && git push --tags
```

## Scoped Package Alternative

If `prime-yggdrasil` is taken, publish as scoped package:

### Update package.json
```json
{
  "name": "@your-org/prime-yggdrasil"
}
```

### Publish
```bash
npm publish --access public
```

### Usage in projects
```tsx
import '@your-org/prime-yggdrasil/theme.css';
```

## Troubleshooting

### Error: Package name already exists
- Use scoped package: `@your-org/prime-yggdrasil`
- Choose different name
- Contact current owner if package is abandoned

### Error: 402 Payment Required
- Package name may be reserved
- Try scoped package instead

### Error: You must verify your email
- Check npm email and click verification link
- Resend: `npm profile get`

### Error: Cannot publish over existing version
- Version in package.json already published
- Bump version: `npm version patch`

### Files Missing in Published Package
- Check `package.json` "files" array
- Run `npm publish --dry-run` to preview
- Verify .npmignore isn't excluding needed files

## Security Best Practices

### 1. Enable 2FA
```bash
npm profile enable-2fa auth-and-writes
```

### 2. Use Access Tokens for CI/CD
Instead of password, use automation tokens:
1. Generate: https://www.npmjs.com/settings/your-username/tokens
2. Set as environment variable: `NPM_TOKEN`
3. Use in CI: `npm publish` (reads from env)

### 3. Review Package Before Publishing
```bash
# Always dry-run first
npm publish --dry-run

# Check tarball contents
npm pack
tar -tzf prime-yggdrasil-0.1.0.tgz
```

### 4. Don't Include Secrets
- Never commit .env files
- Review dist/ before publishing
- Check for API keys, tokens, passwords

## Quick Publish Checklist

Before running `npm publish`:

- [ ] Updated author in package.json
- [ ] Created LICENSE file
- [ ] Ran `npm run build` successfully
- [ ] Tested with `npm pack` and local install
- [ ] Updated README (removed placeholders)
- [ ] Committed all changes to git
- [ ] Ran `npm publish --dry-run`
- [ ] Logged in to npm (`npm whoami`)
- [ ] Ready to publish!

## Next Steps After Publishing

1. **Test in Real Project** - Use published package in consuming project
2. **Update Documentation** - Add npm install instructions to main README
3. **Share with Team** - Announce availability
4. **Monitor Issues** - Watch GitHub issues for bug reports
5. **Plan v0.2.0** - Collect feedback for next release

## Useful Commands Reference

```bash
# Check login status
npm whoami

# View package info
npm view prime-yggdrasil

# List package versions
npm view prime-yggdrasil versions

# Unpublish (within 72 hours, use with caution)
npm unpublish prime-yggdrasil@0.1.0

# Deprecate version (better than unpublish)
npm deprecate prime-yggdrasil@0.1.0 "Use v0.2.0 instead"

# Check package download stats
npm view prime-yggdrasil downloads
```

---

**Ready to publish?** Follow the checklist above, then run `npm publish --access public`!
