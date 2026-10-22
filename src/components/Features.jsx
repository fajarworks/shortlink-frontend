import { FiZap, FiEdit3, FiUsers } from "react-icons/fi";

const features = [
  {
    icon: FiZap,
    title: "Easy Create",
    text: "Instantly generate high-performance short links with a single click or through our surgical API endpoints.",
    iconBox: "bg-blue-100 text-brand",
    bar: "bg-blue-200",
  },
  {
    icon: FiEdit3,
    title: "Custom Slugs",
    text: "Maintain brand authority with readable, custom link endings that resonate with your digital audience.",
    iconBox: "bg-indigo-200 text-indigo-700",
    bar: "bg-indigo-200",
  },
  {
    icon: FiUsers,
    title: "Team Ready",
    text: "Collaborate across departments with shared workspaces, permissions, and unified analytics dashboards.",
    iconBox: "bg-orange-100 text-orange-700",
    bar: "bg-orange-200",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-surface px-6 py-16 min-h-screen">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">
          Architectural Features
        </p>
        <h2 className="mt-2 text-2xl font-bold">Built for Enterprise Precision</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text, iconBox, bar }) => (
            <article key={title} className="rounded-lg bg-white p-6 shadow-sm">
              <span
                className={`grid h-9 w-9 place-items-center rounded-md ${iconBox}`}
              >
                <Icon aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              <div className={`mt-6 h-0.5 w-8 rounded ${bar}`} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}