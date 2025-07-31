import { Agent, WindowBufferMemory } from "alith";

async function testApiKey() {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        console.log("❌ OPENROUTER_API_KEY not found in environment");
        return;
    }

    console.log("✅ API Key found:", apiKey.substring(0, 20) + "...");

    try {
        const agent = new Agent({
            model: "deepseek/deepseek-chat",
            memory: new WindowBufferMemory(),
            apiKey: apiKey,
            baseUrl: "https://openrouter.ai/api/v1",
            preamble: "You are a test agent.",
        });

        const response = await agent.prompt("Say 'Hello, API is working!'");
        console.log("✅ API Response:", response);
    } catch (error) {
        console.log("❌ API Error:", error.message);
    }
}

testApiKey();
