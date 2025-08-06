import { gemini, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
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

    console.log("Summarized Output:", output);

    // Step 3: Return output
    return {
      message: output,
    };
  }
);
export const functions = [helloWorld];