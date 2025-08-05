"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { use } from "react";
import { toast } from "sonner";

const page = () => {
  const trpc = useTRPC();

const invoke = useMutation(trpc.invoke.mutationOptions({
  onSuccess: () => {
    toast.success("Background job invoked successfully!");
  }
}));

  return (
    <div className="max-w-2xl mx-auto">
      <Button disabled ={invoke.isPending}onClick={() => invoke.mutate({text:"john"})}>
        Invoke Background Jobs
      </Button>
    </div>
  );
}

export default page;