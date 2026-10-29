export const tabId = (id: string, value: string) => `${id}-tab-${value.replace(/[^a-zA-Z0-9_-]+/g, '-')}`

/** Spread on the panel a `<Tabs id>` controls. */
export function tabsPanelProps(id: string, value: string) {
  return { role: 'tabpanel', id: `${id}-panel`, 'aria-labelledby': tabId(id, value) } as const
}
