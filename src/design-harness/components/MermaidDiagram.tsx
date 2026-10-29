import { useEffect, useId, useState } from 'react'

export type MermaidDiagramProps = {
  source: string
  /** Accessible name when the diagram has no `accTitle`. */
  label?: string
}

let mermaidReady: Promise<typeof import('mermaid').default> | undefined

/** Loaded on first use so pages without a diagram never download Mermaid. */
function loadMermaid() {
  mermaidReady ??= import('mermaid').then(({ default: mermaid }) => {
    mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'strict' })
    return mermaid
  })
  return mermaidReady
}

/** A Mermaid diagram (`.mermaid` file or ```mermaid block) rendered to SVG — always on a light surface, like prototypes. */
export function MermaidDiagram({ source, label }: MermaidDiagramProps) {
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const [svg, setSvg] = useState<string>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    let cancelled = false
    loadMermaid()
      .then((mermaid) => mermaid.render(id, source.trim()))
      .then(({ svg: rendered }) => {
        if (!cancelled) {
          setSvg(rendered)
          setError(undefined)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err))
      })
    return () => {
      cancelled = true
    }
  }, [id, source])

  if (error) {
    return (
      <div
        className="design-harness-mermaid design-harness-mermaid--error design-harness-proto-surface"
        data-theme="light"
        role="note"
      >
        <p>This diagram couldn&apos;t be drawn. Ask your agent to fix the Mermaid source.</p>
        <pre>{error}</pre>
      </div>
    )
  }
  return (
    <figure
      className="design-harness-mermaid design-harness-proto-surface"
      data-theme="light"
      aria-label={label}
      aria-busy={svg ? undefined : true}
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  )
}
