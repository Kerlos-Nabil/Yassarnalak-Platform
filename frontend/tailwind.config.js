export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#1F6F7C', dark: '#185A65', light: '#E3F1F3' },
        cream: '#FAF7F0',
        surface: '#FFFDF9',
        ink: { DEFAULT: '#2B2F36', soft: '#565C66' },
        accent: { DEFAULT: '#F2A65A', hover: '#EE9844' },
        success: { DEFAULT: '#3E9B6B', ink: '#2B7552', tint: '#E7F5EE' },
        warning: { DEFAULT: '#E0A030', ink: '#85570A', tint: '#FFF4D6' },
        error: { DEFAULT: '#C8473F', tint: '#FBE9E7' },
        line: '#E3E0D6',
        notice: '#FFF4D6',
        kid: { sky: '#6EC1E4', sun: '#FFD166', coral: '#FF8A7A', mint: '#8ED6B5' },
      },
      fontFamily: {
        sans: ['Cairo', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        sm: ['15px', '1.7'],
        base: ['18px', '1.8'],
        lg: ['20px', '1.7'],
        xl: ['22px', '1.6'],
        '2xl': ['26px', '1.5'],
        '3xl': ['32px', '1.4'],
        '4xl': ['40px', '1.35'],
        '5xl': ['52px', '1.3'],
      },
      borderRadius: {
        card: '24px',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(31,111,124,0.08)',
      },
    },
  },
};
