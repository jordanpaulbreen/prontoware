"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-magenta/15 text-magenta">
        <Icon name="bolt" size={28} />
      </div>
      <h1 className="mt-5 text-2xl">Something glitched</h1>
      <p className="mt-2 text-sm text-ink-muted">
        An unexpected error interrupted this page. You can try again, and if it keeps happening our
        team is on it.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-ink-faint">Reference: {error.digest}</p>
      )}
      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="surface">
          Back to home
        </Button>
      </div>
    </div>
  );
}
