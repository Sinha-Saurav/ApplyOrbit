import React from 'react'

export function ResumeSkeleton({ analyzing }) {
    return (
        <section className="mt-7">
            <div className="rounded-2xl bg-white shadow p-6 min-h-[250px] transition-all duration-300">

                {/* Loading State */}
                {analyzing && (
                    <div className="animate-pulse">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-[#e76f51]/20"></div>
                            <div className="flex-1">
                                <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
                                <div className="h-3 w-60 bg-gray-100 rounded"></div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-[90%]"></div>
                            <div className="h-4 bg-gray-200 rounded w-[70%]"></div>

                            <div className="mt-8 grid grid-cols-3 gap-4">
                                <div className="h-24 rounded-xl bg-gray-100"></div>
                                <div className="h-24 rounded-xl bg-gray-100"></div>
                                <div className="h-24 rounded-xl bg-gray-100"></div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-8">
                            <div className="w-3 h-3 rounded-full bg-[#e76f51] animate-bounce"></div>
                            <div
                                className="w-3 h-3 rounded-full bg-[#e76f51] animate-bounce"
                                style={{ animationDelay: "0.15s" }}
                            ></div>
                            <div
                                className="w-3 h-3 rounded-full bg-[#e76f51] animate-bounce"
                                style={{ animationDelay: "0.3s" }}
                            ></div>

                            <span className="text-sm text-gray-500 ml-2">
                                Analyzing resume and matching against job description...
                            </span>
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}

export function TailoredResume({tailorData}) {
    return (
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
            {tailorData.missing_keywords && (
                <div className='mt-5'>
                    <div className='rounded-2xl bg-white shadow p-6'>
                        <h2 className='text-xl font-bold text-[#264653] mb-4'>Missing Keywords</h2>
                        <div className='flex gap-5 flex-wrap items-center justify-items-start'>

                            {tailorData.missing_keywords.map((keyword, i) => (
                                <div key={i} className='px-4 py-2 text-sm bg-[#FBF6F1] rounded-2xl will-change-contents'>
                                    {keyword}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            )}

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
    )
}