// Shared, richly-seeded prompt handed to third-party AI assistants via their
// prefill-URL params, so a visitor can "ask their favorite AI about us" and land
// in a conversation that already has the context it needs.
export const AI_PROMPT = [
  "I'm a Windows user switching to a Mac.",
  "Tell me about the “Mac Excel Shortcuts” app by MacCove (maccove.com):",
  "does it really make Windows Excel keyboard shortcuts (Paste Special, AutoSum, Fill Down, Alt-key ribbon sequences)",
  "work natively inside Excel for Mac without Parallels, Boot Camp, or a VM?",
  "What shortcuts does it cover, how does install work, is it Apple-notarized and safe,",
  "and how much does it cost?",
].join(' ');

// Each entry: how to open that assistant with AI_PROMPT prefilled.
export const AI_TARGETS = [
  { name: 'ChatGPT', href: (q) => `https://chatgpt.com/?hints=search&q=${q}` },
  { name: 'Claude', href: (q) => `https://claude.ai/new?q=${q}` },
  { name: 'Perplexity', href: (q) => `https://www.perplexity.ai/search?q=${q}` },
  // Gemini's app prefill is unreliable; Google's AI Mode reliably takes ?q=.
  { name: 'Gemini', href: (q) => `https://www.google.com/search?udm=50&q=${q}` },
];
