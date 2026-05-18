# Study Chatbot

A simple rule-based AI study chatbot built without an LLM. This version includes both frontend and backend.

## Files

- `index.html` — main chatbot UI
- `styles.css` — visual styling
- `script.js` — frontend chat logic
- `server.js` — backend chat API and static server
- `package.json` — Node.js scripts and dependencies

## Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open the chatbot in your browser:
   ```
   http://localhost:3000
   ```

## How it works

- Frontend sends user messages to `/api/chat`
- Backend returns rule-based responses from a knowledge base
- No external LLM or API call is required

## Features

- Frontend chat interface with user and bot messages
- Backend API route for chat response generation
- Browser-based study guidance for subjects like math, science, and exam prep
