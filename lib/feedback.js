// Fire-and-forget sink for the exit-intent survey. Sends to a dedicated feedback
// endpoint if the backend has one, and always mirrors the answer into the existing
// visitor additional_data record so nothing is lost if that endpoint isn't deployed.
import { getVisitorId, updateVisitorAdditionalData } from './attribution';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.maccove.com';
const ATTRIBUTION_PARAMS = ['gclid', 'li_fat_id', 'rdt_cid', 'twclid', 'utm_source', 'utm_medium', 'utm_campaign'];

export async function submitExitSurvey({ answer, freeText, path, scrollDepth, timeOnPageMs, device, trigger }) {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const attribution = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const value = params.get(key);
    if (value) attribution[key] = value;
  }

  const body = {
    visitor_id: getVisitorId(),
    answer,
    free_text: freeText || null,
    path,
    scroll_depth: scrollDepth,
    time_on_page_ms: timeOnPageMs,
    device,
    trigger,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
    ts_client: new Date().toISOString(),
    ...attribution,
  };

  fetch(`${API_BASE_URL}/api/v1/feedback/exit-survey`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});

  // Backward-safe mirror — this endpoint already exists.
  updateVisitorAdditionalData({
    exit_survey_answer: answer,
    exit_survey_free_text: freeText || null,
    exit_survey_path: path,
  }).catch(() => {});
}
