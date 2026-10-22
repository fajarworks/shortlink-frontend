
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { Link } from "react-router";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Login data:", data);

    } catch (error) {
      console.error("Login gagal:", error);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-4 py-8 font-sans text-slate-900">
      <div className="w-full max-w-90">
        <h1 className="mb-5 text-center text-xl font-extrabold tracking-tight">
          ShortLink
        </h1>

        <section className="rounded-md border border-slate-100 bg-white p-6 shadow-[0_3px_8px_rgba(15,23,42,0.06)]">
          <div className="mb-5">
            <h2 className="text-lg font-semibold tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Please enter your details to sign in.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-3"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-xs font-medium text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                className={`w-full rounded-md border px-2.5 py-2 text-xs outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                  errors.email
                    ? "border-red-400"
                    : "border-slate-200"
                }`}
                {...register("email", {
                  required: "Email wajib diisi.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Format email tidak valid.",
                  },
                })}
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-slate-700"
                >
                  Password
                </label>

                <a
                  href="/forgot-password"
                  className="text-[10px] font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </a>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full rounded-md border py-2 pl-2.5 pr-9 text-xs outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                    errors.password
                      ? "border-red-400"
                      : "border-slate-200"
                  }`}
                  {...register("password", {
                    required: "Password wajib diisi.",
                    minLength: {
                      value: 8,
                      message: "Password minimal 8 karakter.",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500 hover:text-slate-800"
                >
                  {showPassword ? (
                    <FiEyeOff size={14} />
                  ) : (
                    <FiEye size={14} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer flex w-full items-center justify-center gap-1.5 rounded-md bg-blue-500 from-blue-700 to-blue-600 py-2.5 text-xs font-medium text-white shadow-sm transition hover:from-blue-800 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Log In"}
              {!isSubmitting && <FiArrowRight size={14} />}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-[9px] font-medium tracking-widest text-slate-400">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          <button
            type="button"
            className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <span className="font-bold text-sm">G</span>
            Sign in with Google
          </button>
        </section>

        <p className="mt-5 text-center text-xs text-slate-500">
          Don't have an account? 
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
             
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
