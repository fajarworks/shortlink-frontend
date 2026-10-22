import Hero from "../components/Hero";
import Features from "../components/Features";
import Insights from "../components/Insights";

export default function LandingPage() {
  return (
    <div className="font-sans text-slate-900 bg-white flex flex-col justify-center items-center">
      <Hero />
      <Features />
      <Insights />
    </div>
  );
}