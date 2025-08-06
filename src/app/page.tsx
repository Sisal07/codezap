"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { use } from "react";
import { useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [value, setValue] = useState("");
  const trpc = useTRPC();

const invoke = useMutation(trpc.invoke.mutationOptions({
  onSuccess: () => {
    toast.success("Background job invoked successfully!");
  }
}));

  return (
    <div className="max-w-2xl mx-auto">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button disabled ={invoke.isPending}onClick={() => invoke.mutate({value:value})}>
        Invoke Background Jobs
      </Button>
    </div>
  );
}

export default page;