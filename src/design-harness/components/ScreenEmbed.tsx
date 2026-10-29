import type { ProjectScreen } from '../projectsIndex'

/**
 * A live project screen inside a doc: the chromeless `?embed=1` route in an
 * iframe, so the screen keeps its own CSS and light theme. Embed mode is
 * transparent, so the iframe's own light `--kit-bg` is what shows behind it.
 * Written in markdown as `![Label](screens/<Name>Page.tsx)` on its own line;
 * `?status=paused` after the path passes string props to the screen.
 */
export function ScreenEmbed({ screen, label, query = '' }: { screen: ProjectScreen; label?: string; query?: string }) {
  const title = label || screen.label
  const props = query ? `&${query}` : ''
  return (
    <figure className="design-harness-screen-embed">
      <figcaption className="design-harness-screen-embed__bar">
        <span className="design-harness-screen-embed__title">{title}</span>
        <a className="design-harness-screen-embed__open" href={`#/${screen.route}${query ? `?${query}` : ''}`}>
          Open
        </a>
      </figcaption>
      <iframe
        className="design-harness-screen-embed__frame"
        data-theme="light"
        src={`${window.location.pathname}#/${screen.route}?embed=1${props}`}
        title={`${title} — live screen`}
        loading="lazy"
      />
    </figure>
  )
}

/** Shown in place of an embed whose path matches no screen file. */
export function ScreenEmbedMissing({ path }: { path: string }) {
  return (
    <p className="design-harness-screen-embed design-harness-screen-embed--missing">
      Screen not found: <code>{path}</code>
    </p>
  )
}
