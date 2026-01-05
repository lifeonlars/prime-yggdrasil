/**
 * Analyze components.css to identify large components for splitting
 */

const fs = require('fs');
const path = require('path');

const componentsPath = path.join(__dirname, '..', 'src', 'theme', 'components.css');

function analyzeComponentSizes() {
  const content = fs.readFileSync(componentsPath, 'utf8');
  const lines = content.split('\n');

  const components = {};
  let currentComponent = null;
  let currentStartLine = 0;

  lines.forEach((line, index) => {
    // Detect new top-level component (starts with .p-componentname)
    const match = line.match(/^  \.p-([a-z][a-z0-9-]*)/);
    if (match) {
      const componentName = match[1];

      // Save previous component
      if (currentComponent) {
        const lineCount = index - currentStartLine;
        if (!components[currentComponent]) {
          components[currentComponent] = 0;
        }
        components[currentComponent] += lineCount;
      }

      // Start new component
      currentComponent = componentName;
      currentStartLine = index;
    }
  });

  // Sort by line count
  const sorted = Object.entries(components)
    .sort((a, b) => b[1] - a[1])
    .filter(([name, lines]) => lines > 50); // Only show components > 50 lines

  console.log('Components by size (lines of CSS):');
  console.log('====================================\n');

  let total = 0;
  sorted.forEach(([name, lines]) => {
    total += lines;
    console.log(`${lines.toString().padStart(4)} lines - .p-${name}`);
  });

  console.log(`\n====================================`);
  console.log(`Total: ${total} lines across ${sorted.length} components`);
  console.log(`\nComponents >200 lines (candidates for splitting):`);

  const largeComponents = sorted.filter(([name, lines]) => lines > 200);
  largeComponents.forEach(([name, lines]) => {
    console.log(`  - ${name} (${lines} lines)`);
  });

  console.log(`\nSuggested splits:`);
  console.log(`  1. Form inputs group: inputtext, dropdown, multiselect, inputgroup, etc.`);
  console.log(`  2. Data components: datatable, treetable, tree`);
  console.log(`  3. Menu components: menubar, megamenu, menu, contextmenu, tieredmenu, slidemenu, panelmenu`);
  console.log(`  4. Date/Calendar: datepicker, calendar`);
  console.log(`  5. Buttons: button, splitbutton`);
  console.log(`  6. Other large: toast, galleria, paginator`);
}

analyzeComponentSizes();
