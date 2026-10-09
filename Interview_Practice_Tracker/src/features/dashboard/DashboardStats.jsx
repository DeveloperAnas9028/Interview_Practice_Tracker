import React, { useContext } from "react";
import { QuestionContext } from "../../context/QuestionContext";

export default function DashboardStats() {
  const { questions } = useContext(QuestionContext);

  const completedDsa = questions.filter(
    (q) => q.category === "DSA" && q.status === "Completed"
  ).length;

  const completedInterview = questions.filter(
    (q) => (q.category === "GitHub" || q.category === "Technical") && q.status === "Completed"
  ).length;

  const machineCoding = questions.filter(
    (q) => q.category === "Technical" || q.title.toLowerCase().includes("machine")
  );
  const completedMachineCoding = machineCoding.filter((q) => q.status === "Completed").length;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all duration-200 group flex items-center justify-between">
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Questions</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">{questions.length}</h3>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50/80 border border-blue-200/60 px-2.5 py-0.5 rounded-full">
            All Tracked
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/80 text-blue-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shadow-2xs">
          #
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all duration-200 group flex items-center justify-between">
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Completed DSA</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">{completedDsa}</h3>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50/80 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
            LeetCode Ready
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100/80 text-emerald-600 flex items-center justify-center font-mono font-bold text-sm group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200 shadow-2xs">
          &lt;/&gt;
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all duration-200 group flex items-center justify-between">
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Interview Ques</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">{completedInterview}</h3>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50/80 border border-indigo-200/60 px-2.5 py-0.5 rounded-full">
            Git & Tech
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200 shadow-2xs">
          ?
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all duration-200 group flex items-center justify-between">
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Machine Coding</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {machineCoding.length > 0 ? `${completedMachineCoding}/${machineCoding.length}` : "Pending"}
          </h3>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-violet-700 bg-violet-50/80 border border-violet-200/60 px-2.5 py-0.5 rounded-full">
            {completedMachineCoding > 0 ? "In Progress" : "Not Started"}
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100/80 text-violet-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 group-hover:bg-violet-600 group-hover:text-white transition-all duration-200 shadow-2xs">
          ⚡
        </div>
      </div>
    </section>
  );
}