import React from 'react'
import { AppContext } from '../context/AppContext';

const temp_data = {
    "match_score": 59,
    "score_breakdown": {
        "keyword_match": 25,
        "skills_coverage": 24,
        "experience_quality": 15,
        "education": 4,
        "deductions": -10
    },
    "missing_keywords": [],
    "bullet_changes": [
        {
            "section": "Plant Disease Detection System",
            "changes": [
                {
                    "original": "Fine-tuned ResNet18 achieving 96.23% validation accuracy; implemented confidence scoring to filter low-quality or invalid inputs.",
                    "suggested": "Engineered and fine-tuned a ResNet18 deep learning model, achieving 96.23% validation accuracy; incorporated confidence scoring for robust input validation.",
                    "reason": "Emphasizes 'engineered' and deep learning more explicitly, uses stronger verbs."
                },
                {
                    "original": "Built a FastAPI inference API to deliver predictions, disease descriptions, and treatment recommendations.",
                    "suggested": "Developed and containerized a FastAPI inference API, enabling scalable delivery of real-time predictions, disease descriptions, and treatment recommendations.",
                    "reason": "Adds 'containerized' (common ML engineering practice) and 'scalable delivery' to enhance the engineering aspect."
                },
                {
                    "original": "Designed an end-to-end ML pipeline including preprocessing, augmentation, training, validation, and treatment-data integration.",
                    "suggested": "Architected a comprehensive end-to-end ML pipeline, integrating robust data preprocessing, augmentation, model training, validation, and dynamic treatment-data integration.",
                    "reason": "Uses stronger verbs ('Architected', 'integrating robust') and emphasizes the pipeline's comprehensiveness."
                }
            ]
        },
        {
            "section": "Career Recommendation System",
            "changes": [
                {
                    "original": "Built a recommendation model to suggest 7 career paths based on user’s skills and interests using TF–IDF vectorization and classification.",
                    "suggested": "Developed and optimized a TF-IDF vectorization and classification model to accurately suggest 7 personalized career paths based on user skills and interests.",
                    "reason": "Adds 'optimized' and 'accurately' to highlight quality and engineering effort."
                },
                {
                    "original": "Deployed the system with Streamlit for real-time recommendations.",
                    "suggested": "Engineered and deployed an interactive Streamlit application, providing real-time career recommendations to users.",
                    "reason": "Uses 'Engineered' and emphasizes interactivity for a stronger impact."
                }
            ]
        },
        {
            "section": "Movie Recommendation System",
            "changes": [
                {
                    "original": "Implemented content-based filtering using cosine similarity on movie features (e.g., genres, keywords, cast, director).",
                    "suggested": "Engineered a content-based filtering system leveraging cosine similarity across enriched movie features (genres, keywords, cast, director) for enhanced recommendations.",
                    "reason": "Uses 'Engineered' and 'enriched' for stronger impact and clearer technical contribution."
                },
                {
                    "original": "Deployed the system on Stremlit where users can get movie recommendation.",
                    "suggested": "Deployed an accessible Streamlit web application, enabling users to receive instant, personalized movie recommendations.",
                    "reason": "Stronger phrasing for deployment and user benefit."
                }
            ]
        }
    ],
    "global_new_bullets": [
        {
            "section": "Summary",
            "bullet": "Enthusiastic B.Tech student (expected 2027) with a strong foundation in deep learning, Python, PyTorch, and hands-on experience in building and deploying ML models and APIs. Eager to contribute to innovative projects as a Machine Learning Engineering Intern.",
            "reason": "The current summary is for an 'Engineer' role, but the candidate's academic stage (early B.Tech) makes an internship more realistic. This clarifies intent and manages expectations for the ATS."
        },
        {
            "section": "Technical Skills",
            "bullet": "MLOps Concepts: Basic understanding of Model Versioning, CI/CD, Containerization (Docker)",
            "reason": "For an 'ML Engineer' role, even a basic understanding of MLOps concepts like versioning, CI/CD, and containerization is valuable, enhancing the 'engineering' aspect of the profile."
        }
    ],
    "summary": "The resume demonstrates strong technical skills in Python, PyTorch, and deep learning, with excellent project experience in model development and deployment. However, it lacks professional work experience and the candidate's early academic stage (B.Tech 2023-2027) is a critical mismatch for a typical 'Machine Learning Engineer' role, suggesting a more suitable fit for an internship."
}

export default function ResumeTailor() {
    const { getToken, resumeUploadDate, setResumeUploadDate, resumeFileName, setResumeFileName } = React.useContext(AppContext)

    const [jdText, setJdText] = React.useState("");
    const [analyzing, setAnalyzing] = React.useState(false);
    const [tailorData, setTailorData] = React.useState(temp_data);

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

        } catch (err) {
            console.error("Failed to analyze the resume: ", err.message)
        } finally {
            setAnalyzing(false);
        }
    }

    return (
        <main className="mt-15 px-8">
            <section className='mt-5 flex relative'>
                <div className='z-10 py-8'>
                    <h1 className="text-3xl text-[#324C3F] font-bold">Resume Tailor</h1>
                    <p className='text-base text-[#4C463E]'>Tailor your resume to any job description using AI.</p>
                </div>
                <img src='/resume_blob.png'
                    className='absolute -top-4 -right-8 w-130 opacity-90 pointer-events-none'
                />
            </section>
            <section className='flex gap-5 mt-6'>

                {/* Resume Card */}
                <div className='flex flex-col gap-4 flex-1 bg-white rounded-2xl shadow p-6'>
                    <div>
                        <h2 className='text-lg font-bold text-[#264653]'>Your Resume</h2>
                        <p className='text-sm text-gray-500'>Upload your resume PDF</p>
                    </div>

                    {resumeFileName ? (
                        <div className='flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl py-6 gap-2'>
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

            {tailorData &&
                <section className='mt-7'>
                    <div className='rounded-2xl bg-white shadow p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h2 className='text-xl font-bold text-[#264653]'>Match Score</h2>
                                <p className='text-sm text-gray-500'>Based on ATS keyword and skills analysis</p>
                            </div>
                            <div className='flex items-baseline gap-1'>
                                <p className='text-5xl font-bold text-[#e76f51]'>{tailorData.match_score}</p>
                                <p className='text-lg font-medium text-[#bd715e]'>/100</p>
                            </div>
                        </div>

                        <div className='grid grid-cols-4 gap-10 mt-6'>

                            {/* Keyword Match */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-sm font-semibold text-gray-700'>Keyword match</p>
                                <div className='flex items-baseline gap-0.5'>
                                    <p className='text-2xl font-bold text-[#264653]'>{tailorData.score_breakdown.keyword_match}</p>
                                    <p className='text-sm text-gray-500'>/25</p>
                                </div>
                                <div className='h-1.5 rounded-full bg-gray-200'>
                                    <div className='h-1.5 rounded-full bg-green-500'
                                        style={{ width: `${(tailorData.score_breakdown.keyword_match / 25) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Skills Coverage */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-sm font-semibold text-gray-700'>Skills coverage</p>
                                <div className='flex items-baseline gap-0.5'>
                                    <p className='text-2xl font-bold text-[#264653]'>{tailorData.score_breakdown.skills_coverage}</p>
                                    <p className='text-sm text-gray-500'>/25</p>
                                </div>
                                <div className='h-1.5 rounded-full bg-gray-200'>
                                    <div className='h-1.5 rounded-full bg-green-500'
                                        style={{ width: `${(tailorData.score_breakdown.skills_coverage / 25) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Experience Quality */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-sm font-semibold text-gray-700'>Experience quality</p>
                                <div className='flex items-baseline gap-0.5'>
                                    <p className='text-2xl font-bold text-[#264653]'>{tailorData.score_breakdown.experience_quality}</p>
                                    <p className='text-sm text-gray-500'>/20</p>
                                </div>
                                <div className='h-1.5 rounded-full bg-gray-200'>
                                    <div className='h-1.5 rounded-full bg-yellow-400'
                                        style={{ width: `${(tailorData.score_breakdown.experience_quality / 20) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Deductions */}
                            <div className='flex flex-col gap-1'>
                                <p className='text-sm font-semibold text-gray-700'>Deductions</p>
                                <div className='flex items-baseline gap-0.5'>
                                    <p className='text-2xl font-bold text-red-500'>{tailorData.score_breakdown.deductions}</p>
                                </div>
                                <div className='h-1.5 rounded-full bg-gray-200'>
                                    <div className='h-1.5 rounded-full bg-red-500'
                                        style={{ width: `${(Math.abs(tailorData.score_breakdown.deductions) / 30) * 100}%` }}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {tailorData.bullet_changes && (
                        <div className='mt-5'>
                            <div className='rounded-2xl bg-white shadow p-6'>
                                <h2 className='text-xl font-bold text-[#264653] mb-6'>Bullet point improvements</h2>

                                {tailorData.bullet_changes.map((bullet, i) => (
                                    <div key={i} className='mb-8'>
                                        <p className='text-sm font-semibold underline text-gray-800 mb-3'>{bullet.section}</p>

                                        {bullet.changes.map((change, j) => (
                                            <div key={j} className='mb-4'>
                                                <div className='flex gap-3 items-start mb-1'>
                                                    {/* Before */}
                                                    <div className='flex gap-3 items-center flex-1 bg-red-50 text-red-800 text-sm rounded-lg p-3'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                                                            <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" />
                                                        </svg>
                                                        {change.original}
                                                    </div>
                                                    <span className='text-gray-600 font-bold mt-3'>→</span>
                                                    {/* After */}
                                                    <div className='flex items-center gap-3 flex-1 bg-green-50 text-green-800 text-sm rounded-lg p-3'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                                                            <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                                                            <path d="m9 11 3 3L22 4" />
                                                        </svg>
                                                        {change.suggested}
                                                    </div>
                                                </div>
                                                <p className='text-xs text-gray-400 mt-1'>{change.reason}</p>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {tailorData.global_new_bullets && (
                        <div className='mt-5'>
                            <div className='rounded-2xl bg-white shadow p-6'>
                                <h2 className='text-xl font-bold text-[#264653] mb-4'>Suggested Additions</h2>

                                {tailorData.global_new_bullets.map((item, i) => (
                                    <div key={i} className='flex gap-3 mb-4'>
                                        <div className='w-1 rounded-full bg-[#e76f51] shrink-0' />
                                        <div>
                                            <p className='text-base font-semibold text-gray-800 mb-1'>{item.section}</p>
                                            <p className='text-sm font-medium text-[#244434] mb-1'>{item.bullet}</p>
                                            <p className='text-xs text-gray-500'>{item.reason}</p>
                                        </div>
                                    </div>
                                ))}

                                {tailorData.summary && (
                                    <div className='mt-4 pt-4 border-t border-gray-400'>
                                        <p className='text-sm font-semibold text-gray-800 mb-1'>Overall Assessment</p>
                                        <p className='text-sm text-gray-600'>{tailorData.summary}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </section>
            }
        </main>
    )

}