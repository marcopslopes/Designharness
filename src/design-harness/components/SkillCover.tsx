/** The line you paste into Cursor, Claude Code, or Codex. An example is the task that follows. */
export function skillChatPrompt(label: string, path: string, example?: string): string {
  const line = `Use the ${label.toLowerCase()} skill (${path}).`
  return example ? `${line} ${example}` : line
}
