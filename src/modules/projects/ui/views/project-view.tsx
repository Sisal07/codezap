"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { MessagesContainer } from "../components/messages-container";
import { Fragment } from "@/generated/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Suspense, useState } from "react";
import { ProjectHeader } from "../components/project-header";
import { FragmentWeb } from "../components/fragment-web";
import { EyeIcon, CodeIcon, CrownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileExplorer } from "@/components/file-explorer";

interface Props {
  projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [tabState, setTabState] = useState<"preview" | "code">("preview");

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <Suspense fallback={<p>LOADING PROJECT...</p>}>
            <ProjectHeader projectId={projectId} />
          </Suspense>
          <Suspense fallback={<p>CODING...</p>}>
            <MessagesContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </Suspense>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          defaultSize={65}
          minSize={50}
          className="flex flex-col min-h-0"
        >
          <Tabs
            className="h-full flex flex-col"
            defaultValue="preview"
            value={tabState}
            onValueChange={(value) =>
              setTabState(value as "preview" | "code")
            }
          >
            {/* Tabs Header */}
            <div className="w-full flex items-center p-2 border-b gap-x-2 bg-gray-50 dark:bg-gray-900">
              <TabsList className="flex h-10 bg-gray-100 dark:bg-gray-800 border rounded-md p-1 gap-1">
                <TabsTrigger
                  value="preview"
                  className="flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium
                    data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700
                    data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400
                    data-[state=active]:shadow-sm 
                    hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <EyeIcon className="w-4 h-4" />
                  <span>Demo</span>
                </TabsTrigger>

                <TabsTrigger
                  value="code"
                  className="flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium
                    data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700
                    data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400
                    data-[state=active]:shadow-sm 
                    hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <CodeIcon className="w-4 h-4" />
                  <span>Code</span>
                </TabsTrigger>
              </TabsList>

              {/* Upgrade Button */}
              <div className="ml-auto flex items-center gap-x-2">
                <Button asChild size="sm" variant="default">
                  <Link href="/pricing" className="flex items-center gap-1">
                    <CrownIcon className="w-4 h-4" />
                    Upgrade to pro
                  </Link>
                </Button>
              </div>
            </div>

            {/* Tabs Content */}
            <TabsContent value="preview" className="flex-1 overflow-auto">
              {!!activeFragment && <FragmentWeb data={activeFragment} />}
            </TabsContent>

            <TabsContent value="code" className="flex-1 p-4 overflow-auto">
              {!!activeFragment?.files && (
                <FileExplorer files = {activeFragment.files as{[path:string]: string}}/>
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
