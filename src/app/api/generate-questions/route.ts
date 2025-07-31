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
        const { expertise } = await request.json();

        if (!expertise) {
            return NextResponse.json(
                { error: "Expertise is required" },
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

        const prompt = `User is expertise in ${expertise}, ask user 5 hard questions about it such that it can be answered in a few sentences. Only ask questions that are related to it's expertise and dont give the answers, the user will answer the questions and you will score them later. Return the questions in a JSON format like this:
        {
            "questions": [
                {"id": 1, "text": "Question 1"},
                {"id": 2, "text": "Question 2"},
                {"id": 3, "text": "Question 3"},
                {"id": 4, "text": "Question 4"},
                {"id": 5, "text": "Question 5"}
            ]
        }`;

        const response = await agent.prompt(prompt);

        // Try to parse the response as JSON
        let questions;
        try {
            // Extract JSON from the response if it's wrapped in markdown
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                questions = JSON.parse(jsonMatch[0]);
            } else {
                // If no JSON found, create a fallback structure
                const questionTexts = response
                    .split("\n")
                    .filter((line) => line.trim() && line.includes("?"))
                    .slice(0, 5);
                questions = {
                    questions: questionTexts.map((text, index) => ({
                        id: index + 1,
                        text: text.trim(),
                    })),
                };
            }
        } catch (parseError) {
            console.error("Error parsing agent response:", parseError);
            // Create fallback questions
            questions = {
                questions: [
                    {
                        id: 1,
                        text: "What are the key concepts in " + expertise + "?",
                    },
                    {
                        id: 2,
                        text:
                            "How would you explain the main challenges in " +
                            expertise +
                            "?",
                    },
                    {
                        id: 3,
                        text:
                            "What are the best practices in " + expertise + "?",
                    },
                    {
                        id: 4,
                        text:
                            "How do you approach problem-solving in " +
                            expertise +
                            "?",
                    },
                    {
                        id: 5,
                        text:
                            "What are the latest trends in " + expertise + "?",
                    },
                ],
            };
        }

        return NextResponse.json(questions);
    } catch (error) {
        console.error("Error generating questions:", error);
        return NextResponse.json(
            { error: "Failed to generate questions" },
            { status: 500 }
        );
    }
}
