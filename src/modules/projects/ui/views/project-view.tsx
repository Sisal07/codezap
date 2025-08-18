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
          <Suspense fallback={<p> AI Assistant is working </p>}>
            <MessagesContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </Suspense>
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
