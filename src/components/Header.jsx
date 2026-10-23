import { Link, useLocation, useNavigate } from "react-router";
import {  useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.userState.auth);
  const isLoggedIn = Boolean(token);

  const displayName = user?.name ?? user?.username ?? user?.email ?? "U";

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analytics", path: "/analytics" },
    { name: "Create Links", path: "/create" },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="w-full border-b border-slate-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="landing"
            className="py-3.5 text-base font-extrabold tracking-tight text-slate-900"
          >
            ShortLink
          </Link>

          <nav className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative py-3.5 text-xs font-medium transition-colors ${
                    isActive
                      ? "font-semibold text-blue-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-600" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-4 py-3.5">
            <Link
              to="/create"
              className="flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-600/30 transition hover:bg-blue-700"
            >
              <FiPlus size={14} />
              Create New Link
            </Link>

            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-slate-800 text-xs font-semibold text-white">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                displayName[0].toUpperCase()
              )}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-medium cursor-pointer text-slate-600 transition-colors hover:text-slate-900"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 py-3.5">
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
        )}
      </div>
    </header>
  );
}