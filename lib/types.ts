export type PlatformId =
  | "steam"
  | "epic"
  | "xbox"
  | "playstation"
  | "nintendo"
  | "ea"
  | "ubisoft";

export type GenreId =
  | "action"
  | "rpg"
  | "strategy"
  | "sports"
  | "indie"
  | "horror"
  | "racing"
  | "simulation";

export type Region = "Global" | "EU" | "US";

/** Pattern index for the procedural cover-art generator (lib/cover.ts). */
export type CoverPattern = 0 | 1 | 2 | 3 | 4 | 5;

export type CoverArt = {
  /** Deep base colour of the artwork. */
  base: string;
  /** Dominant colour — also the source of the card's ambient glow. */
  dominant: string;
  /** Secondary accent inside the artwork. */
  accent: string;
  pattern: CoverPattern;
};

export type Game = {
  id: string;
  slug: string;
  title: string;
  /** Small line printed on the cover art lockup. */
  studio: string;
  platform: PlatformId;
  genres: GenreId[];
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  region: Region;
  art: CoverArt;
  instant: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  preorder?: boolean;
  /** Minutes left on a flash deal — resolved to a timestamp on the client. */
  flashMinutes?: number;
  releaseLabel?: string;
};
