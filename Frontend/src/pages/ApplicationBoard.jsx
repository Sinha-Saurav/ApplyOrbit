import React from 'react'
import { RiFilter3Line, RiExpandVerticalSFill } from "react-icons/ri";
import KanbanBoard from '../components/KanbanBoard';
import TableView from '../components/TableView';
import AddApplication from '../components/AddApplication'
import { AppProvider } from '../context/AppContext';
import { AppContext } from '../context/AppContext';


export default function ApplicationBoard() {
    const { apps } = React.useContext(AppContext)

    const [view, setView] = React.useState("kanban");
    const [search, setSearch] = React.useState("");

    const filteredApplications = apps.filter((app) => {
        return( 
            app.company.toLowerCase().includes(search.toLowerCase())
        );
    })



    return (
        <section className='px-8 py-4 mt-15'>
            <div className='flex my-5 items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-bold text-[#264653]'>Job Board</h2>
                    <p className='text-[15px] text-[#71717A]'>Manage and organize your applications</p>
                </div>
                <div className='flex items-center gap-3'>
                    <div
                        className='group flex items-center  py-1.5 px-3 min-w-[400px] border border-gray-400 rounded-3xl
                            focus-within:border-[#eaa466] focus-within:ring-2 focus-within:ring-[#eaa466] transition-all duration-200'
                    >   
                        <div className='flex items-center gap-2 flex-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                className="text-gray-500 group-focus-within:text-[#E76F51] transition-colors
                                "><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" />
                            </svg>
                            <input
                                type="text"
                                placeholder='Company Name'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className=' w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-500'
                                />
                        </div>
                        <p className='opacity-0 group-focus-within:opacity-100 transition-opacity duration-200
                                cursor-pointer text-sm text-[#E76F51] font-medium'
                            onClick={() => setSearch("")}
                        >
                            Clear
                        </p>
                    </div>
                    <div className="cursor-pointer flex items-center bg-orange-200 rounded-lg p-1 gap-1">
                        <button
                            onClick={() => setView("kanban")}
                            className={`p-1.5 cursor-pointer rounded-md transition-all ${view === "kanban"
                                ? "bg-white shadow text-[#264653]"
                                : "text-gray-500 hover:text-gray-600"
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-columns3-icon lucide-columns-3"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="M15 3v18" /></svg>
                        </button>
                        <button
                            onClick={() => setView("table")}
                            className={`p-1.5 cursor-pointer rounded-md transition-all ${view === "table"
                                ? "bg-white shadow text-[#264653]"
                                : "text-gray-500 hover:text-gray-600"
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rows3-icon lucide-rows-3"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M21 9H3" /><path d="M21 15H3" /></svg>
                        </button>
                    </div>

                    <AddApplication />
                </div>

            </div>
            {view === "kanban" ? <KanbanBoard apps={filteredApplications} /> : <TableView apps={filteredApplications}/>}


        </section>
    )
}