/**
 * Split components.css into smaller, manageable files
 */

const fs = require('fs');
const path = require('path');

const componentsPath = path.join(__dirname, '..', 'src', 'theme', 'components.css');
const componentsDir = path.join(__dirname, '..', 'src', 'theme', 'components');

// Component groupings
const groups = {
  'button.css': ['button', 'splitbutton'],
  'data.css': ['datatable', 'treetable', 'tree', 'dataview', 'virtualscroller', 'paginator', 'picklist', 'orderlist'],
  'menu.css': ['menubar', 'megamenu', 'menu', 'contextmenu', 'tieredmenu', 'slidemenu', 'panelmenu', 'breadcrumb', 'steps', 'tabmenu'],
  'form.css': ['inputtext', 'inputnumber', 'inputgroup', 'inputswitch', 'checkbox', 'radiobutton', 'togglebutton', 'selectbutton', 'dropdown', 'multiselect', 'treeselect', 'cascadeselect', 'listbox', 'inputmask', 'chips', 'colorpicker', 'knob', 'rating', 'slider', 'tristatecheckbox'],
  'calendar.css': ['datepicker', 'calendar'],
  'overlay.css': ['dialog', 'overlaypanel', 'sidebar', 'tooltip', 'confirmdialog', 'confirmpopup'],
  'panel.css': ['panel', 'accordion', 'fieldset', 'card', 'divider', 'splitter', 'scrollpanel', 'tabview'],
  'message.css': ['message', 'inline-message', 'toast', 'tag'],
  'media.css': ['image', 'galleria', 'carousel'],
  'misc.css': ['progressbar', 'progressspinner', 'badge', 'avatar', 'chip', 'skeleton', 'terminal', 'blockui', 'metergroup', 'organizationchart', 'timeline', 'dock', 'speeddial', 'fileupload', 'stepper', 'inplace']
};

function extractComponent(lines, componentName) {
  const result = [];
  let inComponent = false;
  let braceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if we're starting this component
    const regex = new RegExp(`^  \\.p-${componentName}(?![a-z0-9-])`);
    if (regex.test(line)) {
      inComponent = true;
    }

    // Track if we're in another component
    if (/^  \.p-[a-z]/.test(line) && !regex.test(line)) {
      if (braceDepth === 0) {
        inComponent = false;
      }
    }

    if (inComponent) {
      result.push(line);

      // Track brace depth to handle nested rules
      braceDepth += (line.match(/{/g) || []).length;
      braceDepth -= (line.match(/}/g) || []).length;

      // If we've closed all braces, we're done with this rule
      if (braceDepth === 0 && line.includes('}')) {
        // Check if next line starts a new component
        if (i + 1 < lines.length && /^  \.p-[a-z]/.test(lines[i + 1])) {
          const nextMatch = lines[i + 1].match(/^  \.p-([a-z][a-z0-9-]*)/);
          if (nextMatch && nextMatch[1] !== componentName) {
            inComponent = false;
          }
        }
      }
    }
  }

  return result;
}

function splitComponents() {
  console.log('Reading components.css...');
  const content = fs.readFileSync(componentsPath, 'utf8');
  const lines = content.split('\n');

  // Create components directory
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir);
    console.log('✓ Created components/ directory');
  }

  // Extract each group
  const extractedComponents = new Set();

  Object.entries(groups).forEach(([filename, componentNames]) => {
    console.log(`\nCreating ${filename}...`);
    const fileLines = [];

    componentNames.forEach(name => {
      const componentLines = extractComponent(lines, name);
      if (componentLines.length > 0) {
        fileLines.push(...componentLines);
        extractedComponents.add(name);
        console.log(`  ✓ Extracted .p-${name} (${componentLines.length} lines)`);
      }
    });

    if (fileLines.length > 0) {
      // Add header comment
      const header = `/**\n * ${filename.replace('.css', '')} components\n */\n\n`;
      const outputPath = path.join(componentsDir, filename);
      fs.writeFileSync(outputPath, header + fileLines.join('\n') + '\n', 'utf8');
      console.log(`  → Wrote ${fileLines.length} lines to components/${filename}`);
    }
  });

  // Create master components.css with imports
  console.log('\nCreating master components.css...');
  const imports = Object.keys(groups).map(filename =>
    `@import "./components/${filename}";`
  ).join('\n');

  const masterContent = `/**\n * Components - Master Import File\n * Individual component styles are split into separate files for maintainability\n */\n\n${imports}\n`;

  const backupPath = componentsPath + '.backup';
  fs.copyFileSync(componentsPath, backupPath);
  console.log(`✓ Backed up original to components.css.backup`);

  fs.writeFileSync(componentsPath, masterContent, 'utf8');
  console.log(`✓ Created new components.css with imports`);

  console.log(`\n✓ Component split complete!`);
  console.log(`  - ${extractedComponents.size} components extracted`);
  console.log(`  - ${Object.keys(groups).length} category files created`);
}

splitComponents();
