import React, { useContext } from "react";
import { QuestionContext } from "../context/QuestionContext";

export default function NavBar() {

    return (
        <header className="bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 sm:px-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 transition-all">
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20 ring-1 ring-white/20 select-none">
                    P
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-tight">PrepTracker.</h1>
                    <p className="text-xs text-slate-500 font-medium">Weekly Interview Dashboard</p>
                </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto bg-slate-50/60 hover:bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-1.5 transition-colors">
                <div className="relative w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-xs font-bold text-blue-700 shadow-2xs">
                    ME
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="text-left">
                    <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-slate-800">Candidate Workspace</p>
                        <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">Week 01</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">Preparation in Progress</p>
                </div>
            </div>
        </header>
    );
}