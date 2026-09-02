'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import Icon from './Icon';
import { useExitIntent, markSurveyState } from '../lib/exitIntent';
import { submitExitSurvey } from '../lib/feedback';

const OPTIONS = [
  { value: 'learning_excel', label: 'Learning Excel — courses, formulas, how-tos' },
  { value: 'fix_excel', label: "Fixing Excel on my Mac — shortcuts and keys that don't work right" },
  { value: 'not_excel', label: 'Something else — not really about Excel' },
  { value: 'other', label: 'Other' },
];

const RESPONSES = {
  fix_excel: {
    heading: "That's exactly what this is.",
    body: 'The Mac Excel Shortcuts app puts Paste Special, AutoSum, Fill Down and every Alt ribbon sequence back where your fingers expect them — natively, no VM. Free to try.',
    cta: 'Get the app',
    destination: '/',
  },
  learning_excel: {
    heading: "Ah — you're after the how-to side.",
    body: 'We write about Excel on Mac: shortcuts, workarounds, and the differences from Windows. Might save you some Googling.',
    cta: 'Read the blog',
    destination: '/blog',
  },
  not_excel: {
    heading: 'Fair enough — thanks for telling us.',
    body: 'That helps us keep the site honest about what it is. Have a good one.',
    cta: 'Close',
    destination: null,
  },
  other: {
    heading: 'Got it — thank you.',
    body: 'We read every one of these. It genuinely shapes what we build next.',
    cta: 'Close',
    destination: null,
  },
};

function pushDL(event, fields) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event, ...fields });
  }
}

export default function ExitIntentSurvey() {
  const router = useRouter();
  const [fire, setFire] = useState(null); // { trigger, device, scrollDepth, timeOnPageMs }
  const [answer, setAnswer] = useState('');
  const [freeText, setFreeText] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef(null);
  const prevFocus = useRef(null);

  useExitIntent(
    useCallback((meta) => {
      setFire(meta);
      pushDL('exit_survey_shown', {
        path: window.location.pathname,
        device: meta.device,
        trigger: meta.trigger,
        time_on_page_ms: meta.timeOnPageMs,
        scroll_depth: meta.scrollDepth,
      });
    }, [])
  );

  const dismiss = useCallback(
    (from) => {
      if (!fire) return;
      if (!submitted) markSurveyState('dismissed');
      pushDL('exit_survey_dismissed', {
        path: window.location.pathname,
        dismissed_from: from,
        answered: submitted,
      });
      setFire(null);
    },
    [fire, submitted]
  );

  useEffect(() => {
    if (!fire) return;
    prevFocus.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') dismiss('esc');
      if (e.key === 'Tab' && modalRef.current) {
        const f = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => modalRef.current?.querySelector('h2')?.focus(), 0);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      clearTimeout(t);
      const el = prevFocus.current;
      if (el && document.contains(el)) el.focus();
    };
  }, [fire, dismiss]);

  if (!fire) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!answer) {
      setError('Pick one so we can point you the right way.');
      return;
    }
    if (answer === 'other' && !freeText.trim()) {
      setError('A few words is all we need.');
      return;
    }
    setError('');
    setSubmitted(true);
    markSurveyState('answered');
    const text = answer === 'other' || freeText.trim() ? freeText.trim() : '';
    submitExitSurvey({
      answer,
      freeText: text,
      path: window.location.pathname,
      scrollDepth: fire.scrollDepth,
      timeOnPageMs: fire.timeOnPageMs,
      device: fire.device,
      trigger: fire.trigger,
    });
    pushDL('exit_survey_answered', {
      path: window.location.pathname,
      answer,
      has_free_text: Boolean(text),
      time_on_page_ms: fire.timeOnPageMs,
      scroll_depth: fire.scrollDepth,
    });
  };

  const onCta = (dest) => {
    pushDL('exit_survey_cta_click', {
      path: window.location.pathname,
      answer,
      destination: dest || 'dismiss',
    });
    setFire(null);
    if (dest) router.push(dest);
  };

  const resp = submitted ? RESPONSES[answer] : null;

  return createPortal(
    <div
      className="download-gate-backdrop"
      onClick={() => dismiss('backdrop')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-survey-heading"
    >
      <div className="download-gate-modal glass exit-survey-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button className="video-lightbox-close download-gate-close" onClick={() => dismiss('x_button')} aria-label="Close">
          <Icon id="x" size={20} />
        </button>

        {!submitted && (
          <form className="download-gate-step" onSubmit={onSubmit}>
            <h2 className="text-h3" id="exit-survey-heading" tabIndex={-1}>Not what you were looking for?</h2>
            <p className="text-body" id="exit-survey-desc">
              One quick question — what exactly were you after? It helps us point you the right way.
            </p>
            <fieldset className="survey-fieldset">
              <legend className="sr-only">What were you looking for?</legend>
              {OPTIONS.map((o) => (
                <label key={o.value} className={`survey-option ${answer === o.value ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="exit-survey-answer"
                    value={o.value}
                    checked={answer === o.value}
                    onChange={() => { setAnswer(o.value); setError(''); }}
                  />
                  <span>{o.label}</span>
                </label>
              ))}
            </fieldset>
            {answer === 'other' && (
              <div className="form-field">
                <label htmlFor="exit-survey-text">What were you looking for?</label>
                <textarea
                  id="exit-survey-text"
                  className="survey-textarea"
                  rows={3}
                  maxLength={1000}
                  placeholder="Tell us in a few words…"
                  value={freeText}
                  onChange={(e) => setFreeText(e.target.value)}
                  autoFocus
                />
              </div>
            )}
            {error && <span className="form-error">{error}</span>}
            <div className="download-gate-actions">
              <button type="button" className="btn-secondary" onClick={() => dismiss('x_button')}>No thanks</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        )}

        {submitted && resp && (
          <div className="download-gate-step">
            <h2 className="text-h3" id="exit-survey-heading" tabIndex={-1}>{resp.heading}</h2>
            <p className="text-body" role="status">{resp.body}</p>
            <div className="download-gate-actions">
              <button type="button" className="btn btn-primary" onClick={() => onCta(resp.destination)}>{resp.cta}</button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
