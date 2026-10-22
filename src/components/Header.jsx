import { Link, useLocation } from "react-router";

export default function Header() {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analytics", path: "/analytics" },
    { name: "Links", path: "/links" },
  ];

  return (
    <header className="w-full border-b border-slate-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-8">
          <Link to="/landing" className="text-base font-extrabold tracking-tight text-slate-900">
            ShortLink
          </Link>

          <nav className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-medium transition-colors ${
                    isActive
                      ? "font-semibold text-blue-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-xs font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}