import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ICON_STROKE_BY_SIZE,
  Icon,
  SegmentedControl,
  Text,
  TextField,
  type IconSize,
  type TablerIconComponent,
} from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import studio from '../assets/examples/example-studio.jpg'
import hands from '../assets/examples/example-hands.jpg'
import calendar from '../assets/examples/example-calendar.jpg'
import tools from '../assets/examples/example-tools.jpg'

type IconEntry = {
  name: string
  icon: TablerIconComponent
  filled: boolean
}

type IconStyle = 'outline' | 'filled'

type IconInk = (typeof ICON_INKS)[number]['id']

const ICON_INKS = [
  { id: 'default', label: 'Default', value: 'var(--color-text-default)' },
  { id: 'muted', label: 'Muted', value: 'var(--color-text-muted)' },
  { id: 'secondary', label: 'Secondary', value: 'var(--color-text-secondary)' },
  { id: 'brand', label: 'Brand', value: 'var(--color-text-link-default)' },
  { id: 'dark', label: 'Dark', value: 'var(--color-bg-brand-dark)' },
  { id: 'info', label: 'Info', value: 'var(--kit-brand-60)' },
  { id: 'success', label: 'Success', value: 'var(--color-text-success)' },
  { id: 'warning', label: 'Warning', value: 'var(--kit-amber)' },
  { id: 'error', label: 'Error', value: 'var(--color-text-error)' },
  { id: 'disabled', label: 'Disabled', value: 'var(--kit-ink-30)' },
  { id: 'inverse', label: 'Inverse', value: 'var(--color-text-inverse)' },
] as const

const SIZES: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

const STROKES = SIZES.map((size) => String(ICON_STROKE_BY_SIZE[size]))

/** One entry per icon in the installed Tabler set. Aliases collapse to the current name. */
function isIconComponent(value: unknown): value is TablerIconComponent {
  if (typeof value === 'function') return true
  return typeof value === 'object' && value !== null && 'render' in value
}

const catalogPromise: Promise<IconEntry[]> = import('@tabler/icons-react').then((mod) => {
  const byIcon = new Map<TablerIconComponent, string>()
  for (const [name, value] of Object.entries(mod)) {
    if (!name.startsWith('Icon') || !isIconComponent(value)) continue
    byIcon.set(value, name)
  }
  return [...byIcon.entries()]
    .map(([icon, name]) => ({ name, icon, filled: name.endsWith('Filled') }))
    .sort((a, b) => a.name.localeCompare(b.name))
})

const EXAMPLES = [
  {
    src: studio,
    alt: 'An empty styling chair in a bright store, a teal towel over the back.',
    caption: 'The room',
  },
  {
    src: hands,
    alt: 'Hands cutting a section of dark paint with scissors.',
    caption: 'At the chair',
  },
  {
    src: calendar,
    alt: 'A phone on a wooden counter showing a simple day calendar, next to a cup.',
    caption: 'The day',
  },
  {
    src: tools,
    alt: 'Scissors, a round brush, and a comb on linen.',
    caption: 'Tools',
  },
]

export function IconsPage() {
  const [catalog, setCatalog] = useState<IconEntry[] | null>(null)
  const [query, setQuery] = useState('')
  const [style, setStyle] = useState<IconStyle>('outline')
  const [size, setSize] = useState<IconSize>('lg')
  const [stroke, setStroke] = useState(String(ICON_STROKE_BY_SIZE.lg))
  const [ink, setInk] = useState<IconInk>('default')

  useEffect(() => {
    let cancelled = false
    catalogPromise.then((entries) => {
      if (!cancelled) setCatalog(entries)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const filled = style === 'filled'
  const shown = useMemo(() => {
    if (!catalog) return []
    const words = query.trim().toLowerCase()
    return catalog.filter((item) => {
      if (item.filled !== filled) return false
      if (!words) return true
      return item.name.toLowerCase().includes(words)
    })
  }, [catalog, filled, query])

  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <DesignHarnessDocPage
        title="Icons"
        lead={
          <>
            These icons are{' '}
            <a href="https://tabler.io/icons" target="_blank" rel="noreferrer">
              Tabler
            </a>
            {
              ', by Paweł Kuna. This pack is not ours. Every outline and filled icon in that set is here. Style, size, stroke, and colour are the same options a screen uses through the Icon primitive.'
            }
          </>
        }
        toc={false}
      >
        <TextField
          label="Find an icon"
          placeholder="Calendar, scissors, wallet"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="design-harness-icon-controls">
          <div className="design-harness-icon-control">
            <Text variant="label" as="span">
              Style
            </Text>
            <SegmentedControl
              aria-label="Style"
              fullWidth={false}
              value={style}
              onChange={(value) => setStyle(value as IconStyle)}
              options={[
                { value: 'outline', label: 'Outline' },
                { value: 'filled', label: 'Filled' },
              ]}
            />
          </div>
          <div className="design-harness-icon-control">
            <Text variant="label" as="span">
              Size
            </Text>
            <SegmentedControl
              aria-label="Size"
              fullWidth={false}
              value={size}
              onChange={(value) => {
                const next = value as IconSize
                setSize(next)
                setStroke(String(ICON_STROKE_BY_SIZE[next]))
              }}
              options={SIZES.map((option) => ({ value: option, label: option }))}
            />
          </div>
          <div className="design-harness-icon-control">
            <Text variant="label" as="span">
              Stroke
            </Text>
            <SegmentedControl
              aria-label="Stroke"
              fullWidth={false}
              value={stroke}
              onChange={setStroke}
              options={STROKES.map((option) => ({ value: option, label: option }))}
            />
          </div>
          <div className="design-harness-icon-control design-harness-icon-control--swatches">
            <Text variant="label" as="span">
              Colour
            </Text>
            <div className="design-harness-icon-swatches" role="radiogroup" aria-label="Colour">
              {ICON_INKS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={ink === option.id}
                  aria-label={option.label}
                  title={option.label}
                  className="design-harness-icon-swatch"
                  data-ink={option.id}
                  onClick={() => setInk(option.id)}
                />
              ))}
            </div>
          </div>
        </div>
        {catalog === null ? (
          <Text variant="muted" as="p">
            Loading the icon set…
          </Text>
        ) : shown.length ? (
          <>
            <Text variant="muted" as="p">
              {shown.length.toLocaleString()} icons
            </Text>
            <IconCatalogGrid items={shown} size={size} stroke={Number(stroke)} ink={ink} />
          </>
        ) : (
          <Text variant="muted" as="p">
            Nothing matches that name.
          </Text>
        )}
      </DesignHarnessDocPage>
    </div>
  )
}

const ICON_PX: Record<IconSize, number> = { xs: 16, sm: 18, md: 20, lg: 24, xl: 28 }
const TILE_MIN_REM = 6.75
const GRID_GAP = 8

function rowStride(size: IconSize) {
  // padding, label line, icon, slack, border, then the grid gap
  return 12 + 12 + 4 + 16 + ICON_PX[size] + 10 + GRID_GAP
}

function IconCatalogGrid({
  items,
  size,
  stroke,
  ink,
}: {
  items: IconEntry[]
  size: IconSize
  stroke: number
  ink: IconInk
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(520)
  const [shown, setShown] = useState({ items, size })
  if (shown.items !== items || shown.size !== size) {
    setShown({ items, size })
    setScrollTop(0)
  }

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const measure = () => {
      setWidth(el.clientWidth)
      setHeight(el.clientHeight)
    }
    measure()
    const onScroll = () => setScrollTop(el.scrollTop)
    el.addEventListener('scroll', onScroll, { passive: true })
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0 })
  }, [items, size])

  const rootPx =
    typeof document === 'undefined' ? 16 : parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  const min = TILE_MIN_REM * rootPx
  const cols = Math.max(1, Math.floor((Math.max(width, min) + GRID_GAP) / (min + GRID_GAP)))
  const stride = rowStride(size)
  const rows = Math.ceil(items.length / cols)
  const start = Math.max(0, Math.floor(scrollTop / stride) - 2)
  const end = Math.min(rows, Math.ceil((scrollTop + height) / stride) + 3)
  const slice = items.slice(start * cols, end * cols)

  return (
    <div className="design-harness-icon-scroller" ref={scrollerRef}>
      <div className="design-harness-icon-spacer" style={{ height: rows * stride }}>
        <ul
          className="design-harness-asset-grid"
          data-ink={ink}
          style={{
            transform: `translateY(${start * stride}px)`,
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {slice.map((item) => (
            <li key={item.name} className="design-harness-asset-tile" title={item.name}>
              <Icon icon={item.icon} size={size} stroke={stroke} />
              <span>{item.name.replace(/^Icon/, '')}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ImagesPage() {
  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <DesignHarnessDocPage
        title="Images"
        lead="Example photographs for a hands-on studio. These were generated so a prototype has something to show. Replace them with your own."
        toc={false}
      >
        <ul className="design-harness-image-grid">
          {EXAMPLES.map((image) => (
            <li key={image.caption}>
              <figure className="design-harness-image-card">
                <img src={image.src} alt={image.alt} />
                <figcaption>{image.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </DesignHarnessDocPage>
    </div>
  )
}
