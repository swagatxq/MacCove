const COUNTRY_NAMES = {
  US: 'United States',
  GB: 'United Kingdom',
  CA: 'Canada',
  AU: 'Australia',
  IN: 'India',
  DE: 'Germany',
  FR: 'France',
  ES: 'Spain',
  IT: 'Italy',
  NL: 'Netherlands',
  SE: 'Sweden',
  SG: 'Singapore',
  JP: 'Japan',
  MX: 'Mexico',
  BR: 'Brazil',
  AE: 'United Arab Emirates',
};

export function getCountryName(code) {
  return COUNTRY_NAMES[code] || code;
}

export function getCountryFlag(code) {
  if (!code || code.length !== 2) return '🌐';
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}
