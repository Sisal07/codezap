"use client";

import { SignIn } from '@clerk/nextjs'
import { useCurrentTheme } from '@/hooks/use-current-theme';
import { dark } from '@clerk/themes';
import Image from 'next/image';

const Page = () => {
    const currentTheme = useCurrentTheme();

    return (
        <>
            <div className="aurora-background" />

            <div className='flex min-h-screen flex-col items-center justify-center p-4'>
                <div className='flex flex-col max-w-md w-full'>
                    <section className='space-y-8'>

                        {/* === Logo and Welcome Text === */}
                        <div className="flex flex-col items-center text-center">
                            <Image
                                // === THIS LINE IS UPDATED ===
                                src="/logo.svg" 
                                alt="Your Company Logo"
                                width={60}
                                height={60}
                            />
                            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                                Welcome Back
                            </h1>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Sign in to access your dashboard.
                            </p>
                        </div>
                        
                        {/* === Glassmorphism Wrapper & Updated Clerk Component === */}
                        <div className='flex flex-col items-center'>
                            <div className='rounded-2xl border border-slate-500/20 bg-white/10 p-1.5 backdrop-blur-lg'>
                                <SignIn
                                    appearance={{
                                        baseTheme: currentTheme === "dark" ? dark : undefined,
                                        elements: {
                                            card: "bg-transparent shadow-none border-none",
                                            rootBox: "rounded-xl",
                                        },
                                    }}
                                />
                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </>
    );
}

export default Page;