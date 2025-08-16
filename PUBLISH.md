# Publishing n8n-nodes-perfexcrm to npm

## Prerequisites

1. **Create an npm account** (if you don't have one):
   - Go to https://www.npmjs.com/signup
   - Create your account

2. **Login to npm** from your terminal:
   ```bash
   npm login
   ```
   Enter your username, password, and email when prompted.

## Publishing Steps

### 1. First-time Setup

Since this is a new package, you need to ensure the package name is available:

```bash
npm view n8n-nodes-perfexcrm
```

If it returns "404 Not Found", the name is available.

### 2. Build the Project

The project has already been built, but to rebuild:

```bash
npm run build
```

### 3. Test Locally (Optional)

Link the package locally to test with n8n:

```bash
# In the n8n-nodes-perfexcrm directory
npm link

# In your n8n installation
cd ~/.n8n
npm link n8n-nodes-perfexcrm

# Restart n8n to see the new nodes
```

### 4. Publish to npm

#### First Publication

For the first time publishing:

```bash
npm publish --access public
```

The `--access public` flag is required for scoped packages or to ensure the package is public.

#### Subsequent Updates

1. Update the version in package.json:
   ```bash
   npm version patch  # for bug fixes (0.1.0 -> 0.1.1)
   # OR
   npm version minor  # for new features (0.1.0 -> 0.2.0)
   # OR
   npm version major  # for breaking changes (0.1.0 -> 1.0.0)
   ```

2. Publish the update:
   ```bash
   npm publish
   ```

### 5. Verify Publication

After publishing, verify your package is available:

```bash
npm view n8n-nodes-perfexcrm
```

Or visit: https://www.npmjs.com/package/n8n-nodes-perfexcrm

## Installing in n8n

Once published, users can install your node in n8n through:

### Option 1: n8n UI
1. Open n8n
2. Go to Settings → Community Nodes
3. Click "Install"
4. Enter: `n8n-nodes-perfexcrm`
5. Click "Install"

### Option 2: CLI
```bash
n8n-node-install n8n-nodes-perfexcrm
```

### Option 3: Docker
Add to your docker-compose.yml:
```yaml
environment:
  - N8N_COMMUNITY_PACKAGES=n8n-nodes-perfexcrm
```

## Troubleshooting

### If npm publish fails:

1. **Authentication issues:**
   ```bash
   npm logout
   npm login
   ```

2. **Package name taken:**
   - Choose a different name in package.json
   - Update all references to the new name

3. **Version already exists:**
   ```bash
   npm version patch
   npm publish
   ```

4. **Build errors:**
   ```bash
   rm -rf dist/
   npm run build
   ```

## Maintenance

### Updating the Package

1. Make your changes
2. Update version: `npm version patch/minor/major`
3. Build: `npm run build`
4. Publish: `npm publish`
5. Tag the release: `git tag v0.1.1 && git push --tags`

### Deprecating Old Versions

If needed:
```bash
npm deprecate n8n-nodes-perfexcrm@"< 0.2.0" "Please upgrade to latest version"
```

## Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)
- [Semantic Versioning](https://semver.org/)