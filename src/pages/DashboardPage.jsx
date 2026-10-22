
import { useMemo, useState } from "react";
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

const initialLinks = [
  {
    id: 1,
    slug: "A3B9",
    shortUrl: "shrt.lnk/aB39",
    destination:
      "https://www.architecturaldigest.com/story/modern-mini...",
    date: "OCT 24, 2023",
    clicks: 1200,
  },
  {
    id: 2,
    slug: "V9Pq2",
    shortUrl: "shrt.lnk/v9Pq2",
    destination:
      "https://medium.com/design-ethics/the-future-of-headle...",
    date: "OCT 21, 2023",
    clicks: 842,
  },
  {
    id: 3,
    slug: "R24T1",
    shortUrl: "shrt.lnk/R24T1",
    destination:
      "https://github.com/frameworks/modern-stack-documen...",
    date: "OCT 19, 2023",
    clicks: 2400,
  },
  {
    id: 4,
    slug: "mL5k8",
    shortUrl: "shrt.lnk/mL5k8",
    destination:
      "https://dribbble.com/shots/21435678-Fintech-Dashboar...",
    date: "OCT 15, 2023",
    clicks: 341,
  },
  {
    id: 5,
    slug: "K8m2Z",
    shortUrl: "shrt.lnk/K8m2Z",
    destination: "https://example.com/products/new-arrivals",
    date: "OCT 12, 2023",
    clicks: 526,
  },
  {
    id: 6,
    slug: "X4n7P",
    shortUrl: "shrt.lnk/X4n7P",
    destination: "https://example.com/blog/getting-started",
    date: "OCT 10, 2023",
    clicks: 156,
  },
  {
    id: 7,
    slug: "Q2w9L",
    shortUrl: "shrt.lnk/Q2w9L",
    destination: "https://example.com/resources",
    date: "OCT 08, 2023",
    clicks: 930,
  },
];

const ITEMS_PER_PAGE = 4;

export default function Dashboard() {
  const [links, setLinks] = useState(initialLinks);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [copiedId, setCopiedId] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const filteredLinks = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const result = links.filter(
      (link) =>
        link.shortUrl.toLowerCase().includes(keyword) ||
        link.destination.toLowerCase().includes(keyword)
    );

    return [...result].sort((a, b) => {
      if (sortBy === "clicks") return b.clicks - a.clicks;
      if (sortBy === "oldest") return a.id - b.id;
      return b.id - a.id;
    });
  }, [links, search, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLinks.length / ITEMS_PER_PAGE)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleLinks = filteredLinks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCopy = async (link) => {
    try {
      await navigator.clipboard.writeText(
        `https://${link.shortUrl}`
      );
      setCopiedId(link.id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      window.prompt("Salin shortlink ini:", link.shortUrl);
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Yakin ingin menghapus shortlink ini?"
    );

    if (!confirmed) return;

    setLinks((prev) => prev.filter((link) => link.id !== id));
    setPage(1);
  };

  const formatClicks = (clicks) =>
    clicks >= 1000
      ? `${(clicks / 1000).toFixed(1).replace(".0", "")}K`
      : clicks.toString();

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-8 font-sans text-[#20242c] sm:px-6">
      <div className="mx-auto w-full max-w-125">
        {/* Header */}
        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              My Links
            </h1>
            <p className="mt-1 text-[11px] text-slate-500">
              Manage and track your shortened digital assets.
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-xs font-medium tracking-[0.12em] text-slate-500">
              TOTAL ACTIVE
            </p>
            <p className="text-lg font-bold leading-6 text-blue-600">
              {links.length > 0 ? 124 + links.length - initialLinks.length : 0}
            </p>
          </div>
        </header>

        {/* Search and filter */}
        <div className="relative mb-7">
          <div className="flex h-9 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3">
            <FiSearch className="shrink-0 text-slate-500" size={16} />

            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name or URL..."
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
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-md border border-slate-200 bg-white p-2 text-xs outline-none focus:border-blue-500"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="clicks">Most clicks</option>
              </select>
            </div>
          )}
        </div>

        {/* Link list */}
        <section className="space-y-3">
          {visibleLinks.map((link) => (
            <article
              key={link.id}
              className="flex min-h-22 items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white px-3 py-3 sm:px-3"
            >
              <div className="min-w-0 flex-1">
                <a
                  href={`https://${link.shortUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-1 flex w-fit max-w-full items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  <FiLink className="shrink-0" size={13} />
                  <span className="truncate">{link.shortUrl}</span>
                </a>

                <p
                  title={link.destination}
                  className="truncate text-[10px] text-slate-600"
                >
                  {link.destination}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-medium text-[#8da0bd]">
                  <span className="flex items-center gap-1">
                    <FiCalendar size={10} />
                    {link.date}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiBarChart2 size={11} />
                    {formatClicks(link.clicks)} CLICKS
                  </span>
                </div>
              </div>

              {/* Actions */}
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

          {visibleLinks.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-12 text-center">
              <FiSearch className="mx-auto mb-3 text-slate-400" size={24} />
              <p className="text-sm font-medium text-slate-700">
                No links found
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Try another keyword.
              </p>
            </div>
          )}
        </section>

        {/* Pagination */}
        <footer className="mt-8 flex items-center justify-between gap-2 text-[10px] sm:text-[11px]">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="flex items-center gap-1 font-medium text-slate-500 transition hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiChevronLeft size={13} />
            Prev Page
          </button>

          <div className="flex items-center gap-3 text-slate-500">
            <span className="flex h-5 min-w-5 items-center justify-center rounded bg-blue-100 px-1.5 font-semibold text-blue-700">
              {currentPage}
            </span>
            <span>of</span>
            <span className="min-w-3 text-center font-medium text-slate-800">
              {totalPages}
            </span>
          </div>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() =>
              setPage((prev) => Math.min(totalPages, prev + 1))
            }
            className="flex items-center gap-1 font-medium text-slate-500 transition hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <FiChevronRight size={13} />
          </button>
        </footer>
      </div>
    </main>
  );
}
