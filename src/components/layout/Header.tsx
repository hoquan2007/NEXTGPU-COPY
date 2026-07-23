import Link from "next/link";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 animate-fade-in">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="font-[family-name:var(--font-syne)] text-lg font-bold tracking-tight text-hero-text transition-opacity hover:opacity-80 sm:text-xl"
        >
          MiniNextGPU
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium sm:gap-8">
          <a
            href="#benefits"
            className="text-hero-muted transition-colors hover:text-hero-text"
          >
            Pricing
          </a>
          <Link
            href="/sign-in"
            className="text-hero-muted transition-colors hover:text-hero-text"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
