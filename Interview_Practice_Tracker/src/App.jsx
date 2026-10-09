import QuestionForm from "./features/questions/QuestionForm";
import FilterBar from "./features/questions/FilterBar";
import QuestionList from "./features/questions/QuestionList";
import StatCard from "./features/dashboard/StatCard";
import NavBar from "./components/NavBar";
import DashboardStats from "./features/dashboard/DashboardStats";


export default function App() {

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-800 antialiased p-4 sm:p-6 lg:p-8 relative">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(59,130,246,0.08),rgba(255,255,255,0))] -z-10" />
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Navigation Bar */}
        <NavBar />

        {/* Top 4 Stats Metric Cards */}
        <DashboardStats />

        {/* Middle Banner & Add Question Form */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <StatCard />
          <QuestionForm />
        </section>

        {/* Filter Controls Bar */}
        <FilterBar />

        {/* Question Lists */}
        <QuestionList />

      </div>
    </div>
  );
}
