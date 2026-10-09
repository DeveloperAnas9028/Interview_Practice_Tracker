import React, { useContext } from 'react'
import { QuestionContext } from '../../context/QuestionContext';

export default function StatCard() {

    const { questions,
        setQuestions,
    } = useContext(QuestionContext);

    const completedQuestions = questions.filter((q) => q.status === "Completed").length
    const progressPercentage = questions.length > 0 ? Math.round((completedQuestions / questions.length) * 100) : 0;

    return (
        <div className="lg:col-span-1 bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 rounded-3xl p-6 lg:p-7 text-white flex flex-col justify-between shadow-lg shadow-indigo-600/15 border border-indigo-400/20 relative overflow-hidden group min-h-[240px]">
            <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-400/15 rounded-full blur-xl pointer-events-none" />

            <div className="space-y-3 relative z-10">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-white/20 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Status Target
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                    Target: Clear Weekly Mock Interview
                </h2>
                <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal">
                    DSA completed, Git scenarios reviewed, and machine coding ready for submission.
                </p>
            </div>

            <div className="space-y-2.5 pt-5 relative z-10">
                <div className="flex justify-between items-center text-xs font-semibold text-blue-100">
                    <span>Weekly Target</span>
                    <span className="bg-black/20 px-2.5 py-0.5 rounded-full text-white font-mono text-[11px]">
                        {completedQuestions}/{questions.length} Finished • {progressPercentage}%
                    </span>
                </div>
                <div className="w-full bg-black/25 backdrop-blur-xs rounded-full h-2.5 p-0.5 overflow-hidden ring-1 ring-white/15">
                    <div
                        className="bg-gradient-to-r from-emerald-300 via-teal-200 to-white h-full rounded-full transition-all duration-500 ease-out shadow-xs"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}