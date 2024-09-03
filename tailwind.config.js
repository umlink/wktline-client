/** @type {import('tailwindcss').Config} */
export default {
  plugin: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')],
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx', './src/layouts/**/*.tsx'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: 'rgba(var(--primary-color), <alpha-value>)',
        'primary-10': 'rgb(var(--primary-color),1%)',
        'primary-50': 'rgb(var(--primary-color),5%)',
        'primary-100': 'rgb(var(--primary-color),10%)',
        'primary-150': 'rgb(var(--primary-color),15%)',
        'primary-200': 'rgb(var(--primary-color),20%)',
        'primary-250': 'rgb(var(--primary-color),25%)',
        'primary-300': 'rgb(var(--primary-color),30%)',
        'primary-400': 'rgb(var(--primary-color),40%)',
        'primary-500': 'rgb(var(--primary-color),50%)',
        'primary-600': 'rgb(var(--primary-color),60%)',
        'primary-700': 'rgb(var(--primary-color),70%)',
        'primary-800': 'rgb(var(--primary-color),80%)',
        'primary-900': 'rgb(var(--primary-color),90%)',
      },
      transitionProperty: {
        height: 'height',
      },
    },
    boxShadow: {
      rl: '0 1px 5px 0 rgb(57 66 60 / 20%)',
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: 'none',
    },
  },
};
