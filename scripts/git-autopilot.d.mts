export const BASE: string
export const TRAILER: string
export const UPSTREAM_URL: string
export const NEVER: string[]
export const LOCAL_NOTICE: string
export class AutopilotError extends Error {}
export function isPublicRepo(root: string): boolean
export function isEnabled(root: string): boolean
export function isNever(file: string): boolean
export function slugify(name: string): string
export function designerName(root: string): string
export function designerFirstName(root: string): string
export function branchFor(root: string, slug: string): string
export function currentBranch(root: string): string
type Switch = { branch: string | null; checkpoint: string | null; message: string | null }
export function start(
  root: string,
  slug: string,
  options?: { scaffold?: boolean; title?: string; local?: boolean },
): Switch
export function resume(root: string, slug: string): Switch
type OpenPr = (root: string, pr: { repo: string; head: string; title: string; body: string }) => string | null
export function save(
  root: string,
  slug: string,
  summary: string,
  options?: { harness?: 'keep' | 'suggest'; openPr?: OpenPr },
): { sha: string | null; message: string | null }
type Undoable = { sha: string; subject: string; action: string; reverts: string }
export function undo(
  root: string,
  options?: { confirm?: boolean },
): { target: Undoable | null; files: string[]; message: string }
export function webUrl(remoteUrl: string): string | null
export function branchLink(remoteUrl: string, branch: string, options?: { base?: string; into?: string }): string | null
export function share(root: string): { link: string | null; message: string }
type Fetched = { ok: boolean; detail: string }
type Fetch = (root: string, remote: string, branch?: string) => Fetched
export function fetchBranch(root: string, remote: string, branch?: string, timeout?: number): Fetched
type Merge = { merged: boolean; conflicts: string[]; message: string | null }
export function catchUp(root: string): Merge
export function sessionLine(root: string, options?: { fetchMain?: () => Fetched }): string
export function updateHarness(
  root: string,
  options?: { fetch?: Fetch; install?: (root: string, before: string) => string },
): Merge
export function addWorktree(
  root: string,
  slug: string,
): { dest: string; branch: string; linked: string[]; message: string }
export function doctor(root: string, options?: { fetch?: Fetch }): string
