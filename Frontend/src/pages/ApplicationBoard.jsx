import React from 'react'
import { RiFilter3Line, RiExpandVerticalSFill } from "react-icons/ri";
import KanbanBoard from '../components/KanbanBoard';
import AddApplication from '../components/AddApplication'
import { AppProvider } from '../context/AppContext';



export default function ApplicationBoard() {

    return (
        <AppProvider>
            <section className='px-8 py-4'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-3xl font-bold text-[#264653]'>Job Board</h2>
                        <p className='text-[12px] text-[#71717A]'>Drag and drop to update application status</p>
                    </div>

                    <AddApplication />
                    
                </div>

                <KanbanBoard />

            </section>
        </AppProvider>
    )
}