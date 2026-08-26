import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { platforms } from "@/lib/data";
import type { PlatformId } from "@/lib/types";
import { Band, Shell, SectionHeading } from "@/components/ui/Section";

type Params = { platform: string };

const guides: Partial<Record<PlatformId, string[]>> = {
  steam: [
    "Open the Steam client and sign in.",
    "Click “Games” in the top menu, then “Activate a Product on Steam”.",
    "Follow the prompts and paste your key when asked.",
    "The game is added to your library and starts downloading.",
  ],
  epic: [
    "Open the Epic Games Launcher and sign in.",
    "Click your account name, then “Redeem Code”.",
    "Paste your key and confirm.",
    "The game appears in your library.",
  ],
  xbox: [
    "Press the Xbox button and open the Store.",
    "Select “Use a code”.",
    "Enter your 25-character key and confirm.",
    "The game installs to your console.",
  ],
  playstation: [
    "From the PlayStation Store, open the menu and select “Redeem Codes”.",
    "Enter your 12-digit code.",
    "Confirm to add the game to your library.",
  ],
  nintendo: [
    "On your Switch, open the eShop and select your profile.",
    "Choose “Redeem Code”.",
    "Enter your 16-character download code and confirm.",
  ],
};

export function generateStaticParams() {
  return Object.keys(guides).map((platform) => ({ platform }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { platform } = await params;
  const p = platforms[platform as PlatformId];
  return { title: p ? `Activate on ${p.name}` : "Activation guide" };
}

export default async function ActivateGuidePage({ params }: { params: Promise<Params> }) {
  const { platform } = await params;
  const steps = guides[platform as PlatformId];
  const p = platforms[platform as PlatformId];
  if (!steps || !p) notFound();

  return (
    <Band>
      <Shell className="max-w-2xl">
        <SectionHeading
          kicker="Activation guide"
          title={`Activate a key on ${p.name}`}
          description="It usually takes under a minute."
        />
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3 rounded-card border border-hairline bg-surface p-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-cyan-soft font-display font-bold text-cyan">
                {i + 1}
              </span>
              <p className="text-sm text-ink-muted">{s}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-ink-muted">
          Trouble activating? <a href="/contact" className="text-cyan hover:underline">Contact support</a>.
        </p>
      </Shell>
    </Band>
  );
}
