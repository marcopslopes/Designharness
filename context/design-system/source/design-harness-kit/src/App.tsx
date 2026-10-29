import React, { useState, Children, Component } from 'react';
import { motion } from 'framer-motion';
import {
  ThemeControls,
  type Theme,
  type Contrast } from
'./components/ThemeControls';
import { SectionMenu } from './components/SectionMenu';
import { SettingsRow } from './components/widgets/SettingsRow';
import { CalendarStrip } from './components/widgets/CalendarStrip';
import { CalendarTopHeader } from './components/widgets/CalendarTopHeader';
import { DateCell } from './components/widgets/DateCell';
import { CalendarPickerMobile } from './components/widgets/CalendarPickerMobile';
import { DayAgendaView } from './components/widgets/DayAgendaView';
import { TooltipShowcase } from './components/widgets/TooltipShowcase';
import { CoachmarkCallout } from './components/widgets/CoachmarkCallout';
import { InlineHint } from './components/widgets/InlineHint';
import { SuccessConfetti } from './components/widgets/SuccessConfetti';
import { CelebrationScreen } from './components/widgets/CelebrationScreen';
import { LoadingSpinner } from './components/widgets/LoadingSpinner';
import { ProgressBarSet } from './components/widgets/ProgressBarSet';
import { CircularProgress } from './components/widgets/CircularProgress';
import { UploadProgress } from './components/widgets/UploadProgress';
import { PullToRefresh } from './components/widgets/PullToRefresh';
import { CheckmarkDraw } from './components/widgets/CheckmarkDraw';
import { StaffersBar } from './components/widgets/StaffersBar';
import { LargeTitleHeader } from './components/widgets/LargeTitleHeader';
import { NavBarHeader } from './components/widgets/NavBarHeader';
import { SearchHeader } from './components/widgets/SearchHeader';
import { SheetHeader } from './components/widgets/SheetHeader';
import { TabbedHeader } from './components/widgets/TabbedHeader';
import { ContextHeader } from './components/widgets/ContextHeader';
import { ServiceListItem } from './components/widgets/ServiceListItem';
import { ClientListItem } from './components/widgets/ClientListItem';
import { MarketplaceListing } from './components/widgets/MarketplaceListing';
import { BookingListItem } from './components/widgets/BookingListItem';
import { ActionSheet } from './components/widgets/ActionSheet';
import { ConfirmationSheet } from './components/widgets/ConfirmationSheet';
import { FormSheet } from './components/widgets/FormSheet';
import { PickerSheet } from './components/widgets/PickerSheet';
import { DetailSheet } from './components/widgets/DetailSheet';
import { StatusSheet } from './components/widgets/StatusSheet';
import { CartSummary } from './components/widgets/CartSummary';
import { PaymentMethodPicker } from './components/widgets/PaymentMethodPicker';
import { PayButton } from './components/widgets/PayButton';
import { DiscountCodeField } from './components/widgets/DiscountCodeField';
import { OrderConfirmation } from './components/widgets/OrderConfirmation';
import { EmptyState } from './components/widgets/EmptyState';
import { NotificationFeed } from './components/widgets/NotificationFeed';
import { NotificationPanelCard } from './components/widgets/NotificationPanelCard';
import { NotificationActionCard } from './components/widgets/NotificationActionCard';
import { POSKeypad } from './components/widgets/POSKeypad';
import { LoyaltyStamp } from './components/widgets/LoyaltyStamp';
import { DateRangePicker } from './components/widgets/DateRangePicker';
import { AppointmentCard } from './components/widgets/AppointmentCard';
import { TipSelector } from './components/widgets/TipSelector';
import { CheckoutLine } from './components/widgets/CheckoutLine';
import { ProfileActions } from './components/widgets/ProfileActions';
import { ProgressCard } from './components/widgets/ProgressCard';
import { AnimatedTabs } from './components/widgets/AnimatedTabs';
import { PeriodFilter } from './components/widgets/PeriodFilter';
import { MetricCard } from './components/widgets/MetricCard';
import { AlertBanner } from './components/widgets/AlertBanner';
import { FabMenu } from './components/widgets/FabMenu';
import { BusinessCard } from './components/widgets/BusinessCard';
import { KpiStrip } from './components/widgets/KpiStrip';
import { ActionQuad } from './components/widgets/ActionQuad';
import { SetupChecklist } from './components/widgets/SetupChecklist';
import { RosterRow } from './components/widgets/RosterRow';
import { RevenueHero } from './components/widgets/RevenueHero';
import { InvertedStatGrid } from './components/widgets/InvertedStatGrid';
import { SettingsGroup } from './components/widgets/SettingsGroup';
import { ButtonShowcase } from './components/widgets/ButtonShowcase';
import { PromoCard } from './components/widgets/PromoCard';
import { QuickActionTiles } from './components/widgets/QuickActionTiles';
import { VisibilityAlertCard } from './components/widgets/VisibilityAlertCard';
import { InfluencerLevelCard } from './components/widgets/InfluencerLevelCard';
import { NextAppointmentCard } from './components/widgets/NextAppointmentCard';
import { ReferralNudgeCard } from './components/widgets/ReferralNudgeCard';
import { EarningsHero } from './components/widgets/EarningsHero';
import { InviteLinkCard } from './components/widgets/InviteLinkCard';
import { HowItWorksList } from './components/widgets/HowItWorksList';
import { GlanceablePerformanceCard } from './components/widgets/GlanceablePerformanceCard';
import { HeroMetricCard } from './components/widgets/HeroMetricCard';
import { StatsStoriesCard } from './components/widgets/StatsStoriesCard';
import { TrendListCard } from './components/widgets/TrendListCard';
import { BentoStatsCard } from './components/widgets/BentoStatsCard';
import { AlertSet } from './components/widgets/AlertSet';
import { BadgeSet } from './components/widgets/BadgeSet';
import { AvatarGroup } from './components/widgets/AvatarGroup';
import { FloatingNav } from './components/widgets/FloatingNav';
import { IconActionGrid } from './components/widgets/IconActionGrid';
import { SwitchRow } from './components/widgets/SwitchRow';
import { CheckboxRow } from './components/widgets/CheckboxRow';
import { RadioRow } from './components/widgets/RadioRow';
import { SegmentedControl } from './components/widgets/SegmentedControl';
import { StepperControl } from './components/widgets/StepperControl';
import { SliderControl } from './components/widgets/SliderControl';
import { TextInputs } from './components/widgets/TextInputs';
import { FloatingLabelField } from './components/widgets/FloatingLabelField';
import { InlineEditField } from './components/widgets/InlineEditField';
import { RichInputField } from './components/widgets/RichInputField';
import { MultiStepForm } from './components/widgets/MultiStepForm';
import { SkeletonPrimitive } from './components/widgets/SkeletonPrimitive';
import { SkeletonList } from './components/widgets/SkeletonList';
import { SkeletonCard } from './components/widgets/SkeletonCard';
import { SkeletonCalendar } from './components/widgets/SkeletonCalendar';
import { ColorPalette } from './components/widgets/ColorPalette';
import { ShadowTokens } from './components/widgets/ShadowTokens';
import { TokenReference } from './components/widgets/TokenReference';
import { AccessibilityFoundations } from './components/widgets/AccessibilityFoundations';
import { MobilePatternFrame } from './components/MobilePatternFrame';
import { BizTabBar } from './components/widgets/BizTabBar';
import { CalendarScreen } from './components/screens/CalendarScreen';
import { OnePagerIntro } from './components/OnePagerIntro';
type Theme = 'light' | 'dark';
interface SectionProps {
  eyebrow: string;
  description: string;
  children: React.ReactNode;
}
function Section({ eyebrow, description, children }: SectionProps) {
  return (
    <section className="mb-12">
      <div className="mb-4 px-2">
        <h2 className="text-xs font-bold text-muted uppercase tracking-widest mb-1">
          {eyebrow}
        </h2>
        <p className="text-sm text-ink-soft text-pretty">{description}</p>
      </div>
      <div>{children}</div>
    </section>);

}
// Section ids that should render inside a phone-screen frame.
// "top" = the pattern is a header/sticky bar pinned to top of screen.
// "bottom" = the pattern is a sheet, tab bar, or sticky CTA at bottom.
// "center" = standalone fragment shown centered in the screen.
const MOBILE_PATTERNS: Record<string, 'top' | 'bottom' | 'center'> = {
  // Headers
  'calendar-top-header': 'top',
  'staffers-bar': 'top',
  'large-title-header': 'top',
  'nav-bar-header': 'top',
  'search-header': 'top',
  'tabbed-header': 'top',
  'context-header': 'top',
  // Sheets + bottom chrome
  'sheet-header': 'bottom',
  'action-sheet': 'bottom',
  'confirmation-sheet': 'bottom',
  'form-sheet': 'bottom',
  'picker-sheet': 'bottom',
  'detail-sheet': 'bottom',
  'floating-nav': 'bottom',
  'biz-tab-bar': 'bottom',
  'pay-button': 'bottom',
  // List rows — show stacked at top so they read as a list inside a screen
  'service-list-item': 'top',
  'client-list-item': 'top',
  'marketplace-listing': 'top',
  'booking-list-item': 'top',
  // Full-screen patterns
  'pos-keypad': 'center',
  'empty-state': 'center'
};
export function App() {
  const sections = [
  {
    id: 'settings',
    eyebrow: 'Settings Row',
    description:
    'Tinted icon tile + clearer hierarchy with concentric radii.',
    component: <SettingsRow />
  },
  {
    id: 'calendar',
    eyebrow: 'Calendar Strip',
    description:
    'Unified pill-style row with clear active state and appointment dots.',
    component: <CalendarStrip />
  },
  {
    id: 'calendar-top-header',
    eyebrow: 'Calendar Top Header',
    description:
    'Sticky bar for the calendar view. Bell with unread count, date selector with hours, filter with active-count badge, and overflow menu.',
    component: <CalendarTopHeader />
  },
  {
    id: 'date-cell',
    eyebrow: 'Date Cell',
    description:
    'Atomic date item. Every state lives here — idle, selected, muted, today, past-with-appointment, and category-tinted fills.',
    component: <DateCell />
  },
  {
    id: 'calendar-picker-mobile',
    eyebrow: 'Calendar Picker Mobile',
    description:
    'Two-grid picker: a compact week strip on top and the full month below. Past appointments turn rose, upcoming get a colored dot.',
    component: <CalendarPickerMobile />
  },
  {
    id: 'day-agenda-view',
    eyebrow: 'Day Agenda · Pastel',
    description:
    'Vertical day timeline with pastel appointment blocks color-coded by service category. Left accent bars carry the saturated tone, a live "now" line marks the current moment, and overlapping bookings stack side-by-side.',
    component: <DayAgendaView />
  },
  {
    id: 'staffers-bar',
    eyebrow: 'Staffers Bar',
    description:
    'Stacked staff cards — tinted initials, availability dot, working hours, and an "all working staff" row for drill-in.',
    component: <StaffersBar />
  },
  {
    id: 'large-title-header',
    eyebrow: 'Large Title Header',
    description:
    'iOS 26 large title with tinted glass pill buttons and an inset search field underneath. The flagship app-screen chrome.',
    component: <LargeTitleHeader />
  },
  {
    id: 'nav-bar-header',
    eyebrow: 'Nav Bar Header',
    description:
    'Compact push-screen nav bar — back chevron, centered two-line title, action menu. Hairline divider below.',
    component: <NavBarHeader />
  },
  {
    id: 'search-header',
    eyebrow: 'Search Header',
    description:
    'Active search state with leading icon, inline clear, Cancel link, and a horizontally scrollable filter chip row.',
    component: <SearchHeader />
  },
  {
    id: 'sheet-header',
    eyebrow: 'Sheet Header',
    description:
    'Bottom sheet chrome — drag grabber, centered title, Cancel left, filled Done right. Top-shadow lifts it off the parent.',
    component: <SheetHeader />
  },
  {
    id: 'action-sheet',
    eyebrow: 'Action Sheet',
    description:
    'Native iOS action sheet — context summary, stacked actions with tinted icon tiles, destructive variant in red, and a detached Cancel button below.',
    component: <ActionSheet />
  },
  {
    id: 'confirmation-sheet',
    eyebrow: 'Confirmation Sheet',
    description:
    'Destructive confirm — tinted hazard glyph, balanced two-line copy, full-width danger primary, and a neutral dismiss below.',
    component: <ConfirmationSheet />
  },
  {
    id: 'form-sheet',
    eyebrow: 'Form Sheet',
    description:
    'Cancel/Done chrome with grouped iOS-native rows. Inputs sit on sunken fills, list rows drill into nested pickers, notes textarea closes the sheet.',
    component: <FormSheet />
  },
  {
    id: 'picker-sheet',
    eyebrow: 'Picker Sheet',
    description:
    'Single-column wheel picker for time, duration, or quantity. Top and bottom fade masks suggest depth; the center band marks the active value.',
    component: <PickerSheet />
  },
  {
    id: 'detail-sheet',
    eyebrow: 'Detail Sheet',
    description:
    'Read-mostly summary — client identity hero with status pill, grouped facts row with leading glyphs, soft secondary actions, and a primary CTA.',
    component: <DetailSheet />
  },
  {
    id: 'status-sheet',
    eyebrow: 'Status Sheet',
    description:
    'Compact result sheet with a tinted centered glyph for async feedback. Variants: loading (spinner), warning (amber !), success (green ✓), error (red ✗), info (i). Supports 0–4 stacked buttons with primary / secondary / danger tones.',
    component: <StatusSheet />
  },
  {
    id: 'tabbed-header',
    eyebrow: 'Tabbed Header',
    description:
    'Mail-style large title with a scrollable tab strip. Underline indicator slides with a spring between tabs.',
    component: <TabbedHeader />
  },
  {
    id: 'context-header',
    eyebrow: 'Context Header',
    description:
    'Colored top strip header for transactional or contextual screens. Features a centered uppercase label, title, and optional stats bar.',
    component: <ContextHeader />
  },
  {
    id: 'appointment',
    eyebrow: 'Appointment Card',
    description: 'Clean timeline block with left accent bar and avatar.',
    component: <AppointmentCard />
  },
  {
    id: 'tip',
    eyebrow: 'Tip Selector',
    description: 'Connected segmented control with animated active pill.',
    component: <TipSelector />
  },
  {
    id: 'checkout',
    eyebrow: 'Checkout Service Line',
    description: 'Inline row with duration chip and subtle tax note.',
    component: <CheckoutLine />
  },
  {
    id: 'profile-actions',
    eyebrow: 'Profile Action Trio',
    description: 'Unified card with hairlines and concentric circular icons.',
    component: <ProfileActions />
  },
  {
    id: 'progress',
    eyebrow: 'Progress Card',
    description: 'Segmented progress bar with micro-step checklist.',
    component: <ProgressCard />
  },
  {
    id: 'tabs',
    eyebrow: 'Tabs',
    description:
    'Animated motion underline with keyboard navigation support.',
    component: <AnimatedTabs />
  },
  {
    id: 'period',
    eyebrow: 'Period Filter',
    description: 'Refined pill-group with animated dark active state.',
    component: <PeriodFilter />
  },
  {
    id: 'metric',
    eyebrow: 'Metric Card w/ Sparkline',
    description: 'Big tabular numbers, change pill, and trend sparkline.',
    component: <MetricCard />
  },
  {
    id: 'alert',
    eyebrow: 'Alert Banner',
    description: 'Clean tinted card with inline CTA and dismiss action.',
    component: <AlertBanner />
  },
  {
    id: 'fab',
    eyebrow: 'FAB Menu',
    description:
    'Expanding action menu with staggered entrance and backdrop blur.',
    component: <FabMenu />
  },
  {
    id: 'business-card',
    eyebrow: 'Business Identity Card',
    description: 'Teal avatar tile + status indicator + inline edit button.',
    component: <BusinessCard />
  },
  {
    id: 'kpi-strip',
    eyebrow: 'KPI Strip',
    description:
    'Horizontal 3-stat row with huge tabular numbers and delta indicators.',
    component: <KpiStrip />
  },
  {
    id: 'action-quad',
    eyebrow: 'Action Quad',
    description: '4-button grid with dark icon tiles and labels below.',
    component: <ActionQuad />
  },
  {
    id: 'setup-checklist',
    eyebrow: 'Setup Checklist',
    description:
    'Linear progress bar with current step and completion ratio.',
    component: <SetupChecklist />
  },
  {
    id: 'roster-row',
    eyebrow: 'Roster Row + Empty State',
    description:
    'Staff schedule row with tinted status pill and centered empty state.',
    component: <RosterRow />
  },
  {
    id: 'revenue-hero',
    eyebrow: 'Revenue Hero',
    description:
    'Huge tabular number with clean teal line chart and current value dot.',
    component: <RevenueHero />
  },
  {
    id: 'inverted-stat-grid',
    eyebrow: 'Inverted Stat Grid',
    description:
    '2x2 grid where one card is inverted (black bg, white text) for emphasis.',
    component: <InvertedStatGrid />
  },
  {
    id: 'settings-group',
    eyebrow: 'Settings Group',
    description:
    'Grouped settings with uppercase labels, icon tiles, and toggle switches.',
    component: <SettingsGroup />
  },
  {
    id: 'button-showcase',
    eyebrow: 'Button System',
    description:
    'Primary, lifted, secondary, outlined, tinted, and full-width variants.',
    component: <ButtonShowcase />
  },
  {
    id: 'promo-card',
    eyebrow: 'Promo Card',
    description:
    'Tinted background cards with icon, title, badge, and description.',
    component: <PromoCard />
  },
  // PROFILE COMPONENT REVAMP — data-rich tiles, urgent alerts, gamified levels
  {
    id: 'quick-action-tiles',
    eyebrow: 'Quick Action Tiles',
    description:
    'Dead buttons → data-rich tiles. Key metrics surface inline without tapping through.',
    component: <QuickActionTiles />
  },
  {
    id: 'visibility-alert-card',
    eyebrow: 'Visibility Alert',
    description:
    'Critical blocker reframed: icon, headline, supporting copy, and a dark primary CTA.',
    component: <VisibilityAlertCard />
  },
  {
    id: 'influencer-level',
    eyebrow: 'Influencer Level Card',
    description:
    'Gamification with clear leveling, progress bar, and an actionable next step.',
    component: <InfluencerLevelCard />
  },
  // REFERRAL PROGRAM — entry points and destination
  {
    id: 'next-appointment',
    eyebrow: 'Up Next Card',
    description:
    'Dark hero card anchoring the day with time, client, services, and quick actions.',
    component: <NextAppointmentCard />
  },
  {
    id: 'referral-nudge',
    eyebrow: 'Referral Nudge',
    description:
    'Contextual celebration card after a great day — gradient, dismissible, and inviting.',
    component: <ReferralNudgeCard />
  },
  {
    id: 'earnings-hero',
    eyebrow: 'Earnings Hero',
    description:
    'Gradient hero with total earned, friends joined, and where the money lands.',
    component: <EarningsHero />
  },
  {
    id: 'invite-link',
    eyebrow: 'Invite Link + Share',
    description:
    'Copyable invite link with tinted channel buttons for WhatsApp, Instagram, and More.',
    component: <InviteLinkCard />
  },
  {
    id: 'how-it-works',
    eyebrow: 'How It Works',
    description:
    'Three numbered steps with tinted purple chips for crisp scannability.',
    component: <HowItWorksList />
  },
  // STATS — widget concept explorations
  {
    id: 'glanceable-performance',
    eyebrow: 'Glanceable+',
    description:
    'Refined version of the current concept. Clean, dense, with subtle inline sparklines.',
    component: <GlanceablePerformanceCard />
  },
  {
    id: 'hero-metric',
    eyebrow: 'Hero Metric',
    description:
    'One huge headline number takes center stage for a more aspirational, motivating feel.',
    component: <HeroMetricCard />
  },
  {
    id: 'stats-stories',
    eyebrow: 'Stats Stories',
    description:
    'Horizontally scrollable, color-coded story cards — one metric per screen, with snap pagination.',
    component: <StatsStoriesCard />
  },
  {
    id: 'trend-list',
    eyebrow: 'Trend List',
    description:
    'Data-dense row layout pairing each KPI with an inline trend line and delta.',
    component: <TrendListCard />
  },
  {
    id: 'bento-stats',
    eyebrow: 'Bento Stats',
    description:
    'Mixed-size tiles: a hero revenue card plus radial, bar, and area sub-tiles for a rich overview.',
    component: <BentoStatsCard />
  },
  // SYSTEM — atomic pieces, full intent coverage
  {
    id: 'alert-set',
    eyebrow: 'Feedback & Toasts',
    description:
    'Banner-as-pill for inline notices; ink-fill toast for transient confirmations with undo. Severity carried by tone, never by size.',
    component: <AlertSet />
  },
  {
    id: 'badge-set',
    eyebrow: 'Badges',
    description:
    'Atomic signal elements covering seven intents and two sizes — for status, plan, and counter contexts.',
    component: <BadgeSet />
  },
  {
    id: 'avatar-group',
    eyebrow: 'Avatar Groups',
    description:
    'Stacked initials with overflow count, in two sizes for inline rows and hero contexts.',
    component: <AvatarGroup />
  },
  {
    id: 'floating-nav',
    eyebrow: 'Floating Nav',
    description:
    'Glass pill bottom-nav with four destinations plus a dedicated search FAB anchor.',
    component: <FloatingNav />
  },
  {
    id: 'icon-action-grid',
    eyebrow: 'Icon-top Action Buttons',
    description:
    'Wallet / Reports / Share pattern expanded into a full grid. Neutral by default; tinted variants for category-coded sets.',
    component: <IconActionGrid />
  },
  {
    id: 'switch',
    eyebrow: 'Switch',
    description:
    'Stacked switch rows with label and supporting copy. Spring-animated thumb, 44px hit area, teal track when on.',
    component: <SwitchRow />
  },
  {
    id: 'checkbox',
    eyebrow: 'Checkbox',
    description:
    'Three states covered — unchecked, checked, and indeterminate — plus a disabled example for locked options.',
    component: <CheckboxRow />
  },
  {
    id: 'radio',
    eyebrow: 'Radio',
    description:
    'Single-select group with a thick ink ring on the active option. Disabled state dims the whole row.',
    component: <RadioRow />
  },
  {
    id: 'segmented',
    eyebrow: 'Segmented Control',
    description:
    'Two-way switch with a spring-animated pill. Common for staff/resources, day/week, or list/grid toggles.',
    component: <SegmentedControl />
  },
  {
    id: 'stepper',
    eyebrow: 'Stepper',
    description:
    'Numeric +/- control for quantity and group-size pickers. Disabled boundaries clamp at min and max.',
    component: <StepperControl />
  },
  {
    id: 'slider',
    eyebrow: 'Slider',
    description:
    'Single-thumb range with a big tabular value on top. Best for duration, distance, or price filters.',
    component: <SliderControl />
  },
  {
    id: 'text-input',
    eyebrow: 'Text Input',
    description:
    'Standard field with uppercase label, hint, and an error state — bordered in danger with inline message below.',
    component: <TextInputs />
  },
  {
    id: 'floating-label-field',
    eyebrow: 'Floating Label Field',
    description:
    'Modern hybrid input — label sits inside until focus or fill, then springs into a smaller caption. Inline success and error glyphs, password reveal, all on a soft sunken fill.',
    component: <FloatingLabelField />
  },
  {
    id: 'inline-edit-field',
    eyebrow: 'Inline Edit Field',
    description:
    'Tap-to-edit list rows for profile-style screens. View state shows value with an edit affordance; editing morphs the row into an input with Save and Cancel.',
    component: <InlineEditField />
  },
  {
    id: 'rich-input-field',
    eyebrow: 'Rich Input Field',
    description:
    'Composite field grammar — currency prefix with country dropdown, URL slug with availability badge, textarea with live counter and progress hairline, and a chip-based tag input.',
    component: <RichInputField />
  },
  {
    id: 'multi-step-form',
    eyebrow: 'Multi-step Form',
    description:
    'Wizard-style booking flow with a connected step indicator, animated step transitions, and contextual primary CTA that adapts to the current step.',
    component: <MultiStepForm />
  },
  {
    id: 'skeleton-primitive',
    eyebrow: 'Skeleton Primitive',
    description:
    'The atomic shimmer block. Use any width, height, and radius — the highlight sweep adapts to any rectangle.',
    component: <SkeletonPrimitive />
  },
  {
    id: 'skeleton-list',
    eyebrow: 'Skeleton · List',
    description:
    'Loading state for staff lists, message threads, and feed rows. Shapes match the real list so layout never shifts.',
    component: <SkeletonList />
  },
  {
    id: 'skeleton-card',
    eyebrow: 'Skeleton · Card',
    description:
    'Hero-card loading shape — header, big number, body block, and two CTAs. Used while stats and bookings load.',
    component: <SkeletonCard />
  },
  {
    id: 'skeleton-calendar',
    eyebrow: 'Skeleton · Calendar',
    description:
    'Month-grid loading state with day headers and a full 5-week pad of squares. Same proportions as the live calendar.',
    component: <SkeletonCalendar />
  },
  // LISTINGS — row patterns for catalogs, rosters, search results
  {
    id: 'service-list-item',
    eyebrow: 'Service Listing',
    description:
    'Service catalog row — drag handle, category chip, name with duration and price, and an on/off toggle that dims the row.',
    component: <ServiceListItem />
  },
  {
    id: 'client-list-item',
    eyebrow: 'Client Listing',
    description:
    'Client roster row with tinted initials, VIP star, new-client badge, last-visit context, and lifetime spend on the right.',
    component: <ClientListItem />
  },
  {
    id: 'marketplace-listing',
    eyebrow: 'Marketplace Listing',
    description:
    'Consumer-side search result card — hero image, save heart, rating with review count, distance, price band, and inline Book.',
    component: <MarketplaceListing />
  },
  {
    id: 'booking-list-item',
    eyebrow: 'Booking Listing',
    description:
    'Day-view booking row with category accent bar, time block, status pill, and inline message + check-in actions.',
    component: <BookingListItem />
  },
  // CHECKOUT — cart, payment, and confirmation flow
  {
    id: 'cart-summary',
    eyebrow: 'Cart Summary',
    description:
    'Service + product line items with tinted glyph tiles and micro-steppers. Subtotal, tax, and bold total sit on a sunken footer.',
    component: <CartSummary />
  },
  {
    id: 'payment-method-picker',
    eyebrow: 'Payment Method Picker',
    description:
    'Selectable method cards with a sliding ring indicator. Apple Pay surfaces with a "Recommended" tag; "Add a new card" sits in teal.',
    component: <PaymentMethodPicker />
  },
  {
    id: 'discount-code-field',
    eyebrow: 'Discount Code Field',
    description:
    'Sticky promo input with inline Apply, an applied-code chip with savings, and a danger ring on invalid codes.',
    component: <DiscountCodeField />
  },
  {
    id: 'pay-button',
    eyebrow: 'Pay Button',
    description:
    'Sticky pay bar with the total on the left and a Pay CTA on the right. Tap morphs through Pay → Processing → Paid with a leaf success flash.',
    component: <PayButton />
  },
  {
    id: 'order-confirmation',
    eyebrow: 'Order Confirmation',
    description:
    'Success screen — animated ripple check, when/where summary, order receipt block, share + receipt actions, and a primary Done.',
    component: <OrderConfirmation />
  },
  // BIZ — operational patterns: empty states, feeds, POS, loyalty, reporting
  {
    id: 'empty-state',
    eyebrow: 'Empty State',
    description:
    'Friendly nothing-here screen with a layered tinted glyph, copy, primary CTA, and a softer secondary path.',
    component: <EmptyState />
  },
  {
    id: 'notification-feed',
    eyebrow: 'Notification Feed',
    description:
    'Grouped activity by Today / Earlier with tinted category glyphs, unread red dots, and a footer mark-all-read action.',
    component: <NotificationFeed />
  },
  {
    id: 'notification-panel-card',
    eyebrow: 'Notification Card · States',
    description:
    'The Northline notification card in three states — New (red dot, bold ink title), Active (gray, read), and Archived (50% opacity, dismissed).',
    component: <NotificationPanelCard />
  },
  {
    id: 'notification-action-card',
    eyebrow: 'Notification · Action Required',
    description:
    'Hero notification for action-required moments — eyebrow + title + caption with a category icon and timestamp. Dark and light variants for emphasis.',
    component: <NotificationActionCard />
  },
  {
    id: 'pos-keypad',
    eyebrow: 'POS Keypad',
    description:
    'Cash-sale entry — big tabular amount that morphs as you type, 3×4 numeric pad on sunken keys, and a Charge CTA below.',
    component: <POSKeypad />
  },
  {
    id: 'loyalty-stamp',
    eyebrow: 'Loyalty Stamp Card',
    description:
    'Dark hero loyalty card with teal stamps, a gift-icon reward stamp, animated progress hairline, and atmospheric brand glow.',
    component: <LoyaltyStamp />
  },
  {
    id: 'date-range-picker',
    eyebrow: 'Date Range Picker',
    description:
    'Reporting affordance — preset chip group with a sliding active pill, From/To pickers below, and a compare-to-previous toggle.',
    component: <DateRangePicker />
  },
  // HINTS & TOOLTIPS — coaching surfaces
  {
    id: 'tooltip-showcase',
    eyebrow: 'Tooltip',
    description:
    'Compact floating label with a directional caret. Dark and light variants, four anchor positions, optional secondary line for shortcuts.',
    component: <TooltipShowcase />
  },
  {
    id: 'coachmark-callout',
    eyebrow: 'Coachmark',
    description:
    'Onboarding spotlight — pulsing ring around a target, dark callout with caret, step dots, and Skip / Next CTAs to move through a tour.',
    component: <CoachmarkCallout />
  },
  {
    id: 'inline-hint',
    eyebrow: 'Inline Hints',
    description:
    'Help-icon tooltip next to a field label, an inline caption with leading info glyph, and a family of pastel banners — info, tip, and warning.',
    component: <InlineHint />
  },
  {
    id: 'success-confetti',
    eyebrow: 'Success Confetti',
    description:
    'Mobile success screen with SVG checkmark draw and falling confetti burst. Uses framer-motion for physics-based particles.',
    component: <SuccessConfetti />
  },
  {
    id: 'celebration-screen',
    eyebrow: 'Celebration',
    description:
    'Milestone moment with rotating background rays, spring-scaled badge, and popping stars. Uses amber and plum tones.',
    component: <CelebrationScreen />
  },
  {
    id: 'loading-spinner',
    eyebrow: 'Loaders',
    description:
    'Four native loader styles: iOS spokes, bouncing dots, segmented ring, and pulsing concentric circles.',
    component: <LoadingSpinner />
  },
  {
    id: 'progress-bar-set',
    eyebrow: 'Linear Progress',
    description:
    'Determinate, indeterminate (sliding), and stepped progress bars with smooth fill animations.',
    component: <ProgressBarSet />
  },
  {
    id: 'circular-progress',
    eyebrow: 'Circular Progress',
    description:
    'Ring progress variants: goal percentage, multi-segment category breakdown, and linear countdown timer.',
    component: <CircularProgress />
  },
  {
    id: 'upload-progress',
    eyebrow: 'Upload State',
    description:
    'File upload UI with a circular progress ring that morphs into a checkmark badge upon completion.',
    component: <UploadProgress />
  },
  {
    id: 'pull-to-refresh',
    eyebrow: 'Pull to Refresh',
    description:
    'Mobile pull-to-refresh simulation with rubber-band ease, spinner, and new content fade-in.',
    component: <PullToRefresh />
  },
  {
    id: 'checkmark-draw',
    eyebrow: 'SVG Draw States',
    description:
    'Success, error, and warning icon states drawing in via SVG stroke-dashoffset with staggered timing.',
    component: <CheckmarkDraw />
  },
  {
    id: 'biz-tab-bar',
    eyebrow: 'Biz Tab Bar',
    description:
    'Northline Studio bottom navigation — icon-only tabs with a prominent center "+" FAB for quick-add, and a teal notification dot on Settings. Tap items to switch active state.',
    component: <BizTabBar />
  }];

  const [theme, setTheme] = useState<Theme>('light');
  const [contrast, setContrast] = useState<Contrast>('standard');
  return (
    <div
      data-theme={theme}
      data-contrast={contrast}
      className="min-h-screen py-8 md:py-12 px-4 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--page-bg)',
        backgroundImage: 'var(--page-bg-image)',
        backgroundAttachment: 'fixed',
        color: 'var(--page-fg)'
      }}>
      
      <ThemeControls
        theme={theme}
        contrast={contrast}
        onThemeChange={setTheme}
        onContrastChange={setContrast} />
      

      <SectionMenu
        sections={sections.map((s) => ({
          id: s.id,
          eyebrow: s.eyebrow
        }))} />
      

      <OnePagerIntro />

      {/* Foundations zone — color tokens & tonal ramps */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 mb-20 md:mb-28">
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <div
            className="text-[11px] font-bold uppercase tracking-widest mb-2"
            style={{
              color: 'var(--page-eyebrow)'
            }}>
            
            Foundations
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-3 tracking-tight text-pretty"
            style={{
              color: 'var(--page-fg)'
            }}>
            
            The system the widgets are built on.
          </h2>
          <p
            className="text-sm md:text-base text-pretty"
            style={{
              color: 'var(--page-muted)'
            }}>
            
            Twelve semantic color roles plus tonal ramps. Every widget below
            pulls from these tokens — change the role, every surface follows.
          </p>
        </div>
        <ColorPalette />

        <div className="mt-20 md:mt-28">
          <ShadowTokens />
        </div>

        <div className="mt-20 md:mt-28">
          <TokenReference />
        </div>

        <div className="mt-20 md:mt-28">
          <AccessibilityFoundations />
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-16 md:mb-24 max-w-2xl mx-auto">
          <div
            className="text-[11px] font-bold uppercase tracking-widest mb-2"
            style={{
              color: 'var(--page-eyebrow)'
            }}>
            
            Widget Revamp
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-3 tracking-tight text-pretty"
            style={{
              color: 'var(--page-fg)'
            }}>
            
            Component-by-component upgrades.
          </h2>
          <p
            className="text-sm md:text-base text-pretty"
            style={{
              color: 'var(--page-muted)'
            }}>
            
            Fresh variations of Northline's core widgets — clearer hierarchy,
            denser information, and more deliberate motion.
          </p>
        </div>

        <div className="space-y-20 md:space-y-28 pb-12">
          {sections.map((section, i) =>
          <motion.div
            key={section.id}
            id={section.id}
            initial={{
              opacity: 0,
              y: 20,
              filter: 'blur(4px)'
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)'
            }}
            viewport={{
              once: true,
              margin: '-80px'
            }}
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.6
            }}
            className="grid lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-16 items-start scroll-mt-24">
            
              <div className="lg:sticky lg:top-12">
                <div className="flex items-baseline gap-3 mb-3">
                  <span
                  className="text-sm font-semibold tabular-nums"
                  style={{
                    color: 'var(--page-num)'
                  }}>
                  
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                  className="text-xl md:text-2xl font-bold tracking-tight text-pretty"
                  style={{
                    color: 'var(--page-fg)'
                  }}>
                  
                    {section.eyebrow}
                  </h3>
                </div>
                <p
                className="text-sm md:text-[15px] leading-relaxed text-pretty"
                style={{
                  color: 'var(--page-soft)'
                }}>
                
                  {section.description}
                </p>
              </div>

              <div
              className="rounded-3xl p-6 md:p-10 flex items-center justify-center min-h-[200px] transition-colors duration-300"
              style={{
                backgroundColor: 'var(--page-tile-bg)',
                backgroundImage: 'var(--page-tile-image)',
                boxShadow: 'var(--edge-raised)'
              }}>
              
                {MOBILE_PATTERNS[section.id] ?
              <MobilePatternFrame position={MOBILE_PATTERNS[section.id]}>
                    {section.component}
                  </MobilePatternFrame> :

              <div className="w-full max-w-[400px]">
                    {section.component}
                  </div>
              }
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* In context — Composed calendar screen */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 mt-24 md:mt-32 pb-24">
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <div
            className="text-[11px] font-bold uppercase tracking-widest mb-2"
            style={{
              color: 'var(--page-eyebrow)'
            }}>
            
            In Context
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-3 tracking-tight text-pretty"
            style={{
              color: 'var(--page-fg)'
            }}>
            
            The calendar screen, rebuilt.
          </h2>
          <p
            className="text-sm md:text-base text-pretty"
            style={{
              color: 'var(--page-muted)'
            }}>
            
            The production Northline calendar reassembled from the kit — payout
            banner, day chrome, week strip, staff columns, agenda blocks, FABs,
            and tab bar.
          </p>
        </div>

        <div className="flex justify-center">
          <CalendarScreen />
        </div>
      </div>
    </div>);

}