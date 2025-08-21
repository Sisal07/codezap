"use client";


import Link from "next/link";

const ErrorPage = () => {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 flex flex-col items-center justify-center overflow-hidden text-center px-6">
      {/* Subtle background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-pulse-slow absolute top-[-20%] left-[-10%] w-[200%] h-[200%] bg-gradient-radial from-purple-600/20 via-pink-500/10 to-transparent rotate-[30deg]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1 className="text-9xl md:text-[14rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-text-flicker">
          404
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-xl">
          Oops! Looks like the page you were looking for got lost in cyberspace.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
        >
          Take Me Home
        </Link>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-gray-400 text-sm flex flex-col md:flex-row gap-4 md:gap-6">
        <p>© {new Date().getFullYear()} CodeZap</p>
        <p>All rights reserved</p>
      </footer>
    </main>
  );
};

export default ErrorPage;
