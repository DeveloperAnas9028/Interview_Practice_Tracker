import React from "react";

export default function NoResult() {
    return (
        <tr>
            <td colSpan="5" className="py-16 text-center">
                <div className="flex flex-col items-center justify-center space-y-2.5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100/80 border border-slate-200/80 flex items-center justify-center text-slate-400 shadow-2xs mb-1">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 9v2m0 4h.01" />
                        </svg>
                    </div>
                    <p className="text-sm font-bold text-slate-800">No matching questions found</p>
                    <p className="text-xs text-slate-500 max-w-sm">Try adjusting your search query, category, status, or difficulty filters to see results.</p>
                </div>
            </td>
        </tr>
    );
}