const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const knowledgeBase = [
  {
    keywords: ['define', 'definition', 'what is', 'meaning of'],
    response: 'A good study definition often means explaining something clearly in your own words, identifying examples, and comparing it to related ideas.',
  },
  {
    keywords: ['study tips', 'how to study', 'study smarter', 'study better'],
    response: 'Try active recall, spaced repetition, learning with examples, and breaking topics into small chunks. Take short breaks and review regularly.',
  },
  {
    keywords: ['math', 'algebra', 'calculus', 'geometry'],
    response: 'Math study often works best when you practice problems slowly, check each step, and connect formulas to visual or real-world examples.',
  },
  {
    keywords: ['science', 'biology', 'chemistry', 'physics'],
    response: 'For science, focus on concepts, cause-effect relationships, and diagrams. Write short summaries and explain ideas aloud to check your understanding.',
  },
  {
    keywords: ['history', 'dates', 'events'],
    response: 'History study is easier when you build timelines, compare causes and consequences, and connect events to broader themes.',
  },
  {
    keywords: ['vocab', 'language', 'words'],
    response: 'Learn vocabulary by grouping related words, using them in sentences, and reviewing frequently with flashcards.',
  },
  {
    keywords: ['exam', 'test', 'quiz', 'prepare'],
    response: 'Before exams, practice with old questions, summarise key ideas, and create a quick review sheet for the most important topics.',
  },
  {
    keywords: ['motivate', 'motivation', 'focus'],
    response: 'Stay motivated by setting clear goals, celebrating progress, and studying in focused blocks with short breaks.',
  },
];

const fallbackResponses = [
  'That sounds like a good study question! Can you ask it in another way or mention a subject like math, science, or history?',
  'I can help with study tips, definitions, and basic subject guidance. What would you like to learn about?',
  'Try asking about how to prepare for an exam, how to remember facts, or how to review a topic.',
];

function findResponse(message) {
  const normalized = message.toLowerCase();

  for (const item of knowledgeBase) {
    for (const keyword of item.keywords) {
      if (normalized.includes(keyword)) {
        return item.response;
      }
    }
  }

  if (normalized.includes('hello') || normalized.includes('hi')) {
    return 'Hi there! I can help you with study tips, definitions, and basic subject guidance. What do you want to study today?';
  }

  if (normalized.includes('thanks') || normalized.includes('thank you')) {
    return 'You’re welcome! If you have more study questions, feel free to ask.';
  }

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

app.post('/api/chat', (req, res) => {
  const message = req.body?.message;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Request body must include a string message.' });
  }

  const answer = findResponse(message);
  res.json({ answer });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Study Chatbot server is running at http://localhost:${port}`);
});
