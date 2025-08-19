"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";  

export const ProjectsList = () => {
  const trpc = useTRPC();
  const { user } = useUser();
  const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());

  if(!user) return null;

  return (
    <div className="w-full rounded-xl p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        {user?.firstName}&apos;s Zaps
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.length === 0 && (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No projects found
          </div>
        )}

        {projects?.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-md hover:shadow-xl transition-shadow p-5 cursor-pointer"
          >
            <Link href={`/projects/${project.id}`} className="flex items-center gap-4">
              <div className="flex-shrink-0 relative w-12 h-12">
                <Image
                  src="/logo.svg"
                  alt="CodeZap"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col overflow-hidden">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Last updated{" "}
                  {formatDistanceToNow(new Date(project.updatedAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
