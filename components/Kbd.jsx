// Mac-style keycap glyph. Presentational only (no hooks) so it's safe to use in
// server components. Renders a real <kbd> so it stays semantic and copy-pasteable.
export default function Kbd({ children, className = '' }) {
  return <kbd className={`kbd-key ${className}`.trim()}>{children}</kbd>;
}
