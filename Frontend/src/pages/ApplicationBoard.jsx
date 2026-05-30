import React from 'react'
import { RiFilter3Line, RiExpandVerticalSFill } from "react-icons/ri";
import KanbanBoard from '../components/KanbanBoard';
import AddApplication from '../components/AddApplication'
import { AppProvider } from '../context/AppContext';



export default function ApplicationBoard() {

    return (
            <section className='px-8 py-4 mt-15'>
                <div className='flex my-5 items-center justify-between'>
                    <div>
                        <h2 className='text-2xl font-bold text-[#264653]'>Job Board</h2>
                        <p className='text-[15px] text-[#71717A]'>Drag and drop to update application status</p>
                    </div>

                    <AddApplication />
                    
                </div>

                <KanbanBoard />

            </section>
    )
}