'use client';
import { useState } from 'react';
import Icon from './Icon';

const faqs = [
  { q: 'What platforms does Mac Excel Shortcuts support?', a: 'Mac Excel Shortcuts is available on macOS 14.0+ (Sonoma and above).' },
  { q: 'Is there a free version?', a: 'Yes — MacCove is free to download and use for up to trial usage limits or 7 days. For unlimited shortcuts, advanced actions, cloud sync, and team sharing, upgrade to for $4.99/month or $49.99/lifetime.' },
  { q: 'Can I share shortcuts with my team?', a: 'No, each license covers only one Mac for now.' },
  { q: 'Do shortcuts run when my device is offline?', a: "Yes — all shortcuts run locally on your device upto 24 hours in trial period and 7 days post upgrade. They don't require an internet connection as part of our local-first architecture." },
  { q: 'What happens to my data if I cancel my subscription?', a: "We do not collect any data." },
  { q: 'Are there any discounts?', a: "Yes — Refer two people to Mac Excel Shortcuts, and get 50% on your upgrade." },
];

export default function FAQ() {
  const [active, setActive] = useState(null);
  const toggle = (i) => setActive(active === i ? null : i);

  return (
    <div className="faq-list">
      {faqs.map((faq, i) => (
        <div className={`faq-item glass ${active === i ? 'active' : ''}`} key={i}>
          <button className="faq-question" onClick={() => toggle(i)}>
            <span className="faq-question-left">
              <span className="faq-question-icon-wrap"><Icon id="help-circle" size={16} /></span>
              {faq.q}
            </span>
            <span className="icon icon-20 faq-chevron">
              <svg><use href="#i-chevron-down" /></svg>
            </span>
          </button>
          <div className="faq-answer">
            <div className="faq-answer-inner">{faq.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
