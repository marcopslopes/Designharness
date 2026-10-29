import { createElement, type ComponentType, type SVGProps } from 'react'
import {
  AccessibilityIcon,
  AddIcon,
  AlignHorizontalSpacingIcon,
  AltArrowDownIcon,
  AltArrowLeftIcon,
  AltArrowRightIcon,
  AltArrowUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowRightUpIcon,
  BoltIcon,
  BookIcon,
  BracketsIcon,
  BuildingsIcon,
  CalendarIcon,
  CalendarMarkIcon,
  ChartIcon,
  ChatRoundIcon,
  CheckIcon,
  CloseIcon,
  CloudIcon,
  Code2Icon,
  CodeFileIcon,
  CodeIcon,
  Columns2Icon,
  CopyIcon,
  CursorIcon,
  CursorSquareIcon,
  DangerCircleIcon,
  DangerTriangleIcon,
  DislikeIcon,
  DocumentTextIcon,
  DollarIcon,
  DownloadIcon,
  EyeIcon,
  FileAddIcon,
  FileTextIcon,
  FolderIcon,
  GalleryIcon,
  Grid3x3Icon,
  HamburgerMenuIcon,
  InfoCircleIcon,
  KeyboardIcon,
  KeyIcon,
  LightbulbIcon,
  LikeIcon,
  LinkIcon,
  ListIcon,
  LockIcon,
  MagicWand3Icon,
  MagnifierIcon,
  MaximizeIcon,
  MonitorIcon,
  MoonIcon,
  NotesIcon,
  PaletteIcon,
  PlayIcon,
  PlugCircleIcon,
  PresentationGraphIcon,
  RefreshIcon,
  RepeatIcon,
  RulerIcon,
  RoutingIcon,
  SettingsIcon,
  ShareIcon,
  SidebarCloseIcon,
  SidebarOpenIcon,
  SmartphoneIcon,
  SquareDashedIcon,
  StarsIcon,
  StructureIcon,
  SunIcon,
  TabletIcon,
  TestTubeIcon,
  TextBoldIcon,
  TextSquareIcon,
  Tuning2Icon,
  UploadIcon,
  UserCircleIcon,
  UserIcon,
  UserIdIcon,
  UserRoundedIcon,
  Widget2Icon,
  Widget3Icon,
  Widget4Icon,
  Widget5Icon,
  WindowFrameIcon,
  AddCircleIcon,
  BellIcon,
  BoneIcon,
  BoxMinimalisticIcon,
  ChartSquareIcon,
  CheckCircleIcon,
  CheckSquareIcon,
  CircleDotIcon,
  Columns3Icon,
  FilterIcon,
  GripVerticalIcon,
  LayersIcon,
  ListDownIcon,
  MedalStarIcon,
  MenuDotsIcon,
  PanelBottomIcon,
  PanelRightIcon,
  PanelTopIcon,
  PlusMinusIcon,
  PostsCarouselHorizontalIcon,
  QuestionCircleIcon,
  RefreshCircleIcon,
  RoundTransferHorizontalIcon,
  SeparatorHorizontalIcon,
  SliderHorizontalIcon,
  SliderMinimalisticHorizontalIcon,
  StopwatchIcon,
  TableIcon,
  TagIcon,
  TargetIcon,
  TextFieldIcon,
  ToolboxIcon,
  ChecklistIcon,
  ClipboardListIcon,
  GalleryWideIcon,
  GiftIcon,
  PanelLeftIcon,
  RoundArrowRightIcon,
  SidebarIcon,
  SkipNextIcon,
  SliderVerticalIcon,
  SubtitlesIcon,
  TextCircleIcon,
  TextSquare2Icon,
  TextUnderlineIcon,
  GalleryAddIcon,
  HashtagIcon,
  LinkRoundIcon,
  MagnifierZoomInIcon,
  MagnifierZoomOutIcon,
  MaximizeSquareIcon,
  MinusIcon,
  PenIcon,
  RecordIcon,
  SquareBottomDownIcon,
  SquareTopUpIcon,
  StickerSquareIcon,
  StopIcon,
  TrashBinMinimalisticIcon,
  UndoLeftIcon,
  UndoRightIcon,
} from '@solar-icons/react/line-duotone'
import type { IconProps as SolarIconProps } from '@solar-icons/react/lib/types'
import type { TablerIconComponent } from '../../context/design-system/ds'

/**
 * The harness frame tries Solar line-duotone icons. Prototypes stay on Tabler
 * through the product `Icon` primitive. Solar's own size comes from `--solar-size`
 * on the button or link, so the soft second stroke follows the row colour.
 */
function frameIcon(Solar: ComponentType<SolarIconProps>): TablerIconComponent {
  function FrameIcon({
    stroke: _stroke,
    ...props
  }: SVGProps<SVGSVGElement> & { stroke?: string | number; title?: string }) {
    return createElement(Solar, props)
  }
  return FrameIcon as TablerIconComponent
}

export const FrameCursor = frameIcon(CursorSquareIcon)
export const FrameWidget = frameIcon(Widget2Icon)
export const FrameBook = frameIcon(BookIcon)
export const FrameSettings = frameIcon(SettingsIcon)
export const FrameSun = frameIcon(SunIcon)
export const FrameMoon = frameIcon(MoonIcon)
export const FrameSidebarOpen = frameIcon(SidebarOpenIcon)
export const FrameSidebarClose = frameIcon(SidebarCloseIcon)
export const FrameClose = frameIcon(CloseIcon)
export const FrameMenu = frameIcon(HamburgerMenuIcon)
export const FrameSearch = frameIcon(MagnifierIcon)
export const FrameChevronRight = frameIcon(AltArrowRightIcon)
export const FrameChevronDown = frameIcon(AltArrowDownIcon)
export const FrameArrowUpRight = frameIcon(ArrowRightUpIcon)
export const FrameArrowRight = frameIcon(ArrowRightIcon)

export const FrameCode = frameIcon(CodeIcon)
export const FrameCode2 = frameIcon(Code2Icon)
export const FrameFile = frameIcon(FileTextIcon)
export const FrameDocument = frameIcon(DocumentTextIcon)
export const FrameStructure = frameIcon(StructureIcon)
export const FramePresentation = frameIcon(PresentationGraphIcon)
export const FrameTuning = frameIcon(Tuning2Icon)
export const FrameColumns = frameIcon(Columns2Icon)
export const FrameUser = frameIcon(UserIdIcon)
export const FrameBulb = frameIcon(LightbulbIcon)
export const FramePhone = frameIcon(SmartphoneIcon)
export const FrameMonitor = frameIcon(MonitorIcon)
export const FrameTablet = frameIcon(TabletIcon)
export const FramePalette = frameIcon(PaletteIcon)
export const FrameSpacing = frameIcon(AlignHorizontalSpacingIcon)
export const FrameRuler = frameIcon(RulerIcon)
export const FrameRadius = frameIcon(SquareDashedIcon)
export const FrameGrid = frameIcon(Grid3x3Icon)
export const FrameText = frameIcon(TextSquareIcon)
export const FrameType = frameIcon(TextBoldIcon)
export const FrameMaximize = frameIcon(MaximizeIcon)
export const FrameWidgets = frameIcon(Widget5Icon)
export const FrameInfo = frameIcon(InfoCircleIcon)
export const FrameWand = frameIcon(MagicWand3Icon)
export const FrameGallery = frameIcon(GalleryIcon)
export const FrameList = frameIcon(ListIcon)

export const FrameArrowLeft = frameIcon(ArrowLeftIcon)
export const FrameChevronLeft = frameIcon(AltArrowLeftIcon)
export const FrameChevronUp = frameIcon(AltArrowUpIcon)
export const FrameCheck = frameIcon(CheckIcon)
export const FrameCopy = frameIcon(CopyIcon)
export const FrameUpload = frameIcon(UploadIcon)
export const FrameDownload = frameIcon(DownloadIcon)
export const FrameAdd = frameIcon(AddIcon)
export const FrameDanger = frameIcon(DangerTriangleIcon)
export const FrameDangerCircle = frameIcon(DangerCircleIcon)
export const FrameLike = frameIcon(LikeIcon)
export const FrameDislike = frameIcon(DislikeIcon)
export const FramePlay = frameIcon(PlayIcon)
export const FrameRefresh = frameIcon(RefreshIcon)
export const FrameBrackets = frameIcon(BracketsIcon)
export const FrameWindow = frameIcon(WindowFrameIcon)
export const FrameFileAdd = frameIcon(FileAddIcon)
export const FrameFolder = frameIcon(FolderIcon)
export const FrameChat = frameIcon(ChatRoundIcon)
export const FramePerson = frameIcon(UserIcon)
export const FramePersonCircle = frameIcon(UserCircleIcon)
export const FrameCursorPointer = frameIcon(CursorIcon)
export const FrameKeyboard = frameIcon(KeyboardIcon)
export const FrameNotes = frameIcon(NotesIcon)
export const FrameEye = frameIcon(EyeIcon)
export const FrameRoute = frameIcon(RoutingIcon)
export const FrameBolt = frameIcon(BoltIcon)
export const FrameKey = frameIcon(KeyIcon)
export const FrameChart = frameIcon(ChartIcon)
export const FrameAccess = frameIcon(AccessibilityIcon)
export const FrameBuildings = frameIcon(BuildingsIcon)
export const FrameCalendar = frameIcon(CalendarIcon)
export const FrameCalendarMark = frameIcon(CalendarMarkIcon)
export const FrameTest = frameIcon(TestTubeIcon)
export const FrameStars = frameIcon(StarsIcon)
export const FramePlug = frameIcon(PlugCircleIcon)
export const FrameShare = frameIcon(ShareIcon)
export const FrameWidget4 = frameIcon(Widget4Icon)
export const FrameCloud = frameIcon(CloudIcon)
export const FrameCodeFile = frameIcon(CodeFileIcon)
export const FrameLock = frameIcon(LockIcon)
export const FrameDollar = frameIcon(DollarIcon)
export const FrameLink = frameIcon(LinkIcon)
export const FrameRepeat = frameIcon(RepeatIcon)

/** One Solar glyph per design-system component name in the sidebar. */
export const FrameUserRounded = frameIcon(UserRoundedIcon)
export const FrameMedal = frameIcon(MedalStarIcon)
export const FrameCheckSquare = frameIcon(CheckSquareIcon)
export const FrameTag = frameIcon(TagIcon)
export const FrameStopwatch = frameIcon(StopwatchIcon)
export const FrameTable = frameIcon(TableIcon)
export const FrameGrip = frameIcon(GripVerticalIcon)
export const FrameBox = frameIcon(BoxMinimalisticIcon)
export const FrameAddCircle = frameIcon(AddCircleIcon)
export const FrameFilter = frameIcon(FilterIcon)
export const FramePanelTop = frameIcon(PanelTopIcon)
export const FrameRefreshCircle = frameIcon(RefreshCircleIcon)
export const FrameTransfer = frameIcon(RoundTransferHorizontalIcon)
export const FrameProgress = frameIcon(SliderMinimalisticHorizontalIcon)
export const FrameCircleDot = frameIcon(CircleDotIcon)
export const FrameColumns3 = frameIcon(Columns3Icon)
export const FrameListDown = frameIcon(ListDownIcon)
export const FrameSeparator = frameIcon(SeparatorHorizontalIcon)
export const FramePanelBottom = frameIcon(PanelBottomIcon)
export const FramePanelRight = frameIcon(PanelRightIcon)
export const FrameBone = frameIcon(BoneIcon)
export const FrameLayers = frameIcon(LayersIcon)
export const FrameChartSquare = frameIcon(ChartSquareIcon)
export const FrameCheckCircle = frameIcon(CheckCircleIcon)
export const FrameCarousel = frameIcon(PostsCarouselHorizontalIcon)
export const FrameTextField = frameIcon(TextFieldIcon)
export const FrameBell = frameIcon(BellIcon)
export const FrameToggle = frameIcon(SliderHorizontalIcon)
export const FrameToolbar = frameIcon(ToolboxIcon)
export const FrameWidget3 = frameIcon(Widget3Icon)
export const FrameMenuDots = frameIcon(MenuDotsIcon)
export const FrameQuestion = frameIcon(QuestionCircleIcon)
export const FrameTarget = frameIcon(TargetIcon)
export const FrameChecklist = frameIcon(ChecklistIcon)
export const FrameGift = frameIcon(GiftIcon)
export const FrameStepper = frameIcon(PlusMinusIcon)
export const FrameSlider = frameIcon(SliderVerticalIcon)
export const FrameRoundArrow = frameIcon(RoundArrowRightIcon)
export const FrameTextArea = frameIcon(TextSquare2Icon)
export const FrameTextLink = frameIcon(TextUnderlineIcon)
export const FrameFineText = frameIcon(TextCircleIcon)
export const FrameSubtitles = frameIcon(SubtitlesIcon)
export const FrameSkip = frameIcon(SkipNextIcon)
export const FramePanelLeft = frameIcon(PanelLeftIcon)
export const FrameSidebar = frameIcon(SidebarIcon)
export const FrameClipboard = frameIcon(ClipboardListIcon)
export const FrameWide = frameIcon(GalleryWideIcon)

/** Design board tools and actions. */
export const FrameHashtag = frameIcon(HashtagIcon)
export const FrameSticker = frameIcon(StickerSquareIcon)
export const FramePen = frameIcon(PenIcon)
export const FrameSquare = frameIcon(StopIcon)
export const FrameEllipse = frameIcon(RecordIcon)
export const FrameLine = frameIcon(MinusIcon)
export const FrameUndo = frameIcon(UndoLeftIcon)
export const FrameRedo = frameIcon(UndoRightIcon)
export const FrameZoomIn = frameIcon(MagnifierZoomInIcon)
export const FrameZoomOut = frameIcon(MagnifierZoomOutIcon)
export const FrameFit = frameIcon(MaximizeSquareIcon)
export const FrameTrash = frameIcon(TrashBinMinimalisticIcon)
export const FrameImageAdd = frameIcon(GalleryAddIcon)
export const FrameBringForward = frameIcon(SquareTopUpIcon)
export const FrameSendBackward = frameIcon(SquareBottomDownIcon)
export const FrameLinkRound = frameIcon(LinkRoundIcon)
