import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'
import { NumericCards } from '../components/DashBoardElements';
import { AppliationsChart } from '../components/DashboardChart';
import { ResumeActivityPlaceholder } from '../components/DashBoardElements';
import { Skeleton } from '../components/Skeleton';
import AddApplication from '../components/AddApplication';

export default function Dashboard() {

    const { apps, setApps, setSelectedApp, loading } = React.useContext(AppContext)

    const navigate = useNavigate()

    const COLUMN_COLORS = {
        Applied: { bg: "#eff6ff", text: "#2563eb", dot: "#3b82f6" },
        Shortlisted: { bg: "#fefce8", text: "#854d0e", dot: "#eab308" },
        Interview: { bg: "#f0fdf4", text: "#166534", dot: "#22c55e" },
        Offer: { bg: "#f0fdf4", text: "#14532d", dot: "#16a34a" },
        Rejected: { bg: "#fef2f2", text: "#991b1b", dot: "#ef4444" },
    };

    const recentApps = apps.slice(-6)

    if (loading) return (
        <div className='px-8 py-4 mt-15 flex flex-col gap-5'>
            <div className='grid grid-cols-4 gap-4'>
                <Skeleton className='h-28' />
                <Skeleton className='h-28' />
                <Skeleton className='h-28' />
                <Skeleton className='h-28' />
            </div>
            <div className='grid grid-cols-2 gap-6'>
                <Skeleton className='h-72' />
                <Skeleton className='h-72' />
            </div>
            <Skeleton className='h-64' />
        </div>
    );

    return (
        <>
            <NumericCards />
            <div className='grid grid-cols-2 gap-6 px-8 mb-8'>
                <AppliationsChart />
                <ResumeActivityPlaceholder />
            </div>
             <img src='/resume_blob.png'
                    className='absolute -top-4 -right-8 w-150 opacity-90 pointer-events-none -z-40'
                />
            <AddApplication isHidden={true} />
            <section className="px-8 mt-8">

                <div className="bg-white rounded-2xl shadow overflow-hidden">

                    <div className="flex justify-between px-5 py-4 border-b border-gray-400">
                        <h3 className="text-[20px] font-bold text-[#264653]">
                            Recent Applications
                        </h3>
                        <div onClick={() => navigate('/applications')}
                            className='flex justify-between items-center gap-2 cursor-pointer 
                            border-[1px] border-transparent px-2 rounded-2xl hover:border-[#E76F51] transition-all duration-300'>

                            <p className='text-sm font-semibold text-[#EA5812]'>View all</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="#EA5812" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-move-right-icon lucide-move-right">
                                <path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg>
                        </div>
                    </div>

                    <table className="w-full">

                        <tbody className='divide-y divide-gray-200'>

                            {recentApps.map(app => (

                                <tr
                                    key={app.id}
                                    onClick={() => setSelectedApp(app)}
                                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                                >

                                    <td className="px-5 py-2 text-zinc-800 font-semibold">
                                        {app.company.charAt(0).toUpperCase() + app.company.slice(1)}
                                    </td>

                                    <td className="px-5 py-3 text-sm font-medium text-gray-600">
                                        {app.role}
                                    </td>

                                    <td className="px-5 py-3">

                                        <span
                                            className="text-xs px-2 py-1 rounded-full font-medium"
                                            style={{
                                                backgroundColor: COLUMN_COLORS[app.status].bg,
                                                color: COLUMN_COLORS[app.status].text
                                            }}
                                        >
                                            {app.status}
                                        </span>

                                    </td>

                                    <td className="px-5 py-3 text-sm text-gray-500">
                                        {app.location || "N/A"}
                                    </td>

                                    <td className="px-5 py-3 text-sm text-gray-500">
                                        {app.date_applied}
                                    </td>
                                    <td className="px-5 py-2 text-gray-500 text-sm">
                                        {app.salary ? `₹${app.salary.toLocaleString()}` : "—"}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </section>
        </>
    )
}