import { FiCheckCircle } from "react-icons/fi";

const points = [
  "Geographic Distribution Maps",
  "Device & Browser Breakdown",
  "UTM Parameter Tracking",
];

export default function Insights() {
  return (
    <section className="bg-white px-6 py-20 min-h-screen">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl shadow-2xl shadow-slate-300/60">
          {/* Ganti dengan gambar lo sendiri di src/assets */}
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80"
            alt="Laptop menampilkan dashboard analitik"
            className="h-80 w-full object-cover md:h-96"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Data Driven Insights
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
            Observe your link architecture in real-time.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Every click is a data point. Our dashboard provides surgical
            precision into where your traffic originates, who is engaging, and
            how your team communications are performing across the globe.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm font-medium">
                <FiCheckCircle className="text-brand" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}