import { useEffect, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiLink,
  FiCopy,
  FiTrash2,
  FiCalendar,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyLinks, getMyLinks } from "../redux/slices/linkSlice";
import { Link } from "react-router";

const SHORT_BASE_URL = "http://localhost:8080";

const formatDate = (iso) =>
  new Date(iso)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();

const formatClicks = (clicks) =>
  clicks >= 1000
    ? `${(clicks / 1000).toFixed(1).replace(".0", "")}K`
    : String(clicks);

export default function Dashboard() {
  const [copiedId, setCopiedId] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const dispatch = useDispatch();
  const { links = [], isPending, error } = useSelector(
    (state) => state.linkState
  );

  useEffect(() => {
    dispatch(getMyLinks());
  }, [dispatch]);

  const handleCopy = async (link) => {
    const url = `${SHORT_BASE_URL}/${link.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(link.id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      window.prompt("Salin shortlink ini:", url);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteMyLinks(id))
    };

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-8 font-sans text-[#20242c] sm:px-6">
      <div className="mx-auto w-full max-w-125">
        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">My Links</h1>
            <p className="mt-1 text-[11px] text-slate-500">
              Manage and track your shortened digital assets.
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-xs font-medium tracking-[0.12em] text-slate-500">
              TOTAL ACTIVE
            </p>
            <p className="text-lg font-bold leading-6 text-blue-600">
              {links.length}
            </p>
          </div>
        </header>
        <div className="relative mb-7">
          <div className="flex h-9 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3">
            <FiSearch className="shrink-0 text-slate-500" size={16} />

            <input
              type="search"
              placeholder="Search by slug or URL..."
              className="h-full min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-slate-500"
            />

            <button
              type="button"
              aria-label="Filter links"
              onClick={() => setShowFilter((prev) => !prev)}
              className="rounded p-1 text-slate-600 transition hover:bg-slate-100"
            >
              <FiFilter size={15} />
            </button>
          </div>

          {showFilter && (
            <div className="absolute right-0 top-11 z-10 w-44 rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
              <label
                htmlFor="sort"
                className="mb-2 block text-xs font-medium text-slate-600"
              >
                Sort links
              </label>
              <select
                id="sort"
                defaultValue="newest"
                className="w-full rounded-md border border-slate-200 bg-white p-2 text-xs outline-none focus:border-blue-500"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="clicks">Most clicks</option>
              </select>
            </div>
          )}
        </div>

        <section className="space-y-3">
          {isPending  && links?.length != 0 &&    (
            <p className="text-center text-xs text-slate-500">Loading...</p>
          )}

          {error && (
            <p className="text-center text-xs text-red-600">{error}</p>
          )}

          {links.map((link) => (
            <article
              key={link.id}
              className="flex min-h-22 items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white px-3 py-3 sm:px-3"
            >
              <div className="min-w-0 flex-1">
                <Link
                  to={`${SHORT_BASE_URL}/${link.slug}`}
                  target="_blank"
                  className="mb-1 flex w-fit max-w-full items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  <FiLink className="shrink-0" size={13} />
                  <span className="truncate">{link.slug}</span>
                </Link>

                <p
                  title={link.destination_url}
                  className="truncate text-[10px] text-slate-600"
                >
                  {link.destination_url}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-medium text-[#8da0bd]">
                  <span className="flex items-center gap-1">
                    <FiCalendar size={10} />
                    {formatDate(link.created_at)}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiBarChart2 size={11} />
                    {formatClicks(link.click_count)} CLICKS
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(link)}
                  title="Copy shortlink"
                  aria-label="Copy shortlink"
                  className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                    copiedId === link.id
                      ? "bg-green-100 text-green-700"
                      : "bg-[#eef2ff] text-[#334c9b] hover:bg-indigo-100"
                  }`}
                >
                  {copiedId === link.id ? (
                    <FiCheck size={16} />
                  ) : (
                    <FiCopy size={16} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(link.id)}
                  title="Delete shortlink"
                  aria-label="Delete shortlink"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-[#91a2bc] transition hover:bg-red-50 hover:text-red-600"
                >
                  <FiTrash2 size={15} />
                </button>
              </div>
            </article>
          ))}

          {!isPending && (
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-12 text-center">
              <FiSearch className="mx-auto mb-3 text-slate-400" size={24} />
              <p className="text-sm font-medium text-slate-700">
                No links found
              </p>
            </div>
          )}
        </section>

        <footer className="mt-8 flex items-center justify-between gap-2 text-[10px] sm:text-[11px]">
          <button
            type="button"
            className="flex items-center gap-1 font-medium text-slate-500 transition hover:text-blue-600"
          >
            <FiChevronLeft size={13} />
            Prev Page
          </button>

          <div className="flex items-center gap-3 text-slate-500">
            <span className="flex h-5 min-w-5 items-center justify-center rounded bg-blue-100 px-1.5 font-semibold text-blue-700">
              1
            </span>
            <span>of</span>
            <span className="min-w-3 text-center font-medium text-slate-800">
              1
            </span>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 font-medium text-slate-500 transition hover:text-blue-600"
          >
            Next
            <FiChevronRight size={13} />
          </button>
        </footer>
      </div>
    </main>
  );
}