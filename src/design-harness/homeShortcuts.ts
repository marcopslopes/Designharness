import { FrameBook, FrameCursor, FrameWand, FrameWidget } from './harnessIcons'
import type { DesignHarnessRoute } from './routes'
import type { TablerIconComponent } from './ui'

export type HomeShortcut = { label: string; route: DesignHarnessRoute; icon: TablerIconComponent }

export const HOME_SHORTCUTS: HomeShortcut[] = [
  { label: 'Prototypes', route: 'playground', icon: FrameCursor },
  { label: 'Design system', route: 'design-system/systems', icon: FrameWidget },
  { label: 'Skills', route: 'skills', icon: FrameWand },
  { label: 'Documentation', route: 'how-to', icon: FrameBook },
]
