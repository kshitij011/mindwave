import { NextRequest, NextResponse } from "next/server";
import { Agent, WindowBufferMemory } from "alith";

const apiKey = process.env.OPENROUTER_API_KEY;

export async function POST(request: NextRequest) {
    if (!apiKey) {
        return NextResponse.json(
            { error: "OPENROUTER_API_KEY is not configured" },
            { status: 500 }
        );
    }

    try {
        const { questions, answers, expertise } = await request.json();

        if (!questions || !answers || !expertise) {
            return NextResponse.json(
                { error: "Questions, answers, and expertise are required" },
                { status: 400 }
            );
        }

        const agent = new Agent({
            model: "deepseek/deepseek-chat",
            memory: new WindowBufferMemory(),
            apiKey: apiKey,
            baseUrl: "https://openrouter.ai/api/v1",
            preamble:
                "You are an agent for a startup called Mindwave. You are tasked with helping the user with their questions and tasks.",
        });

        // Create a detailed prompt for evaluation
        let evaluationPrompt = `Evaluate the following answers for expertise in ${expertise}. Score each answer from 0 to 20 points (total 100 points).\n\n`;

        for (let i = 0; i < questions.length; i++) {
            evaluationPrompt += `Question ${i + 1}: ${questions[i].text}\n`;
            evaluationPrompt += `Answer: ${answers[i]}\n\n`;
        }

        evaluationPrompt += `Please evaluate each answer based on:
        - Accuracy and correctness (0-10 points)
        - Depth of knowledge (0-5 points)
        - Clarity and articulation (0-5 points)

        Return only the total score as a number (0-100), no other text or formatting.`;

        const response = await agent.prompt(evaluationPrompt);

        // Extract the score from the response
        let score = 0;
        try {
            // Try to find a number in the response
            const scoreMatch = response.match(/\b(\d{1,3})\b/);
            if (scoreMatch) {
                score = parseInt(scoreMatch[1]);
                // Ensure score is within valid range
                score = Math.max(0, Math.min(100, score));
            } else {
                // Fallback scoring based on answer length and content
                score = answers.reduce((total: number, answer: string) => {
                    const answerScore = Math.min(
                        20,
                        Math.max(
                            0,
                            Math.floor(answer.length / 10) +
                                (answer
                                    .toLowerCase()
                                    .includes(expertise.toLowerCase())
                                    ? 5
                                    : 0) +
                                (answer.length > 50 ? 5 : 0)
                        )
                    );
                    return total + answerScore;
                }, 0);
            }
        } catch (parseError) {
            console.error("Error parsing score:", parseError);
            // Fallback scoring
            score = answers.reduce((total: number, answer: string) => {
                return total + Math.min(20, Math.floor(answer.length / 10));
            }, 0);
        }

        return NextResponse.json({ score });
    } catch (error) {
        console.error("Error evaluating assessment:", error);
        return NextResponse.json(
            { error: "Failed to evaluate assessment" },
            { status: 500 }
        );
    }
}
