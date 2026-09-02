import { AI_PROMPT, AI_TARGETS } from '../lib/aiPrompt';

// Monochrome brand marks — rendered in grey (currentColor) so the row reads as
// quiet third-party validation, not a pitch.
const LOGOS = {
  ChatGPT: (
    <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6 6 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .75 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 19.02 19.8a5.98 5.98 0 0 0 4-2.9 6.05 6.05 0 0 0-.74-7.08Zm-9.02 12.6a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.78.78 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.06v5.58a4.5 4.5 0 0 1-4.5 4.49ZM3.6 18.29a4.47 4.47 0 0 1-.54-3.01l.14.08 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06l-4.83 2.79a4.5 4.5 0 0 1-6.14-1.64ZM2.34 7.9a4.49 4.49 0 0 1 2.35-1.97v5.68a.77.77 0 0 0 .38.67l5.82 3.36-2.02 1.17a.08.08 0 0 1-.07 0l-4.83-2.79A4.5 4.5 0 0 1 2.34 7.9Zm16.6 3.86-5.84-3.37 2.02-1.16a.08.08 0 0 1 .07 0l4.83 2.78a4.49 4.49 0 0 1-.68 8.1v-5.68a.79.79 0 0 0-.4-.67Zm2.01-3.03-.14-.08-4.77-2.76a.78.78 0 0 0-.79 0L11.42 7.26V4.93a.07.07 0 0 1 .03-.06l4.83-2.78a4.5 4.5 0 0 1 6.68 4.66ZM10.32 12.9 8.3 11.74a.08.08 0 0 1-.04-.06V6.1a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.78 2.76a.78.78 0 0 0-.39.68Zm1.1-2.37L14 9.06l2.6 1.5v3l-2.6 1.5-2.6-1.5Z" />
  ),
  Claude: (
    <path d="M17.3 3.5h-3.67l6.7 16.92H24Zm-10.6 0L0 20.42h3.74l1.37-3.55h7l1.37 3.55h3.75L10.54 3.5Zm-.37 10.22 2.29-5.95 2.29 5.95Z" />
  ),
  Perplexity: (
    <path d="M12 2.5 3 8v8l9 5.5 9-5.5V8Zm0 2.3 6.6 4-6.6 4-6.6-4Zm-7 5.7 6 3.6v6.1l-6-3.7Zm14 0v6l-6 3.7v-6.1Z" />
  ),
  Gemini: (
    <path d="M12 24A14.3 14.3 0 0 0 0 12 14.3 14.3 0 0 0 12 0a14.3 14.3 0 0 0 12 12 14.3 14.3 0 0 0-12 12" />
  ),
};

// "Don't take our word for it — ask your favorite AI." Server-safe (no hooks).
export default function AskAnAI({ className = '' }) {
  const q = encodeURIComponent(AI_PROMPT);
  return (
    <div className={`ask-ai ${className}`.trim()}>
      <span className="ask-ai-label">Don&apos;t take our word for it — ask your favorite AI:</span>
      <div className="ask-ai-chips">
        {AI_TARGETS.map((t) => (
          <a
            key={t.name}
            href={t.href(q)}
            target="_blank"
            rel="noopener noreferrer"
            className="ask-ai-chip"
            aria-label={`Ask ${t.name} about the Excel Shortcuts app`}
            title={`Ask ${t.name}`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              {LOGOS[t.name]}
            </svg>
            <span>{t.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
