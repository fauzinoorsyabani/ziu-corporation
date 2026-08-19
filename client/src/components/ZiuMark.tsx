/**
 * Quiet Constellation mark: a crisp orbit symbol used as Ziu Corporation's temporary visual anchor.
 */
type ZiuMarkProps = {
  className?: string;
  withWordmark?: boolean;
  inverse?: boolean;
};

export function ZiuMark({
  className = "",
  withWordmark = false,
  inverse = false,
}: ZiuMarkProps) {
  return (
    <div className={`ziu-mark ${inverse ? "ziu-mark--inverse" : ""} ${className}`}>
      <svg viewBox="0 0 48 48" aria-hidden="true" className="ziu-mark__glyph">
        <path d="M34.82 11.72A16.4 16.4 0 0 0 12.5 14.68" fill="none" stroke="currentColor" strokeWidth="5.4" strokeLinecap="round" />
        <path d="M12.02 18.28a16.42 16.42 0 0 0 2.9 19.23" fill="none" stroke="currentColor" strokeWidth="5.4" strokeLinecap="round" />
        <path d="M19.5 39.92a16.43 16.43 0 0 0 17.2-6.93" fill="none" stroke="currentColor" strokeWidth="5.4" strokeLinecap="round" />
        <path d="M38.5 28.35a16.35 16.35 0 0 0-3.3-16.63" fill="none" stroke="currentColor" strokeWidth="5.4" strokeLinecap="round" />
        <path d="M16.5 15.3 30.7 15.3 17.2 32.7h14.3" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="24" r="2.6" fill="#D6FF1F" />
      </svg>
      {withWordmark && (
        <span className="ziu-mark__wordmark">
          <span>ZIU</span>
          <small>CORPORATION</small>
        </span>
      )}
    </div>
  );
}
