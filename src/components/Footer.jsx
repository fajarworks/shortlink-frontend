import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-100 bg-[#f7f8fa]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-[10px] font-medium uppercase tracking-widest text-slate-500 sm:flex-row">
        {/* Copyright */}
        <p>© 2024 SHORTLINK. THE DIGITAL ARCHITECT.</p>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          <Link
            to="/privacy"
            className="transition-colors hover:text-slate-800"
          >
            PRIVACY POLICY
          </Link>
          <Link
            to="/terms"
            className="transition-colors hover:text-slate-800"
          >
            TERMS OF SERVICE
          </Link>
          <Link
            to="/api-docs"
            className="transition-colors hover:text-slate-800"
          >
            API DOCUMENTATION
          </Link>
          <Link
            to="/support"
            className="transition-colors hover:text-slate-800"
          >
            SUPPORT
          </Link>
        </nav>
      </div>
    </footer>
  );
}