type IconProps = {
  className?: string;
};

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6 4L20 12L6 20V4Z" />
    </svg>
  );
}

export function WaveIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M3 9c3 0 3-3 6-3s3 3 6 3s3-3 6-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 15c3 0 3-3 6-3s3 3 6 3s3-3 6-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

export function ColumnIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

export function FoundationIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M5 7h14M7 7v10M17 7v10M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 11h8M8 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

export function SensorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.7 18.3a9 9 0 0 1 0-12.6M18.3 5.7a9 9 0 0 1 0 12.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}
