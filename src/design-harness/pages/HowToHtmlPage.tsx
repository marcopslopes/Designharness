import { HOWTO_HTML, type HowtoHtmlRoute } from '../howtoDocs'
import '../styles/howto-html.css'

export type HowToHtmlPageProps = {
  route: HowtoHtmlRoute
}

/** Full-bleed embed for interactive harness HTML (briefing deck, system map). */
export function HowToHtmlPage({ route }: HowToHtmlPageProps) {
  const page = HOWTO_HTML[route]
  return (
    <div className="design-harness-howto-html">
      <iframe className="design-harness-howto-html__frame" title={page.label} src={page.href} loading="eager" />
    </div>
  )
}
