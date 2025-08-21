import { z } from "zod";
import { prisma } from "@/lib/db";
import { generateSlug } from "random-word-slugs";
import { inngest } from "@/inngest/client";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { consumeCredits } from "@/lib/usage";

export const projectsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, { message: "ID is required" }),
      })
    )
    .query(async ({ input, ctx }) => {


      //throw new TRPCError({code: "BAD_REQUEST" });



      const existingProject = await prisma.project.findUnique({
        where: { id: input.id, userId: ctx.auth.userId },
      });

      if (!existingProject) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      return existingProject;
    }),

  getMany: protectedProcedure.query(async ({ctx}) => {
    return prisma.project.findMany({
      where: { userId: ctx.auth.userId, },
      orderBy: { createdAt: "desc" },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        value: z
          .string()
          .min(1, { message: "value is required" })
          .max(10000, { message: "value is too long" }),
      })
    )
    .mutation(async ({ input, ctx }) => {

       try{
              await consumeCredits();
            }
            catch(error) {
              if (error instanceof Error){
                throw new TRPCError({
                  code: "BAD_REQUEST",
                  message: "Something went wrong with your usage",
                });
              } else {
                throw new TRPCError({
                  code: "TOO_MANY_REQUESTS",
                  message: "No credits left, please upgrade your plan to continue",
                });
              }
      
            }




      const createdProject = await prisma.project.create({
        data: {
          userId: ctx.auth.userId,
          name: generateSlug(2, { format: "kebab" }),
          messages: {
            create: {
              content: input.value,
              role: "USER",
              type: "RESULT",
            },
          },
        },
      });

      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
          projectId: createdProject.id,
        },
      });

      return createdProject;
    }),
});
