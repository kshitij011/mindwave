# Mindwave Assessment Application Setup

## Overview

This is a Next.js application that provides AI-powered expertise assessment. Users can connect their wallet, specify their area of expertise, and take a 5-question assessment that evaluates their knowledge level.

## Features

-   Wallet connection using MetaMask
-   Dynamic question generation based on expertise area
-   AI-powered answer evaluation
-   Score calculation and feedback
-   Modern, responsive UI

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with:

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Flow

1. **Connect Wallet**: Click the "Connect Wallet" button in the navigation bar
2. **Enter Expertise**: On the home page, enter your area of expertise (e.g., "Blockchain", "Machine Learning")
3. **Take Assessment**: Click "Take Assessment" to start the evaluation
4. **Answer Questions**: Respond to 5 AI-generated questions about your expertise
5. **Get Results**: Submit your answers to receive a score and feedback

## Technical Stack

-   **Frontend**: Next.js 15, React 19, TypeScript
-   **Styling**: Tailwind CSS
-   **Blockchain**: Ethers.js for wallet integration
-   **AI**: Alith agent with OpenRouter API
-   **Deployment**: Ready for Vercel deployment

## API Endpoints

### `/api/generate-questions`

-   **Method**: POST
-   **Body**: `{ "expertise": "string" }`
-   **Response**: `{ "questions": [{ "id": number, "text": string }] }`

### `/api/evaluate-assessment`

-   **Method**: POST
-   **Body**: `{ "questions": array, "answers": array, "expertise": string }`
-   **Response**: `{ "score": number }`

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate-questions/
│   │   └── evaluate-assessment/
│   ├── assessment/
│   ├── components/
│   └── page.tsx
└── agents/
    └── agent.ts
```

## Troubleshooting

### Wallet Connection Issues

-   Ensure MetaMask is installed and unlocked
-   Check that you're on a supported network
-   Try refreshing the page and reconnecting

### API Errors

-   Verify your OPENROUTER_API_KEY is set correctly
-   Check the browser console for detailed error messages
-   Ensure the API key has sufficient credits

### Assessment Issues

-   Make sure all questions are answered before submitting
-   Check your internet connection
-   Try refreshing the page if questions don't load
