import { getQueryClient, trpc } from "@/trpc/server"; 
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProjectView } from "@/modules/projects/ui/views/project-view";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Loader2Icon } from "lucide-react";

interface Props {
    params: Promise<{
        projectId: string;

    }>
}


const Page = async ({ params }: Props) => {
    const { projectId } = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.messages.getMany.queryOptions({
        projectId,
    }));
    void queryClient.prefetchQuery(trpc.projects.getOne.queryOptions({
        id: projectId,
    }));
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ErrorBoundary fallback={<p>Something went wrong</p>}>

           <Suspense
  fallback={
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <Loader2Icon className="animate-spin w-10 h-10 text-blue-600" />
      <div className="space-y-2 w-full max-w-md">
        <div className="h-6 bg-gray-300 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
      </div>
    </div>
  }
>
  <ProjectView projectId={projectId} />
</Suspense>
            </ErrorBoundary>
        </HydrationBoundary>


    );
};
export default Page;