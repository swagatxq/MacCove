'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';
import { updateVisitorAdditionalData } from '../lib/attribution';
import { isValidEmail } from '../lib/validate';
import { COMPANY_COUNTRIES } from '../lib/companyCountries';

const EMPLOYEE_RANGES = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
const INDUSTRIES = [
  'Technology', 'Finance & Banking', 'Healthcare', 'Education', 'Retail & E-commerce',
  'Manufacturing', 'Consulting', 'Media & Entertainment', 'Real Estate', 'Government',
  'Non-profit', 'Other',
];

// Multi-step gate shown before a download: own vs. company MacBook, then (for company)
// a lead-capture form, then an admin-permissions check. onDone receives the path to
// navigate to once the gate is satisfied.
export default function DownloadGateModal({ onClose, onDone }) {
  const [step, setStep] = useState('choice');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ email: '', company: '', employees: '', industry: '', country: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const close = (e) => {
    e?.stopPropagation();
    onClose();
  };

  const chooseOwn = async () => {
    setSubmitting(true);
    await updateVisitorAdditionalData({ laptop_type: 'self' });
    onDone('/download');
  };

  const chooseCompany = () => setStep('company-form');

  const submitCompanyForm = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!isValidEmail(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!form.company.trim()) nextErrors.company = 'Company name is required.';
    if (!form.employees) nextErrors.employees = 'Select a company size.';
    if (!form.industry) nextErrors.industry = 'Select an industry.';
    if (!form.country) nextErrors.country = 'Select a country.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStep('admin');
  };

  const answerAdmin = async (hasAdmin) => {
    setSubmitting(true);
    await updateVisitorAdditionalData({
      laptop_type: 'company',
      work_email: form.email,
      company_name: form.company,
      employees: form.employees,
      industry: form.industry,
      country: form.country,
      has_admin: hasAdmin,
    });
    onDone(hasAdmin ? '/download' : '/admin-required');
  };

  return createPortal(
    <div className="download-gate-backdrop" onClick={close} role="dialog" aria-modal="true" aria-label="Before you download">
      <div className="download-gate-modal glass" onClick={(e) => e.stopPropagation()}>
        <button className="video-lightbox-close download-gate-close" onClick={close} aria-label="Close">
          <Icon id="x" size={20} />
        </button>

        {step === 'choice' && (
          <div className="download-gate-step">
            <h2 className="text-h3">Which MacBook are you using?</h2>
            <p className="text-body">This helps us make sure the app installs smoothly on your machine.</p>
            <div className="download-gate-choices">
              <button className="download-gate-choice" onClick={chooseOwn} disabled={submitting}>
                <Icon id="user" size={28} />
                <span className="download-gate-choice-title">My own MacBook</span>
                <span className="download-gate-choice-sub">Personally owned, full admin access</span>
              </button>
              <button className="download-gate-choice" onClick={chooseCompany} disabled={submitting}>
                <Icon id="monitor" size={28} />
                <span className="download-gate-choice-title">Company-provided MacBook</span>
                <span className="download-gate-choice-sub">Issued by my employer</span>
              </button>
            </div>
          </div>
        )}

        {step === 'company-form' && (
          <form className="download-gate-step" onSubmit={submitCompanyForm}>
            <h2 className="text-h3">Tell us about your company</h2>
            <p className="text-body">We'll use this to tailor setup instructions for managed Macs.</p>

            <div className="form-field">
              <label htmlFor="dg-email">Work email</label>
              <input
                id="dg-email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <span className="form-hint">Preferably your work email address.</span>
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="dg-company">Company name</label>
              <input
                id="dg-company"
                type="text"
                placeholder="Acme Inc."
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
              {errors.company && <span className="form-error">{errors.company}</span>}
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="dg-employees">Number of employees</label>
                <select
                  id="dg-employees"
                  value={form.employees}
                  onChange={(e) => setForm({ ...form, employees: e.target.value })}
                >
                  <option value="">Select…</option>
                  {EMPLOYEE_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                {errors.employees && <span className="form-error">{errors.employees}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="dg-industry">Industry</label>
                <select
                  id="dg-industry"
                  value={form.industry}
                  onChange={(e) => setForm({ ...form, industry: e.target.value })}
                >
                  <option value="">Select…</option>
                  {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
                {errors.industry && <span className="form-error">{errors.industry}</span>}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="dg-country">Country</label>
              <select
                id="dg-country"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              >
                <option value="">Select…</option>
                {COMPANY_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.country && <span className="form-error">{errors.country}</span>}
            </div>

            <div className="download-gate-actions">
              <button type="button" className="btn-secondary" onClick={() => setStep('choice')}>Back</button>
              <button type="submit" className="btn btn-primary">Continue</button>
            </div>
          </form>
        )}

        {step === 'admin' && (
          <div className="download-gate-step">
            <h2 className="text-h3">Do you have admin access on this Mac?</h2>
            <p className="text-body">Mac Excel Shortcuts needs Accessibility &amp; admin permissions to install.</p>
            <div className="download-gate-actions">
              <button className="btn-secondary" onClick={() => answerAdmin(false)} disabled={submitting}>No</button>
              <button className="btn btn-primary" onClick={() => answerAdmin(true)} disabled={submitting}>Yes</button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
