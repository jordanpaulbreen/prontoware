import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { KeyGlow } from "@/components/ui/KeyGlow";
import { Shell } from "@/components/ui/Section";

/** The one page where the arcade DNA gets the full stage. */
export default function NotFound() {
  return (
    <Shell className="flex min-h-[70vh] flex-col items-center justify-center py-section text-center">
      <KeyGlow size={64} turning />
      <span className="pixel-label mt-6 text-ink-faint">game over — insert coin</span>
      <h1 className="mt-4 text-4xl sm:text-6xl">
        404 <span className="text-gradient">key not found</span>
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
        This page has been claimed by another player. The deals, however, are exactly where you
        left them.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Button href="/" size="lg" sparkle>
          <Icon name="play" size={17} />
          Back to the arcade
        </Button>
        <Button href="/deals" size="lg" variant="surface">
          <Icon name="tag" size={17} />
          Tonight&apos;s deals
        </Button>
      </div>
    </Shell>
  );
}
