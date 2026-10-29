/** DS Colors page — Primitives / Calendar, read from `tokens.css`. */

export const PRIMITIVE_SHADE_STEPS = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50] as const

export type PrimitiveScaleId = 'teal' | 'mosque' | 'orange' | 'green' | 'red' | 'gray'

export const PRIMITIVE_SCALES: { id: PrimitiveScaleId; label: string }[] = [
  { id: 'teal', label: 'Teal' },
  { id: 'mosque', label: 'Mosque' },
  { id: 'orange', label: 'Orange' },
  { id: 'green', label: 'Green' },
  { id: 'red', label: 'Red' },
  { id: 'gray', label: 'Gray' },
]

export function primitiveToken(id: PrimitiveScaleId, step: number): string {
  return `--ds-primitive-${id}-${step}`
}

export const PRIMITIVE_SINGLES: { label: string; token: string; kind?: 'solid' | 'gradient' }[] = [
  { label: 'Black', token: '--ds-primitive-black' },
  { label: 'System Black', token: '--ds-primitive-system-black' },
  { label: 'White', token: '--ds-primitive-white' },
  { label: 'Gray 25', token: '--ds-primitive-gray-25' },
  { label: 'Violet 900', token: '--ds-primitive-violet-900' },
  { label: 'Violet 200', token: '--ds-primitive-violet-200' },
  { label: 'Pink 900', token: '--ds-primitive-pink-900' },
  { label: 'Pink 200', token: '--ds-primitive-pink-200' },
  { label: 'Gradient Purple', token: '--ds-primitive-gradient-purple', kind: 'gradient' },
  { label: 'Gradient Black', token: '--ds-primitive-gradient-black', kind: 'gradient' },
]

export type CalendarFamily = 'pink' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'brown'

export const CALENDAR_STRONG: { family: CalendarFamily; steps: number[] }[] = [
  { family: 'pink', steps: [1, 2, 3] },
  { family: 'red', steps: [1, 2, 3] },
  { family: 'orange', steps: [1, 2] },
  { family: 'yellow', steps: [1, 2, 3, 4] },
  { family: 'green', steps: [1, 2, 3, 4, 5, 6, 7, 8] },
  { family: 'blue', steps: [1, 2, 3, 4, 5, 6] },
  { family: 'purple', steps: [1, 2, 3] },
  { family: 'brown', steps: [1, 2] },
]

export const CALENDAR_LIGHT: { family: CalendarFamily; steps: number[] }[] = [
  { family: 'pink', steps: [1, 2, 3] },
  { family: 'red', steps: [1, 2, 3] },
  { family: 'orange', steps: [1, 2] },
  { family: 'yellow', steps: [1, 2, 3, 4] },
  { family: 'green', steps: [1, 2, 3, 4, 5, 6, 7] },
  { family: 'blue', steps: [1, 2, 3, 4, 5, 6] },
  { family: 'purple', steps: [1, 2, 3, 4] },
  { family: 'brown', steps: [1, 2] },
]

export function calendarToken(weight: 'strong' | 'light', family: CalendarFamily, step: number): string {
  return `--ds-calendar-${weight}-${family}-${step}`
}
