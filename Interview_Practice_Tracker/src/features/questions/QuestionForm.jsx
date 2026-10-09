import React, { useContext, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { QuestionContext } from '../../context/QuestionContext';

export default function QuestionForm() {

    const { questions, setQuestions, editingQuestion, setEditingQuestion } = useContext(QuestionContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onFormSubmit = (data) => {
        console.log(data);

        //logic for editing/updating 
        if (editingQuestion) {
            setQuestions(
                questions.map((q) =>
                    q.id === editingQuestion.id ? { ...data, id: editingQuestion.id } : q
                )
            );

            setEditingQuestion(null);
            reset({
                title: "",
                category: "",
                difficulty: "",
                status: ""
            });
        }
        //If user is not editing then, create new Question 
        else {
            const newQuestion = {
                id: Date.now(),
                title: data.title,
                category: data.category,
                difficulty: data.difficulty,
                status: data.status
            };
            setQuestions([...questions, newQuestion]);
        }

        reset();
    }

    useEffect(() => {
        if (editingQuestion) {
            reset(editingQuestion);
        }
    }, [editingQuestion, reset]);

    return (
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 lg:p-7 border border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                        {editingQuestion ? "Edit Practice Problem" : "Track New Question"}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {editingQuestion ? "Modify your practice task details" : "Add an interview practice task to your local dashboard"}
                    </p>
                </div>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${editingQuestion ? "bg-amber-50 text-amber-700 border-amber-200/70" : "bg-slate-100 text-slate-600 border-slate-200/70"}`}>
                    {editingQuestion ? "Editing" : "Quick Entry"}
                </span>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
                <div>
                    <input
                        {...register("title", {
                            required: "Title is required"
                        })}
                        type="text"
                        placeholder="Question / Problem Title (e.g. LC 15 - 3Sum)"
                        className="w-full bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-2xs"
                    />
                    {errors.title && (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-rose-500 mt-1.5 pl-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            {errors.title.message}
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                        <select
                            {...register("category", { required: "Category is required" })}
                            className="w-full bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 cursor-pointer shadow-2xs"
                        >
                            <option value="">Category</option>
                            <option value="DSA">DSA</option>
                            <option value="GitHub">GitHub</option>
                            <option value="Technical">Technical</option>
                        </select>
                        {errors.category && (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-rose-500 mt-1.5 pl-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                {errors.category.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <select
                            {...register("difficulty", { required: "Difficulty is required" })}
                            className="w-full bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 cursor-pointer shadow-2xs"
                        >
                            <option value="">Difficulty</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        {errors.difficulty && (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-rose-500 mt-1.5 pl-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                {errors.difficulty.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <select
                            {...register("status", { required: "Status is required" })}
                            className="w-full bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 cursor-pointer shadow-2xs"
                        >
                            <option value="">Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        {errors.status && (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-rose-500 mt-1.5 pl-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                {errors.status.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-500/20 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 cursor-pointer"
                    >
                        {editingQuestion ? "Save Changes" : "Save Question"}
                    </button>
                </div>
            </form>
        </div>
    )
}