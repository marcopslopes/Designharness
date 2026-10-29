/** The Harness logo. Outlines follow the text colour, so it works in both themes. */
export function HarnessLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="design-harness-logo"
      viewBox="57 61 66 63"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        className="design-harness-logo__paper"
        x="93.5"
        y="61.5"
        width="29"
        height="30"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="design-harness-logo__bowl"
        d="M91.5459 123.335C83.5375 123.335 75.8371 119.676 70.1484 113.615C64.5668 107.667 60.9044 99.3838 60.7637 90.9945L122.493 90.9945C122.346 99.3781 118.529 107.662 112.943 113.615C107.255 119.676 99.5543 123.335 91.5459 123.335Z"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        className="design-harness-logo__bar"
        x="57.5"
        y="61.5"
        width="31"
        height="62"
        vectorEffect="non-scaling-stroke"
      />
      <rect className="design-harness-logo__paper" x="89" y="89" width="4" height="35" stroke="none" />
      <path d="M93.5 90.5V123.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
