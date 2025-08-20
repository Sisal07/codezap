"use client";
import Image from "next/image";
import { PricingTable } from "@clerk/nextjs";
import { useCurrentTheme } from "@/hooks/use-current-theme";
import { dark } from "@clerk/themes";

const Page = () => {
  const currentTheme = useCurrentTheme();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#f0f4f8] to-[#e2e8f0] dark:from-gray-900 dark:to-gray-800 px-6 py-12">
      <section className="space-y-8 w-full max-w-4xl">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.svg"
            alt="codezap"
            width={80}
            height={80}
            className="block"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white">
          Pricing Plans
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Upgrade to Pro for full access to advanced features, faster processing, and priority support. Perfect for developers, teams, and power users!
        </p>

        {/* Pricing Table */}
        <div className="mt-8">
          <PricingTable
            appearance={{
              baseTheme: currentTheme === "dark" ? dark : undefined,
              elements: {
                pricingTableCard:
                  "border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-6 transition-transform hover:scale-105 hover:shadow-2xl bg-white dark:bg-gray-900",
                pricingTableHeader:
                  "text-lg font-bold text-gray-900 dark:text-white",
                pricingTablePrice: "text-2xl font-extrabold text-indigo-600 dark:text-indigo-400",
              },
            }}
          />
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
          No hidden fees. Cancel anytime.
        </p>
      </section>
    </div>
  );
};

export default Page;
