import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { registerUser } from "../redux/slices/authSlice";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });


  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password
      }
      dispatch(registerUser(payload))
    } catch (error) {
      console.error("Registrasi gagal:", error);
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
              Create Account
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Join the elite architects of the web.
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
              <label
                htmlFor="password"
                className="mb-1 block text-xs font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
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
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-2.5 text-slate-500 hover:text-slate-800"
                >
                  {showPassword ? (
                    <FiEyeOff size={14} />
                  ) : (
                    <FiEye size={14} />
                  )}
                </button>
              </div>

              {errors.password ? (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              ) : (
                <p className="mt-1 text-[10px] text-slate-400">
                  Minimum 8 characters
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-xs font-medium text-slate-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`w-full rounded-md border py-2 pl-2.5 pr-9 text-xs outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                    errors.confirmPassword
                      ? "border-red-400"
                      : "border-slate-200"
                  }`}
                  {...register("confirmPassword", {
                    required: "Konfirmasi password wajib diisi.",
                 
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-2.5 text-slate-500 hover:text-slate-800"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={14} />
                  ) : (
                    <FiEye size={14} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-md bg-blue-600 py-2.5 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
              {!isSubmitting && <FiArrowRight size={14} />}
            </button>
          </form>

          <p className="mt-4 text-center text-[10px] text-slate-400 leading-relaxed">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-slate-600">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline hover:text-slate-600">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        {/* Footer Link to Login */}
        <p className="mt-5 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}