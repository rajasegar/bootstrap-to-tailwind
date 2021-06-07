'use strict';

const postcss = require('postcss');
const fs = require('fs');
const parsel = require('parsel-js');

const {
  TAILWIND_CLASSES,
  getSpacingUtils,
  getBorderRadiusUtils,
  getBorderUtils,
  getColorUtils,
  getTailwindUtils,
} = require('tailwind-mappings');

// different selector types based on parsel
const tailwindMappings = {
  classes: {},
  elements: {},
  combinators: {},
  compounds: {},
};

const bsFontSizes = {
  '0.75em': 'text-xs',
  '0.875em': 'text-sm',
  '1em': 'text-base',
  '1.125em': 'text-lg',
  '1.25em': 'text-xl',
  '1.5em': 'text-2xl',
  '1.875em': 'text-3xl',
  '2.25em': 'text-4xl',
  '3em': 'text-5xl',
  '3.75em': 'text-6xl',
  '4.5em': 'text-7xl',
  '6em': 'text-8xl',
  '8em': 'text-9xl',
};

// override for tailwind fontsizes to work with em values
TAILWIND_CLASSES['font-size'] = {
  ...TAILWIND_CLASSES['font-size'],
  ...bsFontSizes,
};

function getSelectorType(selector) {
  const ast = parsel.parse(selector);
  return ast.type;
}

const fileName = 'bootstrap/v5/bootstrap.css';
const root = postcss.parse(fs.readFileSync(fileName));

const spacingProps = [
  'margin',
  'margin-left',
  'margin-right',
  'margin-top',
  'margin-bottom',
  'padding',
  'padding-bottom',
  'padding-top',
  'padding-left',
  'padding-right',
];

root.nodes
  .filter((node) => node.type === 'rule')
  .forEach((node) => {
    const declarations = node.nodes;

    // Get the list of Tailwind classes
    const tw = declarations
      .filter((decl) => !decl.variable)
      .map((decl) => {
        if (decl.prop === 'border-color' && decl.value.split(' ').length > 1) {
          return '';
        } else {
          return getTailwindUtils(decl);
        }
      })
      .join(' ');

    // TODO: what about partial mappings, we should log

    // Only create mapping if tailwind utilities exists
    const selectorType = getSelectorType(node.selector);
    if (tw !== ' ') {
      if (selectorType === 'class') {
        tailwindMappings.classes[node.selector] = tw.trimStart().trimEnd();
      } else if (selectorType === 'type') {
        tailwindMappings.elements[node.selector] = tw.trimStart().trimEnd();
      } else if (selectorType === 'complex') {
        tailwindMappings.combinators[node.selector] = tw.trimStart().trimEnd();
      } else {
        // remove new line chars from selectors
        const _selector = node.selector.replace(/\n/g, '');
        const selectors = _selector.split(',');
        const _tw = tw.trimStart().trimEnd();
        selectors.forEach((s) => {
          tailwindMappings.compounds[s.trimStart()] = _tw;
        });
      }
    } else {
      // log the class name and file name
      fs.appendFile(
        'UNMAPPED_SELECTORS.txt',
        `${fileName} : ${node.selector}\n`,
        (err) => {
          if (err) throw err;
        }
      );
    }
  });

// Copy hover classes to class mappings
Object.keys(tailwindMappings.compounds)
  .filter((compound) => compound.includes(':hover'))
  .forEach((compound) => {
    const className = compound.replace(':hover', '');
    const utils = tailwindMappings.compounds[compound];
    const hoverUtils = utils.split(' ').map((util) => `hover:${util}`);
    const classMapping = tailwindMappings.classes[className];
    if (classMapping) {
      const newMapping = [...classMapping.split(' '), ...hoverUtils];
      tailwindMappings.classes[className] = newMapping.join(' ');
    }
  });

const emptyValues = Object.keys(tailwindMappings.classes).filter(
  (k) => !tailwindMappings.classes[k]
);

//console.log(emptyValues);
fs.writeFileSync(
  'data/bs-mappings.json',
  JSON.stringify(tailwindMappings, null, 2)
);
//console.log(tailwindMappings.classes);
