import React from "react";

export default function EmptyState() {
    return (
        <tr>
            <td colSpan="5" className="py-16 text-center">
                <div className="flex flex-col items-center justify-center space-y-2.5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs mb-1">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <p className="text-sm font-bold text-slate-800">No questions added yet</p>
                    <p className="text-xs text-slate-500 max-w-sm">Track your first interview question using the form above to build your preparation log.</p>
                </div>
            </td>
        </tr>
    );
}