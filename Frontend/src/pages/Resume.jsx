import React from 'react'
import { AppContext } from '../context/AppContext';
import { ResumeSkeleton, TailoredResume } from '../components/ResumeElements';
import { Skeleton } from '../components/Skeleton';


export default function ResumeTailor() {
    const { getToken, resumeUploadDate, setResumeUploadDate,
        resumeFileName, setResumeFileName, loading, fetchResume } = React.useContext(AppContext)

    const [jdText, setJdText] = React.useState("");
    const [analyzing, setAnalyzing] = React.useState(false);
    const [tailorData, setTailorData] = React.useState(null);

    async function handleResumeUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const token = await getToken();

            const formData = new FormData();
            formData.append("resume", file);

            const res = await fetch("/api/resume/upload", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            if (!res.ok) throw new Error("Failed to upload resume");

            const data = await res.json();
            setResumeFileName(data.file_name);
            setResumeUploadDate(new Date().toLocaleDateString());

        } catch (err) {
            console.error("Resume upload error: ", err.message);
        }
    }

    async function handleAnalyze() {
        setAnalyzing(true);
        try {
            const token = await getToken();

            const res = await fetch("/api/resume/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ "jd_text": jdText })
            })

            if (!res.ok) throw new Error("Failed to analyze")

            const data = await res.json();
            setTailorData(data);

            await fetchResume();

        } catch (err) {
            console.error("Failed to analyze the resume: ", err.message)
        } finally {
            setAnalyzing(false);
        }
    }

    if (loading) return (
        <div className='px-8 py-4 mt-15'>
            <Skeleton className='h-32 mb-6' />
            <div className='flex gap-5'>
                <Skeleton className='flex-1 h-64' />
                <Skeleton className='flex-1 h-64' />
            </div>
        </div>
    );
    return (
        <main className="mt-15 px-8">
            <section className='mt-5 flex relative'>
                <div className='z-10 py-8'>
                    <h1 className="text-3xl text-[#324C3F] font-bold">Resume Tailor</h1>
                    <p className='text-base text-[#4C463E]'>Tailor your resume to any job description using AI.</p>
                </div>
                
            </section>
            <img src='/resume_blob.png'
                    className='absolute -top-4 -right-8 w-150 opacity-90 pointer-events-none'
                />
            <section className='flex gap-5 mt-6'>

                {/* Resume Card */}
                <div className='flex flex-col gap-4 flex-1 bg-white rounded-2xl shadow p-6'>
                    <div>
                        <h2 className='text-lg font-bold text-[#264653]'>Your Resume</h2>
                        <p className='text-sm text-gray-500'>Upload your resume PDF</p>
                    </div>

                    {resumeFileName ? (
                        <div className='flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-6 gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#264653" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                            <p className='text-sm font-medium text-[#264653]'>{resumeFileName}</p>
                            <p className='text-xs text-gray-400'>Uploaded on {resumeUploadDate}</p>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl py-8 gap-2 text-gray-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                            <p className='text-sm'>No resume uploaded yet</p>
                        </div>
                    )}

                    <label className='flex items-center justify-center gap-2 w-full border border-gray-500 rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                        {resumeFileName ? "Change resume" : "Upload resume"}
                        <input
                            type='file'
                            accept='.pdf'
                            className='hidden'
                            onChange={handleResumeUpload}
                        />
                    </label>
                </div>

                {/* JD Card */}
                <div className='flex flex-col gap-4 flex-1 bg-white rounded-2xl shadow p-6 z-10'>
                    <div>
                        <h2 className='text-lg font-bold text-[#264653]'>Job Description</h2>
                        <p className='text-sm text-gray-500'>Paste the JD you want to tailor for</p>
                    </div>

                    <textarea
                        className='flex-1 border border-gray-400 rounded-xl p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#264653]/20 min-h-[160px]'
                        placeholder='Paste the job description here...'
                        value={jdText}
                        onChange={(e) => setJdText(e.target.value)}
                    />

                    <button
                        onClick={handleAnalyze}
                        disabled={analyzing || !jdText}
                        className='flex items-center justify-center gap-2 w-full bg-[#e76f51] text-white font-semibold py-2.5 rounded-lg hover:bg-[#d85f41] transition disabled cursor-pointer'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
                        {analyzing ? "Analyzing..." : "Analyze with AI"}
                    </button>
                </div>

            </section>

            {/* Analysis Container */}
            {(analyzing) && (
                <ResumeSkeleton analyzing={analyzing} />
            )}

            {!analyzing && tailorData && (
                <TailoredResume tailorData={tailorData} />
            )}
        </main>
    )

}