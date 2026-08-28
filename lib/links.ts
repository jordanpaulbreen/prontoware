/* Maps the human labels used across nav/footer data to real routes, so nothing
   links to "#" or a 404. Anything not explicitly mapped falls back to the store
   with a search query, which always renders a valid page. */

const exact: Record<string, string> = {
  // Shop column
  "All platforms": "/platforms",
  "All genres": "/genres",
  "Deals & flash sales": "/deals",
  "New releases": "/new",
  "Pre-orders": "/preorders",
  "Gift cards": "/gift-cards",
  "Under €10": "/deals?max=10",
  "Under €5": "/deals?max=5",
  "Under €20": "/store?max=20",
  Bundles: "/deals",
  "Flash deals": "/deals",
  // Support column
  "Help centre": "/help",
  "Activate on Steam": "/help/activate/steam",
  "Activate on Epic Games": "/help/activate/epic",
  "Activate on Xbox": "/help/activate/xbox",
  "Activate on PlayStation": "/help/activate/playstation",
  "Activate on Nintendo Switch": "/help/activate/nintendo",
  "Refunds & replacements": "/legal/returns",
  "Contact us": "/contact",
  // Company column
  "About Prontoware Games": "/about",
  "The Prontoware blog": "/blog",
  "Affiliates & creators": "/affiliates",
  Careers: "/careers",
  "Press kit": "/press",
  // Legal bar
  Privacy: "/legal/privacy",
  "Privacy Policy": "/legal/privacy",
  Terms: "/legal/terms",
  "Terms and Conditions": "/legal/terms",
  Cookies: "/legal/cookies",
  "Cookie Policy": "/legal/cookies",
  "Refund Policy": "/legal/returns",
  "Return Policy": "/legal/returns",
  "Refund, Cancellation and Withdrawal Policy": "/legal/returns",
  "Digital Delivery": "/legal/delivery",
  "Digital Delivery Policy": "/legal/delivery",
  "Delivery Policy": "/legal/delivery",
  Shipping: "/legal/delivery",
  Complaints: "/legal/complaints",
  "Complaints and Dispute Resolution": "/legal/complaints",
  "Dispute Resolution": "/legal/complaints",
  "Product-Specific Terms": "/legal/product-terms",
  "Product Terms": "/legal/product-terms",
  Imprint: "/legal/imprint",
  // Platforms panel
  Steam: "/platforms/steam",
  "Epic Games": "/platforms/epic",
  "EA App": "/platforms/ea",
  "Ubisoft Connect": "/platforms/ubisoft",
  "Xbox Series X|S": "/platforms/xbox",
  "Xbox One": "/platforms/xbox",
  "PlayStation 5": "/platforms/playstation",
  "PlayStation 4": "/platforms/playstation",
  "Nintendo Switch": "/platforms/nintendo",
  // Genres panel
  Action: "/genres/action",
  RPG: "/genres/rpg",
  Strategy: "/genres/strategy",
  Sports: "/genres/sports",
  Indie: "/genres/indie",
  Horror: "/genres/horror",
  Racing: "/genres/racing",
  Simulation: "/genres/simulation",
  // Misc panels
  "Top 100 this week": "/charts",
  "Top rated all time": "/charts",
  "Release calendar": "/new",
  "Out now": "/new",
};

export function resolveLink(label: string): string {
  if (exact[label]) return exact[label];
  return `/store?q=${encodeURIComponent(label)}`;
}
