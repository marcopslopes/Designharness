import { resolveDocFile, resolveFormatFile, resolveScreenFile } from './projectsIndex'

/** A screen path may carry string props: `screens/WalletHomePage.tsx?lead=balance`. */
export function isScreenPath(path: string | undefined): path is string {
  return Boolean(path && /\.tsx(\?.*)?$/.test(path))
}

export function splitQuery(path: string): [file: string, query: string] {
  const at = path.indexOf('?')
  return at === -1 ? [path, ''] : [path.slice(0, at), path.slice(at + 1)]
}

export function isFormatPath(path: string | undefined): path is string {
  return Boolean(path && /\.(storyboard|variants|compare|stage|ideas)\.ts$/.test(path))
}

export function isDocPath(path: string | undefined): path is string {
  return Boolean(path && !/^[a-z]+:/i.test(path) && /\.(md|mermaid)$/.test(path))
}

/** In-app `href` for a project screen, format config or doc path, or the path unchanged when it isn't one. */
export function projectHref(path: string | undefined, projectSlug: string | undefined): string | undefined {
  if (isScreenPath(path)) {
    const [file, query] = splitQuery(path)
    const screen = resolveScreenFile(file, projectSlug)
    return screen ? `#/${screen.route}${query ? `?${query}` : ''}` : path
  }
  if (isFormatPath(path)) {
    const format = resolveFormatFile(path, projectSlug)
    return format ? `#/${format.route}` : path
  }
  if (isDocPath(path)) {
    const doc = resolveDocFile(path, projectSlug)
    return doc ? `#/${doc.route}` : path
  }
  return path
}
