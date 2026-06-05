import React from 'react'
import { RiFilter3Line, RiExpandVerticalSFill } from "react-icons/ri";
import KanbanBoard from '../components/KanbanBoard';
import TableView from '../components/TableView';
import AddApplication from '../components/AddApplication'
import { AppProvider } from '../context/AppContext';



export default function ApplicationBoard() {
    const [view, setView] = React.useState("kanban");

    return (
        <section className='px-8 py-4 mt-15'>
            <div className='flex my-5 items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-bold text-[#264653]'>Job Board</h2>
                    <p className='text-[15px] text-[#71717A]'>Drag and drop to update application status</p>
                </div>
                <div className='flex items-center gap-3'>
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
            {view === "kanban"? <KanbanBoard />: <TableView />}
            

        </section>
    )
}