const ENDPOINT = '/__harness/settings'

export function downloadText(filename: string, text: string, type = 'text/markdown') {
  const url = URL.createObjectURL(new Blob([text], { type }))
  Object.assign(document.createElement('a'), { href: url, download: filename }).click()
  URL.revokeObjectURL(url)
}

/** Reads a local pack file through the dev server, so its content never ends up in a build. */
export async function readLocalPackFile(name: string): Promise<string | null> {
  if (!import.meta.env.DEV) return null
  const response = await fetch(`${ENDPOINT}?file=${encodeURIComponent(name)}`, { cache: 'no-store' })
  if (!response.ok) return null
  const body = (await response.json()) as { content: string | null }
  return body.content
}
