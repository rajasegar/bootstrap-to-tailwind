'use strict';

const postcss = require('postcss');
const fs = require('fs');
const parsel = require('parsel-js');

const { TAILWIND_CLASSES } = require('../data/tailwind-utilities');

// different selector types based on parsel
const tailwindMappings = {
  classes: {},
  elements: {},
  combinators: {},
  compounds: {},
};

const buttonClasses = {
  '.btn-primary': 'text-white bg-blue-600 border-blue-500 hover:bg-blue-700',
  '.btn-secondary': 'text-white bg-gray-500 border-gray-500',
  '.btn-success': 'text-white bg-green-500 border-green-500',
  '.btn-danger': 'text-white bg-red-500 border-red-500',
  '.btn-warning': 'text-white bg-yellow-500 border-yellow-500',
  '.btn-info': 'text-white bg-indigo-400 border-indigo-400',
  '.btn-light': 'text-black bg-gray-100 border-gray-100',
  '.btn-dark': 'text-white bg-gray-900 border-gray-900',
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

function getSelectorType(selector) {
  const ast = parsel.parse(selector);
  return ast.type;
}

function getPaddingUtils(decl) {
  const values = decl.value.split(' ');
  let output = '';

  // padding: 0;
  if (values.length === 1) {
    output = TAILWIND_CLASSES[decl.prop][values[0]];
  }
  // padding: topBottom leftRight;
  if (values.length === 2) {
    const [topBottom, leftRight] = values;
    const px = TAILWIND_CLASSES['padding-left'][leftRight] || '';
    const py = TAILWIND_CLASSES['padding-top'][topBottom] || '';
    output = px.replace('l', 'x') + ' ' + py.replace('t', 'y');
  }

  // padding: top leftRight bottom;
  if (values.length === 3) {
    const [top, leftRight, bottom] = values;
    const pt = TAILWIND_CLASSES['padding-top'][top] || '';
    const px = TAILWIND_CLASSES['padding-left'][leftRight] || '';
    const pb = TAILWIND_CLASSES['padding-bottom'][bottom] || '';
    output = pt + ' ' + px.replace('l', 'x') + ' ' + pb;
  }

  // padding: top right bottom left;
  if (values.length === 4) {
    const [top, right, bottom, left] = values;
    const pt = TAILWIND_CLASSES['padding-top'][top] || '';
    const pr = TAILWIND_CLASSES['padding-right'][right] || '';
    const pb = TAILWIND_CLASSES['padding-bottom'][bottom] || '';
    const pl = TAILWIND_CLASSES['padding-left'][left] || '';
    output = pt + ' ' + pr + ' ' + pb + ' ' + pl;
  }

  return output;
}

function getMarginUtils(decl) {
  const values = decl.value.split(' ');
  let output = '';

  // margin: 0;
  if (values.length === 1) {
    output = TAILWIND_CLASSES[decl.prop][values[0]];
  }
  // margin: topBottom leftRight;
  if (values.length === 2) {
    const [topBottom, leftRight] = values;
    const mx = TAILWIND_CLASSES['margin-left'][leftRight] || '';
    const my = TAILWIND_CLASSES['margin-top'][topBottom] || '';
    output = mx.replace('l', 'x') + ' ' + my.replace('t', 'y');
  }

  // margin: top leftRight bottom;
  if (values.length === 3) {
    const [top, leftRight, bottom] = values;
    const mt = TAILWIND_CLASSES['margin-top'][top] || '';
    const mx = TAILWIND_CLASSES['margin-left'][leftRight] || '';
    const mb = TAILWIND_CLASSES['margin-bottom'][bottom] || '';
    output = mt + ' ' + mx.replace('l', 'x') + ' ' + mb;
  }

  // margin: top right bottom left;
  if (values.length === 4) {
    const [top, right, bottom, left] = values;
    const mt = TAILWIND_CLASSES['margin-top'][top] || '';
    const mr = TAILWIND_CLASSES['margin-right'][right] || '';
    const mb = TAILWIND_CLASSES['margin-bottom'][bottom] || '';
    const ml = TAILWIND_CLASSES['margin-left'][left] || '';
    output = mt + ' ' + mr + ' ' + mb + ' ' + ml;
  }

  return output;
}

const fileName = 'bootstrap/v5/bootstrap.min.css';
const root = postcss.parse(fs.readFileSync(fileName));

root.nodes
  .filter((node) => node.type === 'rule')
  .forEach((node) => {
    const declarations = node.nodes;

    // Get the list of Tailwind classes
    const tw = declarations
      .map((decl) => {
        const prop = TAILWIND_CLASSES[decl.prop];
        if (decl.prop === 'padding') {
          return getPaddingUtils(decl);
        } else if (decl.prop === 'margin') {
          return getMarginUtils(decl);
        } else {
          // remove !important from values
          const val = decl.value.replace(' !important', '');
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
