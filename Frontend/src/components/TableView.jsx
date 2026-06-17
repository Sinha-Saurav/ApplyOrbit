import React from 'react'
import { AppContext } from '../context/AppContext'

export default function TableView({ apps: filterApps }) {
    const { apps: contextApps, setApps, setSelectedApp, deleteApp } = React.useContext(AppContext);
    const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

    const COLUMN_COLORS = {
        Applied: { bg: "#eff6ff", text: "#2563eb", dot: "#3b82f6" },
        Shortlisted: { bg: "#fefce8", text: "#854d0e", dot: "#eab308" },
        Interview: { bg: "#f0fdf4", text: "#166534", dot: "#22c55e" },
        Offer: { bg: "#f0fdf4", text: "#14532d", dot: "#16a34a" },
        Rejected: { bg: "#fef2f2", text: "#991b1b", dot: "#ef4444" },
    };

    const apps = filterApps || contextApps



    return (
        <>
            {deleteConfirmId && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[500px] shadow-xl flex items-center flex-col">
                        <div className="w-14 h-14 rounded-full bg-orange-300 flex items-center justify-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert-icon lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                        </div>
                        <h3 className="text-2xl text-center mb-6 font-semibold text-gray-800 mb-2">Delete Application</h3>
                        <p className="text-sm text-gray-500 mb-6 text-center">
                            Are you sure you want to delete this application? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    await deleteApp(deleteConfirmId);
                                    setDeleteConfirmId(null);
                                }}
                                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-white rounded-2xl mt-10 shadow overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-500 text-left">
                            <th className="pl-10 pr-5 py-5 text-[14px] font-semibold text-[#44546A] uppercase tracking-wider">Company</th>
                            <th className="px-5 py-3 text-[14px] font-semibold text-[#44546A] uppercase tracking-wider">Role</th>
                            <th className="px-5 py-3 text-[14px] font-semibold text-[#44546A] uppercase tracking-wider">Status</th>
                            <th className="px-5 py-3 text-[14px] font-semibold text-[#44546A] uppercase tracking-wider">Location</th>
                            <th className="px-5 py-3 text-[14px] font-semibold text-[#44546A] uppercase tracking-wider">Date Applied</th>
                            <th className="px-5 py-3 text-[14px] font-semibold text-[#44546A] uppercase tracking-wider">Salary</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        {apps.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-16 text-gray-500 text-sm">
                                    No applications yet
                                </td>
                            </tr>
                        ) : (
                            apps.map(app => (
                                <tr

                                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <td className="pl-10 pr-5 py-3 font-semibold text-gray-800">
                                        {app.company.charAt(0).toUpperCase() + app.company.slice(1)}
                                    </td>
                                    <td className="px-5 py-2 text-gray-600">
                                        {app.role}
                                    </td>
                                    <td className="px-5 py-2">
                                        <span
                                            className="text-xs px-2.5 py-1 rounded-full font-medium"
                                            style={{
                                                backgroundColor: COLUMN_COLORS[app.status]?.bg,
                                                color: COLUMN_COLORS[app.status]?.text
                                            }}
                                        >
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-2 text-gray-600 text-sm">
                                        {app.location || "—"}
                                    </td>
                                    <td className="px-5 py-2 text-gray-600 text-sm">
                                        {app.date_applied || "—"}
                                    </td>
                                    <td className="px-5 py-2 text-gray-600 text-sm">
                                        {app.salary ? `₹${app.salary.toLocaleString()}` : "—"}
                                    </td>
                                    <td className="px-5 py-2">
                                        <div className="flex gap-2">
                                            <svg
                                                onClick={() => setSelectedApp(app)}
                                                xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className="p-1 rounded-md cursor-pointer transition-all duration-200 text-green-700 hover:bg-[#c0edd5]"
                                            >
                                                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                                            </svg>
                                            <svg
                                                onClick={() => setDeleteConfirmId(app.id)}
                                                xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className="p-1 rounded-md cursor-pointer transition-all duration-200 text-[#e76f51] hover:bg-orange-100"
                                            >
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                                <path d="M3 6h18" />
                                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>

    )
}