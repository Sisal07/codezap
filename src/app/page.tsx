"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [value, setValue] = useState("");


  const trpc = useTRPC();
  const { data: messages } = useQuery(trpc.messages.getMany.queryOptions())

const createMessage = useMutation(trpc.messages.create.mutationOptions({
  onSuccess: () => {
    toast.success("Message Created Successfully");
  }
}));

  return (
    <div className="max-w-2xl mx-auto">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button disabled ={createMessage.isPending}onClick={() => createMessage.mutate({value:value})}>
        Invoke Background Jobs
      </Button>
      {JSON.stringify(messages, null, 2)}
    </div>
  );
}

export default Page;