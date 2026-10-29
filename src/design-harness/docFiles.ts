import { readLocalPackFile } from './localFiles'

/**
 * Loads the file behind a system's Context or Skills line. Public files are
 * bundled lazily; `context/org-pack.local/` is read from the dev server only,
 * so real company content never ships in a build. Logs stay out — they're private.
 */
const RAW = import.meta.glob<string>(
  ['../../context/org-pack/*.md', '../../harness/**/*.md', '!../../harness/logs/**'],
  { query: '?raw', import: 'default' },
)

const SYSTEMS = import.meta.glob<string>('../../context/design-system/systems/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const LOCAL_PACK = 'context/org-pack.local/'
const PACKS = ['context/org-pack/', LOCAL_PACK]
const PACK_FILE = /^COMPANY-[A-Z0-9]+(-[A-Z0-9]+)*\.md$/

export const fileName = (path: string) => path.slice(path.lastIndexOf('/') + 1)

/** The content skill's example files, and the pack file it reads instead when you have one. */
const CONTENT_FALLBACKS: Record<string, string> = {
  'harness/skills/content/references/style-guide.md': 'COMPANY-STYLE-GUIDE.md',
  'harness/skills/content/references/vocabulary.md': 'COMPANY-VOCABULARY.md',
  'harness/skills/content/references/localization.md': 'COMPANY-LOCALIZATION.md',
}

/** The pack file name `path` stands for — those can be replaced with yours. */
export function packFileName(path: string): string | undefined {
  if (CONTENT_FALLBACKS[path]) return CONTENT_FALLBACKS[path]
  const name = fileName(path)
  return PACKS.some((dir) => path === dir + name) && PACK_FILE.test(name) ? name : undefined
}

export async function loadDocFile(path: string): Promise<string | null> {
  if (path.startsWith(LOCAL_PACK)) return readLocalPackFile(path.slice(LOCAL_PACK.length))
  const key = `../../${path}`
  if (SYSTEMS[key] !== undefined) return SYSTEMS[key]
  const load = RAW[key]
  return load ? load() : null
}
