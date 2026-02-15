import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Store</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "text-sm font-medium text-foreground transition-colors" }}
            activeOptions={{ exact: true }}
          >
            Collections
          </Link>
          <Link
            to="/products"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "text-sm font-medium text-foreground transition-colors" }}
          >
            All Products
          </Link>
        </nav>
      </div>
    </header>
  );
}
