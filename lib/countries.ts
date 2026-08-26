/* Country dropdown for registration + checkout.
   Sanctioned / excluded countries are removed per compliance. Extend the
   `blocked` set as the policy grows — the list below is derived from it. */

export const blockedCountries = new Set(["RU", "BY", "IR", "KP"]);

const all: { code: string; name: string }[] = [
  { code: "AL", name: "Albania" },
  { code: "AD", name: "Andorra" },
  { code: "AT", name: "Austria" },
  { code: "AU", name: "Australia" },
  { code: "BE", name: "Belgium" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BG", name: "Bulgaria" },
  { code: "BR", name: "Brazil" },
  { code: "CA", name: "Canada" },
  { code: "CH", name: "Switzerland" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czechia" },
  { code: "DE", name: "Germany" },
  { code: "DK", name: "Denmark" },
  { code: "EE", name: "Estonia" },
  { code: "ES", name: "Spain" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GB", name: "United Kingdom" },
  { code: "GR", name: "Greece" },
  { code: "HR", name: "Croatia" },
  { code: "HU", name: "Hungary" },
  { code: "IE", name: "Ireland" },
  { code: "IS", name: "Iceland" },
  { code: "IT", name: "Italy" },
  { code: "JP", name: "Japan" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "LV", name: "Latvia" },
  { code: "MT", name: "Malta" },
  { code: "MX", name: "Mexico" },
  { code: "NL", name: "Netherlands" },
  { code: "NO", name: "Norway" },
  { code: "NZ", name: "New Zealand" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "RS", name: "Serbia" },
  { code: "SE", name: "Sweden" },
  { code: "SI", name: "Slovenia" },
  { code: "SK", name: "Slovakia" },
  { code: "TR", name: "Türkiye" },
  { code: "UA", name: "Ukraine" },
  { code: "US", name: "United States" },
  // Blocked entries are intentionally listed so the filter is auditable.
  { code: "RU", name: "Russia" },
  { code: "BY", name: "Belarus" },
  { code: "IR", name: "Iran" },
  { code: "KP", name: "North Korea" },
];

export const countries = all
  .filter((c) => !blockedCountries.has(c.code))
  .sort((a, b) => a.name.localeCompare(b.name));

export const isCountryAllowed = (code: string) =>
  !blockedCountries.has(code) && countries.some((c) => c.code === code);
