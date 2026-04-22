import React from 'react'
import { RiFilter3Line, RiExpandVerticalSFill } from "react-icons/ri";
import KanbanBoard from '../components/KanbanBoard';

export default function ApplicationBoard() {
    return (
        <section className='px-8 py-4'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-3xl font-bold text-[#264653]'>Job Board</h2>
                    <p className='text-[12px] text-[#71717A]'>Manage active applications here</p>
                </div>
                <div className='flex gap-2'>
                    <div className="relative inline-block">
                        
                        <RiFilter3Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                        <select
                            className="appearance-none pl-8 w-22 pr-4 py-2 rounded-md bg-[#1C1B1B] text-[#D4D4D8]"
                            defaultValue=""
                        >
                            <option value="" disabled selected>
                                Filter
                            </option>
                            <option>By Date</option>
                            <option>Interview</option>
                            <option>Rejected</option>
                            <option>Offer Letter</option>
                        </select>
                    </div>

                    <div className="relative inline-block">
                        <RiExpandVerticalSFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                        <select
                            className="appearance-none pl-8 w-22 pr-4 py-2 rounded-md bg-[#1C1B1B] text-[#D4D4D8]"
                            defaultValue=""
                        >
                            <option value="" disabled selected>
                                Sort
                            </option>
                            <option>Ascending</option>
                            <option>Descending</option>
                        </select>
                    </div>

                </div>
            </div>


            <KanbanBoard/>
        </section>
    )
}