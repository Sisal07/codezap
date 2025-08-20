"use client";

import { z } from "zod";

import { toast } from "sonner";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { PROJECT_TEMPLATES } from "../../constants";
import { useClerk } from "@clerk/nextjs";



const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: "value is required" })
    .max(10000, { message: "value is too long" }),
});



export const ProjectForm = () => {

    const router = useRouter();
  const trpc = useTRPC();
  const clerk = useClerk();

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(
          trpc.projects.getMany.queryOptions(),
        );

        queryClient.invalidateQueries(
          trpc.usage.status.queryOptions(),

        );

        router.push(`/projects/${data.id}`)
        
      },
      onError: (error) => {
        toast.error(error.message);

        if (error.data?.code === "UNAUTHORIZED") {
          clerk.openSignIn();
        }

        if (error.data?.code === "TOO_MANY_REQUESTS") {
          router.push("/pricing");
        }
      },
    })
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createProject.mutateAsync({
      value: values.value,
    });
  };

  const onSelect = (value: string) =>{
    form.setValue("value", value, {
        shouldDirty:true,
        shouldValidate:true,
        shouldTouch:true,
    });
  };

  const [isFocused, setIsFocused] = useState(false);
  const isPending = createProject.isPending;
  const isButtonDisabled = isPending || !form.formState.isValid;

  return (
    <Form {...form}>
        <section className="space-y-6">

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
            "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all ",
            isFocused && "shadow-xs",
        )}
        >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
              <TextareaAutosize
              {...field}
              disabled={isPending}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              minRows={2}
              maxRows={8}
              className="pt-4 resize-none border-none w-full outline-none bg-transparent"
              placeholder="What would you like to build?"
              onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)(e);
                    }
                }}
                />
            )}
        />
        <div className="flex gap-x-2 items-end justify-between pt-2">
          <div className="text-[10px] text-muted-foreground font-mono">
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span>&#8984;</span>Enter
            </kbd>
            &nbsp; to submit
          </div>
          <Button
            disabled={isButtonDisabled}
            className={cn(
                "size-8 rounded-full",
                isButtonDisabled && "bg-muted-foreground border "
            )}
            >
            {isPending ? (
                <Loader2Icon className="size-4 animate-spin" />
            ) : (
                <ArrowUpIcon />
            )}
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
  {PROJECT_TEMPLATES.map((template) => (
    <button
      key={template.title}
      onClick={() => onSelect(template.prompt)}
      className="
        flex items-center gap-2 px-4 py-2
        rounded-full
        border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-gray-100
        font-medium
        shadow-sm
        hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:text-white
        transition-all duration-300
        transform hover:-translate-y-1 hover:scale-105
      "
    >
      <span className="text-lg">{template.emoji}</span>
      <span className="whitespace-nowrap">{template.title}</span>
    </button>
  ))}
</div>

        </section>
    </Form>
  );
};
