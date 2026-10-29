import { storeBlob } from './persistence'
import { newId } from './store'
import type { BoardNode, EmbedNode, Point } from './types'

const MAX_IMAGE_SIDE = 640
const FILE_CARD = { w: 320, h: 200 }
const PDF_CARD = { w: 420, h: 540 }
const TEXT_PREVIEW_CHARS = 600

const isTextFile = (file: File) =>
  file.type.startsWith('text/') || /\.(md|txt|json|csv|ts|tsx|js|css|html|svg|mermaid|ya?ml)$/i.test(file.name)

export const isPdf = (mime: string, name: string) => mime === 'application/pdf' || /\.pdf$/i.test(name)

function imageSize(url: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => resolve({ w: image.naturalWidth || 400, h: image.naturalHeight || 300 })
    image.onerror = () => resolve({ w: 400, h: 300 })
    image.src = url
  })
}

/** Images become image nodes; everything else a document card. Laid out left to right from `at`. */
export async function nodesFromFiles(files: File[], at: Point): Promise<BoardNode[]> {
  const nodes: BoardNode[] = []
  let x = at.x
  for (const file of files) {
    const blobId = newId()
    const url = await storeBlob(blobId, file)
    if (file.type.startsWith('image/')) {
      const size = await imageSize(url)
      const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(size.w, size.h))
      const w = Math.round(size.w * scale)
      const h = Math.round(size.h * scale)
      nodes.push({ id: newId(), type: 'image', blobId, name: file.name, x, y: at.y, w, h })
      x += w + 24
      continue
    }
    const box = isPdf(file.type, file.name) ? PDF_CARD : FILE_CARD
    const preview = isTextFile(file)
      ? (await file.slice(0, TEXT_PREVIEW_CHARS * 2).text()).slice(0, TEXT_PREVIEW_CHARS)
      : undefined
    nodes.push({
      id: newId(),
      type: 'file',
      blobId,
      name: file.name,
      mime: file.type || 'application/octet-stream',
      size: file.size,
      preview,
      x,
      y: at.y,
      ...box,
    })
    x += box.w + 24
  }
  return nodes
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB']
  let value = bytes / 1024
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit++
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unit]}`
}

export function fileKind(mime: string, name: string): string {
  const ext = name.includes('.') ? name.split('.').pop()!.toUpperCase() : ''
  if (isPdf(mime, name)) return 'PDF'
  return ext || mime.split('/')[1]?.toUpperCase() || 'File'
}

/** Figma and Miro share links open through their official embed URLs; anything else embeds as is. */
export function embedUrl(raw: string): { url: string; label: string } | undefined {
  let parsed: URL
  try {
    parsed = new URL(raw.trim())
  } catch {
    return undefined
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return undefined
  const host = parsed.hostname.replace(/^www\./, '')
  if (host === 'figma.com' || host.endsWith('.figma.com')) {
    if (parsed.pathname.startsWith('/embed')) return { url: parsed.href, label: 'Figma' }
    return {
      url: `https://embed.figma.com${parsed.pathname}${parsed.search ? `${parsed.search}&` : '?'}embed-host=design-harness`,
      label: 'Figma',
    }
  }
  if (host === 'miro.com') {
    const board = parsed.pathname.match(/\/app\/board\/([^/]+)/)?.[1]
    if (board) return { url: `https://miro.com/app/live-embed/${board}/`, label: 'Miro' }
  }
  return { url: parsed.href, label: host }
}

export function embedNode(raw: string, at: Point): EmbedNode | undefined {
  const embed = embedUrl(raw)
  if (!embed) return undefined
  return { id: newId(), type: 'embed', url: embed.url, label: embed.label, x: at.x, y: at.y, w: 800, h: 520 }
}
