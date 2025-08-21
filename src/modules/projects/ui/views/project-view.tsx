"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { MessagesContainer } from "../components/messages-container";
import { Fragment } from "@/generated/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense, useState } from "react";
import { ProjectHeader } from "../components/project-header";
import { FragmentWeb } from "../components/fragment-web";
import { EyeIcon, CodeIcon, CrownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileExplorer } from "@/components/file-explorer";
import { UserControl } from "@/components/user-control";
import { useAuth } from "@clerk/nextjs";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {

   const { has } = useAuth();
      const hasProAccess = has?.({ plan: "pro" });

  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [tabState, setTabState] = useState<"preview" | "code">("preview");
  const projectLoadingMessages = [
  "Servers are sipping coffee… ☕",
  "Compiling your dreams…",
  "Loading bytes, not excuses",
  "Project thinks, you wait",
  "Hold on, nerds at work",
  "Fetching bugs for fun",
  "Optimizing your procrastination…",
  "Loading… blame the intern",
  "Initializing chaos module",
  "Spinning up virtual chaos",
  "Buffering your existential dread",
  "Downloading patience, please wait",
  "Project still alive… maybe",
  "Summoning electrons… hang tight",
  "Compiling regrets… almost done",
  "The code is self-aware"
];

const aiAssistantMessages = [
  "AI judging your code silently",
  "Thinking… blame JavaScript",
  "Hold up, brain rebooting",
  "Processing your weird request",
  "AI needs coffee too",
  "Debugging your life choices",
  "Error 404: Motivation missing",
  "Calculating your stupidity factor",
  "Generating sarcasm… done!",
  "Running neural guilt trip",
  "Your code smells funny",
  "Please wait, chaos loading",
  "Overthinking your logic errors",
  "AI laughing at you internally",
  "Analyzing human-level nonsense"
];

const randomMessage = (messages: string[]) => 
  messages[Math.floor(Math.random() * messages.length)];



  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
         <ErrorBoundary fallback={<p className="text-red-600 font-semibold text-center mt-4">{randomMessage(["Well, this is awkward…", "Project exploded 💥"])}</p>}>
  <Suspense fallback={
    <p className="text-blue-600 font-medium text-center mt-4 animate-pulse">
      {randomMessage(projectLoadingMessages)}
    </p>
  }>
    <ProjectHeader projectId={projectId} />
  </Suspense>
</ErrorBoundary>

<ErrorBoundary fallback={<p className="text-red-600 font-semibold text-center mt-4">{randomMessage(["AI took a nap 💤", "Error… blame GitHub"])}</p>}>
  <Suspense fallback={
    <p className="text-green-600 font-medium text-center mt-4 animate-pulse">
      {randomMessage(aiAssistantMessages)}
    </p>
  }>
    <MessagesContainer
      projectId={projectId}
      activeFragment={activeFragment}
      setActiveFragment={setActiveFragment}
    />
  </Suspense>
</ErrorBoundary>

        </ResizablePanel>

        <ResizableHandle className="hover:bg-primary transition-colors" />

        <ResizablePanel
          defaultSize={65}
          minSize={50}
          className="flex flex-col min-h-0"
        >
          <Tabs
            className="h-full gap-y-0"
            defaultValue="preview"
            value={tabState}
            onValueChange={(value) =>
              setTabState(value as "preview" | "code")
            }
          >
            {/* Tabs Header */}
            <div className="w-full flex items-center p-2 border-b gap-x-2 ">
              <TabsList className="h-8 rounded-md p-0">
                <TabsTrigger
                  value="preview"
                  className="rounded-md"
                >
                  <EyeIcon className="rounded-md" />
                  <span>Demo</span>
                </TabsTrigger>

                <TabsTrigger
                  value="code" 
                  className="rounded-md"
                >
                  <CodeIcon className="w-4 h-4" />
                  <span>Code</span>
                </TabsTrigger>
              </TabsList>

              {/* Upgrade Button */}
              <div className="ml-auto flex items-center gap-x-2">
                {!hasProAccess && (
                <Button asChild size="sm" variant="default">
                  <Link href="/pricing" className="flex items-center gap-1">
                    <CrownIcon className="w-4 h-4" />
                    Upgrade to pro
                  </Link>
                </Button>
                )}
                <UserControl/>
              </div>
            </div>

            {/* Tabs Content */}
            <TabsContent value="preview" className="flex-1 overflow-auto">
              {!!activeFragment && <FragmentWeb data={activeFragment} />}
            </TabsContent>

            <TabsContent value="code" className="min-h-0">
              {!!activeFragment?.files && (
                <FileExplorer files = {activeFragment.files as{ [path:string]: string}}/>
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
