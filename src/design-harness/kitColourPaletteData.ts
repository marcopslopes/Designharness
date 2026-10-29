/**
 * Design Harness kit colour palette showcase data
 * (`source/design-harness-kit` ColorPalette). Documentation uses fixed light hexes
 * so swatches stay accurate on dark chrome (Paper stays white, etc.).
 */

export type KitNeutralSwatch = {
  name: string
  role: string
  token: string
  hex: string
  badge: string
  /** True when the swatch itself is dark (badge uses light ink-on-dark style inverted). */
  badgeOnDark?: boolean
}

export type KitAccentSwatch = {
  name: string
  role: string
  description: string
  token: string
  hex: string
  contrast: string
  ramp: string[]
}

export type KitTonalRow = {
  name: string
  stops: string[]
}

export const KIT_TONAL_SCALE = ['98', '95', '90', '80', '70', '60', '50', '40', '30', '20', '10'] as const

export const KIT_NEUTRALS: KitNeutralSwatch[] = [
  {
    name: 'Ink',
    role: 'Primary text · CTA fill',
    token: '--kit-ink',
    hex: '#14161A',
    badge: '21 : 1 AAA',
    badgeOnDark: true,
  },
  {
    name: 'Ink 70',
    role: 'Body · paragraph',
    token: '--kit-ink-70',
    hex: '#4B5563',
    badge: '9.5 : 1 AAA',
    badgeOnDark: true,
  },
  {
    name: 'Ink 50',
    role: 'Captions · meta',
    token: '--kit-ink-50',
    hex: '#6B7280',
    badge: '5.8 : 1 AA',
    badgeOnDark: true,
  },
  {
    name: 'Paper',
    role: 'Card surface',
    token: '--kit-paper',
    hex: '#FFFFFF',
    badge: 'paper',
  },
  {
    name: 'Sunken',
    role: 'Cells · wells',
    token: '--kit-sunken',
    hex: '#F5F5F5',
    badge: 'recessed',
  },
  {
    name: 'Line',
    role: 'Border · divider',
    token: '--kit-neutral-80',
    hex: '#D1D5DB',
    badge: 'edge',
  },
]

export const KIT_ACCENTS: KitAccentSwatch[] = [
  {
    name: 'Teal',
    role: 'brand',
    description: 'Active · CTA tint',
    token: '--kit-brand-50',
    hex: '#0BA3AD',
    contrast: '3.9 : 1',
    ramp: ['#E0F7F8', '#C3F0F2', '#95E2E6', '#5DCFD5', '#2CB9C0', '#0BA3AD', '#0A8A92', '#086C72', '#054F54'],
  },
  {
    name: 'Plum',
    role: 'premium',
    description: 'Upsell · influencer',
    token: '--kit-premium',
    hex: '#4F3791',
    contrast: '9.1 : 1 AAA',
    ramp: ['#EBE5F5', '#DCD1EE', '#B9A2DD', '#9576CC', '#714BBB', '#4F3791', '#422C7A', '#322160', '#110A24'],
  },
  {
    name: 'Rose',
    role: 'accent',
    description: 'Apprentice · today',
    token: '--kit-rose',
    hex: '#C24A6E',
    contrast: '4.9 : 1 AA',
    ramp: ['#F8E2E9', '#F1CBD7', '#E8A5B8', '#DC7E96', '#CF5B7C', '#C24A6E', '#A23A5C', '#7E2C47', '#2C0F19'],
  },
  {
    name: 'Leaf',
    role: 'success',
    description: 'Open · live · paid',
    token: '--kit-leaf',
    hex: '#2EA043',
    contrast: '3.2 : 1',
    ramp: ['#DFF5E4', '#C2EBCC', '#94DAA4', '#66C97D', '#45B85F', '#2EA043', '#258438', '#1A672C', '#082510'],
  },
  {
    name: 'Amber',
    role: 'warn',
    description: 'Pending · attention',
    token: '--kit-amber',
    hex: '#B86A00',
    contrast: '3.8 : 1',
    ramp: ['#FAEFD7', '#F5DDA8', '#E9C16B', '#DAA13A', '#C68615', '#B86A00', '#985700', '#774500', '#2B1900'],
  },
  {
    name: 'Danger',
    role: 'destructive',
    description: 'Delete · failed',
    token: '--kit-danger',
    hex: '#B42318',
    contrast: '5.9 : 1 AA',
    ramp: ['#F9E3DF', '#F2C7BF', '#E59A8C', '#D56E5B', '#C44734', '#B42318', '#951C13', '#74160F', '#2A0805'],
  },
]

export const KIT_TONAL_ROWS: KitTonalRow[] = [
  {
    name: 'Neutral',
    stops: [
      '#FAFAFA',
      '#F5F5F5',
      '#E5E7EB',
      '#D1D5DB',
      '#9CA3AF',
      '#6B7280',
      '#4B5563',
      '#374151',
      '#1F2937',
      '#111827',
      '#000000',
    ],
  },
  {
    name: 'Teal',
    stops: [
      '#F0FBFB',
      '#E0F7F8',
      '#C3F0F2',
      '#95E2E6',
      '#5DCFD5',
      '#2CB9C0',
      '#0BA3AD',
      '#0A8A92',
      '#086C72',
      '#054F54',
      '#02282B',
    ],
  },
  {
    name: 'Plum',
    stops: [
      '#F5F2FA',
      '#EBE5F5',
      '#DCD1EE',
      '#B9A2DD',
      '#9576CC',
      '#714BBB',
      '#4F3791',
      '#422C7A',
      '#322160',
      '#221645',
      '#110A24',
    ],
  },
  {
    name: 'Rose',
    stops: [
      '#FBF1F4',
      '#F8E2E9',
      '#F1CBD7',
      '#E8A5B8',
      '#DC7E96',
      '#CF5B7C',
      '#C24A6E',
      '#A23A5C',
      '#7E2C47',
      '#581E32',
      '#2C0F19',
    ],
  },
]

export function kitStopIsDark(hex: string): boolean {
  const c = hex.replace('#', '')
  if (c.length < 6) return false
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 140
}
