import type { GenreId, Game, PlatformId } from "./types";

/* --------------------------------------------------------------------------
   Platforms & genres — the way gamers shop
   -------------------------------------------------------------------------- */

export const platforms: Record<
  PlatformId,
  { id: PlatformId; name: string; short: string; token: string }
> = {
  steam: { id: "steam", name: "Steam", short: "PC", token: "var(--ma-steam)" },
  epic: { id: "epic", name: "Epic Games", short: "PC", token: "var(--ma-epic)" },
  xbox: { id: "xbox", name: "Xbox", short: "XSX", token: "var(--ma-xbox)" },
  playstation: {
    id: "playstation",
    name: "PlayStation",
    short: "PS5",
    token: "var(--ma-playstation)",
  },
  nintendo: { id: "nintendo", name: "Nintendo", short: "SW", token: "var(--ma-nintendo)" },
  ea: { id: "ea", name: "EA App", short: "PC", token: "var(--ma-ea)" },
  ubisoft: { id: "ubisoft", name: "Ubisoft", short: "PC", token: "var(--ma-ubisoft)" },
};

export const platformOrder: PlatformId[] = [
  "steam",
  "epic",
  "xbox",
  "playstation",
  "nintendo",
  "ea",
  "ubisoft",
];

export const genres: Record<GenreId, { id: GenreId; name: string; blurb: string }> = {
  action: { id: "action", name: "Action", blurb: "Reflex-first, loud and relentless" },
  rpg: { id: "rpg", name: "RPG", blurb: "Hundred-hour worlds and hard choices" },
  strategy: { id: "strategy", name: "Strategy", blurb: "One more turn, every time" },
  sports: { id: "sports", name: "Sports", blurb: "Seasons, leagues and rivalries" },
  indie: { id: "indie", name: "Indie", blurb: "Small teams, big ideas" },
  horror: { id: "horror", name: "Horror", blurb: "Play with the lights off" },
  racing: { id: "racing", name: "Racing", blurb: "Apex, brake, repeat" },
  simulation: { id: "simulation", name: "Simulation", blurb: "Build, manage, obsess" },
};

export const genreOrder: GenreId[] = [
  "action",
  "rpg",
  "strategy",
  "sports",
  "indie",
  "horror",
  "racing",
  "simulation",
];

/* --------------------------------------------------------------------------
   Catalogue
   -------------------------------------------------------------------------- */

export const games: Game[] = [
  {
    id: "g01",
    slug: "neon-requiem",
    title: "Neon Requiem",
    studio: "Halcyon Works",
    platform: "steam",
    genres: ["action", "rpg"],
    rating: 4.8,
    reviews: 21840,
    price: 44.99,
    oldPrice: 69.99,
    region: "Global",
    art: { base: "#160B2B", dominant: "#E93D82", accent: "#3DD6F5", pattern: 0 },
    instant: true,
    bestseller: true,
    flashMinutes: 214,
  },
  {
    id: "g02",
    slug: "starfall-protocol",
    title: "Starfall Protocol",
    studio: "Orbital Ninety",
    platform: "epic",
    genres: ["action", "strategy"],
    rating: 4.6,
    reviews: 9120,
    price: 34.49,
    oldPrice: 59.99,
    region: "Global",
    art: { base: "#0B1430", dominant: "#3DD6F5", accent: "#7C9BEB", pattern: 1 },
    instant: true,
    flashMinutes: 96,
  },
  {
    id: "g03",
    slug: "hollow-lantern",
    title: "Hollow Lantern",
    studio: "Pale Moth",
    platform: "steam",
    genres: ["horror", "indie"],
    rating: 4.9,
    reviews: 15310,
    price: 17.99,
    oldPrice: 24.99,
    region: "Global",
    art: { base: "#12091F", dominant: "#8E6BF5", accent: "#FFC53D", pattern: 5 },
    instant: true,
    bestseller: true,
  },
  {
    id: "g04",
    slug: "velocity-drift-9",
    title: "Velocity Drift 9",
    studio: "Redline Collective",
    platform: "playstation",
    genres: ["racing", "sports"],
    rating: 4.4,
    reviews: 6740,
    price: 39.99,
    oldPrice: 79.99,
    region: "EU",
    art: { base: "#1B0C1C", dominant: "#FF8A3D", accent: "#3DD6F5", pattern: 2 },
    instant: true,
    flashMinutes: 47,
  },
  {
    id: "g05",
    slug: "ashen-dynasty",
    title: "Ashen Dynasty",
    studio: "Ninefold Studio",
    platform: "steam",
    genres: ["rpg", "strategy"],
    rating: 4.7,
    reviews: 18220,
    price: 49.99,
    oldPrice: 59.99,
    region: "Global",
    art: { base: "#1A0F13", dominant: "#F0554A", accent: "#FFC53D", pattern: 3 },
    instant: true,
  },
  {
    id: "g06",
    slug: "tidebreaker",
    title: "Tidebreaker",
    studio: "Blue Kelp",
    platform: "nintendo",
    genres: ["indie", "action"],
    rating: 4.5,
    reviews: 3980,
    price: 14.49,
    oldPrice: 19.99,
    region: "EU",
    art: { base: "#08202B", dominant: "#3EE0CF", accent: "#EEECFA", pattern: 4 },
    instant: true,
    isNew: true,
  },
  {
    id: "g07",
    slug: "iron-parliament",
    title: "Iron Parliament",
    studio: "Cogward",
    platform: "steam",
    genres: ["strategy", "simulation"],
    rating: 4.3,
    reviews: 5210,
    price: 29.99,
    region: "Global",
    art: { base: "#141024", dominant: "#B9BFD4", accent: "#FFC53D", pattern: 1 },
    instant: true,
  },
  {
    id: "g08",
    slug: "midnight-league-26",
    title: "Midnight League 26",
    studio: "Fielder Interactive",
    platform: "ea",
    genres: ["sports"],
    rating: 4.1,
    reviews: 12430,
    price: 54.99,
    oldPrice: 69.99,
    region: "Global",
    art: { base: "#0C1A14", dominant: "#3ECF8E", accent: "#EEECFA", pattern: 2 },
    instant: true,
    bestseller: true,
  },
  {
    id: "g09",
    slug: "grave-of-signals",
    title: "Grave of Signals",
    studio: "Deadwave",
    platform: "xbox",
    genres: ["horror", "action"],
    rating: 4.6,
    reviews: 7710,
    price: 24.99,
    oldPrice: 44.99,
    region: "Global",
    art: { base: "#100A18", dominant: "#6FCF97", accent: "#F0554A", pattern: 5 },
    instant: true,
    flashMinutes: 320,
  },
  {
    id: "g10",
    slug: "paper-kingdoms",
    title: "Paper Kingdoms",
    studio: "Foldline",
    platform: "nintendo",
    genres: ["indie", "strategy"],
    rating: 4.8,
    reviews: 4460,
    price: 9.99,
    oldPrice: 16.99,
    region: "Global",
    art: { base: "#1B1226", dominant: "#FFC53D", accent: "#E93D82", pattern: 3 },
    instant: true,
  },
  {
    id: "g11",
    slug: "orbital-freight-co",
    title: "Orbital Freight Co.",
    studio: "Vaculine",
    platform: "steam",
    genres: ["simulation", "strategy"],
    rating: 4.2,
    reviews: 2870,
    price: 19.99,
    region: "Global",
    art: { base: "#0A1226", dominant: "#7C9BEB", accent: "#3DD6F5", pattern: 1 },
    instant: true,
    isNew: true,
  },
  {
    id: "g12",
    slug: "crimson-vector",
    title: "Crimson Vector",
    studio: "Sabreglass",
    platform: "ubisoft",
    genres: ["action", "racing"],
    rating: 4.0,
    reviews: 3320,
    price: 27.49,
    oldPrice: 49.99,
    region: "EU",
    art: { base: "#1C0A18", dominant: "#E93D82", accent: "#86CFE8", pattern: 2 },
    instant: true,
  },
  {
    id: "g13",
    slug: "the-long-frost",
    title: "The Long Frost",
    studio: "Northlight Two",
    platform: "steam",
    genres: ["rpg", "simulation"],
    rating: 4.7,
    reviews: 10560,
    price: 32.99,
    oldPrice: 39.99,
    region: "Global",
    art: { base: "#0B1728", dominant: "#9FD8F5", accent: "#EEECFA", pattern: 4 },
    instant: true,
  },
  {
    id: "g14",
    slug: "cabinet-heroes",
    title: "Cabinet Heroes",
    studio: "Quarterfeed",
    platform: "steam",
    genres: ["indie", "action"],
    rating: 4.9,
    reviews: 8890,
    price: 4.99,
    oldPrice: 12.99,
    region: "Global",
    art: { base: "#160D2A", dominant: "#E93D82", accent: "#FFC53D", pattern: 3 },
    instant: true,
    bestseller: true,
    flashMinutes: 168,
  },
  {
    id: "g15",
    slug: "silent-orchard",
    title: "Silent Orchard",
    studio: "Lowfield",
    platform: "playstation",
    genres: ["horror", "indie"],
    rating: 4.4,
    reviews: 2210,
    price: 8.49,
    oldPrice: 19.99,
    region: "EU",
    art: { base: "#0F1410", dominant: "#94D96B", accent: "#F5A93D", pattern: 5 },
    instant: true,
  },
  {
    id: "g16",
    slug: "apex-circuit-x",
    title: "Apex Circuit X",
    studio: "Redline Collective",
    platform: "xbox",
    genres: ["racing", "sports"],
    rating: 4.3,
    reviews: 5910,
    price: 42.99,
    oldPrice: 59.99,
    region: "Global",
    art: { base: "#0D1526", dominant: "#3DD6F5", accent: "#FFC53D", pattern: 2 },
    instant: true,
  },
  {
    id: "g17",
    slug: "witchlight-tactics",
    title: "Witchlight Tactics",
    studio: "Hex & Halo",
    platform: "steam",
    genres: ["strategy", "rpg"],
    rating: 4.6,
    reviews: 6120,
    price: 22.99,
    oldPrice: 29.99,
    region: "Global",
    art: { base: "#150B26", dominant: "#B98AF5", accent: "#3DD6F5", pattern: 0 },
    instant: true,
    isNew: true,
  },
  {
    id: "g18",
    slug: "dust-and-diesel",
    title: "Dust & Diesel",
    studio: "Grit Foundry",
    platform: "epic",
    genres: ["action", "racing"],
    rating: 4.2,
    reviews: 4470,
    price: 16.99,
    oldPrice: 34.99,
    region: "Global",
    art: { base: "#1B140A", dominant: "#F5A93D", accent: "#F0554A", pattern: 2 },
    instant: true,
  },
  {
    id: "g19",
    slug: "signal-lost-remaster",
    title: "Signal Lost: Remaster",
    studio: "Deadwave",
    platform: "steam",
    genres: ["horror", "action"],
    rating: 4.5,
    reviews: 9930,
    price: 12.99,
    oldPrice: 29.99,
    region: "Global",
    art: { base: "#0E0B1E", dominant: "#56E1FF", accent: "#E93D82", pattern: 4 },
    instant: true,
    flashMinutes: 61,
  },
  {
    id: "g20",
    slug: "harvest-protocol",
    title: "Harvest Protocol",
    studio: "Softbloom",
    platform: "nintendo",
    genres: ["simulation", "indie"],
    rating: 4.7,
    reviews: 3760,
    price: 18.49,
    region: "Global",
    art: { base: "#101B14", dominant: "#3ECF8E", accent: "#FFC53D", pattern: 3 },
    instant: true,
  },
  {
    id: "g21",
    slug: "eclipse-warden",
    title: "Eclipse Warden",
    studio: "Halcyon Works",
    platform: "playstation",
    genres: ["action", "rpg"],
    rating: 4.8,
    reviews: 1120,
    price: 64.99,
    region: "Global",
    art: { base: "#120A24", dominant: "#8E6BF5", accent: "#3DD6F5", pattern: 0 },
    instant: false,
    preorder: true,
    releaseLabel: "Unlocks 14 Nov",
  },
  {
    id: "g22",
    slug: "hyperloop-tycoon",
    title: "Hyperloop Tycoon",
    studio: "Vaculine",
    platform: "steam",
    genres: ["simulation", "strategy"],
    rating: 4.4,
    reviews: 890,
    price: 27.99,
    region: "Global",
    art: { base: "#0A1526", dominant: "#3DD6F5", accent: "#B9BFD4", pattern: 1 },
    instant: false,
    preorder: true,
    releaseLabel: "Unlocks 02 Dec",
  },
  {
    id: "g23",
    slug: "ronin-of-the-static",
    title: "Ronin of the Static",
    studio: "Quarterfeed",
    platform: "epic",
    genres: ["action", "indie"],
    rating: 4.9,
    reviews: 640,
    price: 21.99,
    region: "Global",
    art: { base: "#1A0B1F", dominant: "#E93D82", accent: "#56E1FF", pattern: 5 },
    instant: false,
    preorder: true,
    releaseLabel: "Unlocks 21 Nov",
  },
  {
    id: "g24",
    slug: "gridiron-nights",
    title: "Gridiron Nights",
    studio: "Fielder Interactive",
    platform: "ea",
    genres: ["sports"],
    rating: 4.0,
    reviews: 2140,
    price: 47.99,
    oldPrice: 59.99,
    region: "US",
    art: { base: "#0B1220", dominant: "#D98AA8", accent: "#EEECFA", pattern: 2 },
    instant: true,
    isNew: true,
  },
  {
    id: "g25",
    slug: "arcadia-rewind",
    title: "Arcadia Rewind",
    studio: "Quarterfeed",
    platform: "steam",
    genres: ["indie", "racing"],
    rating: 4.6,
    reviews: 5320,
    price: 3.99,
    oldPrice: 14.99,
    region: "Global",
    art: { base: "#170F2C", dominant: "#FFC53D", accent: "#3DD6F5", pattern: 3 },
    instant: true,
  },
  {
    id: "g26",
    slug: "mirefall",
    title: "Mirefall",
    studio: "Pale Moth",
    platform: "xbox",
    genres: ["rpg", "horror"],
    rating: 4.5,
    reviews: 4010,
    price: 9.49,
    oldPrice: 24.99,
    region: "Global",
    art: { base: "#0F1418", dominant: "#6FCF97", accent: "#B98AF5", pattern: 5 },
    instant: true,
  },
  {
    id: "g27",
    slug: "shatterline-arena",
    title: "Shatterline Arena",
    studio: "Sabreglass",
    platform: "steam",
    genres: ["action", "sports"],
    rating: 4.1,
    reviews: 7420,
    price: 6.99,
    oldPrice: 19.99,
    region: "Global",
    art: { base: "#100C22", dominant: "#86CFE8", accent: "#E93D82", pattern: 4 },
    instant: true,
    isNew: true,
  },
  {
    id: "g28",
    slug: "lanternway",
    title: "Lanternway",
    studio: "Softbloom",
    platform: "nintendo",
    genres: ["indie", "simulation"],
    rating: 4.8,
    reviews: 2650,
    price: 11.99,
    oldPrice: 17.99,
    region: "EU",
    art: { base: "#1A1226", dominant: "#FFC53D", accent: "#3EE0CF", pattern: 0 },
    instant: true,
  },
  {
    id: "g29",
    slug: "black-harbour",
    title: "Black Harbour",
    studio: "Northlight Two",
    platform: "ubisoft",
    genres: ["action", "strategy"],
    rating: 4.3,
    reviews: 3190,
    price: 23.49,
    oldPrice: 49.99,
    region: "EU",
    art: { base: "#091522", dominant: "#86CFE8", accent: "#FFC53D", pattern: 1 },
    instant: true,
  },
  {
    id: "g30",
    slug: "coin-op-legends",
    title: "Coin-Op Legends",
    studio: "Quarterfeed",
    platform: "steam",
    genres: ["indie", "action"],
    rating: 4.7,
    reviews: 6180,
    price: 4.49,
    oldPrice: 9.99,
    region: "Global",
    art: { base: "#140B24", dominant: "#E93D82", accent: "#FFC53D", pattern: 3 },
    instant: true,
  },
];

/* --------------------------------------------------------------------------
   Derived collections used across the homepage
   -------------------------------------------------------------------------- */

export const bySlug = (slug: string) => games.find((g) => g.slug === slug);

export const discountOf = (g: Game) =>
  g.oldPrice ? Math.round((1 - g.price / g.oldPrice) * 100) : 0;

export const deals = games
  .filter((g) => discountOf(g) >= 30)
  .sort((a, b) => discountOf(b) - discountOf(a));

export const flashDeals = games.filter((g) => g.flashMinutes);

export const topCharts = [...games]
  .filter((g) => !g.preorder)
  .sort((a, b) => b.reviews * b.rating - a.reviews * a.rating)
  .slice(0, 10);

export const newReleases = games.filter((g) => g.isNew || g.rating >= 4.7).slice(0, 12);

export const preorders = games.filter((g) => g.preorder);

export const bargainsUnder10 = games.filter((g) => g.price < 10);

export const bargainsUnder5 = games.filter((g) => g.price < 5);

export const heroSlides = ["neon-requiem", "ashen-dynasty", "starfall-protocol"]
  .map(bySlug)
  .filter(Boolean) as Game[];

export const heroSpotlights: { kind: string; slug: string; note: string }[] = [
  { kind: "Deal of the day", slug: "velocity-drift-9", note: "Ends at midnight" },
  { kind: "New release", slug: "tidebreaker", note: "Out now" },
  { kind: "Pre-order", slug: "eclipse-warden", note: "Unlocks 14 Nov" },
];

export const gamesByPlatform = (id: PlatformId) => games.filter((g) => g.platform === id);

export const gamesByGenre = (id: GenreId) => games.filter((g) => g.genres.includes(id));

/* --------------------------------------------------------------------------
   Navigation model — each entry drives one mega-panel
   -------------------------------------------------------------------------- */

export type NavColumn = { title: string; links: { label: string; note?: string }[] };

export type NavItem = {
  id: string;
  label: string;
  badge?: "hot" | "new";
  panel?: {
    columns: NavColumn[];
    railTitle: string;
    railSlugs: string[];
    featured: { slug: string; kicker: string; blurb: string };
  };
};

export const nav: NavItem[] = [
  {
    id: "platforms",
    label: "Platforms",
    panel: {
      columns: [
        {
          title: "PC stores",
          links: [
            { label: "Steam", note: "8 412 keys" },
            { label: "Epic Games", note: "1 908 keys" },
            { label: "EA App", note: "640 keys" },
            { label: "Ubisoft Connect", note: "512 keys" },
            { label: "GOG (DRM-free)", note: "1 130 keys" },
          ],
        },
        {
          title: "Consoles",
          links: [
            { label: "Xbox Series X|S", note: "2 240 keys" },
            { label: "Xbox One", note: "1 880 keys" },
            { label: "PlayStation 5", note: "1 960 keys" },
            { label: "PlayStation 4", note: "1 410 keys" },
            { label: "Nintendo Switch", note: "980 keys" },
          ],
        },
        {
          title: "Also in store",
          links: [
            { label: "Subscriptions", note: "Game Pass, PS Plus" },
            { label: "In-game currency" },
            { label: "DLC & season passes" },
            { label: "Software & tools" },
          ],
        },
      ],
      railTitle: "Hot on Steam right now",
      railSlugs: ["neon-requiem", "cabinet-heroes", "the-long-frost", "witchlight-tactics"],
      featured: {
        slug: "ashen-dynasty",
        kicker: "Platform pick",
        blurb: "Global key, activates on Steam in under a minute.",
      },
    },
  },
  {
    id: "genres",
    label: "Genres",
    panel: {
      columns: [
        {
          title: "Most played",
          links: [
            { label: "Action", note: "3 120 keys" },
            { label: "RPG", note: "1 760 keys" },
            { label: "Strategy", note: "1 240 keys" },
            { label: "Sports", note: "610 keys" },
          ],
        },
        {
          title: "Late-night picks",
          links: [
            { label: "Indie", note: "2 480 keys" },
            { label: "Horror", note: "740 keys" },
            { label: "Racing", note: "520 keys" },
            { label: "Simulation", note: "890 keys" },
          ],
        },
        {
          title: "Moods",
          links: [
            { label: "Co-op with friends" },
            { label: "One more turn" },
            { label: "Story-first" },
            { label: "Play with the lights off" },
          ],
        },
      ],
      railTitle: "Trending in Horror",
      railSlugs: ["hollow-lantern", "grave-of-signals", "signal-lost-remaster", "mirefall"],
      featured: {
        slug: "hollow-lantern",
        kicker: "Genre spotlight",
        blurb: "The highest-rated horror key on the store this month.",
      },
    },
  },
  {
    id: "deals",
    label: "Deals",
    badge: "hot",
    panel: {
      columns: [
        {
          title: "Save now",
          links: [
            { label: "Flash deals", note: "Ends tonight" },
            { label: "Under €10" },
            { label: "Under €5" },
            { label: "Bundles", note: "Save up to 70%" },
          ],
        },
        {
          title: "By discount",
          links: [
            { label: "50% off and more" },
            { label: "70% off and more" },
            { label: "90% off and more" },
            { label: "Price-drop alerts" },
          ],
        },
        {
          title: "Rewards club",
          links: [
            { label: "Member prices", note: "Free to join" },
            { label: "Deals newsletter" },
            { label: "Wishlist alerts" },
          ],
        },
      ],
      railTitle: "Ending soonest",
      railSlugs: ["velocity-drift-9", "signal-lost-remaster", "starfall-protocol", "neon-requiem"],
      featured: {
        slug: "velocity-drift-9",
        kicker: "Deal of the day",
        blurb: "50% off until the clock hits midnight CET.",
      },
    },
  },
  {
    id: "new",
    label: "New Releases",
    panel: {
      columns: [
        {
          title: "This week",
          links: [
            { label: "Out now" },
            { label: "Last 7 days" },
            { label: "Last 30 days" },
            { label: "Coming soon" },
          ],
        },
        {
          title: "By platform",
          links: [
            { label: "New on Steam" },
            { label: "New on PlayStation" },
            { label: "New on Xbox" },
            { label: "New on Switch" },
          ],
        },
        {
          title: "Editorial",
          links: [
            { label: "Editor's review" },
            { label: "Release calendar" },
            { label: "What we're playing" },
          ],
        },
      ],
      railTitle: "Fresh keys",
      railSlugs: ["tidebreaker", "orbital-freight-co", "shatterline-arena", "gridiron-nights"],
      featured: {
        slug: "tidebreaker",
        kicker: "New release",
        blurb: "Launch price locked for the first 72 hours.",
      },
    },
  },
  {
    id: "preorders",
    label: "Pre-orders",
    panel: {
      columns: [
        {
          title: "Pre-order now",
          links: [
            { label: "Biggest upcoming" },
            { label: "Editions & bonuses" },
            { label: "Unlocks this month" },
            { label: "Unlocks next quarter" },
          ],
        },
        {
          title: "How it works",
          links: [
            { label: "Key delivered at unlock" },
            { label: "Price-drop guarantee" },
            { label: "Cancel any time before release" },
          ],
        },
      ],
      railTitle: "Most wishlisted",
      railSlugs: ["eclipse-warden", "ronin-of-the-static", "hyperloop-tycoon"],
      featured: {
        slug: "eclipse-warden",
        kicker: "Pre-order",
        blurb: "Key lands in your inbox the second it unlocks.",
      },
    },
  },
  {
    id: "charts",
    label: "Top Charts",
    panel: {
      columns: [
        {
          title: "Charts",
          links: [
            { label: "Top 100 this week" },
            { label: "Top rated all time" },
            { label: "Most gifted" },
            { label: "Biggest movers" },
          ],
        },
        {
          title: "By region",
          links: [{ label: "Global" }, { label: "Europe" }, { label: "North America" }],
        },
      ],
      railTitle: "This week's top 4",
      railSlugs: ["neon-requiem", "hollow-lantern", "midnight-league-26", "cabinet-heroes"],
      featured: {
        slug: "neon-requiem",
        kicker: "#01 this week",
        blurb: "21 840 verified reviews and still climbing.",
      },
    },
  },
  {
    id: "giftcards",
    label: "Gift Cards",
    badge: "new",
    panel: {
      columns: [
        {
          title: "Top-ups",
          links: [
            { label: "Steam Wallet" },
            { label: "PlayStation Store" },
            { label: "Xbox Gift Card" },
            { label: "Nintendo eShop" },
          ],
        },
        {
          title: "Amounts",
          links: [{ label: "€10" }, { label: "€20" }, { label: "€50" }, { label: "€100" }],
        },
        {
          title: "Gifting",
          links: [
            { label: "Send by email" },
            { label: "Schedule for midnight" },
            { label: "Add a message" },
          ],
        },
      ],
      railTitle: "Popular top-ups",
      railSlugs: ["coin-op-legends", "arcadia-rewind", "paper-kingdoms"],
      featured: {
        slug: "paper-kingdoms",
        kicker: "Gift idea",
        blurb: "Pair a €20 wallet card with an indie classic.",
      },
    },
  },
];

/* --------------------------------------------------------------------------
   Static content blocks
   -------------------------------------------------------------------------- */

export const promoStrip = [
  "Instant email delivery — keys in under 60 seconds",
  "100% official keys from authorised distributors",
  "24/7 human support, even at 3 a.m.",
  "Deals drop at midnight CET",
];

export const trustRibbon = [
  { icon: "bolt", label: "Instant email delivery" },
  { icon: "badge", label: "Official distributors" },
  { icon: "shield", label: "Secure payment · PCI DSS" },
  { icon: "star", label: "Reviewed by verified buyers" },
];

export const steps = [
  {
    title: "Buy in two taps",
    body: "Pay securely by Visa or Mastercard. No account required — checkout as a guest.",
    label: "01 · insert coin",
  },
  {
    title: "Receive your key instantly",
    body: "The key lands in your inbox and your library here, usually in under a minute.",
    label: "02 · key granted",
  },
  {
    title: "Activate on your platform",
    body: "Paste it into Steam, Epic, Xbox, PlayStation or Switch. Step-by-step guides included.",
    label: "03 · press start",
  },
];

export const benefits = [
  {
    icon: "badge",
    title: "Official keys only",
    body: "Every key is sourced from authorised distributors and publishers. Region is always stated up front.",
  },
  {
    icon: "bolt",
    title: "Instant delivery",
    body: "Most orders are delivered in under 60 seconds, day or night.",
  },
  {
    icon: "shield",
    title: "Secure payment",
    body: "3-D Secure, PCI-DSS compliant processing and zero card details stored on our side.",
  },
  {
    icon: "chat",
    title: "Support that answers",
    body: "Real people on email support 24/7, median first reply under four minutes.",
  },
];

export const testimonials = [
  {
    quote:
      "Ordered at 1 a.m., key was in my inbox before the download finished. That never happens.",
    name: "Kasia W.",
    meta: "142 orders · Steam",
  },
  {
    quote:
      "The region badge on every card is the reason I stayed. No surprises at activation.",
    name: "Tom R.",
    meta: "38 orders · Xbox",
  },
  {
    quote: "Support fixed a wrong-region order in six minutes, at the weekend.",
    name: "Emin K.",
    meta: "21 orders · PlayStation",
  },
];

export const faqs = [
  {
    q: "How fast will I get my key?",
    a: "Almost always instantly. As soon as payment clears, the key appears in your inbox and in your Prontoware Games library. Pre-orders are delivered the moment the game unlocks.",
  },
  {
    q: "Are these keys official?",
    a: "Yes. We buy only from authorised distributors and publishers, and every product page states the exact edition, platform and activation region before you pay.",
  },
  {
    q: "What does the region badge mean?",
    a: "A Global key activates anywhere. An EU or US key only activates on an account registered in that region. We show the badge on every card, filter and receipt.",
  },
  {
    q: "How do I activate a key?",
    a: "Each order links to a short guide for its platform — Steam, Epic, EA App, Ubisoft Connect, Xbox, PlayStation or Nintendo eShop. Most take under a minute.",
  },
  {
    q: "Can I get a refund?",
    a: "Unrevealed keys can be refunded within 14 days. Once a key has been revealed it cannot be returned, but if it does not work our support team replaces it or refunds you in full.",
  },
  {
    q: "Do you charge extra fees at checkout?",
    a: "No. The price you see includes VAT for your country, and we never add processing fees.",
  },
];

export const giftCards: { key: string; name: string; token: string; amounts: number[] }[] = [
  { key: "steam", name: "Steam", token: "var(--ma-steam)", amounts: [5, 10, 20, 50, 100] },
  { key: "playstation", name: "PlayStation Store", token: "var(--ma-playstation)", amounts: [10, 20, 25, 50, 100] },
  { key: "xbox", name: "Xbox", token: "var(--ma-xbox)", amounts: [10, 15, 25, 50, 100] },
  { key: "gamepass", name: "Xbox Game Pass", token: "var(--ma-xbox)", amounts: [15, 30, 45] },
  { key: "psplus", name: "PlayStation Plus", token: "var(--ma-playstation)", amounts: [25, 40, 60] },
  { key: "nintendo", name: "Nintendo eShop", token: "var(--ma-nintendo)", amounts: [15, 25, 50, 100] },
  { key: "ea", name: "EA Play", token: "var(--ma-ea)", amounts: [15, 30, 50] },
  { key: "netflix", name: "Netflix", token: "#E50914", amounts: [15, 25, 50] },
  { key: "spotify", name: "Spotify", token: "#1DB954", amounts: [10, 30, 60] },
  { key: "discord", name: "Discord Nitro", token: "#5865F2", amounts: [10, 20, 50] },
  { key: "twitch", name: "Twitch", token: "#9146FF", amounts: [10, 25, 50] },
  { key: "roblox", name: "Roblox", token: "#00A2FF", amounts: [10, 20, 25, 50] },
  { key: "googleplay", name: "Google Play", token: "#34A853", amounts: [10, 25, 50, 100] },
  { key: "appstore", name: "App Store & iTunes", token: "#B9BFD4", amounts: [15, 25, 50, 100] },
  { key: "amazon", name: "Amazon", token: "#FF9900", amounts: [15, 25, 50, 100] },
  { key: "uber", name: "Uber", token: "#9CA3AF", amounts: [15, 25, 50] },
];

export const currencies = [
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "GBP", symbol: "£", label: "Pound Sterling" },
];

export const footerColumns = [
  {
    title: "Shop",
    links: [
      "All platforms",
      "All genres",
      "Deals & flash sales",
      "New releases",
      "Pre-orders",
      "Gift cards",
      "Under €10",
    ],
  },
  {
    title: "Support",
    links: [
      "Help centre",
      "Activate on Steam",
      "Activate on Epic Games",
      "Activate on Xbox",
      "Activate on PlayStation",
      "Activate on Nintendo Switch",
      "Refunds & replacements",
      "Contact us",
    ],
  },
  {
    title: "Company",
    links: [
      "About Prontoware Games",
      "The Prontoware blog",
      "Affiliates & creators",
      "Careers",
      "Press kit",
    ],
  },
];
