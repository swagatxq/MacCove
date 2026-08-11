'use client';
import { useState } from 'react';
import Icon from './Icon';
import { faqs as allFaqs } from '../lib/faqs';

const HOMEPAGE_QUESTIONS = [
  'What is Mac Excel Shortcuts?',
  'What platforms does Mac Excel Shortcuts support?',
  'Is there a free version?',
  'Can I share shortcuts with my team?',
  'Do shortcuts run when my device is offline?',
  'Does the app collect my data?',
  'Are there any discounts?',
];

export default function FAQ({ items, showSeeAll = false }) {
  const faqs = items || allFaqs.filter((f) => HOMEPAGE_QUESTIONS.includes(f.q));
  const [active, setActive] = useState(null);
  const toggle = (i) => setActive(active === i ? null : i);

  return (
    <>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div className={`faq-item glass ${active === i ? 'active' : ''}`} key={i}>
            <button className="faq-question" onClick={() => toggle(i)}>
              <span className="faq-question-left">
                <span className="faq-question-icon-wrap"><Icon id={faq.icon} size={16} /></span>
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
      {showSeeAll && (
        <div className="faq-see-all">
          <a href="/faq" className="faq-see-all-link">
            See all FAQs
            <Icon id="chevron-right" size={16} className="arrow" />
          </a>
        </div>
      )}
    </>
  );
}
