import { setDesignHarnessHash } from '../routes'

export type WorkView = 'by-designer' | 'by-category'

export type WorkViewToggleProps = {
  active: WorkView
}

/**
 * Shared toggle between the Prototypes list ("All prototypes") and Team Gallery
 * ("By designer") — the same set of prototypes, two lenses on it. Rendered at
 * the top of `PlaygroundPage`, `TeamGalleryPage` and `GalleryDesignerPage`.
 */
export function WorkViewToggle({ active }: WorkViewToggleProps) {
  return (
    <nav className="design-harness-work-toggle" aria-label="Work view">
      <a
        href="#/playground"
        className="design-harness-work-toggle__link"
        aria-current={active === 'by-category' ? 'page' : undefined}
        data-active={active === 'by-category' ? 'true' : 'false'}
        onClick={(event) => {
          event.preventDefault()
          setDesignHarnessHash('playground')
        }}
      >
        All prototypes
      </a>
      <a
        href="#/gallery"
        className="design-harness-work-toggle__link"
        aria-current={active === 'by-designer' ? 'page' : undefined}
        data-active={active === 'by-designer' ? 'true' : 'false'}
        onClick={(event) => {
          event.preventDefault()
          setDesignHarnessHash('gallery')
        }}
      >
        By designer
      </a>
    </nav>
  )
}
