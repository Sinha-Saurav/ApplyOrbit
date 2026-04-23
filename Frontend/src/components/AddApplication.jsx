import React from 'react'

export default function AddApplication({onAddApp}) {

    const [isOpen, setIsOpen] = React.useState(false)

    const [company, setCompany] = React.useState("");
    const [role, setRole] = React.useState("");
    const [date, setDate] = React.useState("");
    const [status, setStatus] = React.useState("Applied");
    const [jd_link, setJd_link] = React.useState("");
    const [notes, setNotes] = React.useState("");

    function handleSubmit(){
        onAddApp({
            id: Date.now().toString(),
            company,
            role,
            status,
            date,
        });

        setIsOpen(false);
    }


    return (
        <>
            <div onClick={() => setIsOpen(true)} className='flex items-center px-4 py-2 border-none rounded-lg cursor-pointer bg-[#e76f51] text-[#ffffff] gap-1.5
            hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:border-none transition-all duration-200'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                <span className='font-medium text-[14px]'>Add Application</span>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 w-[75%] max-w-[650px] shadow-xl">

                        {/*Header*/}
                        <div className='flex justify-between items-center mb-6'>

                            <div className='text-lg font-semibold text-gray-800'>Add Application</div>

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"
                                className=' text-gray-500 hover:text-gray-800 cursor-pointer' onClick={() => setIsOpen(false)}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>

                        </div>

                        {/* Form */}
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-1'>
                                <label className='label-style'>Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder='e.g. Google'
                                    className='input-field-style'
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='label-style'>Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    placeholder='e.g. SWE Intern'
                                    className='input-field-style'
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </div>

                            <div className='flex gap-3'>
                                <div className='flex flex-col gap-1 flex-1'>
                                    <label className='label-style'>Date Applied</label>
                                    <input
                                        type="date"
                                        name="date_applied"
                                        className='input-field-style '
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>

                                <div className='flex flex-col gap-1 flex-1 relative'>
                                    <label className='label-style'>Status</label>
                                    <select
                                        name="status"
                                        className='input-field-style appearance-none'
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option>Applied</option>
                                        <option>Shortlisted</option>
                                        <option>Interview</option>
                                        <option>Offer</option>
                                        <option>Rejected</option>
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(156, 163, 175)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"
                                        className='absolute right-1.5 bottom-1.5'
                                    ><path d="m6 9 6 6 6-6" /></svg>

                                </div>

                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='label-style'>JD Link</label>
                                <input
                                    type="url"
                                    name="jd_link"
                                    placeholder='https://...'
                                    className='input-field-style'
                                    value={jd_link}
                                    onChange={(e) => setJd_link(e.target.value)}
                                />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='label-style'>Notes</label>
                                <textarea
                                    name="notes"
                                    rows={3}
                                    placeholder='Mention important notes here'
                                    className='input-field-style resize-none'
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>

                        {/*Footer*/}
                        <div className='flex mt-6 gap-4 justify-end'>
                            <button onClick={() => setIsOpen(close)}
                                className='cursor-pointer px-4 py-2 text-sm text-gray-500 hover:text-gray-700'
                            >
                                Cancel
                            </button>
                            <button onClick={handleSubmit}
                                className='text-sm px-4 py-2 bg-[#e76f51] font-medium text-white rounded-lg 
                                hover:bg-[#d85f41] cursor-pointer'
                            >
                                Add Application
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}