import { Link } from "@tanstack/react-router";

export function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-muted-foreground">
        {children || "The page you are looking for does not exist."}
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
