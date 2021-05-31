'use strict';

const TAILWIND_CLASSES = {
  display: {
    block: 'block',
    'inline-block': 'inline-block',
    inline: 'inline',
    flex: 'flex',
    'inline-flex': 'inline-flex',
    table: 'table',
    'inline-table': 'inline-table',
    'table-caption': 'table-caption',
    'table-cell': 'table-cell',
    'table-column': 'table-column',
    'table-column-group': 'table-column-group',
    'table-footer-group': 'table-footer-group',
    'table-header-group': 'table-header-group',
    'table-row-group': 'table-row-group',
    'table-row': 'table-row',
    'flow-root': 'flow-root',
    grid: 'grid',
    'inline-grid': 'inline-grid',
    contents: 'contents',
    'list-item': 'list-item',
    none: 'hidden',
  },
  padding: {
    0: 'p-0',
    '0px': 'p-0',
    '1px': 'p-px',
    '.125rem': 'p-0.5',
    '.25rem': 'p-1',
  },
  'padding-left': {
    0: 'pl-0',
    '0px': 'pl-0',
    '.375rem': 'pl-1.5'
  },
  'padding-right': {
    0: 'pr-0',
    '0px': 'pr-0',
    '.375rem': 'pr-1.5'
  },
  'padding-top': {
    0: 'pt-0',
    '0px': 'pt-0',
    '.375rem': 'pt-1.5',
    '.75rem': 'pt-3'
  },
  'padding-bottom': {
    0: 'pb-0',
    '0px': 'pb-0',
    '.375rem': 'pb-1.5',
    '.75rem': 'pb-3'
  },
  overflow: {
    auto: 'overflow-auto',
    hidden: 'overflow-hidden',
    visible: 'overflow-visible',
    scroll: 'overflow-scroll',
  },
  'overflow-x': {
    auto: 'overflow-x-auto',
    hidden: 'overflow-x-hidden',
    visible: 'overflow-x-visible',
    scroll: 'overflow-x-scroll',
  },
  'overflow-y': {
    auto: 'overflow-y-auto',
    hidden: 'overflow-y-hidden',
    visible: 'overflow-y-visible',
    scroll: 'overflow-y-scroll',
  },
  'border-style': {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
    double: 'border-double',
    none: 'border-none',
  },
  opacity: {
    0: 'opacity-0',
    0.05: 'opacity-5',
    0.1: 'opacity-10',
    0.2: 'opacity-20',
    0.25: 'opacity-25',
    0.3: 'opacity-30',
    0.4: 'opacity-40',
    0.5: 'opacity-50',
    0.6: 'opacity-60',
    0.7: 'opacity-70',
    0.75: 'opacity-75',
    0.8: 'opacity-80',
    0.9: 'opacity-90',
    0.95: 'opacity-95',
    1: 'opacity-100',
  },
  float: {
    right: 'float-right',
    left: 'float-left',
    none: 'float-none',
  },
  clear: {
    left: 'clear-left',
    right: 'clear-right',
    both: 'clear-both',
    none: 'clear-none',
  },
  'object-fit': {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  },
  'text-decoration': {
    underline: 'underline',
    'line-through': 'line-through',
    none: 'no-underline',
  },
  'font-weight': {
    100: 'font-thin',
    200: 'font-extralight',
    300: 'font-light',
    400: 'font-normal',
    500: 'font-medium',
    600: 'font-semibold',
    700: 'font-bold',
    800: 'font-extrabold',
    900: 'font-black',
  },
  'line-height': {
    1: 'leading-none',
    1.25: 'leading-tight',
    1.375: 'leading-snug',
    1.5: 'leading-normal',
    1.625: 'leading-relaxed',
    2: 'leading-loose',
  },
  'flex-wrap': {
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse',
    nowrap: 'flex-nowrap',
  },
  'flex-grow': {
    0: 'flex-grow-0',
    1: 'flex-grow',
  },
  'flex-shrink': {
    0: 'flex-shrink-0',
    1: 'flex-shrink',
  },
  'justify-content': {
    'flex-start': 'justify-start',
    'flex-end': 'justify-end',
    center: 'justify-center',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
    'space-evenly': 'justify-evenly',
  },
  'align-items': {
    'flex-start': 'items-start',
    'flex-end': 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  },
  'text-align': {
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
    justify: 'text-justify',
  },
  'align-content': {
    center: 'content-center',
    'flex-start': 'content-start',
    'flex-end': 'content-end',
    'space-between': 'content-between',
    'space-around': 'content-around',
    'space-evenly': 'content-evenly',
  },
  'white-space': {
    normal: 'whitespace-normal',
    nowrap: 'whitespace-nowrap',
    pre: 'whitespace-pre',
    'pre-line': 'whitespace-pre-line',
    'pre-wrap': 'whitespace-pre-wrap',
  },
  margin: {},
  'overscroll-behavior': {
    auto: 'overscroll-auto',
    contain: 'overscroll-contain',
    none: 'overscroll-none',
  },
  'overscroll-behaviory': {
    auto: 'overscroll-y-auto',
    contain: 'overscroll-y-contain',
    none: 'overscroll-y-none',
  },
  'overscroll-behavior-x': {
    auto: 'overscroll-x-auto',
    contain: 'overscroll-x-contain',
    none: 'overscroll-x-none',
  },
  visibility: {
    visible: 'visible',
    hidden: 'invisible',
  },
  'z-index': {
    0: 'z-0',
    10: 'z-10',
    20: 'z-20',
    30: 'z-30',
    40: 'z-40',
    50: 'z-50',
    auto: 'z-auto',
  },
  'flex-direction': {
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
    column: 'flex-col',
    'column-reverse': 'flex-col-reverse',
  },
  flex: {
    '1 1 0%': 'flex-1',
    '1 1 auto': 'flex-auto',
    '0 1 auto': 'flex-initial',
    none: 'flex-none',
  },
  order: {
    1: 'order-1',
    2: 'order-2',
    3: 'order-3',
    4: 'order-4',
    5: 'order-5',
    6: 'order-6',
    7: 'order-7',
    8: 'order-8',
    9: 'order-9',
    10: 'order-10',
    11: 'order-11',
    12: 'order-12',
    '-9999': 'order-first',
    9999: 'order-last',
    0: 'order-none',
  },
  'grid-template-columns': {
    'repeat(1, minmax(0, 1fr))': 'grid-cols-1',
    'repeat(2, minmax(0, 1fr))': 'grid-cols-2',
    'repeat(3, minmax(0, 1fr))': 'grid-cols-3',
    'repeat(4, minmax(0, 1fr))': 'grid-cols-4',
    'repeat(5, minmax(0, 1fr))': 'grid-cols-5',
    'repeat(6, minmax(0, 1fr))': 'grid-cols-6',
    'repeat(7, minmax(0, 1fr))': 'grid-cols-7',
    'repeat(8, minmax(0, 1fr))': 'grid-cols-8',
    'repeat(9, minmax(0, 1fr))': 'grid-cols-9',
    'repeat(10, minmax(0, 1fr))': 'grid-cols-10',
    'repeat(11, minmax(0, 1fr))': 'grid-cols-11',
    'repeat(12, minmax(0, 1fr))': 'grid-cols-12',
    none: 'grid-cols-none',
  },
  'grid-auto-flow': {
    row: 'grid-flow-row',
    column: 'grid-flow-col',
    'row dense': 'grid-flow-row-dense',
    'column dense': 'grid-flow-col-dense',
  },
  'grid-auto-columns': {
    auto: 'auto-cols-auto',
    'min-content': 'auto-cols-min',
    'max-content': 'auto-cols-max',
    'minmax(0, 1fr)': 'auto-cols-fr',
  },
  'grid-auto-rows': {
    auto: 'auto-rows-auto',
    'min-content': 'auto-rows-min',
    'max-content': 'auto-rows-max',
    'minmax(0, 1fr)': 'auto-rows-fr',
  },
  'box-sizing': {
    'border-box': 'box-border',
    'content-box': 'box-content',
  },
  isolation: {
    isolate: 'isolate',
    auto: 'isolation-auto',
  },
  'object-position': {
    bottom: 'object-bottom',
    center: 'object-center',
    left: 'object-left',
    'left bottom': 'object-left-bottom',
    'left top': 'object-left-top',
    right: 'object-right',
    'right bottom': 'object-right-bottom',
    'right top': 'object-right-top',
    top: 'object-top',
  },
  width: {
    0: 'w-0',
    '0px': 'w-0',
    auto: 'w-auto',
    '25%': 'w-1/4',
    '33.333333%': 'w-1/3',
    '50%': 'w-1/2',
    '66.666667%': 'w-2/3',
    '75%': 'w-3/4',
    '100%': 'w-full',
    '100vw': 'w-screen',
    'min-content': 'w-min',
    'max-content': 'w-max',
  },
  'min-width': {
    '0px': 'min-w-0',
    '100%': 'min-w-full',
    'min-content': 'min-w-min',
    'max-content': 'min-w-max',
  },
  'max-width': {
    '0rem': 'max-w-0',
    none: 'max-w-none',
    '20rem': 'max-w-xs',
    '24rem': 'max-w-sm',
    '28rem': 'max-w-md',
    '32rem': 'max-w-lg',
    '36rem': 'max-w-xl',
    '42rem': 'max-w-2xl',
    '48rem': 'max-w-3xl',
    '56rem': 'max-w-4xl',
    '64rem': 'max-w-5xl',
    '72rem': 'max-w-6xl',
    '80rem': 'max-w-7xl',
    '100%': 'max-w-full',
    'min-content': 'max-w-min',
    'max-content': 'max-w-max',
    '65ch': 'max-w-prose',
    '640px': 'max-w-screen-sm',
    '768px': 'max-w-screen-md',
    '1024px': 'max-w-screen-lg',
    '1280px': 'max-w-screen-xl',
    '1536px': 'max-w-screen-2xl',
  },
  height: {
    0: 'h-0',
    '0px': 'h-0',
    auto: 'h-auto',
    '25%': 'h-1/4',
    '33.333333%': 'h-1/3',
    '50%': 'h-1/2',
    '66.666667%': 'h-2/3',
    '75%': 'h-3/4',
    '100%': 'h-full',
    '100vh': 'h-screen',
  },
  'min-height': {
    '0px': 'min-h-0',
    '100%': 'min-h-full',
    '100vh': 'min-h-screen',
  },
  'max-height': {
    '0px': 'max-h-0',
    '100%': 'max-h-full',
    '100vh': 'max-h-screen',
  },
  'font-style': {
    italic: 'italic',
    normal: 'non-italic',
  },
  'list-style-type': {
    none: 'list-none',
    disc: 'list-disc',
    decimal: 'list-decimal',
  },
  'list-style-position': {
    inside: 'list-inside',
    outside: 'list-outside',
  },
  color: {
    transparent: 'text-transparent',
    currentColor: 'text-current',
  },
  'text-transform': {
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
    none: 'normal-case',
  },
  'text-overflow': {
    ellipsis: 'overflow-ellipsis',
    clip: 'overflow-clip',
  },
  'vertical-align': {
    baseline: 'align-baseline',
    top: 'align-top',
    middle: 'align-middle',
    bottom: 'align-bottom',
    'text-top': 'align-text-top',
    'text-bottom': 'align-text-bottom',
  },
  'word-break': {
    'break-all': 'break-all',
  },
  'overflow-wrap': {
    'break-word': 'break-words',
  },
  'background-attachment': {
    fixed: 'bg-fixed',
    local: 'bg-local',
    scroll: 'bg-scroll',
  },
  'background-clip': {
    'border-box': 'bg-clip-border',
    'padding-box': 'bg-clip-padding',
    'content-box': 'bg-clip-content',
    text: 'bg-clip-text',
  },
  'background-color': {
    transparent: 'bg-transparent',
    currentColor: 'bg-current',
  },
  'background-position': {
    bottom: 'bg-bottom',
    center: 'bg-center',
    left: 'bg-left',
    'left bottom': 'bg-left-bottom',
    'left-top': 'bg-left-top',
    right: 'bg-right',
    'right bottom': 'bg-right-bottom',
    'right top': 'bg-right-top',
    top: 'bg-top',
  },
  'background-repeat': {
    repeat: 'bg-repeat',
    'no-repeat': 'bg-no-repeat',
    'repeat-x': 'bg-repeat-x',
    'repeat-y': 'bg-repeat-y',
    round: 'bg-repeat-round',
    space: 'bg-repeat-space',
  },
  'background-size': {
    auto: 'bg-auto',
    cover: 'bg-cover',
    contain: 'bg-contain',
  },
  'background-image': {
    none: 'bg-none',
  },
  'border-radius': {
    '0': 'rounded-none',
    '0px': 'rounded-none',
    '.125rem': 'rounded-sm',
    '.25rem': 'rounded',
    '.375rem': 'rounded-md',
    '.5rem': 'rounded-lg',
    '.75rem': 'rounded-xl',
    '1rem': 'rounded-2xl',
    '1.5rem': 'rounded-3xl',
    '9999px': 'rounded-full',
  },
  'border-width': {
    '0px': 'border-none',
    '2px': 'border-2',
    '4px': 'border-4',
    '8px': 'border-8',
    '1px': 'border',
  },
  'border-color': {
    transparent: 'border-transparent',
    currentColor: 'border-current',
  },
  'mix-blend-mode': {
    normal: 'mix-blend-normal',
    multiply: 'mix-blend-multiply',
    screen: 'mix-blend-screen',
    overlay: 'mix-blend-overlay',
    darken: 'mix-blend-darken',
    lighten: 'mix-blend-lighten',
    'color-dodge': 'mix-blend-color-dodge',
    'color-burn': 'mix-blend-color-burn',
    'hard-light': 'mix-blend-hard-light',
    'soft-light': 'mix-blend-soft-light',
    difference: 'mix-blend-difference',
    exclusion: 'mix-blend-exclusion',
    hue: 'mix-blend-hue',
    saturation: 'mix-blend-saturation',
    color: 'mix-blend-color',
    luminosity: 'mix-blend-luminosity',
  },
  'background-blend-mode': {
    normal: 'bg-blend-normal',
    multiply: 'bg-blend-multiply',
    screen: 'bg-blend-screen',
    overlay: 'bg-blend-overlay',
    darken: 'bg-blend-darken',
    lighten: 'bg-blend-lighten',
    'color-dodge': 'bg-blend-color-dodge',
    'color-burn': 'bg-blend-color-burn',
    'hard-light': 'bg-blend-hard-light',
    'soft-light': 'bg-blend-soft-light',
    difference: 'bg-blend-difference',
    exclusion: 'bg-blend-exclusion',
    hue: 'bg-blend-hue',
    saturation: 'bg-blend-saturation',
    color: 'bg-blend-color',
    luminosity: 'bg-blend-luminosity',
  },
  'border-collapse': {
    collapse: 'border-collapse',
    separate: 'border-separate',
  },
  'table-layout': {
    auto: 'table-auto',
    fixed: 'table-fixed',
  },
  'transform-origin': {
    center: 'origin-center',
    top: 'origin-top',
    'top right': 'origin-top-right',
    right: 'origin-right',
    'bottom right': 'origin-bottom-right',
    bottom: 'origin-bottom',
    'bottom left': 'origin-bottom-left',
    left: 'origin-left',
    'top left': 'origin-top-left',
  },
  appearance: {
    none: 'appearance-none',
  },
  cursor: {
    auto: 'cursor-auto',
    default: 'cursor-default',
    pointer: 'cursor-pointer',
    wait: 'cursor-wait',
    text: 'cursor-text',
    move: 'cursor-move',
    help: 'cursor-help',
    'not-allowed': 'cursor-not-allowed',
  },
  'pointer-events': {
    none: 'pointer-events-none',
    auto: 'pointer-events-auto',
  },
  resize: {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  },
  'user-select': {
    none: 'select-none',
    text: 'select-text',
    all: 'select-all',
    auto: 'select-auto',
  },
  fill: {
    currentColor: 'fill-current',
  },
  stroke: {
    currentColor: 'stroke-current',
  },
  'stroke-width': {
    0: 'stroke-0',
    1: 'stroke-1',
    2: 'stroke-2',
  },
  position: {
    static: 'static',
    fixed: 'fixed',
    absolute: 'absolute',
    relative: 'relative',
    sticky: 'sticky',
  },
  'justify-items': {
    start: 'justify-items-start',
    end: 'justify-items-end',
    center: 'justify-items-center',
    stretch: 'justify-items-stretch',
  },
  'justify-self': {
    auto: 'justify-self-auto',
    start: 'justify-self-start',
    end: 'justify-self-end',
    center: 'justify-self-center',
    stretch: 'justify-self-stretch',
  },
  'align-self': {
    auto: 'self-auto',
    start: 'self-start',
    end: 'self-end',
    center: 'self-center',
    stretch: 'self-stretch',
  },
  'place-content': {
    center: 'place-content-center',
    start: 'place-content-start',
    end: 'place-content-end',
    'space-between': 'place-content-between',
    'space-around': 'place-content-around',
    'space-evenly': 'place-content-evenly',
    stretch: 'place-content-stretch',
  },
  'place-items': {
    start: 'place-items-start',
    end: 'place-items-end',
    center: 'place-items-center',
    stretch: 'place-items-stretch',
  },
  'place-self': {
    auto: 'place-self-auto',
    start: 'place-self-start',
    end: 'place-self-end',
    center: 'place-self-center',
    stretch: 'place-self-stretch',
  },
  top: {
    0: 'top-0',
    '0px': 'top-0',
    '50%': 'top-1/2',
    '100%': 'top-full',
  },
  bottom: {
    0: 'bottom-0',
    '0px': 'bottom-0',
    '50%': 'bottom-1/2',
    '100%': 'bottom-full',
  },
  left: {
    0: 'left-0',
    '0px': 'left-0',
    '50%': 'left-1/2',
    '100%': 'left-full',
  },
  right: {
    0: 'right-0',
    '0px': 'right-0',
    '50%': 'right-1/2',
    '100%': 'right-full',
  },
};

module.exports = {
  TAILWIND_CLASSES,
};