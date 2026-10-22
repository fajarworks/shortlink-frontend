import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  FiArrowLeft,
  FiLink,
  FiEye,
  FiBarChart2,
  FiGrid,
} from "react-icons/fi";

const BASE_URL = "https://short.link";
const PLACEHOLDER_SLUG = "my-custom-slug";

export default function CreateLinkPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { url: "", slug: "" } });

  const slug = watch("slug");

  const onSubmit = async ({ url, slug }) => {
    setServerError("");
    try {
      // TODO: sambungkan ke backend Go lo
      // const res = await fetch("/api/links", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ url, slug: slug || undefined }),
      // });
      // if (!res.ok) throw new Error((await res.json()).message);
      await new Promise((r) => setTimeout(r, 600)); // simulasi
      console.log({ url, slug });
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.message || "Gagal membuat link");
    }
  };

  const inputBase =
    "w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none";

  return (
    <main className="min-h-screen bg-surface px-6 py-12 font-sans text-slate-900">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
        >
          <FiArrowLeft aria-hidden /> Back to Dashboard
        </Link>
        <h1 className="mt-4 text-2xl font-bold">Create New Short Link</h1>
        <p className="mt-1 text-sm text-slate-600">
          Transform your long URLs into clean, manageable assets.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          {/* Destination URL */}
          <div>
            <label
              htmlFor="url"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Destination URL <span className="text-red-500">*</span>
            </label>
            <div
              className={`mt-2 flex items-center gap-3 rounded-md border bg-slate-100 px-3 py-2.5 focus-within:border-brand focus-within:bg-white ${
                errors.url ? "border-red-400" : "border-transparent"
              }`}
            >
              <FiLink className="shrink-0 text-slate-400" aria-hidden />
              <input
                id="url"
                type="url"
                placeholder="https://example.com/your-long-url-here"
                aria-invalid={!!errors.url}
                className={inputBase}
                {...register("url", {
                  required: "Destination URL wajib diisi",
                  pattern: {
                    value: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
                    message: "URL harus diawali http:// atau https://",
                  },
                })}
              />
            </div>
            {errors.url ? (
              <p role="alert" className="mt-1.5 text-xs text-red-600">
                {errors.url.message}
              </p>
            ) : (
              <p className="mt-1.5 text-[11px] italic text-slate-500">
                Ensure your URL starts with http:// or https://
              </p>
            )}
          </div>

          {/* Custom slug */}
          <div className="mt-6">
            <label
              htmlFor="slug"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Custom Slug (Optional)
            </label>
            <div
              className={`mt-2 flex overflow-hidden rounded-md border focus-within:border-brand ${
                errors.slug ? "border-red-400" : "border-slate-200"
              }`}
            >
              <span className="flex items-center bg-slate-100 px-3 text-sm text-slate-600">
                short.link/
              </span>
              <input
                id="slug"
                type="text"
                placeholder={PLACEHOLDER_SLUG}
                className={`${inputBase} px-3 py-2.5`}
                {...register("slug", {
                  pattern: {
                    value: /^[a-zA-Z0-9-]*$/,
                    message: "Slug hanya boleh huruf, angka, dan tanda hubung (-)",
                  },
                  maxLength: { value: 50, message: "Slug maksimal 50 karakter" },
                })}
              />
            </div>
            {errors.slug ? (
              <p role="alert" className="mt-1.5 text-xs text-red-600">
                {errors.slug.message}
              </p>
            ) : (
              <p className="mt-1.5 text-[11px] italic text-slate-500">
                Leave blank to generate a random unique identifier.
              </p>
            )}
          </div>

          {/* Live preview */}
          <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-brand">
              <FiEye aria-hidden /> Live Preview
            </p>
            <p className="mt-1 text-sm">
              Your short link will be:{" "}
              <span className="break-all font-medium text-brand">
                {BASE_URL}/{slug || PLACEHOLDER_SLUG}
              </span>
            </p>
          </div>

          {serverError && (
            <p role="alert" className="mt-4 text-sm text-red-600">
              {serverError}
            </p>
          )}

          <div className="mt-8 flex items-center gap-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow  disabled:opacity-60"
            >
              {isSubmitting ? "Creating..." : "Create Link"}
            </button>
            <Link to="/dashboard" className="text-sm font-medium text-brand-dark">
              Cancel
            </Link>
          </div>
        </form>

        {/* Info */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="flex gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange-100 text-orange-700">
              <FiBarChart2 aria-hidden />
            </span>
            <div>
              <h2 className="text-sm font-semibold">Real-time Analytics</h2>
              <p className="mt-0.5 text-xs text-slate-600">
                Track every click, geographical location, and referral source
                instantly.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-indigo-100 text-indigo-700">
              <FiGrid aria-hidden />
            </span>
            <div>
              <h2 className="text-sm font-semibold">Auto-generated QR</h2>
              <p className="mt-0.5 text-xs text-slate-600">
                Every link automatically creates a high-resolution QR code for
                print.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}