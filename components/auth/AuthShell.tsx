import { Logo } from "@/components/ui/KeyGlow";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-8rem)] w-full max-w-md flex-col justify-center px-4 py-14">
      <div className="mb-8 flex flex-col items-center text-center">
        <a href="/" aria-label="Home" className="mb-5">
          <Logo />
        </a>
        <h1 className="text-2xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
