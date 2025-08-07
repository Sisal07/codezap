import { Sandbox } from "@e2b/code-interpreter"
import { gemini, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },

  async ({ event, step }) => {
    const sandboxId = await step.run(
      "get-sandbox-id", async () => {
        const sandbox = await Sandbox.create("codezap-nextjs-testcase-1");
        return sandbox.sandboxId;
      },)
    // Step 1: Create agent
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert Nextjs Developer. You write readable and maintainable code. You write simple next.js and react snippets",
      model: gemini({ model: "gemini-2.0-flash-lite" }), // Make sure API key is set in env
    });

    // Step 2: Run summarizer
    const { output } = await codeAgent.run(
      `summarize the following text: ${event.data.value}`
    );

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });


    // Step 3: Return output
    return {
      output, sandboxUrl
    };
  }
);
export const functions = [helloWorld];