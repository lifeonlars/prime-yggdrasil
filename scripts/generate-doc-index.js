#!/usr/bin/env node

/**
 * Generate searchable documentation index from YAML frontmatter
 *
 * Scans all .md files in docs/ and .ai/agents/ directories,
 * extracts YAML frontmatter, and generates docs/index.json
 * for programmatic documentation discovery.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Directories to scan
const scanDirs = [
  path.join(rootDir, 'docs'),
  path.join(rootDir, '.ai', 'agents')
];

// Parse YAML frontmatter from markdown content
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]+?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const yaml = match[1];
  const metadata = {};

  // Simple YAML parser for our schema
  const lines = yaml.split('\n');
  let currentKey = null;
  let currentArray = null;

  for (const line of lines) {
    // Array item
    if (line.trim().startsWith('- ')) {
      if (currentArray) {
        currentArray.push(line.trim().substring(2));
      }
      continue;
    }

    // Key-value pair
    const keyValueMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyValueMatch) {
      const [, key, value] = keyValueMatch;
      currentKey = key;

      // Handle arrays
      if (value === '' || value === '[]') {
        currentArray = [];
        metadata[key] = currentArray;
      }
      // Handle inline arrays
      else if (value.startsWith('[') && value.endsWith(']')) {
        metadata[key] = value.slice(1, -1).split(',').map(v => v.trim());
        currentArray = null;
      }
      // Handle strings
      else {
        metadata[key] = value.replace(/^["']|["']$/g, '');
        currentArray = null;
      }
    }
  }

  return metadata;
}

// Extract section headings from markdown
function extractSections(content) {
  const sections = [];
  const lines = content.split('\n');
  let lineNumber = 0;

  for (const line of lines) {
    lineNumber++;

    // Match h2 (##) and h3 (###) headings
    const headingMatch = line.match(/^(#{2,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();
      const anchor = '#' + title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      sections.push({
        title,
        level,
        line: lineNumber,
        anchor
      });
    }
  }

  return sections;
}

// Recursively scan directory for .md files
function scanDirectory(dir, baseDir = dir) {
  const files = [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and hidden directories
      if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
        files.push(...scanDirectory(fullPath, baseDir));
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push({
        path: fullPath,
        relativePath: path.relative(rootDir, fullPath).replace(/\\/g, '/')
      });
    }
  }

  return files;
}

// Main function
function generateIndex() {
  console.log('📚 Generating documentation index...\n');

  const documents = [];
  const searchIndex = {};

  // Scan all directories
  for (const dir of scanDirs) {
    if (!fs.existsSync(dir)) {
      console.warn(`⚠️  Directory not found: ${dir}`);
      continue;
    }

    const files = scanDirectory(dir);
    console.log(`Found ${files.length} markdown files in ${path.relative(rootDir, dir)}/`);

    for (const file of files) {
      const content = fs.readFileSync(file.path, 'utf8');
      const metadata = parseFrontmatter(content);

      if (!metadata) {
        console.warn(`⚠️  No frontmatter in ${file.relativePath}`);
        continue;
      }

      const sections = extractSections(content);

      const doc = {
        path: file.relativePath,
        title: metadata.title,
        category: metadata.category,
        tags: metadata.tags || [],
        audience: metadata.audience,
        version: metadata.version,
        lastUpdated: metadata.lastUpdated,
        relatedDocs: metadata.relatedDocs || [],
        deprecated: metadata.deprecated || false,
        sections: sections.map(s => ({
          title: s.title,
          line: s.line,
          anchor: s.anchor,
          level: s.level
        }))
      };

      documents.push(doc);

      // Build search index
      // Index by tags
      for (const tag of doc.tags) {
        if (!searchIndex[tag]) {
          searchIndex[tag] = [];
        }
        searchIndex[tag].push(file.relativePath);
      }

      // Index by title words
      const titleWords = doc.title.toLowerCase().split(/\s+/);
      for (const word of titleWords) {
        if (word.length > 2) { // Skip short words
          if (!searchIndex[word]) {
            searchIndex[word] = [];
          }
          if (!searchIndex[word].includes(file.relativePath)) {
            searchIndex[word].push(file.relativePath);
          }
        }
      }

      // Index by section titles
      for (const section of sections) {
        const sectionWords = section.title.toLowerCase().split(/\s+/);
        for (const word of sectionWords) {
          if (word.length > 2) {
            if (!searchIndex[word]) {
              searchIndex[word] = [];
            }
            const ref = `${file.relativePath}${section.anchor}`;
            if (!searchIndex[word].includes(ref)) {
              searchIndex[word].push(ref);
            }
          }
        }
      }
    }
  }

  // Sort documents by category, then title
  documents.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.title.localeCompare(b.title);
  });

  // Create index object
  const index = {
    generated: new Date().toISOString(),
    version: '0.7.0',
    documentCount: documents.length,
    documents,
    searchIndex
  };

  // Write to docs/index.json
  const outputPath = path.join(rootDir, 'docs', 'index.json');
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2), 'utf8');

  console.log(`\n✅ Generated index with ${documents.length} documents`);
  console.log(`📄 Output: ${path.relative(rootDir, outputPath)}`);
  console.log(`🔍 Search index contains ${Object.keys(searchIndex).length} keywords`);

  // Print summary by category
  const byCategory = {};
  for (const doc of documents) {
    if (!byCategory[doc.category]) {
      byCategory[doc.category] = 0;
    }
    byCategory[doc.category]++;
  }

  console.log('\n📊 Documents by category:');
  for (const [category, count] of Object.entries(byCategory)) {
    console.log(`   ${category}: ${count}`);
  }
}

// Run if called directly
// Note: Always run when executed as script
try {
  generateIndex();
} catch (error) {
  console.error('❌ Error generating index:', error.message);
  console.error(error.stack);
  process.exit(1);
}

export { generateIndex, parseFrontmatter, extractSections };
