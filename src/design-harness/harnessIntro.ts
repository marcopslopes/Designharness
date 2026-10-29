/** First-run tour state: a per-browser "seen" flag, and an event that opens the tour again. */
const SEEN_KEY = 'design-harness-intro-seen'
export const SHOW_HARNESS_INTRO_EVENT = 'design-harness:show-intro'

export function hasSeenHarnessIntro(): boolean {
  try {
    return window.localStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return true
  }
}

export function markHarnessIntroSeen() {
  try {
    window.localStorage.setItem(SEEN_KEY, '1')
  } catch {
    /* ignore */
  }
}

export function showHarnessIntro() {
  window.dispatchEvent(new Event(SHOW_HARNESS_INTRO_EVENT))
}
