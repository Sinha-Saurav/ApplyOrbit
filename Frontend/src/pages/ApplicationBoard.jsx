import React from 'react'

export default function ApplicationBoard(){
    return(
        <section className='px-8 py-4'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-bold'>Job Board</h2>
                    <p className='text-[12px] text-[#71717A]'>Manage active applications here</p>
                </div>
                <div>
                    <select id="filter" name="filter" className='appearance-none px-4 py-2  w-20 rounded-[5px] bg-[#1C1B1B] text-[#D4D4D8] font-medium'>
                        <option value="" disabled selected>Filter</option>
                        <option>By Date</option>
                        <option>Interview</option>
                        <option>rejected</option>
                        <option>Offer letter</option>
                    </select>

                    <select id="sort" name="sort">
                        <option value="" disabled selected>Sort</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                    </select>
                    
                </div>
            </div>
        </section>
    )
}