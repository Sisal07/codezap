"use client";

import Image from "next/image";
import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div className="flex flex-col max-w-6xl mx-auto w-full px-4">
      {/* Hero Section */}
      <section className="space-y-6 py-[12vh] 2xl:py-32 text-center">
        {/* Logo */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ rotate: 15, scale: 1.1 }}
          whileTap={{ rotate: -15, scale: 0.95 }}
        >
          <Image
            src="/logo.svg"
            alt="CodeZap"
            height={64}
            width={64}
            className="drop-shadow-lg"
          />
        </motion.div>

        {/* Headline */}
        <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Build Fast, Create Bold with CodeZap
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Create apps and websites instantly — powered by your prompts.
        </p>

        {/* Project Form */}
        <div className="max-w-2xl mx-auto w-full mt-8">
          <ProjectForm />
        </div>
      </section>

      {/* Projects List */}
      <section className="mt-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
          Your Projects
        </h2>
        <ProjectsList />
      </section>

      
    </div>
    
    
  );
};

export default Page;
