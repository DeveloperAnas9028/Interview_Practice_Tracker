import React, { useContext } from "react";
import { QuestionContext } from "../../context/QuestionContext";
import EmptyState from "../../components/EmptyState";
import NoResult from "../../components/NoResult";

export default function QuestionList() {
    const {
        questions,
        setQuestions,
        editingQuestion,
        setEditingQuestion,
        selectedCategory,
        selectedStatus,
        selectedDifficulty,
        searchQuery
    } = useContext(QuestionContext);

    const handleDeleteQuestion = (id) => {
        setQuestions(questions.filter((q) => q.id !== id));
        if (editingQuestion?.id === id) {
            setEditingQuestion(null);
        }
    };

    const filteredQuestions = questions.filter((q) => {
        const matchSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = selectedCategory === "All" || !selectedCategory || q.category === selectedCategory;
        const matchStatus = selectedStatus === "All" || !selectedStatus || q.status === selectedStatus;
        const matchDifficulty = selectedDifficulty === "All" || !selectedDifficulty || q.difficulty === selectedDifficulty;

        return matchSearch && matchCategory && matchStatus && matchDifficulty;
    });

    const getCategoryBadgeClass = (category) => {
        switch (category) {
            case "DSA":
                return "bg-blue-50/80 text-blue-700 border-blue-200/70";
            case "GitHub":
                return "bg-purple-50/80 text-purple-700 border-purple-200/70";
            case "Technical":
                return "bg-sky-50/80 text-sky-700 border-sky-200/70";
            default:
                return "bg-slate-100 text-slate-700 border-slate-200/70";
        }
    };

    const getDifficultyBadgeClass = (difficulty) => {
        switch (difficulty) {
            case "Easy":
                return "bg-emerald-50 text-emerald-700 border-emerald-200/70";
            case "Medium":
                return "bg-amber-50 text-amber-700 border-amber-200/70";
            case "Hard":
                return "bg-rose-50 text-rose-700 border-rose-200/70";
            default:
                return "bg-slate-100 text-slate-700 border-slate-200/70";
        }
    };

    const getStatusBadgeConfig = (status) => {
        switch (status) {
            case "Completed":
                return {
                    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
                    dotClass: "bg-emerald-500",
                };
            case "In Progress":
                return {
                    badgeClass: "bg-amber-50 text-amber-700 border-amber-200/80",
                    dotClass: "bg-amber-500",
                };
            default:
                return {
                    badgeClass: "bg-slate-100 text-slate-600 border-slate-200/80",
                    dotClass: "bg-slate-400",
                };
        }
    };

    return (
        <section className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200 hover:shadow-sm">
            <div className="p-5 sm:p-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
                <div>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                        Tracked Interview Questions
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Manage status, problem details, and weekly preparation log
                    </p>
                </div>
                <span className="self-start sm:self-auto inline-flex items-center text-xs font-semibold text-slate-600 bg-slate-100/80 border border-slate-200/60 px-3 py-1 rounded-full">
                    Showing {filteredQuestions.length} {filteredQuestions.length === 1 ? "problem" : "problems"}
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/70">
                            <th className="py-3.5 px-6">Problem / Topic</th>
                            <th className="py-3.5 px-6">Category</th>
                            <th className="py-3.5 px-6">Difficulty</th>
                            <th className="py-3.5 px-6">Status</th>
                            <th className="py-3.5 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {questions.length === 0 ? (
                            <EmptyState />
                        ) : filteredQuestions.length === 0 ? (
                            <NoResult />
                        ) : (
                            filteredQuestions.map((q) => {
                                const statusConfig = getStatusBadgeConfig(q.status);
                                return (
                                    <tr key={q.id} className="hover:bg-slate-50/70 transition-colors duration-150 group">
                                        <td className="py-4 px-6 font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                                            {q.title}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(q.category)}`}>
                                                {q.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${getDifficultyBadgeClass(q.difficulty)}`}>
                                                {q.difficulty}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusConfig.badgeClass}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotClass}`}></span>
                                                {q.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                                            <button
                                                type="button"
                                                onClick={() => setEditingQuestion(q)}
                                                className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50/80 rounded-lg active:scale-95 transition-all cursor-pointer"
                                            >
                                                Update
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteQuestion(q.id)}
                                                className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-rose-500 hover:text-rose-700 hover:bg-rose-50/80 rounded-lg active:scale-95 transition-all cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}