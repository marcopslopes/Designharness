


export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        // ─────────────────────────────────────────────────────────────
        // Northline semantic tokens — every color is a CSS variable, so
        // theme + contrast modes flip the ENTIRE UI without refactoring
        // individual components. rgb(... / <alpha-value>) keeps opacity
        // utilities (bg-ink/10, text-ink-50, etc.) working.
        // ─────────────────────────────────────────────────────────────

        // Core neutrals — these FLIP for dark mode
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        sunken: 'rgb(var(--c-sunken) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        'ink-70': 'rgb(var(--c-ink-70) / <alpha-value>)',
        'ink-50': 'rgb(var(--c-ink-50) / <alpha-value>)',

        // Legacy neutral aliases
        'ink-soft': 'rgb(var(--c-ink-70) / <alpha-value>)',
        muted: 'rgb(var(--c-ink-50) / <alpha-value>)',
        'muted-soft': 'rgb(var(--c-muted-soft) / <alpha-value>)',
        surface: 'rgb(var(--c-paper) / <alpha-value>)',
        'surface-2': 'rgb(var(--c-sunken) / <alpha-value>)',
        'surface-3': 'rgb(var(--c-sunken-2) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',

        // Override Tailwind's default white so bg-white / text-white
        // adapt across themes. The role is "raised surface / on-fill".
        white: 'rgb(var(--c-paper) / <alpha-value>)',

        // Neutral tonal ramp (kept for swatch widget)
        'neutral-98': '#FAFAFA',
        'neutral-95': '#F5F5F5',
        'neutral-90': '#E5E7EB',
        'neutral-80': '#D1D5DB',
        'neutral-60': '#9CA3AF',
        'neutral-50': '#6B7280',
        'neutral-40': '#4B5563',
        'neutral-30': '#374151',
        'neutral-20': '#1F2937',
        'neutral-10': '#111827',
        'neutral-0': '#000000',

        // Brand · Teal
        teal: 'rgb(var(--c-teal) / <alpha-value>)',
        'teal-soft': 'rgb(var(--c-teal-soft) / <alpha-value>)',
        'teal-98': '#F0FBFB',
        'teal-95': '#E0F7F8',
        'teal-90': '#C3F0F2',
        'teal-80': '#95E2E6',
        'teal-70': '#5DCFD5',
        'teal-60': '#2CB9C0',
        'teal-50': '#0BA3AD',
        'teal-40': '#0A8A92',
        'teal-30': '#086C72',
        'teal-20': '#054F54',
        'teal-10': '#02282B',

        // Plum · premium
        plum: 'rgb(var(--c-plum) / <alpha-value>)',
        'plum-soft': 'rgb(var(--c-plum-soft) / <alpha-value>)',
        'plum-98': '#F5F2FA',
        'plum-95': '#EBE5F5',
        'plum-90': '#DCD1EE',
        'plum-80': '#B9A2DD',
        'plum-70': '#9576CC',
        'plum-60': '#714BBB',
        'plum-50': '#4F3791',
        'plum-40': '#422C7A',
        'plum-30': '#322160',
        'plum-20': '#221645',
        'plum-10': '#110A24',
        purple: 'rgb(var(--c-plum) / <alpha-value>)',

        // Rose · accent
        rose: 'rgb(var(--c-rose) / <alpha-value>)',
        'rose-soft': 'rgb(var(--c-rose-soft) / <alpha-value>)',
        'rose-98': '#FBF1F4',
        'rose-95': '#F8E2E9',
        'rose-90': '#F1CBD7',
        'rose-80': '#E8A5B8',
        'rose-70': '#DC7E96',
        'rose-60': '#CF5B7C',
        'rose-50': '#C24A6E',
        'rose-40': '#A23A5C',
        'rose-30': '#7E2C47',
        'rose-20': '#581E32',
        'rose-10': '#2C0F19',

        // Leaf · success
        leaf: 'rgb(var(--c-leaf) / <alpha-value>)',
        'leaf-soft': 'rgb(var(--c-leaf-soft) / <alpha-value>)',
        'leaf-98': '#F0FAF2',
        'leaf-95': '#DFF5E4',
        'leaf-90': '#C2EBCC',
        'leaf-80': '#94DAA4',
        'leaf-70': '#66C97D',
        'leaf-60': '#45B85F',
        'leaf-50': '#2EA043',
        'leaf-40': '#258438',
        'leaf-30': '#1A672C',
        'leaf-20': '#104A20',
        'leaf-10': '#082510',
        success: 'rgb(var(--c-leaf) / <alpha-value>)',
        'success-soft': 'rgb(var(--c-leaf-soft) / <alpha-value>)',

        // Amber · warn
        amber: 'rgb(var(--c-amber) / <alpha-value>)',
        'amber-soft': 'rgb(var(--c-amber-soft) / <alpha-value>)',
        'amber-98': '#FCF7EE',
        'amber-95': '#FAEFD7',
        'amber-90': '#F5DDA8',
        'amber-80': '#E9C16B',
        'amber-70': '#DAA13A',
        'amber-60': '#C68615',
        'amber-50': '#B86A00',
        'amber-40': '#985700',
        'amber-30': '#774500',
        'amber-20': '#563200',
        'amber-10': '#2B1900',
        warning: 'rgb(var(--c-amber) / <alpha-value>)',

        // Danger · destructive
        danger: 'rgb(var(--c-danger) / <alpha-value>)',
        'danger-soft': 'rgb(var(--c-danger-soft) / <alpha-value>)',
        'danger-98': '#FCF2F0',
        'danger-95': '#F9E3DF',
        'danger-90': '#F2C7BF',
        'danger-80': '#E59A8C',
        'danger-70': '#D56E5B',
        'danger-60': '#C44734',
        'danger-50': '#B42318',
        'danger-40': '#951C13',
        'danger-30': '#74160F',
        'danger-20': '#530F0A',
        'danger-10': '#2A0805',

        // Misc legacy
        lime: '#90F239',
        facebook: '#1877F2',
        'google-yellow': '#FBBB00',
        'google-blue': '#518EF8',
        'google-green': '#28B446',
        'google-red': '#F14336',
        klarna: '#FFA8CD',
        'klarna-ink': '#0B051D',
        'app-teal': 'rgb(var(--c-teal) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Proxima Nova', 'Mulish', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        fab: '0 2px 4px rgba(0,0,0,0.08)',
        card: 'var(--shadow-card)',
        'card-strong': 'var(--shadow-card-strong)',
        'edge-raised': 'var(--edge-raised)',
      },
    },
  },
}


