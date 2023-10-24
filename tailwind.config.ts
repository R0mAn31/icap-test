import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        's-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'c-change': {
          '0%': {
            opacity: '0.7',
          },
          '50%': {
            backgroundColor: '#7c809c',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        'slide-in': 's-in 800ms',
        'color-change': 'c-change 800ms linear'
      },
    },
  },
  plugins: [],
}
export default config
