import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FiLink } from "react-icons/fi";

export default function Hero() {
  const [shortUrl, setShortUrl] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { url: "" } });

  const onSubmit = async () => {
    // TODO: sambungkan ke backend Go lo, mis. POST /api/links { url }
    // const res = await fetch("/api/links", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ url }),
    // });
    // const data = await res.json();
    // setShortUrl(data.short_url);
    await new Promise((r) => setTimeout(r, 500)); // simulasi
    setShortUrl(`${window.location.origin}/abc123`);
    reset();
  };

  return (
    <section className="bg-linear-to-b from-surface to-white px-6 pt-24 pb-20 min-h-screen">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Shorten URLs. <span className="text-brand">Share Easily.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm sm:text-base text-slate-600">
          Create short, memorable links for your team communications. Transform
          long, cumbersome URLs into powerful digital assets that drive
          engagement.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/register"
            className="rounded-md bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-2xl"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="rounded-md border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-brand hover:bg-slate-50"
          >
            Learn More
          </a>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mx-auto mt-12 max-w-xl"
        >
          <div className="flex items-center gap-3 rounded-xl bg-white p-2.5 pl-4 shadow-xl shadow-slate-200/70">
            <FiLink className="shrink-0 text-slate-400" aria-hidden />
            <input
              type="url"
              placeholder="https://very-long-architectural-url.com/asset-id-99238-v1"
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
              {...register("url", {
                required: "URL wajib diisi",
                pattern: {
                  value: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
                  message: "Masukkan URL valid diawali http:// atau https://",
                },
              })}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-500 cursor-pointer px-6 py-2.5 text-sm font-semibold text-white "
            >
              {isSubmitting ? "..." : "Shorten"}
            </button>
          </div>
          {errors.url && (
            <p role="alert" className="mt-2 text-left text-sm text-red-600">
              {errors.url.message}
            </p>
          )}
          {shortUrl && (
            <p className="mt-3 text-left text-sm text-slate-600">
              <a href={shortUrl} className="font-semibold text-brand underline">
                {shortUrl}
              </a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}