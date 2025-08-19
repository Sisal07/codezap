"use client";

import { SignUp } from '@clerk/nextjs';
import { useCurrentTheme } from '@/hooks/use-current-theme';
import { dark } from '@clerk/themes';
import Image from 'next/image'; // Import the Next.js Image component

const Page = () => {
    const currentTheme = useCurrentTheme();

    return (
        // We add a div for the background outside your main layout
        <>
            <div className="aurora-background" />

            <div className='flex min-h-screen flex-col items-center justify-center p-4'>
                <div className='flex w-full max-w-md flex-col'>
                    <section className='space-y-8'>

                        {/* === ADDITION: Logo and Welcome Text === */}
                        <div className="flex flex-col items-center text-center">
                            <Image
                                src="/logo.svg" 
                                alt="Your Company Logo"
                                width={60}
                                height={60}
                            />
                            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                                Create Your Account
                            </h1>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Get started by creating a new account.
                            </p>
                        </div>
                        
                        {/* === MODIFICATION: Glassmorphism Wrapper & Updated Clerk Component === */}
                        <div className='flex flex-col items-center'>
                            {/* This div creates the "glass" effect */}
                            <div className='rounded-2xl border border-slate-500/20 bg-white/10 p-1.5 backdrop-blur-lg'>
                                <SignUp
                                    appearance={{
                                        baseTheme: currentTheme === "dark" ? dark : undefined,
                                        elements: {
                                            // Make Clerk's card transparent to let our glass effect show through
                                            card: "bg-transparent shadow-none border-none",
                                            rootBox: "rounded-xl", // Match our border radius
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