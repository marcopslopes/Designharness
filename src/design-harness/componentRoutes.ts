/** Hash routes for Northline Design System — Buttons (Figma node 23469-48969). */
export const BUTTON_ROUTES = [
  'design-system/button',
  'design-system/button/primary',
  'design-system/button/secondary',
  'design-system/button/ghost',
  'design-system/button/fab',
  'design-system/button/brands',
  'design-system/button/special',
] as const

export type ButtonDesignHarnessRoute = (typeof BUTTON_ROUTES)[number]

export function isButtonDocRoute(route: string): route is ButtonDesignHarnessRoute {
  return (BUTTON_ROUTES as readonly string[]).includes(route)
}

export const BUTTON_ROUTE_LABEL: Record<ButtonDesignHarnessRoute, string> = {
  'design-system/button': 'Button',
  'design-system/button/primary': 'Primary',
  'design-system/button/secondary': 'Secondary',
  'design-system/button/ghost': 'Ghost',
  'design-system/button/fab': 'FAB',
  'design-system/button/brands': 'Brands',
  'design-system/button/special': 'Special',
}

/** Components that used to live as sections on the Controls page. */
export const EXTRACTED_COMPONENT_PAGES = [
  { label: 'Action grid', route: 'design-system/action-grid' },
  { label: 'Activity', route: 'design-system/activity' },
  { label: 'Alert', route: 'design-system/alert' },
  { label: 'Avatar', route: 'design-system/avatar' },
  { label: 'Checkbox', route: 'design-system/checkbox' },
  { label: 'Context menu', route: 'design-system/context-menu' },
  { label: 'Conversation', route: 'design-system/conversation' },
  { label: 'Conversation screen', route: 'design-system/conversation-screen' },
  { label: 'Count down', route: 'design-system/count-down' },
  { label: 'Drag handle', route: 'design-system/drag-handle' },
  { label: 'Empty state', route: 'design-system/empty-state' },
  { label: 'Empty screen', route: 'design-system/empty-screen' },
  { label: 'Coachmark', route: 'design-system/coachmark' },
  { label: 'Hint', route: 'design-system/hint' },
  { label: 'List item', route: 'design-system/list-item' },
  { label: 'Loader', route: 'design-system/loader' },
  { label: 'Message', route: 'design-system/message' },
  { label: 'Progress bar', route: 'design-system/progress-bar' },
  { label: 'Prompt input', route: 'design-system/prompt-input' },
  { label: 'Promo card', route: 'design-system/promo-card' },
  { label: 'Reasoning', route: 'design-system/reasoning' },
  { label: 'Response', route: 'design-system/response' },
  { label: 'Result', route: 'design-system/result' },
  { label: 'Separator', route: 'design-system/separator' },
  { label: 'Settings row', route: 'design-system/settings-row' },
  { label: 'Setup checklist', route: 'design-system/setup-checklist' },
  { label: 'Sheet', route: 'design-system/sheet' },
  { label: 'Sheet screen', route: 'design-system/sheet-screen' },
  { label: 'Skeleton', route: 'design-system/skeleton' },
  { label: 'Slider', route: 'design-system/slider' },
  { label: 'Sources', route: 'design-system/sources' },
  { label: 'Stepper', route: 'design-system/stepper' },
  { label: 'Swiper', route: 'design-system/swiper' },
  { label: 'Tab bar', route: 'design-system/tab-bar' },
  { label: 'Tabs', route: 'design-system/tabs' },
  { label: 'This or that', route: 'design-system/this-or-that' },
  { label: 'Toggle', route: 'design-system/toggle' },
  { label: 'Tool call', route: 'design-system/tool-call' },
  { label: 'Toolbar', route: 'design-system/toolbar' },
  { label: 'Tooltip', route: 'design-system/tooltip' },
  { label: 'Working', route: 'design-system/working' },
] as const

export type ExtractedComponentRoute = (typeof EXTRACTED_COMPONENT_PAGES)[number]['route']

export const EXTRACTED_COMPONENT_ROUTES = [
  'design-system/action-grid',
  'design-system/activity',
  'design-system/alert',
  'design-system/avatar',
  'design-system/checkbox',
  'design-system/context-menu',
  'design-system/conversation',
  'design-system/conversation-screen',
  'design-system/count-down',
  'design-system/drag-handle',
  'design-system/empty-state',
  'design-system/empty-screen',
  'design-system/coachmark',
  'design-system/hint',
  'design-system/list-item',
  'design-system/loader',
  'design-system/message',
  'design-system/progress-bar',
  'design-system/prompt-input',
  'design-system/promo-card',
  'design-system/reasoning',
  'design-system/response',
  'design-system/result',
  'design-system/separator',
  'design-system/settings-row',
  'design-system/setup-checklist',
  'design-system/sheet',
  'design-system/sheet-screen',
  'design-system/skeleton',
  'design-system/slider',
  'design-system/sources',
  'design-system/stepper',
  'design-system/swiper',
  'design-system/tab-bar',
  'design-system/tabs',
  'design-system/this-or-that',
  'design-system/toggle',
  'design-system/tool-call',
  'design-system/toolbar',
  'design-system/tooltip',
  'design-system/working',
] as const satisfies readonly ExtractedComponentRoute[]

export function isExtractedComponentRoute(route: string): route is ExtractedComponentRoute {
  return (EXTRACTED_COMPONENT_ROUTES as readonly string[]).includes(route)
}

/** Component pages in the design-system catalog, in sidebar order. */
export const COMPONENT_PAGES = [
  ...EXTRACTED_COMPONENT_PAGES,
  { label: 'Badge', route: 'design-system/badge' },
  { label: 'Button', route: 'design-system/button' },
  { label: 'Card', route: 'design-system/card' },
  { label: 'Chip', route: 'design-system/chip' },
  { label: 'Controls', route: 'design-system/controls' },
  { label: 'Stack', route: 'design-system/stack' },
  { label: 'Text', route: 'design-system/text' },
  { label: 'Text field', route: 'design-system/text-field' },
  { label: 'Toast', route: 'design-system/toast' },
] as const
