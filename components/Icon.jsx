export default function Icon({ id, size = 20, className = '' }) {
  return (
    <span className={`icon icon-${size} ${className}`}>
      <svg>
        <use href={`#i-${id}`} />
      </svg>
    </span>
  );
}
