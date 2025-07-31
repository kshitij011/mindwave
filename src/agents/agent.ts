import { config } from "dotenv";
config(); // Loads .env file

import { Agent, WindowBufferMemory } from "alith";

const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
    console.error("❌ OPENROUTER_API_KEY is not set in the environment!");
    process.exit(1);
}

const agent = new Agent({
    model: "deepseek/deepseek-chat",
    memory: new WindowBufferMemory(),
    apiKey: apiKey,
    baseUrl: "https://openrouter.ai/api/v1",
    preamble:
        "You are an agent for a startup called Mindwave. You are tasked with helping the user with their questions and tasks.",
});

// (async () => {
//     try {
//         const questions = await agent.prompt(
//             "User is expertise in Blockchain, ask user 5 hard questions about it such that it can be answered in a few sentences. Only ask questions that are related to it's expertise and dont give the answers, the user will answer the questions and you will score them later."
//         );
//         console.log("Response: \n", questions);

//         const answersByUser = await agent.prompt(
//             "1. Dont know the answer to the question, 2. Know the answer to the question, 3. Know the answer to the question but dont want to answer, 4. Know the answer to the question but dont want to answer, 5.  Know the answer to the question but dont want to answer, these are answers given by user, score them between 0 and 20 from each question and return the total score out of 100 in plain text without any styling like *70* or *100*, only return the number like 70 or 100"
//         );
//         console.log("Response: \n", answersByUser);

//         const score = Number(answersByUser.slice(-1));
//         console.log("Score: \n", score);

//         if (score < 75) {
//             console.log("User is not expert in Blockchain");
//         } else {
//             console.log("User is expert in Blockchain");
//         }
//     } catch (err) {
//         console.error("🚨 Error during prompt:", err);
//     }
// })();

export async function getQuestions(expertise: string) {
    const questions = await agent.prompt(
        `User is expert in ${expertise} feild, only ask 5 challenging questions about it such that it can be answered in a few sentences. Only ask questions that are related to it's expertise and dont give the answers, the user will answer the questions and you will score them later.`
    );
    return questions;
}

export async function evaluateAnswers(questions: string, answers: string) {
    const prompt = `These were the questions asked to user by you earlier "${questions}" and these are the answers given by user "${answers}". Evaluate the answers and score them between 0 and 20 from each question and return the total score out of 100 in plain text without any styling like *70* or *100*, only return the number like 70 or 100`;
    const score = await agent.prompt(prompt);
    return score;
}
