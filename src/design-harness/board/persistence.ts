import type { BoardDoc, BoardNode } from './types'

/**
 * The board saves to IndexedDB in this browser: one document plus the files
 * dropped on it, stored as blobs so large images and PDFs don't hit the
 * localStorage quota. Export bundles both into one JSON file.
 */
const DB_NAME = 'design-harness-board'
const DB_VERSION = 1
const DOCS = 'docs'
const BLOBS = 'blobs'
/** The free board at `#/board`; project boards use `project:<slug>`. */
export const MAIN_BOARD = 'main'

let dbPromise: Promise<IDBDatabase> | undefined

function openDb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)
      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains(DOCS)) db.createObjectStore(DOCS)
        if (!db.objectStoreNames.contains(BLOBS)) db.createObjectStore(BLOBS)
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
  return dbPromise
}

function run<T>(store: string, mode: IDBTransactionMode, work: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(store, mode)
        const request = work(tx.objectStore(store))
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      }),
  )
}

export const loadDoc = (key: string) => run<BoardDoc | undefined>(DOCS, 'readonly', (s) => s.get(key))
export const saveDoc = (key: string, doc: BoardDoc) => run(DOCS, 'readwrite', (s) => s.put(doc, key))
export const putBlob = (id: string, blob: Blob) => run(BLOBS, 'readwrite', (s) => s.put(blob, id))
export const getBlob = (id: string) => run<Blob | undefined>(BLOBS, 'readonly', (s) => s.get(id))

const urlCache = new Map<string, Promise<string | undefined>>()

/** One object URL per stored blob for the life of the page. */
export function blobUrl(id: string): Promise<string | undefined> {
  let url = urlCache.get(id)
  if (!url) {
    url = getBlob(id).then((blob) => (blob ? URL.createObjectURL(blob) : undefined))
    urlCache.set(id, url)
  }
  return url
}

/** Store a blob and warm the URL cache with an object URL we already have. */
export async function storeBlob(id: string, blob: Blob): Promise<string> {
  await putBlob(id, blob)
  const url = URL.createObjectURL(blob)
  urlCache.set(id, Promise.resolve(url))
  return url
}

type ExportFile = { kind: 'design-harness-board'; doc: BoardDoc; blobs: Record<string, string> }

const blobIdsOf = (doc: BoardDoc) =>
  new Set(
    doc.pages.flatMap((page) =>
      page.nodes.flatMap((node: BoardNode) => (node.type === 'image' || node.type === 'file' ? [node.blobId] : [])),
    ),
  )

const toDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })

export async function exportBoard(doc: BoardDoc): Promise<Blob> {
  const blobs: Record<string, string> = {}
  for (const id of blobIdsOf(doc)) {
    const blob = await getBlob(id)
    if (blob) blobs[id] = await toDataUrl(blob)
  }
  const file: ExportFile = { kind: 'design-harness-board', doc, blobs }
  return new Blob([JSON.stringify(file)], { type: 'application/json' })
}

export async function importBoard(file: File): Promise<BoardDoc> {
  const parsed = JSON.parse(await file.text()) as Partial<ExportFile>
  if (parsed.kind !== 'design-harness-board' || !parsed.doc?.pages?.length) {
    throw new Error('This file is not a Design Harness board export.')
  }
  for (const [id, dataUrl] of Object.entries(parsed.blobs ?? {})) {
    const blob = await (await fetch(dataUrl)).blob()
    await storeBlob(id, blob)
  }
  return parsed.doc
}

export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
