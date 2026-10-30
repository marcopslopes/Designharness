export const BASE: string
export const TRAILER: string
export const NEVER: string[]
export class AutopilotError extends Error {}
export function isEnabled(root: string): boolean
export function isNever(file: string): boolean
export function slugify(name: string): string
export function currentBranch(root: string): string
type Switch = { branch: string | null; checkpoint: string | null; message: string | null }
export function start(root: string, slug: string, options?: { scaffold?: boolean; title?: string }): Switch
export function resume(root: string, slug: string): Switch
export function save(
  root: string,
  slug: string,
  summary: string,
  extraPaths?: string[],
): { sha: string | null; message: string | null }
type Undoable = { sha: string; subject: string; action: string; reverts: string }
export function undo(
  root: string,
  options?: { confirm?: boolean },
): { target: Undoable | null; files: string[]; message: string }
export function branchLink(remoteUrl: string, branch: string): string | null
export function share(root: string): { link: string | null; message: string | null }
