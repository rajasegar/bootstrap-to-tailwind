'use strict';

const postcss = require('postcss');
const fs = require('fs');
const parsel = require('parsel-js');

const {
  TAILWIND_CLASSES,
  getSpacingUtils,
  getBorderRadiusUtils,
} = require('tailwind-mappings');

// different selector types based on parsel
const tailwindMappings = {
  classes: {},
  elements: {},
  combinators: {},
  compounds: {},
};

const buttonClasses = {
  '.btn-primary': 'text-white bg-blue-600 border-blue-500 hover:bg-blue-700',
  '.btn-secondary':
    'text-white bg-gray-500 border-gray-500 hover:bg-indigo-600',
  '.btn-success': 'text-white bg-green-500 border-green-500 hover:bg-green-600',
  '.btn-danger': 'text-white bg-red-500 border-red-500 hover:bg-red-600',
  '.btn-warning':
    'text-white bg-yellow-500 border-yellow-500 hover:bg-yellow-600',
  '.btn-info': 'text-white bg-indigo-400 border-indigo-400 hover:bg-indigo-500',
  '.btn-light': 'text-black bg-gray-100 border-gray-100 hover:bg-gray-200',
  '.btn-dark': 'text-white bg-gray-800 border-gray-800 hover:bg-gray-900',
};

const alertClasses = {
  '.alert-primary': 'text-blue-800 bg-blue-100 border-blue-200',
  '.alert-secondary': 'text-gray-800 bg-gray-100 border-gray-200',
  '.alert-success': 'text-green-800 bg-green-100 border-green-200',
  '.alert-danger': 'text-red-800 bg-red-100 border-red-200',
  '.alert-warning': 'text-yellow-800 bg-yellow-100 border-yellow-200',
  '.alert-info': 'text-indigo-800 bg-indigo-100 border-indigo-200',
  '.alert-light': 'text-gray-800 bg-gray-100 border-gray-200',
  '.alert-dark': 'text-black bg-gray-400 border-gray-500',
};

const bgClasses = {
  '.bg-primary': 'bg-blue-600',
  '.bg-secondary': 'bg-gray-600',
  '.bg-danger': 'bg-red-600',
  '.bg-warning': 'bg-yellow-600',
  '.bg-success': 'bg-green-600',
  '.bg-info': 'bg-indigo-600',
  '.bg-light': 'bg-gray-100',
  '.bg-dark': 'bg-gray-900',
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

root.nodes
  .filter((node) => node.type === 'rule')
  .forEach((node) => {
    const declarations = node.nodes;

    // Get the list of Tailwind classes
    const tw = declarations
      .filter((decl) => !decl.variable)
      .map((decl) => {
        const prop = TAILWIND_CLASSES[decl.prop];
        if (decl.prop === 'padding') {
          return getSpacingUtils(decl, 'padding');
        } else if (decl.prop === 'margin') {
          return getSpacingUtils(decl, 'margin');
        } else if (decl.prop === 'border-radius') {
          return getBorderRadiusUtils(decl);
        } else {
          // remove !important from values
          let val = decl.value.replace(' !important', '');
          //console.log(val);

          return prop ? prop[val] : '';
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
        const _selector = node.selector.replace('\n', '');
        tailwindMappings.compounds[_selector] = tw.trimStart().trimEnd();
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

tailwindMappings.classes = {
  ...tailwindMappings.classes,
  ...buttonClasses,
  ...alertClasses,
  ...bgClasses,
};

const emptyValues = Object.keys(tailwindMappings.classes).filter(
  (k) => !tailwindMappings.classes[k]
);

//console.log(emptyValues);
fs.writeFileSync(
  'data/bs-mappings.json',
  JSON.stringify(tailwindMappings, null, 2)
);
//console.log(tailwindMappings.classes);
